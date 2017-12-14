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

	var sliderPromoReclame = $('.promo-reclame').slick({
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

	var sliderAdvantages = $('.advantages__slider').slick({
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

	var sliderDataSliderText = $('.data-center-slider-text').slick({
		touchMove: false,
		dragable: false,
		arrows: true,
		infinite: false,
		prevArrow: '.data-center-slider__prev',
		nextArrow: '.data-center-slider__next',
		dots: true,
		appendDots: $('.data-center-slider__dots'),
		asNavFor: '.data-center-slider-bg',
		customPaging: function customPaging(slider, i) {
			return '<a href="#">' + slider.$slides.eq(i).data('slide-text') + '</a>';
			// return console.log(slider.$slides.eq(i).data('slide-text'));
		},
		responsive: [{
			breakpoint: 768,
			settings: {
				arrows: false
			}
		}]

	});

	var sliderDataDliderBg = $('.data-center-slider-bg').slick({
		touchMove: false,
		dragable: false,
		infinite: false,
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
	var windowWidth = $(window).width();
	if (windowWidth < 768) {
		$(".js-stick").trigger("sticky_kit:detach");
	}
	$(window).resize(function () {
		windowWidth = $(window).width();
		if (windowWidth < 768) {
			$(".js-stick").trigger("sticky_kit:detach");
		} else {
			stickinit();
		}
	});

	autosize($('textarea'));
	show_video();
	scrollAnimations();
	Menu();
	initServicesSlider();
	popUpsInit();
	initInnerPageSlider();
	initCustomSelectList();
	YoutubeVids();
	listhide();
	Accordeon();
	validateForms();
	inputValEdit();
	inputValIncDecr('.input-counter');
	ToggleDisabled();
	initTabs();
	formSelects($('.js-select'));
	var ajax = new AjaxLoading($(".ajax-trigger"));
	var ChangeFormBlocks = new AppendedBlocks();
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
			el.classList.add('animated-it');
		}
	}).on('exit', function (el) {
		el.done = true;
	});
	inView('.fade-up').on('enter', function (el) {
		if (!el.done) {
			el.classList.add('animated-it');
		}
	}).on('exit', function (el) {
		el.done = true;
	});
}

function stickinit() {
	setTimeout(function () {
		$('.js-stick').stick_in_parent({
			parent: ".js-stick-parent",
			offset_top: 80
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
		_this.f.openPopup(_popup);
		return false;
	});
}

function Menu() {
	var trigger = $('.js-menu'),
	    target = $('.mob-menu'),
	    OpenClass = 'active';

	trigger.on('click', function (e) {

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
	// var children = services_slider.find('.service-card').length;
	// // children > 3 ? services_slider.parent().addClass('serv_offset'): false;
	// if(children > 3) {
	//	services_slider.parent().addClass('serv_offset');
	//	services_slider.children().last().after('<div></div>');
	// }
	services_slider.slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: true,
		infinite: false,
		dotsClass: 'custom_dots custom_dots_black basic-services__dots',
		arrows: true,
		prevArrow: '<button class="slick-prev basic-services__prev slick-arrow slick-hidden" type="button" aria-disabled="true" tabindex="-1"><svg class="icon-arrow-light"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-light"></use></svg></button>',
		nextArrow: '<button class="slick-next basic-services__next slick-arrow slick-hidden" type="button" aria-disabled="true" tabindex="-1"><svg class="icon-arrow-light"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-light"></use></svg></button>',
		appendArrows: '.basic-services__nav',
		touchMove: true,
		dragable: true,
		adaptiveHeight: false,
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}, {
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
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

function SetCountryFlags(data) {
	if (!data.id) {
		return data.text;
	}
	var countryEl = $('<span><img class="tel-image" src="' + data.element.dataset.img + '"></img><span class="tel-text">' + data.text + '</span></span>');
	console.log(data.element.dataImg);
	return countryEl;
}
function formSelects(elem) {
	var trigger = elem;
	trigger.each(function () {
		var _ = $(this);
		if (_.hasClass('countryTels')) {
			_.select2({
				minimumResultsForSearch: -1,
				dropdownParent: _.parent(),
				templateResult: SetCountryFlags,
				templateSelection: SetCountryFlags
			});
		} else {
			_.select2({
				minimumResultsForSearch: -1,
				dropdownParent: _.parent()

			});
		}
		_.on('change', function () {
			_.validate();
		});
	});
}
function AppendedBlocks() {
	this.triggers = $('[data-display-trigger]');
	this.initState();
}
AppendedBlocks.prototype = {
	initState: function initState() {
		var self = this;
		this.triggers.each(function () {
			var _ = $(this);
			var name = _.data('display-trigger');
			var type = _.attr('type') || _[0].nodeName.toLowerCase();
			var value = _.data('display-trigger-value');
			var elementsBlock = _.closest('form').parent().find('.form-appended-els');
			var targetContainer = _.closest('form').find('[data-display-container]').filter('[data-display-container="' + name + '"]');
			self.InitTriggerChange(_, name, type, value, elementsBlock, targetContainer);
			_.trigger('change.appendBlock');
		});
	},
	InitTriggerChange: function InitTriggerChange(_, name, type, value, elementsBlock, targetContainer) {
		var _this2 = this;

		_.on('change.appendBlock', function () {
			switch (type) {
			case 'radio':
				var prop = _.prop('checked');
				if (prop === true) {
					_this2.appendElement(name, elementsBlock, targetContainer, value);
				}
				break;
			case 'select':
				var val = _.val();
				if (val === value) {
					_this2.appendElement(name, elementsBlock, targetContainer, value);
				} else {
					_this2.cleartTrgetContainer(targetContainer);
				}
				break;
			}
		});
	},
	appendElement: function appendElement(name, elementsBlock, targetContainer, value) {
		var appendetEl = elementsBlock.find('[data-display-target="' + name + '"]').filter('[data-display-trigger-value="' + value + '"]').clone();
		// appendetEl.find('select').select2('destroy');
		targetContainer.empty().append(appendetEl);
		// formSelects(appendetEl.find('select'))
		formSelects(targetContainer.find('select'));
		ToggleDisabled();
	},
	cleartTrgetContainer: function cleartTrgetContainer(targetContainer) {
		targetContainer.empty();
	}
};

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
					initContentsModalSlider();
					_this.appendMain.addClass('active').trigger('reinit');
					if (typeof slide != 'undefined') {
						_this.appendMain.find('.contents-slider').slick('slickGoTo', slide);
					}
				});
			}
		});
	};
	_this.initEvents();
}

function initContentsModalSlider() {
	$(".big-image-slider").each(function () {
		var _this = $(this);
		var parent = _this.parent();
		_this.slick({
			accessibility: false,
			arrows: false,
			draggable: false,
			autoplay: false,
			dots: false,
			fade: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			asNavFor: parent.find('.contents-slider')
		});
	});
	$(".contents-slider").each(function () {
		var _this = $(this);
		var parent = _this.parent();
		slidesCount(_this);
		_this.slick({
			accessibility: false,
			arrows: true,
			draggable: false,
			autoplay: false,
			dots: false,
			fade: false,
			touchMove: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '.contents-modal__prev',
			nextArrow: '.contents-modal__next',
			asNavFor: _this.closest('.modal-container').find('.big-image-slider')
		});
	});
}
function initCustomSelectList() {
	var _conf = {
			initClass: 'cs-active',
			f: {}
		},
	    _items = $('.js-select-custom');
	$.each(_items, function () {
		var _select = $(this),
		    _button = _select.find('button'),
		    placeholder = _button.data('placeholder'),
		    _list = _select.find('.select-list');
		_select.on('reinit', function () {
			var _active = _list.find('input:checked');
			if (_active.length) {
				_button.children('.btn-text').addClass('active').text('' + _active.siblings('span').text() + '').parent().addClass('is-checked');
			} else {
				_button.children('.btn-text').removeClass('active').text(_button.data('placeholder')).parent().removeClass('is-checked');
			}
			CheckForSelect($(this).parents('form'));
		});

		_button.off('click').on('click', function () {
			$(this).parent().toggleClass('active').siblings().removeClass('active');
			return false;
		});

		_list.off('change').on('change', 'input', function () {
			var _input = $(this);
			_input.prop('checked', true);
			_button.parent().removeClass('active');
			_select.trigger('reinit');
		});

		_select.trigger('reinit');
		_select.addClass(_conf.initClass);

		$(document).on('mouseup', function (e) {
			if (!_select.is(e.target) && _select.has(e.target).length === 0) {
				_select.removeClass('active');
			}
		});
	});
}

function CheckForSelect(form) {
	if (form.find('.select-check').length) {
		var wrap = form.find('.select-check');

		wrap.each(function () {
			var _ = $(this),
			    btn = _.find('.selects'),
			    option = _.find('.option.has-error');
			if (option.length) {
				_.addClass('error');
			} else {
				_.removeClass('error');
			}
		});
		wrap.hasClass('error') ? false : true;
	}
}

function YoutubeVids() {

	var youtube = document.querySelectorAll('.youtube');

	var _loop = function _loop(i) {

		var source = 'https://img.youtube.com/vi/' + youtube[i].dataset.embed + '/maxresdefault.jpg';

		var image = new Image();
		image.src = source;
		image.addEventListener('load', function () {
			youtube[i].appendChild(image);
		});

		youtube[i].addEventListener('click', function () {

			var iframe = document.createElement('iframe');

			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allowfullscreen', '');
			// iframe.setAttribute( "wmode", "Opaque" );
			iframe.setAttribute('src', 'https://www.youtube.com/embed/' + this.dataset.embed + '?wmode=opaque&rel=0&showinfo=0&autoplay=1');

			this.innerHTML = '';
			this.appendChild(iframe);
		});
	};

	for (var i = 0; i < youtube.length; i++) {
		_loop(i);
	}
}
function listhide() {
	var target = $('.js-slidelist');
	target.each(function () {
		var _t = $(this),
		    len = _t.data('items'),
		    items = _t.find('li'),
		    itemsl = items.length,
		    text = 'Свернуть',
		    trigger = _t.parent().find('.js-list-more');

		console.log(trigger + ' trigger');
		if (len >= itemsl) {
			trigger.css('display', 'none');
		} else {
			items.slice(len).slideUp();
			initclick();
		}
		function initclick() {
			trigger.off('click').on('click', function (e) {
				e.preventDefault();
				items.slice(len).slideToggle(500);
				$(this).toggleText();
			});
		}
	});
}
jQuery.fn.toggleText = function () {
	var altText = this.data("alt-text");

	if (altText) {
		this.data("alt-text", this.text());
		this.toggleClass('visible');
		this.find('.link-view-all').text(altText);
	}
};

function Accordeon() {
	var triggers = $('.js-accordeon-trigger');
	triggers.each(function () {
		var _ = $(this);
		_.off('click').on('click', function () {
			var head = _.closest('.accordeon-head');
			var parent = _.closest('.accordeon-wrapper');
			var target = parent.find('.accordeon-body');
			var text = parent.find('.js-toggle-text');
			if (!_.hasClass('anim')) {
				_.addClass('anim');
				if (target.hasClass('active')) {
					head.add(_).removeClass('active');
					parent.add(_).removeClass('active');
					target.removeClass('active').slideUp('normal');
				} else {
					head.add(_).addClass('active');
					parent.add(_).addClass('active');
					target.addClass('active').slideDown('normal', function () {
						var offset = target.offset().top;
						$('html:not(:animated), body:not(:animated), .out:not(:animated)').animate({ scrollTop: offset - 220 }, 500);
					});
				}
				text.toggleText();
				setTimeout(function () {
					_.removeClass('anim');
				}, 500);
			}
		});
	});
}

function initMap() {
	var map;
	var trel = $('#map');
	if (trel.length) {
		var element = document.getElementById('map');
		var latcord = parseFloat(element.getAttribute('data-lat'));
		var loncord = parseFloat(element.getAttribute('data-lon'));
		var imgpath = element.getAttribute('data-icon');
		var centercords = { lat: latcord, lng: loncord };
		map = new google.maps.Map(element, {
			zoom: 13,
			center: centercords,
			fullscreenControl: true,
			scrollwheel: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			gestureHandling: "greedy",
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			styles: [{
				"featureType": "all",
				"elementType": "labels.text.fill",
				"stylers": [{
					"saturation": 36
				}, {
					"color": "#333333"
				}, {
					"lightness": 40
				}]
			}, {
				"featureType": "all",
				"elementType": "labels.text.stroke",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#ffffff"
				}, {
					"lightness": 16
				}]
			}, {
				"featureType": "all",
				"elementType": "labels.icon",
				"stylers": [{
					"visibility": "off"
				}]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#fefefe"
				}, {
					"lightness": 20
				}]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#fefefe"
				}, {
					"lightness": 17
				}, {
					"weight": 1.2
				}]
			}, {
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f5f5f5"
				}, {
					"lightness": 20
				}]
			}, {
				"featureType": "landscape.man_made",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#bebebe"
				}]
			}, {
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#f5f5f5"
				}, {
					"lightness": 21
				}]
			}, {
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [{
					"color": "#dedede"
				}, {
					"lightness": 21
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#c6c6c6"
				}, {
					"lightness": 17
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#b3b3b3"
				}, {
					"lightness": 29
				}, {
					"weight": 0.2
				}]
			}, {
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [{
					"color": "#e9e9e9"
				}, {
					"lightness": 18
				}]
			}, {
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [{
					"color": "#e9e9e9"
				}, {
					"lightness": 16
				}]
			}, {
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [{
					"color": "#d2d2d2"
				}, {
					"lightness": 19
				}]
			}, {
				"featureType": "transit.station.rail",
				"elementType": "labels",
				"stylers": [{
					"visibility": "on"
				}]
			}, {
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [{
					"color": "#8fbfe6"
				}, {
					"lightness": 17
				}]
			}]
		});
		var img = {
			url: imgpath,
			// This marker is 20 pixels wide by 32 pixels high.
			size: new google.maps.Size(37, 48),
			// The origin for this image is (0, 0).
			origin: new google.maps.Point(0, 0),
			// The anchor for this image is the base of the flagpole at (0, 32).
			anchor: new google.maps.Point(0, 48)
			// scaledSize: new google.maps.Size(74, 96)

		};
		var marker = new google.maps.Marker({
			position: centercords,
			map: map,
			icon: img,
			zIndex: 99999
		});
	}
}
function validateForms() {

	var _form = $('.js-validate');
	if (_form.length) {
		var singleErrorMessages = function singleErrorMessages(item, errorMessage) {
			var currentElementParentObject = item.parent();
			currentElementParentObject.find('.form-error').remove();
			currentElementParentObject.append('<div class=\'help-block form-error\'>' + errorMessage + '</div>');
		};

		var singleRemoveErrorMessages = function singleRemoveErrorMessages(item) {
			var currentElementParentObject = item.parent();
			currentElementParentObject.find('.form-error').remove();
		};

		_form.each(function () {
			var FormThis = $(this);

			$.validate({
				form: FormThis,
				modules: 'logic',
				borderColorOnError: true,
				scrollToTopOnError: true,
				inlineErrorMessageCallback: function inlineErrorMessageCallback($input, errorMessage) {
					if (errorMessage) {
						singleErrorMessages($input, errorMessage);
					} else {
						singleRemoveErrorMessages($input);
					}
					return false; // prevent default behaviour
				},
				onValidate: function onValidate() {
					// CheckForSelect(form_this);
				},
				onSuccess: function onSuccess() {
					// formResponse(form_this);
					// resetForm(form_this);
					return false;
				}
			});
		});
	}
}

function inputValEdit() {
	var _input = $('.input-main');
	_input.each(function () {
		$(this).on('input change', function () {
			var _val = $(this).val().length;
			if (_val <= 0) {
				$(this).removeClass('editing');
			} else {
				$(this).addClass('editing');
			}
		});
	});
}

function inputValIncDecr(field) {

	var fieldCount = function fieldCount(el) {
		var parent = el.parent(),
		    min = el.data('min') || false,
		    max = el.data('max') || false,
		    step = el.data('step'),
		    dec = parent.find('.dec'),
		    inc = parent.find('.inc');
		if (!step) {
			step = 1;
		}
		el.on('input change', function () {
			var _val = $(this).val();
			if (_val > max) {
				$(this).val(max);
			}
			if (_val == 0) {
				$(this).val('');
				el.removeClass('editing');
			}
		});
		function init(el) {
			if (!el.attr('disabled')) {
				dec.on('click', decrement);
				inc.on('click', increment);
			}
			function decrement() {
				var value = parseInt(el[0].value);
				value = value - step;
				if (!min || value >= min) {
					el[0].value = value;
				} else {
					el[0].value = '';
					el.removeClass('editing');
				}
			}
			function increment() {
				el.addClass('editing');
				var value = parseInt(el[0].value);
				if (!value) {
					value = 0;
				}
				value = value + step;

				if (!max || value <= max) {
					el[0].value = value;
				}
			}
		}
		el.each(function () {
			init($(this));
		});
	};
	$(field).each(function () {
		fieldCount($(this));
	});
}

function ToggleDisabled() {

	var trigger = $('[data-trigger]');

	trigger.each(function () {
		var _t = $(this),
		    type = _t.attr('type') || _t[0].nodeName.toLowerCase(),
		    target = _t.data('trigger');
		switch (type) {

		case 'radio':
			radioDisable(_t, target);
			break;
		case 'checkbox':
			checkBoxDisable(_t, target);
			break;
		case 'select':
			SelectDisable(_t, target);
			break;
		}
	});
}
function SelectDisable(el, target) {

	var _target = $("[data-target='" + target + "']");
	var NeededValue = el.data('trigger-value');
	el.off('change.disable').on('change.disable', function () {
		var val = el.val();
		if (val === NeededValue) {
			if (_target.hasClass('disabled-field')) {
				_target.removeClass('disabled-field').prop('disabled', false);
			} else {
				_target.addClass('disabled-field').removeClass('editing').val('').prop('disabled', true).prop('checked', false);
				if (_target.hasClass('radio-wrapper')) {
					_target.find('input').prop('checked', false);
				}
			}
		} else {
			if (_target.hasClass('disabled-field')) {
				_target.removeClass('disabled-field').prop('disabled', false);
			} else {
				_target.addClass('disabled-field').removeClass('editing').val('').prop('disabled', true).prop('checked', false);
				if (_target.hasClass('radio-wrapper')) {
					_target.find('input').prop('checked', false);
				}
			}
		}
	});
}
function radioDisable(el, target) {
	var _target = $("[data-target='" + target + "']");
	el.off('click.disable').on('click.disable', function () {
		var _dis = $(this).data('dis');
		if (_dis) {
			_target.addClass('disabled-field').removeClass('editing').val('').prop('disabled', true);
		} else {
			_target.removeClass('disabled-field').prop('disabled', false);
		}
	});
}

function checkBoxDisable(el, target) {
	var _target = $("[data-target='" + target + "']");
	el.off('click.disable').on('click.disable', function () {
		if ($(this).prop('checked')) {
			if (_target.hasClass('disabled-field')) {
				_target.removeClass('disabled-field').prop('disabled', false);
			} else {
				_target.addClass('disabled-field').removeClass('editing').val('').prop('disabled', true).prop('checked', false);
				if (_target.hasClass('radio-wrapper')) {
					_target.find('input').prop('checked', false);
				}
			}
		} else {
			if (_target.hasClass('disabled-field')) {
				_target.removeClass('disabled-field').prop('disabled', false);
			} else {
				_target.addClass('disabled-field').removeClass('editing').val('').prop('disabled', true).prop('checked', false);
				if (_target.hasClass('radio-wrapper')) {
					_target.find('input').prop('checked', false);
				}
			}
		}
	});
}

function initTabs() {
	if ($('.js-tabs-wrap').length) {

		var parent = $('.js-tabs-wrap');
		parent.each(function () {
			var _ = $(this),
			    trigger = _.find('.js-tab-trigger'),
			    tabbody = _.find('.tabs-body'),
			    tabcont = tabbody.find('.tabs-cont'),
			    triggerCur = _.find(trigger).filter('.active'),
			    triggerIndex = triggerCur.index();

			if (!triggerCur.length) {
				tabcont.not(':first').hide();
				trigger.first().addClass('active');
			} else {
				tabcont.hide().eq(triggerIndex).show();
			}

			trigger.on('click', function (e) {
				var _ = $(this);
				e.preventDefault();
				if (!_.hasClass('active')) {
					_.addClass('active').siblings().removeClass('active');
					var triggerA = parent.find(trigger).filter('.active');
					tabcont.hide().eq($(triggerA).index()).fadeIn().find('.slick-slider').slick('setPosition');
				}
			});
		});
	}
}