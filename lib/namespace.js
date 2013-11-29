'use strict';

var namespace = function(name){
	var obj = window;
	name.split('.').each(function(name){
		if(!obj[name]){
			obj[name] = {};
		}
		obj = obj[name];
	});
	return obj;
};