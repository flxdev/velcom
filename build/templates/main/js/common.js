'use strict';

window.onload = function () {};

document.addEventListener('DOMContentLoaded', function () {
	$('.advantages__slider').slick({
		rows: 2,
		slidesPerRow: 3,
		arrows: false,
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 980,
			settings: {
				rows: 3,
				slidesPerRow: 1,
				dots: true
			}
		}]
	});
});