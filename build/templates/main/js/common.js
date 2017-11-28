'use strict';

window.onload = function () {};

document.addEventListener('DOMContentLoaded', function () {

	window.onscroll = function () {
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if (scrolled >= 10) {
			$('.nav-menu').addClass('nav-menu_scrolled');
		} else {
			$('.nav-menu').removeClass('nav-menu_scrolled');
		}
	};

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
				slidesToShow: 2
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
				dotsClass: 'custom_dots',
				touchMove: true,
				dragable: true
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
		prevArrow: '.data-center-slider__prev',
		nextArrow: '.data-center-slider__next',
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

	activeSidebarLink();

	$('.show-sidebar-menu').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('side-bar-nav__mob-btn_visible').next().slideToggle();
	});

	stickinit();
	show_video();
	scrollAnimations();
	Menu();
	initServicesSlider();
	popUpsInit();
	initInnerPageSlider();

	var ajax = new AjaxLoading($(".ajax-trigger"));
});

function activeSidebarLink() {
	var link_value = $('.side-bar-nav .link-navigation__link_active').text();
	$('.show-sidebar-menu .link-value').text(link_value);
}

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
	inView('.fade-up').on('enter', function (el) {
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

function popUpsInit() {
	var _this = $(this);
	_this.b = {
		open: $('.js-popup-button')
	};
	_this.c = {
		popup: $('.js-popup-container')
	};
	_this.f = {};
	_this.conf = {
		active_class: 'active',
		close_selector: '.closePopup',
		initial_class: 'popup-initialed',
		header_class: 'is-hidden'
	};
	_this.f.initModalActions = function (_popup) {
		/**
   * Close buttons.
   */
		$(_popup).on('click', '.modal-container', function (e) {
			if (!$(_this.conf.close_selector).is(e.target)) {
				e.stopPropagation();
			}
		});

		_popup.find(_this.conf.close_selector).add(_popup).off('click.popup').on('click.popup', function () {
			_this.f.closePopup(_popup);
		});
	};

	_this.f.closePopup = function (_popup) {
		// var _cont = _popup.find('.modal-container-content:not(.response)'),
		// 	_response = _popup.find('.response');
		_popup.removeClass(_this.conf.active_class);
		window.DOM.showScroll();
	};

	_this.f.openPopup = function (_popup) {
		_popup.addClass(_this.conf.active_class);
		window.DOM.hideScroll();
	};
	/**
  * Initial.
  */
	$.each(_this.c.popup.not('.' + _this.conf.initial_class), function () {
		var _popup = $(this);
		_this.f.initModalActions(_popup);
		_popup.off('reinit').on('reinit', function () {
			_this.f.initModalActions(_popup);
		});
		_popup.addClass(_this.conf.initial_class);
	});

	_this.b.open.off('click.popup').on('click.popup', function (e) {
		e.preventDefault();
		var _b = $(this),
		    _popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]');

		console.log(_popup);

		_this.f.openPopup(_popup);
		return false;
	});
}

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

function initServicesSlider() {
	var services_slider = $('.basic-services-wrapper');
	var children = services_slider.find('.service-card').length;
	children > 3 ? services_slider.addClass('serv_offset') : false;
	services_slider.slick({
		slidesToShow: children > 3 ? 4 : 3,
		arrows: false,
		dots: true,
		dotsClass: 'custom_dots custom_dots_black',
		touchMove: true,
		dragable: true,
		adaptiveHeight: false,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: children > 3 ? 3 : 2
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 2
			}
		}]
	});
}

function initInnerPageSlider() {

	$(".inner-slider-init").each(function () {
		var _this = $(this),
		    parent = _this.parent();
		slidesCount(_this);
		_this.slick({
			accessibility: false,
			arrows: true,
			dots: false,
			fade: true,
			touchMove: false,
			dragable: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			prevArrow: parent.find('.inner-slider__prev'),
			nextArrow: parent.find('.inner-slider__next')
		});
	});
}

function slidesCount(elem) {
	var container = elem.parent().find('.slider-counter'),
	    curSlideCont = container.find('.slider-curr'),
	    totatSlideCont = container.find('.slider-total'),
	    pages;

	elem.on('init reInit breakpoint beforeChange', function (event, slick, currentSlide, nextSlide) {
		var slidesShown = parseInt(slick.slickGetOption('slidesToShow')),
		    slidesScroll = parseInt(slick.slickGetOption('slidesToScroll')),
		    slidesNext = parseInt(nextSlide),
		    totalSlides = parseInt(slick.slideCount),
		    totalPages = Math.ceil(totalSlides / slidesShown),
		    curPage = event.type == 'init' || event.type == 'reInit' || event.type == 'breakpoint' ? 0 : parseInt(slidesNext / slidesScroll);
		totatSlideCont.text(slidesShown == 1 ? totalSlides : totalPages);
		curSlideCont.text(curPage + 1);
	});
}

function AjaxLoading(el) {
	var _this = this;

	_this.ajaxLink = el;
	_this.appendMain = $("body").find('.modal-layout[data-modal="' + el.data('modal') + '"]');

	_this.initEvents = function () {

		$(".ajax-trigger").off("click.trigger").on("click.trigger", function (e) {
			var link = $(this).data("href");
			var slideto = parseInt($(this).data("slideto"));
			_this.appendMain.removeClass('active');
			_this.action(link, slideto);
			e.preventDefault();
			return false;
		});
	};

	_this.action = function (link, slide) {
		$.ajax({
			url: link,
			dataType: "html",
			success: function success(content) {
				var mainContent = $(content).html();
				_this.appendMain.html(mainContent).promise().done(function () {
					_this.initEvents();
					initSertificatesSlider();
					_this.appendMain.addClass('active').trigger('reinit');
					if (typeof slide != 'undefined') {
						_this.appendMain.find('.sertificate-slider').slick('slickGoTo', slide);
					}
				});
			}
		});
	};
	_this.initEvents();
}

function initSertificatesSlider() {
	$(".sertificate-slider").slick({
		draggable: false,
		autoplay: false,
		arrows: true,
		prevArrow: '.sertificate-slider__prev',
		nextArrow: '.sertificate-slider__next',
		dots: false,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});
}