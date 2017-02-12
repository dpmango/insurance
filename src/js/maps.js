$(document).ready(function(){
  ymaps.ready(init);
  var myMap,
     myPlacemark;

  function init(){
     myMap = new ymaps.Map("map", {
         center: [55.76, 37.64],
         zoom: 12
     });

     myPlacemark1 = new ymaps.Placemark([55.724713, 37.645034], {
         balloonContent: 'М Павелецкая Ул. Летниковская 11/10 стр. 1, 5-й этаж оф. 29 (здание визового центра Испании)'
     });
     myPlacemark2 = new ymaps.Placemark([55.771201, 37.651196], {
         balloonContent: 'м. Красные ворота, м. Комсомольская Ул. Каланчевская д. 13 (Здание визового центра Финляндии) '
     });
     myPlacemark3 = new ymaps.Placemark([55.785554, 37.635646], {
         balloonContent: 'м. Проспект мира Пр-т Мира, д.62, стр.1 (Здание рядом с визовым центром Франции) '
     });

     myMap.geoObjects.add(myPlacemark1);
     myMap.geoObjects.add(myPlacemark2);
     myMap.geoObjects.add(myPlacemark3);
  }

});
