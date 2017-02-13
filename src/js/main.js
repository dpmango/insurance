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
  $('[data-toggle="tooltip"]').tooltip();

  $('.hero__messenger').on('click', function(){
    $(this).toggleClass('active');
  });



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
    onSlideEnd: function(position, value) {
      console.log(value);
      $('.green__range__tips span').removeClass('active');
      $('.green__range__tips span:nth-child('+ value +')').addClass('active');
    }
  });

  $('.green__range__tips span').on('click', function(){
    var setVal = $(this).data('value');
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    $('#greenRange').val(setVal).change();
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
    if ($(this).parent().is('.inactive')){

    } else{
      $('.content').addClass('blur');
      $('#modalInsurance').fadeIn();
    }
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

  /////////////
  // GREN CARD
  /////////////

  // get parms list
  var greenPriceList = [];

  $.ajax({
    type: 'GET',
    url: 'json/green.json',
    data: { get_param: 'value' },
    dataType: 'json',
    success: function (data) {
      $.each(data, function(index, element) {
          greenPriceList.push(element);
      });
    }
  });

  // listen form change
  $('#greenForm').on('change', function(e){
    var selected = $('#greenRange').val();
    setPrice = greenPriceList[selected - 1];
    $('.greenTotal .btn--price span').text(setPrice);
  });

  /////////////
  // INSURANCE
  /////////////

  // PARSE PARAMS
  var params = {};

  $.ajax({
    type: 'GET',
    url: 'json/insurance.json',
    data: { get_param: 'value' },
    dataType: 'json',
    success: function (data) {
      params = data;
      console.log(params);
    }
  });

  // INSURANCE LOOKUP && QUICK LINKS
  $('#autocompleate').autocomplete({
	    lookup: countries,
	    onSelect: function (suggestion) {
	    	$(this).val(suggestion.value);
        $('#insuranceForm').trigger('change');
	    }
	});
  $('#autocompleate').keydown(function (e) {
    $('#insuranceForm').trigger('change');
  });

  $('.insurance__quicklinks a').on('click', function(){
    var selectedCountry = $(this).data('country');
    $('#autocompleate').val(selectedCountry);
    $('#insuranceForm').trigger('change');
  });

  // Datepicker
  Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
  };

  var date = new Date();
  var currDate = date.getDate() + '.0' + (date.getMonth() + 1) + '.' +  date.getFullYear();

  $('input[name="insuranceDateFrom"]').attr("placeholder", currDate);
  var dateFrom = $('input[name="insuranceDateFrom"]').datepicker({
    // Можно выбрать тольо даты, идущие за сегодняшним днем, включая сегодня
    position: 'bottom left',
    minDate: new Date(),
    onSelect: function(formattedDate, date, inst){
      dateTo.update('minDate', new Date() );
      $('#insuranceForm').trigger('change');
    }
  }).data('datepicker');

  var dateTo = $('input[name="insuranceDateTo"]').datepicker({
    // Можно выбрать тольо даты, идущие за сегодняшним днем, включая сегодня
    position: 'bottom left',
    minDate: new Date(),
    onSelect: function(formattedDate, date, inst){
      $('#insuranceForm').trigger('change');
    }
  }).data('datepicker');


  // INSURANCE FORM LOGIC
  $('#insuranceForm').on('change', function(){
    console.clear();
    // PARSE ALL VALUES
    var country = $('input[name="insuranceCountry"]').val();
    var type = $('input[name="insuranceType"]:checked').val();
    ///// this is dummy val - why we might need that ?
    // var currency = $('input[name="insuranceCurrency"]:checked').val();
    var dateFrom = $('input[name="insuranceDateFrom"]').val();
    var dateTo = $('input[name="insuranceDateTo"]').val();
    var range = $('#greenRange').val();
    var ageReg = $('#insuranceAge_1').val();
    var ageChild = $('#insuranceAge_2').val();
    var ageOld = $('#insuranceAge_3').val();
    var amount = $('input[name="insuranceAmount"]:checked').val();

    // set defaults and program type
    var ingosAvailable = true;
    var absoluteAvailable = true;
    var alphaAvailable = true;
    var uralsibAvailable = true;
    var resoAvailable = true;

    var ingosRegularPrice = 100 * params.ingos.programA;
    var absoluteRegularPrice = 100 * params.absolute.programA;
    var alphaRegularPrice = params.alpha.basePrice * params.alpha.programA;
    var uralsibRegularPrice = 100 * params.uralsib.programA;
    var resoRegularPrice = 100 * params.reso.programA;

    var ingosActivePrice = 100 * params.ingos.programB;
    var absoluteActivePrice = 100 * params.absolute.programB;
    var alphaActivePrice = 100 * params.alpha.programB;
    var uralsibActivePrice = 100 * params.uralsib.programB;
    var resoActivePrice = 100 * params.reso.programB;

    // DEVELOPMENT - DEBUG
    // console.log(country);
    // console.log(type);
    // console.log(currency);
    console.log(dateFrom);
    console.log(dateTo);
    // console.log(range);
    // console.log(ageReg);
    // console.log(ageChild);
    // console.log(ageOld);
    //console.log(amount);

    // SHOW RELEVANT FORM TYPE SINGLE -- MULTI
    if (type === 'insuranceType_2'){
      $('#insuranceMultiple').fadeIn();
    } else {
      $('#insuranceMultiple').fadeOut();
    }

    // VALIDATOR

    if (true == true) {
      $('#insuranceForm .btn').removeClass('invalid');
      // basically all later code should be here. But it's not for development purposes
    } else {
      $('#insuranceForm .btn').addClass('invalid');
    }

    // CALCULATE PRICE
    //////////////////

    // LOCATION

    if (jQuery.inArray( country, params.ingos.countriesA ) > -1 ) {
      ingosRegularPrice = ingosRegularPrice * params.ingos.countriesAmultiply;
      ingosActivePrice = ingosActivePrice * params.ingos.countriesAmultiply;
    } else if (jQuery.inArray( country, params.ingos.countriesB ) > -1 ){
      ingosRegularPrice = ingosRegularPrice * params.ingos.countriesBmultiply;
      ingosActivePrice = ingosActivePrice * params.ingos.countriesBmultiply;
    } else if (jQuery.inArray( country, params.ingos.countriesBlackList ) > -1 ){
      ingosAvailable = false;
    } else {
      console.log('Not a country ?');
    }

    if (jQuery.inArray( country, params.absolute.countriesA ) > -1 ) {
      absoluteRegularPrice = absoluteRegularPrice * params.absolute.countriesAmultiply;
      absoluteActivePrice = absoluteActivePrice * params.absolute.countriesAmultiply;
    } else if (jQuery.inArray( country, params.ingos.countriesB ) > -1 ){
      absoluteRegularPrice = absoluteRegularPrice * params.absolute.countriesBmultiply;
      absoluteActivePrice = absoluteActivePrice * params.absolute.countriesBmultiply;
    } else {
      console.log('Not a country ?');
    }

    if (jQuery.inArray( country, params.alpha.countriesA ) > -1 ) {
      alphaRegularPrice = alphaRegularPrice * params.alpha.countriesAmultiply;
      alphaActivePrice = alphaActivePrice * params.alpha.countriesAmultiply;
    } else if (jQuery.inArray( country, params.alpha.countriesB ) > -1 ){
      alphaRegularPrice = alphaRegularPrice * params.alpha.countriesBmultiply;
      alphaActivePrice = alphaActivePrice * params.alpha.countriesBmultiply;
    } else {
      console.log('Not a country ?')
    }

    if (jQuery.inArray( country, params.uralsib.countriesA ) > -1 ) {
      uralsibRegularPrice = uralsibRegularPrice * params.uralsib.countriesAmultiply;
      uralsibActivePrice = uralsibActivePrice * params.uralsib.countriesAmultiply;
    } else if (jQuery.inArray( country, params.ingos.countriesB ) > -1 ){
      uralsibRegularPrice = uralsibRegularPrice * params.uralsib.countriesBmultiply;
      uralsibActivePrice = uralsibActivePrice * params.uralsib.countriesBmultiply;
    } else {
      console.log('Not a country ?');
    }

    if (jQuery.inArray( country, params.reso.countriesA ) > -1 ) {
      resoRegularPrice = uralsibRegularPrice * params.reso.countriesAmultiply;
      resoActivePrice = resoActivePrice * params.reso.countriesAmultiply;
    } else if (jQuery.inArray( country, params.reso.countriesB ) > -1 ){
      resoRegularPrice = uralsibRegularPrice * params.reso.countriesBmultiply;
      resoActivePrice = resoActivePrice * params.reso.countriesBmultiply;
    } else {
      console.log('Not a country ?');
    }

    // COVERAGE
    if (amount === "30 000"){
      ingosRegularPrice = ingosRegularPrice * params.ingos.coverA;
      absoluteRegularPrice = absoluteRegularPrice * params.absolute.coverA;
      alphaRegularPrice = alphaRegularPrice * params.alpha.coverA;
      uralsibRegularPrice = uralsibRegularPrice * params.uralsib.coverA;
      resoRegularPrice = resoRegularPrice * params.reso.coverA;

      ingosActivePrice = ingosActivePrice * params.ingos.coverA;
      absoluteActivePrice = absoluteActivePrice * params.absolute.coverA;
      alphaActivePrice = alphaActivePrice * params.alpha.coverA;
      uralsibActivePrice = uralsibActivePrice * params.uralsib.coverA;
      resoActivePrice = resoActivePrice * params.reso.coverA;
    } else if (amount === "50 000") {
      ingosRegularPrice = ingosRegularPrice * params.ingos.coverB;
      absoluteRegularPrice = absoluteRegularPrice * params.absolute.coverB;
      alphaRegularPrice = alphaRegularPrice * params.alpha.coverB;
      uralsibRegularPrice = uralsibRegularPrice * params.uralsib.coverB;
      resoRegularPrice = resoRegularPrice * params.reso.coverB;

      ingosActivePrice = ingosActivePrice * params.ingos.coverB;
      absoluteActivePrice = absoluteActivePrice * params.absolute.coverB;
      alphaActivePrice = alphaActivePrice * params.alpha.coverB;
      uralsibActivePrice = uralsibActivePrice * params.uralsib.coverB;
      resoActivePrice = resoActivePrice * params.reso.coverB;
    } else if (amount === "100 000") {
      ingosRegularPrice = ingosRegularPrice * params.ingos.coverC;
      absoluteRegularPrice = absoluteRegularPrice * params.absolute.coverC;
      alphaRegularPrice = alphaRegularPrice * params.alpha.coverC;
      uralsibRegularPrice = uralsibRegularPrice * params.uralsib.coverC;
      resoRegularPrice = resoRegularPrice * params.reso.coverC;

      ingosActivePrice = ingosActivePrice * params.ingos.coverC;
      absoluteActivePrice = absoluteActivePrice * params.absolute.coverC;
      alphaActivePrice = alphaActivePrice * params.alpha.coverC;
      uralsibActivePrice = uralsibActivePrice * params.uralsib.coverC;
      resoActivePrice = resoActivePrice * params.reso.coverC;
    }


    // SET PRICE
    ////////////

    // regular prices
    if (ingosAvailable){
      $('#ingosRegularPrice').removeClass("inactive");
      $('#ingosActivePrice').removeClass("inactive");
      $('#ingosRegularPrice .btn span').text(ingosRegularPrice);
      $('#ingosActivePrice .btn span').text(ingosActivePrice);
    } else{
      $('#ingosRegularPrice').addClass("inactive");
      $('#ingosActivePrice').addClass("inactive");
      $('#ingosRegularPrice .btn span').text("0");
      $('#ingosActivePrice .btn span').text("0");
    }
    if (absoluteAvailable){
      $('#absoluteRegularPrice').removeClass("inactive");
      $('#absoluteActivePrice').removeClass("inactive");
      $('#absoluteRegularPrice .btn span').text(absoluteRegularPrice);
      $('#absoluteActivePrice .btn span').text(absoluteActivePrice);
    } else{
      $('#absoluteRegularPrice').addClass("inactive");
      $('#absoluteActivePrice').addClass("inactive");
      $('#absoluteRegularPrice .btn span').text("0")
      $('#absoluteActivePrice .btn span').text("0")
    }
    if (alphaAvailable){
      $('#alphaRegularPrice').removeClass("inactive");
      $('#alphaActivePrice').removeClass("inactive");
      $('#alphaRegularPrice .btn span').text(alphaRegularPrice);
      $('#alphaActivePrice .btn span').text(alphaActivePrice);
    } else{
      $('#alphaRegularPrice').addClass("inactive");
      $('#alphaActivePrice').addClass("inactive");
      $('#alphaRegularPrice .btn span').text("0")
      $('#alphaActivePrice .btn span').text("0")
    }
    if (uralsibAvailable){
      $('#uralsibRegularPrice').removeClass("inactive");
      $('#uralsibActivePrice').removeClass("inactive");
      $('#uralsibRegularPrice .btn span').text(uralsibRegularPrice);
      $('#uralsibActivePrice .btn span').text(uralsibActivePrice);
    } else{
      $('#uralsibRegularPrice').addClass("inactive");
      $('#uralsibActivePrice').addClass("inactive");
      $('#uralsibRegularPrice .btn span').text("0")
      $('#uralsibActivePrice .btn span').text("0")
    }
    if (resoAvailable){
      $('#resoRegularPrice').removeClass("inactive");
      $('#resoActivePrice').removeClass("inactive");
      $('#resoRegularPrice .btn span').text(resoRegularPrice);
      $('#resoActivePrice .btn span').text(resoActivePrice);
    } else{
      $('#resoRegularPrice').addClass("inactive");
      $('#resoActivePrice').addClass("inactive");
      $('#resoRegularPrice .btn span').text("0")
      $('#resoActivePrice .btn span').text("0")
    }

  });

  $('#insuranceForm .btn').on('click', function(e){
    if ( $(this).is('.invalid') ){
      e.preventDefault();
      return false;
    } else {
      e.preventDefault();
      // validate and show prices
      $('.insurancePrice').fadeIn();
    }
  });

  // modal order
  $('.modal__contact').on('click', function(){
    var selected = $(this).data('contact');
    console.log(selected);
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  // ... DO some ajax to php and amoCrm ...


});



////// СПИСОК СТРАН для LOOKUP
var countries = [
	{ value: 'Шенген' },
	{ value: 'Весь мир' },
	{ value: 'Абхазия' },
	{ value: 'Австралия' },
	{ value: 'Австрия' },
	{ value: 'Азербайджан' },
	{ value: 'Азорские острова' },
	{ value: 'Аландские острова' },
	{ value: 'Албания' },
	{ value: 'Алжир' },
	{ value: 'Американское Самоа' },
	{ value: 'Ангилья' },
	{ value: 'Ангола' },
	{ value: 'Андорра' },
	{ value: 'Антарктика' },
	{ value: 'Антигуа и Барбуда' },
	{ value: 'Антильские Острова' },
	{ value: 'Аомынь' },
	{ value: 'Аргентина' },
	{ value: 'Армения' },
	{ value: 'Аруба' },
	{ value: 'Афганистан' },
	{ value: 'Багамские Острова' },
	{ value: 'Бангладеш' },
	{ value: 'Барбадос' },
	{ value: 'Бахрейн' },
	{ value: 'Беларусь' },
	{ value: 'Белиз' },
	{ value: 'Бельгия' },
	{ value: 'Бенин' },
	{ value: 'Бермудские Острова' },
	{ value: 'Болгария' },
	{ value: 'Боливия' },
	{ value: 'Босния и Герцеговина' },
	{ value: 'Ботсвана' },
	{ value: 'Бразилия' },
	{ value: 'Британская территория в Индийском океане' },
	{ value: 'Бруней' },
	{ value: 'Буве' },
	{ value: 'Буркина-Фасо' },
	{ value: 'Бурунди' },
	{ value: 'Бутан' },
	{ value: 'Вануату' },
	{ value: 'Ватикан' },
	{ value: 'Великобритания' },
	{ value: 'Венгрия' },
	{ value: 'Венесуэла' },
	{ value: 'Виргинские Острова (Британские)' },
	{ value: 'Виргинские Острова (США)' },
	{ value: 'Внешние малые острова (США)' },
	{ value: 'Восточный Тимор' },
	{ value: 'Вьетнам' },
	{ value: 'Габон' },
	{ value: 'Гаити' },
	{ value: 'Гайана' },
	{ value: 'Гамбия' },
	{ value: 'Гана' },
	{ value: 'Гваделупа' },
	{ value: 'Гватемала' },
	{ value: 'Гвиана' },
	{ value: 'Гвинея' },
	{ value: 'Гвинея-Бисау' },
	{ value: 'Германия' },
	{ value: 'Гернси' },
	{ value: 'Гибралтар' },
	{ value: 'Гондурас' },
	{ value: 'Гонконг' },
	{ value: 'Гренада' },
	{ value: 'Гренландия' },
	{ value: 'Греция' },
	{ value: 'Грузия' },
	{ value: 'Гуам' },
	{ value: 'Дания' },
	{ value: 'Джерси' },
	{ value: 'Джибути' },
	{ value: 'Доминика' },
	{ value: 'Доминиканская Республика' },
	{ value: 'Египет' },
	{ value: 'Замбия' },
	{ value: 'Западная Сахара' },
	{ value: 'Зимбабве' },
	{ value: 'Израиль' },
	{ value: 'Индия' },
	{ value: 'Индонезия' },
	{ value: 'Иордания' },
	{ value: 'Ирак' },
	{ value: 'Иран' },
	{ value: 'Ирландия' },
	{ value: 'Исландия' },
	{ value: 'Испания' },
	{ value: 'Италия' },
	{ value: 'Йемен' },
	{ value: 'Кабо-Верде' },
	{ value: 'Казахстан' },
	{ value: 'Каймановы Острова' },
	{ value: 'Камбоджа' },
	{ value: 'Камерун' },
	{ value: 'Канада' },
	{ value: 'Катар' },
	{ value: 'Кения' },
	{ value: 'Кипр' },
	{ value: 'Кирибати' },
	{ value: 'Китай' },
	{ value: 'Кокосовые Острова' },
	{ value: 'Колумбия' },
	{ value: 'Коморские Острова' },
	{ value: 'Конго, Демократическая Республика' },
	{ value: 'Корея (Северная)' },
	{ value: 'Корея (Южная)' },
	{ value: 'Косово' },
	{ value: 'Коста-Рика' },
	{ value: 'Кот-дИвуар' },
	{ value: 'Куба' },
	{ value: 'Кувейт' },
	{ value: 'Кука острова' },
	{ value: 'Кыргызстан' },
	{ value: 'Лаос' },
	{ value: 'Латвия' },
	{ value: 'Лесото' },
	{ value: 'Либерия' },
	{ value: 'Ливан' },
	{ value: 'Ливия' },
	{ value: 'Литва' },
	{ value: 'Лихтенштейн' },
	{ value: 'Люксембург' },
	{ value: 'Маврикий' },
	{ value: 'Мавритания' },
	{ value: 'Мадагаскар' },
	{ value: 'Майотта' },
	{ value: 'Македония' },
	{ value: 'Малави' },
	{ value: 'Малайзия' },
	{ value: 'Мали' },
	{ value: 'Мальдивы' },
	{ value: 'Мальта' },
	{ value: 'Мартиника' },
	{ value: 'Маршалловы Острова' },
	{ value: 'Мексика' },
	{ value: 'Микронезия' },
	{ value: 'Мозамбик' },
	{ value: 'Молдова' },
	{ value: 'Монако' },
	{ value: 'Монголия' },
	{ value: 'Монтсеррат' },
	{ value: 'Морокко' },
	{ value: 'Мьянма' },
	{ value: 'Нагорно-Карабахская Республика' },
	{ value: 'Намибия' },
	{ value: 'Науру' },
	{ value: 'Непал' },
	{ value: 'Нигер' },
	{ value: 'Нигерия' },
	{ value: 'Нидерланды' },
	{ value: 'Никарагуа' },
	{ value: 'Ниуэ' },
	{ value: 'Новая Зеландия' },
	{ value: 'Новая Каледония' },
	{ value: 'Норвегия' },
	{ value: 'Норфолк' },
	{ value: 'Объединенные Арабские Эмираты' },
	{ value: 'Оман' },
	{ value: 'Остров Мэн' },
	{ value: 'Остров Рождества' },
	{ value: 'Остров Святой Елены' },
	{ value: 'Острова Уоллис и Футуна' },
	{ value: 'Острова Херд и Макдональд' },
	{ value: 'Пакистан' },
	{ value: 'Палау' },
	{ value: 'Палестина' },
	{ value: 'Панама' },
	{ value: 'Папуа — Новая Гвинея' },
	{ value: 'Парагвай' },
	{ value: 'Перу' },
	{ value: 'Питкэрн' },
	{ value: 'Польша' },
	{ value: 'Португалия' },
	{ value: 'Приднестровье' },
	{ value: 'Пуэрто-Рико' },
	{ value: 'Республика Конго' },
	{ value: 'Реюньон' },
	{ value: 'Россия' },
	{ value: 'Руанда' },
	{ value: 'Румыния' },
	{ value: 'Сальвадор' },
	{ value: 'Самоа' },
	{ value: 'Сан-Марино' },
	{ value: 'Сан-Томе и Принсипи' },
	{ value: 'Саудовская Аравия' },
	{ value: 'Свазиленд' },
	{ value: 'Свальбард' },
	{ value: 'Северные Марианские острова' },
	{ value: 'Сейшельские острова' },
	{ value: 'Сен-Пьер и Микелон' },
	{ value: 'Сенегал' },
	{ value: 'Сент-Винсент и Гренадины' },
	{ value: 'Сент-Киттс и Невис' },
	{ value: 'Сент-Люсия' },
	{ value: 'Сербия' },
	{ value: 'Сингапур' },
	{ value: 'Сирия' },
	{ value: 'Словакия' },
	{ value: 'Словения' },
	{ value: 'Соединенные Штаты Америки' },
	{ value: 'Соломоновы Острова' },
	{ value: 'Сомали' },
	{ value: 'Сомалиленд' },
	{ value: 'Судан' },
	{ value: 'Суринам' },
	{ value: 'Сьерра-Леоне' },
	{ value: 'Таджикистан' },
	{ value: 'Таиланд' },
	{ value: 'Тайвань' },
	{ value: 'Тамил-Илам' },
	{ value: 'Танзания' },
	{ value: 'Тёркс и Кайкос' },
	{ value: 'Того' },
	{ value: 'Токелау' },
	{ value: 'Тонга' },
	{ value: 'Тринидад и Тобаго' },
	{ value: 'Тувалу' },
	{ value: 'Тунис' },
	{ value: 'Турецкая Республика Северного Кипра' },
	{ value: 'Туркменистан' },
	{ value: 'Турция' },
	{ value: 'Уганда' },
	{ value: 'Узбекистан' },
	{ value: 'Украина' },
	{ value: 'Уругвай' },
	{ value: 'Фарерские Острова' },
	{ value: 'Фиджи' },
	{ value: 'Филиппины' },
	{ value: 'Финляндия' },
	{ value: 'Фолклендские (Мальвинские) острова' },
	{ value: 'Франция' },
	{ value: 'Французская Полинезия' },
	{ value: 'Французские Южные и Антарктические Территории' },
	{ value: 'Хорватия' },
	{ value: 'Центральноафриканская Республика' },
	{ value: 'Чад' },
	{ value: 'Черногория' },
	{ value: 'Чехия' },
	{ value: 'Чили' },
	{ value: 'Швейцария' },
	{ value: 'Швеция' },
	{ value: 'Шри-Ланка' },
	{ value: 'Эквадор' },
	{ value: 'Экваториальная Гвинея' },
	{ value: 'Эритрея' },
	{ value: 'Эстония' },
	{ value: 'Эфиопия' },
	{ value: 'Южная Георгия и Южные Сандвичевы острова' },
	{ value: 'Южная Осетия' },
	{ value: 'Южно-Африканская Республика' },
	{ value: 'Ямайка' },
	{ value: 'Япония' }
];
