'use strict';

window.onload = function () {};

document.addEventListener('DOMContentLoaded', function () {

	var slider_promo_reclame = $('.promo-reclame').slick({
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
				slidesToShow: 1
			}
		}, {
			breakpoint: 768,
			settings: {
				rows: 1,
				slidesPerRow: 1,
				slidesToShow: 2,
				dots: true,
				autoplay: true,
				autoplaySpeed: 3500,
				dotsClass: 'custom_dots'
			}
		}]
	});

	var slider_services = $('.basic-services-wrapper').slick({
		slidesToShow: 4,
		arrows: false,
		dots: true,
		dotsClass: 'custom_dots custom_dots_black',
		touchMove: false,
		dragable: false,
		adaptiveHeight: false,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}]
	});

	var slider_advantages = $('.advantages__slider').slick({
		rows: 2,
		slidesPerRow: 3,
		arrows: false,
		adaptiveHeight: false,
		touchMove: false,
		dragable: false,
		responsive: [{
			breakpoint: 980,
			settings: {
				rows: 3,
				slidesPerRow: 1,
				dots: true,
				dotsClass: 'custom_dots custom_dots_black',
				appendDots: $('.advantages__slider-dots')
			}
		}]
	});

	var slider_data_slider = $('.data-center-slider').slick({
		touchMove: false,
		dragable: false,
		dots: true
	});

	stickinit();
	show_video();
	scrollAnimations();
	Menu();
});

function isMobile() {
	return (/Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent)
	);
}

function show_video() {
	var video = $('.wrapper-bg').find('video'),
	    src = video.data('src');
	if (video.length > 0) {
		if (!isMobile()) {
			video[0].src = src;
			video[0].load = function () {
				video.addClass('fadeIn animated');
			};
			video[0].load();
			// $(window).on('resize', debounce(initsize));
		}
	}
}
function scrollAnimations() {
	inView.offset({
		top: 0,
		bottom: 0
	});
	inView.threshold(0.1);

	inView('.header-inner__animate').on('enter', function (el) {
		if (!el.done) {
			el.classList.add('active');
		}
	}).on('exit', function (el) {
		el.done = true;
	});
	inView('.contacts-header').on('enter', function (el) {
		if (!el.done) {
			el.classList.add('active');
		}
	}).on('exit', function (el) {
		el.done = true;
	});
	inView('.projects-wrap').on('enter', function (el) {
		if (!el.done) {
			el.classList.add('active');
			tabs.init();
		}
	}).on('exit', function (el) {
		el.done = true;
	});
}

function stickinit() {
	setTimeout(function () {
		$('.js-stick').stick_in_parent({
			parent: ".js-stick-parent",
			offset_top: 90
		});
	}, 1);
}

window.DOM = {
	body: $('body'),
	html: $('html'),
	__prevScrollTop: 0,
	hideScroll: function hideScroll() {
		// let top = $(window).scrollTop();
		this.__prevScrollTop = $(window).scrollTop();
		this.body[0].style.top = -this.__prevScrollTop + 'px';
		window.scroll(0, this.__prevScrollTop);
		this.body.addClass('menu-mobile');
	},
	showScroll: function showScroll() {
		this.body.removeClass('menu-mobile');
		this.__prevScrollTop && window.scroll(0, this.__prevScrollTop);
		this.__prevScrollTop = null;
	}

};

function Menu() {
	var trigger = $('.js-menu'),
	    target = $('.mob-menu'),
	    OpenClass = 'active';

	trigger.on('click', function (e) {
		console.log('kek');
		if (!trigger.hasClass('anim')) {

			trigger.addClass('anim');

			if (trigger.hasClass(OpenClass)) {
				var div = $('.mob-menu-inner');
				if (!div.is(e.target) && div.has(e.target).length === 0) {
					setTimeout(function () {
						trigger.removeClass(OpenClass);
					}, 400);
					target.removeClass(OpenClass);
					window.DOM.showScroll();
					$(".js-stick").trigger("sticky_kit:recalc");
				}
			} else {
				var top = $(window).scrollTop();
				window.DOM.__prevScrollTop = top;
				trigger.addClass(OpenClass);
				target.addClass(OpenClass);
				window.DOM.hideScroll();
				$(".js-stick").trigger("sticky_kit:recalc");
			}
			setTimeout(function () {
				trigger.removeClass('anim');
			}, 500);
		}
	});
}