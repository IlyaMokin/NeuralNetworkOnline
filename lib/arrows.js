var ARROWS = (function () {
	var indent = 5;

	function arrow_initialize(par) {
		var canvas = document.createElement('canvas');
		canvas.innerHTML = "";
		canvas.style.position = 'absolute';
		canvas.width = par.scrollWidth;
		canvas.height = par.scrollHeight;
		par.insertBefore(canvas, par.firstChild);

		return canvas;
	}

	function arrow(canvas, div1, div1side, div2, div2side, color, lineWidth, shadowColor, shadowBlur) {
		var context = canvas.getContext('2d'),
			dot1, dot2;
		context.strokeStyle = color;
		context.lineWidth = lineWidth;
		context.shadowColor = shadowColor;
		context.shadowBlur = shadowBlur;
		context.lineJoin = "round";

		dot1 = calccoord(canvas, div1, div1side);
		dot2 = calccoord(canvas, div2, div2side);

		if (dot1.y < dot2.y) {
			dot2.y -= indent;
			dot1.y += indent;
		} else if (dot1.y > dot2.y) {
			dot2.y += indent;
			dot1.y -= indent;
		}

		draw_arrow(context, dot1.x, dot1.y, dot2.x, dot2.y);
	}

	function calccoord(canvas, div, side) {
		var x = 0, y = 0;

		switch (side) {
			case 1:
				x = div.offsetLeft - canvas.offsetLeft - indent;
				y = div.offsetTop - canvas.offsetTop + (div.offsetHeight / 2);
				break;
			case 2:
				x = div.offsetLeft - canvas.offsetLeft + (div.offsetWidth / 2);
				y = div.offsetTop - canvas.offsetTop - indent;
				break;
			case 3:
				x = div.offsetLeft - canvas.offsetLeft + div.offsetWidth + indent;
				y = div.offsetTop - canvas.offsetTop + (div.offsetHeight / 2);
				break;
			case 4:
				x = div.offsetLeft - canvas.offsetLeft + (div.offsetWidth / 2);
				y = div.offsetTop - canvas.offsetTop + div.offsetHeight + indent;
				break;
		}
		return { 'x': x, 'y': y }
	}

	function draw_arrow(context, fromx, fromy, tox, toy) {
		var headlen = 9,
			dx = tox - fromx,
			dy = toy - fromy,
			angle = Math.atan2(dy, dx);

		context.beginPath();
		context.moveTo(fromx, fromy);
		context.lineTo(tox, toy);
		context.moveTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
		context.lineTo(tox, toy);
		context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
		context.stroke();
	}

	return {
		create: arrow_initialize,
		draw: arrow
	}
})();
