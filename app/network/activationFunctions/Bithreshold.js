namespace('NeuralNetwork.ActivationFunctions').Bithreshold = {
	name:'Bithreshold',

	func: function (s) {
		return s < 0 ? 0 :
			s >= 1 ? 0 : 1;
	},
	der: function (s) {
		return 1;
	}
};
