'use strict';

(function () {
	var networkPrototype = new NeuralNetwork.Prototypes.NetworkPrototype(),
		Network = function () {
			this.layers = [];
			this.input = [];
			this.out = [];
		};
	Network.prototype = networkPrototype;

	namespace('NeuralNetwork').networkFactory = {
		createNetwork: function () {
			return new Network();
		}
	};
})();
