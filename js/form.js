'use strict';
var pins = document.querySelectorAll('.pin');
var pinActive = document.querySelector('.pin.pin--active');
var dialog = document.querySelector('.dialog');
var close = dialog.querySelector('.dialog__close');
var title = document.querySelector('#title');
var address = document.querySelector('#address');
var checkInTime = document.querySelector('#time');
var checkInTimeOptions = checkInTime.querySelectorAll('#time option');
var checkOutTime = document.querySelector('#timeout');
var checkOutTimeOptions = checkOutTime.querySelectorAll('#timeout option');
var typeOfHouse = document.querySelector('#type');
var typeOfHouseOptions = typeOfHouse.querySelectorAll('#type option');
var minPrice = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var roomNumberOptions = roomNumber.querySelectorAll('#room_number option');
var capacity = document.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('#capacity option');

function pinClick(item) {
  item.addEventListener('click', function () {
    pinActive.classList.remove('pin--active');
    item.classList.add('pin--active');
    dialog.classList.add('invisible');
    pinActive = item;
    dialog.classList.remove('invisible');
  });
}

for (var i = 0; i < pins.length; i++) {
  pinClick(pins.item(i));
}

close.addEventListener('click', function () {
  dialog.classList.add('invisible');
  pinActive.classList.remove('pin--active');
});

// Валидация формы
title.setAttribute('required', true);
title.setAttribute('minlength', 30);
title.setAttribute('maxlength', 100);

minPrice.setAttribute('required', true);
minPrice.setAttribute('type', 'number');
minPrice.setAttribute('min', 1000);
minPrice.setAttribute('max', 1000000);

address.setAttribute('required', true);

// Зависимость полей время выезда и время заезда
checkInTime.addEventListener('change', function () {
  var index = checkInTime.selectedIndex;
  checkOutTimeOptions[index].selected = true;
});

checkOutTime.addEventListener('change', function () {
  var index = checkOutTime.selectedIndex;
  checkInTimeOptions[index].selected = true;
});

// Зависимость минимальной цены от типа жилья и наоборот
typeOfHouse.addEventListener('change', function () {
  var index = typeOfHouse.selectedIndex;
  if (index === 0) {
    minPrice.setAttribute('value', 1000);
  } else if (index === 1) {
    minPrice.setAttribute('value', 0);
  } else {
    minPrice.setAttribute('value', 10000);
  }
});

minPrice.addEventListener('keyup', function () {
  if (parseInt(minPrice.value, 10) < 1000) {
    typeOfHouseOptions[1].selected = true;
  } else if (parseInt(minPrice.value, 10) >= 10000) {
    typeOfHouseOptions[2].selected = true;
  } else {
    typeOfHouseOptions[0].selected = true;
  }
});

minPrice.addEventListener('click', function () {
  if (parseInt(minPrice.value, 10) < 1000) {
    typeOfHouseOptions[1].selected = true;
  } else if (parseInt(minPrice.value, 10) >= 10000) {
    typeOfHouseOptions[2].selected = true;
  } else {
    typeOfHouseOptions[0].selected = true;
  }
});

// Зависимость количества гостей и комнат
roomNumber.addEventListener('change', function () {
  var index = roomNumber.selectedIndex;
  if (index === 0) {
    capacityOptions[1].selected = true;
  } else {
    capacityOptions[0].selected = true;
  }
});

capacity.addEventListener('change', function () {
  var index = capacity.selectedIndex;
  if (index === 1) {
    roomNumberOptions[0].selected = true;
  } else {
    roomNumberOptions[1].selected = true;
  }
});

