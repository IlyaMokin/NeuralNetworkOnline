var HELPERS = HELPERS || {};
(function ($) {
	$.extend(HELPERS, {
		debounce: function (func, timeout, context, parametres) {
			if (func.timeoutId) {
				clearTimeout(func.timeoutId);
			}

			function delayed() {
				func.timeoutId = null;
				if (func) {
					if (context) {
						func.apply(context, parametres || []);
					} else {
						func(parametres || []);
					}
				}
			}

			func.timeoutId = setTimeout(delayed, timeout || 200);
		}
	});
})(jQuery);
