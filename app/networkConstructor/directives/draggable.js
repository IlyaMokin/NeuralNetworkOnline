'use strict';

ONLINENETWORK.directive("netDraggable", function () {
	return function (scope, $element, attrs) {
		$element.draggable({
			helper: 'clone'
		});
	}
});