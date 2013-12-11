namespace('NeuralNetwork.ActivationFunctions').Threshold = {
	name: 'Threshold',

	func: function (s) {
		return s > 0 ? 1 : 0;
	},
	der: function (s) {
		return 1;
	}

};
