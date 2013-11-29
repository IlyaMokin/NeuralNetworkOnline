'use strict';

ONLINENETWORK.directive("netDroppable", function () {
	return function (scope, $element, attrs) {
		var clean = function(){
			$element.removeClass('js-hover');
		};

		$element.droppable({
			drop: function( event, ui ) {
				ui.draggable.clone().appendTo($element);
				clean();
			},
			over: function(event, ui){
				$element.addClass('js-hover');
			},
			out: function(event, ui){
				clean();
			}
		});
	}
});