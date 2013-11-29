'use strict';

namespace('NeuralNetwork.Prototypes').NeuronPrototype = function () {
	var self = this;

	self.activation = NeuralNetwork.ActivationFunctions.Sigmoid;

	self.setActivationFunction = function(name){
		if(NeuralNetwork.ActivationFunctions[name]){
			this.activation = NeuralNetwork.ActivationFunctions[name];
			return true;
		} else {
			return false;
		}
	}
};