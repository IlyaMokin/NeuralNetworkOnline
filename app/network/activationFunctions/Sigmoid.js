namespace('NeuralNetwork.ActivationFunctions').Sigmoid = (function () {
	return {
		func: function (s) {
			return 1 / (1 + Math.exp(-s));
		},
		der: function (s) {
			return Math.exp(-s) / Math.pow(1 + Math.exp(-s), 2);
		}
	}
})();
