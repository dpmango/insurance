$(document).ready(function(){

 	// Prevent # errors
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  $('.header__hamb .hamburger').on('click', function(){
    $(this).toggleClass('is-active');
    $(this).parent().toggleClass('active');
    $('.header__dropMenu').toggleClass('active');
  });

  // owl
  $('#owlTestimonials').owlCarousel({
    loop: false,
    nav: true,
    dots: false,
    margin: 0,
    items: 1
  });

  // Masked input
  $("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
  $("input[name='phone']").mask("9 (999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");


  // enable tooltips
  $('[data-toggle="tooltip"]').tooltip()

  // range slider

  $('#greenRange').rangeslider({
    polyfill: false,
    rangeClass: 'rangeslider',
    disabledClass: 'rangeslider--disabled',
    horizontalClass: 'rangeslider--horizontal',
    verticalClass: 'rangeslider--vertical',
    fillClass: 'rangeslider__fill',
    handleClass: 'rangeslider__handle',
    // Callback function
    onInit: function() {},
    // Callback function
    onSlide: function(position, value) {},
    // Callback function
    onSlideEnd: function(position, value) {}
  });

  // select ui
  $('.ui-select > span').on('click', function(){
    // hide all first
    $(this).parent().find('.ui-selectDrop').addClass('active');
  });
  $('.ui-selectDrop span').on('click', function(){
    $(this).closest('.ui-select').find('> span').text($(this).text());
    $(this).parent().removeClass('active');
  });

  // Custom modal
  $('.modal__trigger').on('click', function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    $('.content').addClass('blur');
    $(target).fadeIn();
  });
  $('.modal__close').on('click', function(){
    $('.content').removeClass('blur');
    $(this).closest('.modal').fadeOut();
  });

  $('.insurancePrice__row .btn').on('click', function(e){
    e.preventDefault();
    $('.content').addClass('blur');
    $('#modalInsurance').fadeIn();
  });

  $(document).mouseup(function (e) {
    var container = new Array();
    container.push($('.modal__content'));

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
            $('.modal').fadeOut();
            $('.content').removeClass('blur');
        }
    });
  });

  // INSURANCE FORM VALIDATOR
  $('#insuranceForm').on('change', function(){
    console.log('form changed');
  });

  $('#insuranceForm .btn').on('click', function(){
    // validate and show prices
    $('.insurancePrice').fadeIn();
  });





});
