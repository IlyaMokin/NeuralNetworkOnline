'use strict';
(function () {
	var linkStorage = [];

	ONLINENETWORK.directive("netLinkStorage", function () {
		return function (scope, $element, attrs) {
			var canvas = ARROWS.create($element[0]);

			scope.$watch(function () {
				canvas.remove();
				canvas = ARROWS.create($element[0]);

				scope.network.layers.each(function (layer) {
					layer.neurons.each(function (neuron) {
						neuron.inputs.each(function (link) {
							var neuron2 = linkStorage.first(function (node) {
									return node.layerID === layer.layerID && node.neuronID === neuron.neuronID;
								}),
								neuron1 = linkStorage.first(function (node) {
									return node.layerID === link.neuron.layerID && node.neuronID === link.neuron.neuronID;
								}),
								posN1, posN2;

							if(neuron1.layerID === neuron2.layerID){
								posN1 = neuron1.neuronID < neuron2.neuronID ? 4 : 2;
								posN2 = neuron1.neuronID < neuron2.neuronID ? 2 : 4;
							}else{
								posN1 = neuron1.layerID < neuron2.layerID ? 3 : 1;
								posN2 = neuron1.layerID < neuron2.layerID ? 1 : 3;
							}

							ARROWS.draw(
								canvas,
								neuron1.$element[0], posN1,
								neuron2.$element[0], posN2,
								'black', 2, 'gray', 4);
						})
					})
				});
				//linkStorage = [];
			});
		}
	});

	ONLINENETWORK.directive("netNode", function () {
		return function (scope, $element, attrs) {
			//info: {layerID:0, neuronID:2}
			var info = scope.$eval(attrs['netNode']);
			linkStorage.push({
				$element: $element,
				layerID: info.layerID,
				neuronID: info.neuronID
			});
		}
	});
})();