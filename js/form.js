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
var form = document.querySelector('.notice__form');

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

minPrice.setAttribute('type', 'number');

var showError = function (container, errorMessage) {
  container.classList.add('error');
  var msgElem = document.createElement('span');
  msgElem.className = 'error-message';
  msgElem.innerHTML = errorMessage;
  container.appendChild(msgElem);
};

var resetError = function (container) {
  container.classList.remove('error');
  if (container.lastChild.className === 'error-message') {
    container.removeChild(container.lastChild);
  }
};

var validate = function (form) {

  resetError(form);
  if (!title.value || title.value.length < 30 || title.value.length > 100) {
    showError(form,
      'Заголовок - обязательное для заполнения поле, длина сообщения - не менее 30 и не более 100 символов, сейчас '
       + title.value.length);
    title.classList.add('error');
    return false;
  }

  resetError(form);
  if (!address.value) {
    showError(form, 'Адрес - обязательное для заполнения поле');
    address.classList.add('error');
    return false;
  }

  resetError(form);
  if (!minPrice.value || minPrice.value < 1000 || minPrice.value > 1000000) {
    showError(form,
      'Цена за ночь - обязательное для заполнения поле, минимальная цена - 1.000, максимальная - 1.000.000');
    minPrice.classList.add('error');
    return false;
  }

  return true;
};

form.addEventListener('submit', function (evt) {
  if (!validate(form)) {
    evt.preventDefault();
  }
});

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

