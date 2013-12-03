'use strict';

(function () {
	var Network = function () {
			this.layers = [];
			this.input = [];
			this.out = [];
		};
	Network.prototype = new NeuralNetwork.Prototypes.NetworkPrototype();

	namespace('NeuralNetwork').networkFactory = {
		createNetwork: function () {
			return new Network();
		}
	};
})();
