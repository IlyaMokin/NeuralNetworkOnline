'use strict';

ONLINENETWORK.controller("networkConstructor", function ($scope) {
	var context = {
		selectedNeuron: {},

		cleaners: [],
		lastSelectedLayer: null,

		setLink: function (neuron) {
			var selected = context.selectedNeuron;
			if (selected.neuron1 === neuron) {
				context.selectedNeuron = {};
				delete selected.neuron1.isSelected;
			} else if (selected.neuron1) {
				$scope.network.setConnect(selected.neuron1, neuron);

				context.selectedNeuron = {};
				delete selected.neuron1.isSelected;
			} else {
				selected.neuron1 = neuron;
				neuron.isSelected = true;
			}
		},

		setInput: function (neuron) {
			$scope.network.addInputNeuron(neuron);
		},
		setOutput: function (neuron) {
			$scope.network.addOutputNeuron(neuron);
		},
		showNeuronInfo: function (neuron) {
			context.clear();

			neuron.inputs.each(function (link) {
				link.values.isHighlighting = true;
			});
			neuron.outputs.each(function (link) {
				link.values.isHighlighting = true;
			});

			$scope.info = {
				neuron: neuron
			};
			neuron.isSelected = true;
			neuron.showedInfo = true;
			context.cleaners.push(function () {
				neuron.isSelected = false;
				neuron.showedInfo = false;
				neuron.inputs.each(function (link) {
					delete link.values.isHighlighting;
				});
				neuron.outputs.each(function (link) {
					delete link.values.isHighlighting;
				});
			})
		},
		clearNeuron: function (neuron) {
			delete neuron.isSelected;
			delete neuron.showedInfo;
		},
		clear: function () {
			context.cleaners.each(function (func) {
				func();
			});
			context.cleaners = [];
			context.selectedNeuron = {};

			delete $scope.constructorState;
			if (context.lastSelectedLayer) {
				delete context.lastSelectedLayer.isSelected;
				context.lastSelectedLayer = null;
			}
		}
	};


	$scope.init = function () {
		var funcName;

		$scope.info = {};
		$scope.network = NeuralNetwork.networkFactory.createNetwork();

		$scope.activationFunctions = [];
		for(funcName in NeuralNetwork.ActivationFunctions){
			if(NeuralNetwork.ActivationFunctions.hasOwnProperty(funcName)){
				$scope.activationFunctions.push(funcName);
			}
		}
	};
	$scope.init();

	$scope.addLayer = function () {
		$scope.network.addLayer();
	};

	$scope.addNeuron = function (layer) {
		layer.addNeuron();
	};

	$scope.setState = function (state) {
		if ($scope.constructorState != state) {
			$scope.constructorState = state;
		} else {
			$scope.constructorState = null;
		}
	};

	$scope.removeLink = function (link) {
		$scope.network.removeLink(link);
	};

	$scope.checkNeuronState = function (neuron) {
		context.clearNeuron(neuron);
		switch ($scope.constructorState) {
			case 'addInputNeuron':
				context.setInput(neuron);
				break;
			case 'addOutputNeuron':
				context.setOutput(neuron);
				break;
			case 'setLink':
				context.setLink(neuron);
				break;
			default:
				context.showNeuronInfo(neuron);
				break;
		}
	};

	$scope.showLayerInfo = function (layer) {
		!context.lastSelectedLayer || (delete context.lastSelectedLayer.isSelected);
		context.lastSelectedLayer = layer;
		layer.isSelected = true;
		$scope.info = {
			layer: layer
		};
	};

	$scope.setAutoConnections = function () {
		var network = $scope.network,
			layers = network.layers;

		layers.skip(1).each(function (layer, lID) {
			layer.neurons.each(function (neuron2) {
				layers[lID].neurons.each(function (neuron1) {
					network.setConnect(neuron1, neuron2);

					network.removeOutputNeuron(neuron1);
					network.removeInputNeuron(neuron1);

					network.removeOutputNeuron(neuron2);
					network.removeInputNeuron(neuron2);
				});
			});
		});

		layers[0].neurons.each(function (neuron) {
			network.removeInputNeuron(neuron);
			network.addInputNeuron(neuron);
		});

		layers[layers.length - 1].neurons.each(function (neuron) {
			network.addOutputNeuron(neuron);
		});
	};

	$scope.checkIsInput = function (neuron) {
		var network = $scope.network;
		neuron.isInput ? network.addInputNeuron(neuron) : network.removeInputNeuron(neuron);
	};

	$scope.checkIsOutput = function (neuron) {
		var network = $scope.network;
		neuron.isOutput ? network.addOutputNeuron(neuron) : network.removeOutputNeuron(neuron);
	};

	$scope.calculate = function () {
		$scope.network.calculate();
	};

	$scope.setNeuronsByNumber = function (layer, oldNumber) {
		var notEmptyNeurons = layer.neurons.where(function (neuron) {
				return neuron;
			}),
			len = layer.neurons.length - notEmptyNeurons.length, ID;

		layer.neurons = notEmptyNeurons;
		if(len)
		for (ID = 0; ID < len; ID += 1) {
			layer.addNeuron();
		}
	};

	$scope.layerAllowedToChange = function(layer){
		return !layer.neurons.contains(function(neuron){
			return neuron.isInput || neuron.isOutput || neuron.outputs.length || neuron.inputs.length;
		});
	};
});