'use strict';

namespace('NeuralNetwork.Prototypes').NeuronPrototype = function () {
	var self = this;

	self.setActivationFunction = function(name){
		if(NeuralNetwork.ActivationFunctions[name]){
			this.activation = NeuralNetwork.ActivationFunctions[name];
			return true;
		} else {
			return false;
		}
	}
};