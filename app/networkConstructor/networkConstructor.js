'use strict';

ONLINENETWORK.controller("networkConstructor", function ($scope) {
	var context = {
		selectedNeuron: {},
		cleaners: [],

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

		clearNeuron: function (neuron) {
			if (neuron.clear) {
				neuron.clear();
			}
		},
		setInput: function (neuron) {
			var clear = function () {
				delete neuron.isInput;
			};

			neuron.isInput = true;
			neuron.clear = clear;
			context.cleaners.push(clear);
			$scope.network.addInputNeuron(neuron);
		},
		setOutput: function (neuron) {
			var clear = function () {
				delete neuron.isOutput;
			};

			neuron.isOutput = true;
			neuron.clear = clear;
			context.cleaners.push(clear);
			$scope.network.addOutputNeuron(neuron);
		},
		clear: function () {
			context.cleaners.each(function (func) {
				func();
			});
			context.cleaners = [];
			context.selectedNeuron = {};

			delete $scope.constructorState;
		}
	};


	$scope.init = function () {
		$scope.network = NeuralNetwork.networkFactory.createNetwork();
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

	$scope.checkState = function (neuron) {
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
				context.clear();
				break;
		}
	};
});