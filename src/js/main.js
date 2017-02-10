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

  // INSURANCE LOOKUP
  $('#autocompleate').autocomplete({
	    lookup: countries,
	    onSelect: function (suggestion) {
	    	$(this).val(suggestion.value);
	    }
	});

  $('.insurance__quicklinks a').on('click', function(){
    var selectedCountry = $(this).data('country');
    $('#autocompleate').val(selectedCountry);
  });

  // INSURANCE FORM VALIDATOR
  $('#insuranceForm').on('change', function(){
    console.log('form changed');
  });

  $('#insuranceForm .btn').on('click', function(){
    // validate and show prices
    $('.insurancePrice').fadeIn();
  });

  // modal order
  $('.modal__contact').on('click', function(){
    var selected = $(this).data('contact');
    console.log(selected);
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });



});



////// СПИСОК СТРАН
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
