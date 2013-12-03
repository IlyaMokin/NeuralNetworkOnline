'use strict';

namespace('NeuralNetwork.Prototypes').LayerPrototype = function () {
	var self = this,
		neuronPrototype = new NeuralNetwork.Prototypes.NeuronPrototype(),
		IDSync = 0,
		Neuron = function (layerID) {
			this.T = Math.random();
			this.inputs = [];
			this.outputs = [];
			this.neuronID = IDSync++;
			this.layerID = layerID;
			this.result = 0;
		};
	Neuron.prototype = neuronPrototype;

	self.addNeuron = function () {
		this.neurons.push(new Neuron(this.layerID));
	}
};