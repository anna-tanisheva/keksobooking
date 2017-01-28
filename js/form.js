'use strict';
var pins = document.querySelectorAll('.pin');
var pinActive = document.querySelector('.pin.pin--active');
var dialog = document.querySelector('.dialog');
var close = dialog.querySelector('.dialog__close');
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

pins.forEach(function (item, i, pins) {
  item.addEventListener('click', function () {
    pinActive.classList.remove('pin--active');
    item.classList.add('pin--active');
    dialog.classList.add('invisible');
    pinActive = item;
    dialog.classList.remove('invisible');
  })
});

close.addEventListener('click', function () {
  dialog.classList.add('invisible');
  pinActive.classList.remove('pin--active');
});

// Зависимость полей время выезда и время заезда
checkInTime.addEventListener('change', function () {
  checkInTimeOptions.forEach(function(item, i, checkInTimeOptions) {
    if (checkInTimeOptions[i].selected) {
      var value = checkInTimeOptions[i].getAttribute('value');
    };
    if (value) {
      checkOutTimeOptions[i].selected = true;
    }
  })
});

checkOutTime.addEventListener('change', function () {
  checkOutTimeOptions.forEach(function (item, i, checkOutTimeOptions) {
    if (checkOutTimeOptions[i].selected) {
      var value = checkOutTimeOptions[i].getAttribute('value');
    };
    if (value) {
      checkInTimeOptions[i].selected = true;
    }
  })
});

// Зависимость минимальной цены от типа жилья и наоборот
typeOfHouse.addEventListener('change', function () {
  typeOfHouseOptions.forEach(function (item, i, typeOfHouseOptions) {
    if (typeOfHouseOptions[i].selected) {
      var value = typeOfHouseOptions[i].getAttribute('value');
    };
    if (value === "apartaments") {
      minPrice.setAttribute('value', 1000);
    } else if (value === "bad-house") {
      minPrice.setAttribute('value', 0);
    } else if (value === "palace") {
      minPrice.setAttribute('value', 10000);
    }
  })
 });

minPrice.addEventListener('keyup', function () {
  if (minPrice.value === "0") {
    typeOfHouseOptions[1].selected = true;
  } else if (minPrice.value === "1000") {
    typeOfHouseOptions[0].selected = true;
  } else if (minPrice.value === "10000") {
    typeOfHouseOptions[2].selected = true;
  }
 });

// Зависимость количества гостей и комнат
roomNumber.addEventListener('change', function () {
  roomNumberOptions.forEach(function(item, i, roomNumberOptions) {
    if (roomNumberOptions[i].selected) {
      var value = roomNumberOptions[i].getAttribute('value');
    };
    if (value === '2' || value === '3') {
      capacityOptions[0].selected = true;
    } else if (value === '1'){
      capacityOptions[1].selected = true;
    }
  })
});

capacity.addEventListener('change', function () {
  capacityOptions.forEach(function(item, i, capacityOptions) {
    if (capacityOptions[i].selected) {
      var value = capacityOptions[i].getAttribute('value');
    };
    if (value === '3') {
      roomNumberOptions[1].selected = true;
    } else if (value === '0'){
      roomNumberOptions[0].selected = true;
    }
  })
});
