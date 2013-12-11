'use strict';

namespace('NeuralNetwork.Prototypes').NetworkPrototype = function () {
	var self = this,
		IDSync = 0,
		Layer = function () {
			this.neurons = [];
			this.layerID = IDSync++;
		};
	Layer.prototype = new NeuralNetwork.Prototypes.LayerPrototype();

	self.addLayer = function () {
		this.layers.push(new Layer());
	};

	self.setConnect = function (neuron1, neuron2) {
		var values = {
			W: Math.random()
		};

		if (neuron2.inputs.contains(function (link) {
			return link.neuron.layerID === neuron1.layerID && link.neuron.neuronID === neuron1.neuronID
		})) {
			return;
		}

		neuron1.outputs.push({
			neuron: neuron2,
			values: values,
			_connectWith: [neuron1, neuron2]
		});

		neuron2.inputs.push({
			neuron: neuron1,
			values: values,
			_connectWith: [neuron1, neuron2]
		});
	};

	self.removeLink = function (link) {
		var neuron1 = link._connectWith[1],
			neuron2 = link._connectWith[0],
			ID1 = neuron1.inputs.getIndex('values', link.values),
			ID2 = neuron2.outputs.getIndex('values', link.values);
		neuron1.inputs.splice(ID1, 1);
		neuron1.outputs.splice(ID2, 1);
	};

	self.addInputNeuron = function (neuron) {
		neuron.isInput = true;
		this.input.push(neuron);
	};

	self.removeInputNeuron = function (neuron) {
		var ID = this.input.getIndex(function (item) {
			return neuron === item;
		});
		neuron.isInput = false;
		ID === -1 || this.input.splice(ID, 1);
	};

	self.addOutputNeuron = function (neuron) {
		neuron.isOutput = true;
		this.out.push(neuron);
	};

	self.removeOutputNeuron = function (neuron) {
		var ID = this.out.getIndex(function (item) {
			return neuron === item;
		});
		neuron.isOutput = false;

		ID === -1 || this.out.splice(ID, 1);
	};

	self.getResult = function (input) {
		var network = this,
			networkInput = network.input;

		input.each(function (item, ID) {
			networkInput[ID] = item;
		});

		network.calculate();

		return this.out.select('result');
	};

	self.calculate = function () {
		this.layers.each(function (layer) {
			layer.neurons.where(function(neuron){
				return !neuron.isInput;
			}).each(function (neuron) {
				neuron.S = neuron.inputs.sum(function (link) {
					return link.values.W * link.neuron.result;
				}) - neuron.T;

				neuron.result = neuron.activation.func(neuron.S);
			});
		});
	};
};
