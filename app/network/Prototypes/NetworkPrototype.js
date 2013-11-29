'use strict';

namespace('NeuralNetwork.Prototypes').NetworkPrototype = function () {
	var self = this,
		layerPrototype = new NeuralNetwork.Prototypes.LayerPrototype(),
		Layer = function () {
			this.neurons = [];
		};
	Layer.prototype = layerPrototype;

	self.addLayer = function () {
		this.layers.push(new Layer());
	};

	self.setConnect = function (neuron1, neuron2) {
		var values = {
			W: Math.random()
		};
		neuron1.outputs.push({
			neuron: neuron2,
			values: values
		});

		neuron2.inputs.push({
			neuron: neuron1,
			values: values
		});
	};

	self.addInputNeuron = function (neuron) {
		this.input.push(neuron);
	};

	self.addOutputNeuron = function (neuron) {
		this.out.push(neuron);
	};

	self.getResult = function(input){
		var network = this,
			networkInput = network.input;

		input.each(function(item,ID){
			networkInput[ID] = item;
		});

		network.calculate();

		return this.out.select('result');
	};

	self.calculate = function(){
		this.layers.each(function(layer){
			layer.neurons.each(function(neuron){
				neuron.S = neuron.inputs.sum(function(link){
					return link.values.W * link.neuron.result;
				}) - neuron.T;

				neuron.result = neuron.activation.func(neuron.S);
			});
		});
	};
};