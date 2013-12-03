'use strict';

ONLINENETWORK.directive("netDroppable", function () {
	return function (scope, $element, attrs) {
		var clean = function () {
			$element.removeClass('js-hover');
		};

		$element.droppable({
			drop: function () {
				clean();
				scope.$apply(attrs['netDroppable']);
			},
			over: function () {
				$element.addClass('js-hover');
			},
			out: function () {
				clean();
			}
		});
	}
});