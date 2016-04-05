 (function ($) {
 	'use strict';

 	var action = $('.hamburger-action'),
 	hamburger = $('.hamburger'),
 	content = $('#content'),
 	overlay = $('<div>').attr({class:'hamburger-overlay',}).insertAfter(content),
 	nav = $('nav'),
 	hea = $('header'),

 	onClick = function() {

 		var contentWidth = content.width(),
		current = nav.css('margin-left');

		var currentN = parseFloat(current)
		currentN = Math.round(currentN)
		current = currentN.toString();

		current = current + 'px';
 		contentWidth = contentWidth + 'px';

 		console.log(current);
 		console.log(contentWidth);

 		if (current == contentWidth) {	
	 		var val = '50%',
	 		layer = 'block',
	 		opacity = 0.5,
	 		ham = -10;
 		} else {
 			var val = '100%',
 			layer = 'none',
 			opacity = 0,
 			ham = 0;
 		}

  		content.css('width', contentWidth);

 		nav.animate({'margin-left': [val]}, {duration: 500});

 		hamburger.animate({'left': [ham]}, {duration: 500});

 		overlay.animate({'opacity': [opacity]}, {
 			duration: 500,
 			complete: function() {
 				overlay.css('display', layer);
 			}
 		});
 	};

 	action.click(onClick);
 	overlay.click(onClick);
 	hamburger.click(onClick);
 }(jQuery));
