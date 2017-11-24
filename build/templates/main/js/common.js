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

	var slider_data_slider_text = $('.data-center-slider-text').slick({
		touchMove: false,
		dragable: false,
		arrows: true,
		dots: true,
		dotsClass: 'custom_dots data-dots',
		asNavFor: '.data-center-slider-bg',
		responsive: [{
			breakpoint: 768,
			settings: {
				arrows: false
			}
		}]

	});

	var slider_data_slider_bg = $('.data-center-slider-bg').slick({
		touchMove: false,
		dragable: false,
		dots: false,
		arrows: false,
		asNavFor: '.data-center-slider-text'
		//fade: true
	});

	stickinit();
	show_video();
	scrollAnimations();
	Menu();
	servicescSliderInit();
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
	// 1st-block info slide down->top
	inView('.header-inner_animate').on('enter', function (el) {
		if (!el.done) {
			el.classList.add('active');
		}
	}).on('exit', function (el) {
		el.done = true;
	});

	// 1st-block contact slide top->down
	inView('.contacts-header').on('enter', function (el) {
		if (!el.done) {
			el.classList.add('active');
		}
	}).on('exit', function (el) {
		el.done = true;
	});
	// block fade-in and down->top 
	inView('.fade-down').on('enter', function (el) {
		if (!el.done) {
			el.classList.add('active');
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

function servicescSliderInit() {
	var services_slider = $('.basic-services-wrapper');
	var slide_count;

	services_slider.on('init', function (event, slick, currentSlide, nextSlide) {

		var count = slick.slideCount;

		console.log(count + ' count');
		if (count > 3) {
			services_slider.addClass('serv_offset');
			slide_count = 4;
			console.log(count + ' slide_count');
		} else if (count <= 3) {
			slide_count = count;
			console.log(slide_count + ' slide_count');
		}
	});

	services_slider.slick({
		slidesToShow: slide_count,
		arrows: false,
		dots: true,
		dotsClass: 'custom_dots custom_dots_black',
		touchMove: true,
		dragable: true,
		adaptiveHeight: false,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: slide_count - 1
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: slide_count - 2
			}
		}]
	});
}