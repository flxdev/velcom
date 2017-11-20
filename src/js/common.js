window.onload = function () {

}

document.addEventListener('DOMContentLoaded', function () {

	var promo_reclame = $('.promo-reclame').slick({
		slidesToShow: 4,
		arrows: false,
		dots: false,
		touchMove: false,
		dragable: false,
		adaptiveHeight : true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					rows : 2,
					slidesPerRow : 2,
					slidesToShow: 1,
					dots: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					rows : 1,
					slidesPerRow : 1,
					slidesToShow: 1,
					dots: true,
				}
			}
		]
	});

	var advantages = $('.advantages__slider').slick({
		rows : 2,
		slidesPerRow : 3,
		arrows: false,
		adaptiveHeight : true,
		touchMove: false,
		dragable: false,
		responsive: [
			{
				breakpoint: 980,
				settings: {
					rows : 3,
					slidesPerRow : 1,
					dots : true
				}
			}
		]
	});

	var data_slider = $('.data-center-slider').slick({
		touchMove: false,
		dragable: false,
		dots: true,
	});

});