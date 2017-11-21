'use strict';

window.onload = function () {};

document.addEventListener('DOMContentLoaded', function () {

	var promo_reclame = $('.promo-reclame').slick({
		slidesToShow: 4,
		arrows: false,
		dots: false,
		touchMove: false,
		dragable: false,
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 1024,
			settings: {
				rows: 2,
				slidesPerRow: 2,
				slidesToShow: 1,
				dots: true
			}
		}, {
			breakpoint: 768,
			settings: {
				rows: 1,
				slidesPerRow: 1,
				slidesToShow: 1,
				dots: true
			}
		}]
	});

	var advantages = $('.advantages__slider').slick({
		rows: 2,
		slidesPerRow: 3,
		arrows: false,
		adaptiveHeight: true,
		touchMove: false,
		dragable: false,
		responsive: [{
			breakpoint: 980,
			settings: {
				rows: 3,
				slidesPerRow: 1,
				dots: true
			}
		}]
	});

	var data_slider = $('.data-center-slider').slick({
		touchMove: false,
		dragable: false,
		dots: true
	});

	function isMobile() {
		return (/Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent)
		);
	}

	function show_video() {
		var video = $('.wrapper-bg').find('video'),
		    src = video.data('src');

		if (!isMobile()) {
			video[0].src = src;
			video[0].load = function () {
				video.addClass('fadeIn animated');
			};
			video[0].load();
			// $(window).on('resize', debounce(initsize));
		}
	}
	show_video();
});

window.DOM = {
	body: $('body'),
	html: $('html'),
	__prevScrollTop: 0,
	hideScroll: function hideScroll() {
		// let top = $(window).scrollTop();
		this.__prevScrollTop = $(window).scrollTop();
		this.body[0].style.top = -this.__prevScrollTop + 'px';
		window.scroll(0, this.__prevScrollTop);
		this.body.addClass('modal_open');
	},
	showScroll: function showScroll() {
		this.body.removeClass('modal_open');
		this.__prevScrollTop && window.scroll(0, this.__prevScrollTop);
		this.__prevScrollTop = null;
	}
};

function Menu() {
	var trigger = $('.js-menu'),
	    target = $('.mob-menu'),
	    OpenClass = 'active',
	    OpenClass2 = 'menu-open';

	trigger.add(target).on('click', function (e) {

		if (!trigger.hasClass('anim')) {

			trigger.addClass('anim');

			if (trigger.hasClass(OpenClass)) {
				var div = $('.mob-menu-inner');
				if (!div.is(e.target) && div.has(e.target).length === 0) {
					setTimeout(function () {
						trigger.removeClass(OpenClass);
					}, 400);
					target.removeClass(OpenClass);
					conf.body.removeClass(OpenClass2);
					window.__prevScrollTop && window.scroll(0, window.__prevScrollTop);
					window.__prevScrollTop = null;
					$(".js-stick").trigger("sticky_kit:recalc");
				}
			} else {
				var top = $(window).scrollTop();
				window.__prevScrollTop = top;
				trigger.addClass(OpenClass);

				target.addClass(OpenClass);
				document.body.style.top = -top + "px";
				window.scroll(0, window.__prevScrollTop);
				conf.body.addClass(OpenClass2);
				$(".js-stick").trigger("sticky_kit:recalc");
			}
			setTimeout(function () {
				trigger.removeClass('anim');
			}, 500);
		}
	});
	// $('.mob-menu-inner').click(function(e) {
	//     e.stopPropagation();
	// });
}