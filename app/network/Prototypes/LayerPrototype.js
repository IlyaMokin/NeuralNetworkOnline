'use strict';

namespace('NeuralNetwork.Prototypes').LayerPrototype = function () {
	var self = this,
		neuronPrototype = new NeuralNetwork.Prototypes.NeuronPrototype(),
		Neuron = function () {
			this.T = Math.random();
			this.inputs = [];
			this.outputs = [];
		};
	Neuron.prototype = neuronPrototype;

	self.addNeuron = function () {
		this.neurons.push(new Neuron());
	}
};