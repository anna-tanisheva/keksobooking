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
var formToValidate = document.querySelector('.notice__form');

function pinClick(item) {
  item.addEventListener('click', function () {
    pinActive.classList.remove('pin--active');
    item.classList.add('pin--active');
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
minPrice.setAttribute('min', '1000');
minPrice.setAttribute('max', '1000000');

var showError = function (container, node) {
  container.classList.add('error');
  var msgElemAll = container.querySelectorAll('.error-message');
  var msgElem = null;
  if (node === title) {
    msgElem = msgElemAll[0];
  } else if (node === address) {
    msgElem = msgElemAll[1];
  } else {
    msgElem = msgElemAll[2];
  }
  msgElem.classList.remove('invisible');
};

var resetError = function (container) {
  container.classList.remove('error');
  var elems = container.querySelectorAll('span.error-message');
  for (var z = 0; z < elems.length; z++) {
    if (!elems[z].classList.contains('invisible')) {
      elems[z].classList.add('invisible');
    }
  }
  var inputArray = container.querySelectorAll('input');
  for (var j = 0; j < inputArray.length; j++) {
    inputArray[j].classList.remove('error');
  }
};

var validate = function (evt) {
  evt.preventDefault();

  var form = evt.target;

  resetError(form);

  if (!title.value || title.value.length < 30 || title.value.length > 100) {
    showError(form, title);
    title.classList.add('error');
    return false;
  }

  if (!address.value) {
    showError(form, address);
    address.classList.add('error');
    return false;
  }

  if (!minPrice.value || minPrice.value < 1000 || minPrice.value > 1000000) {
    showError(form, minPrice);
    minPrice.classList.add('error');
    return false;
  }

  form.submit();
  return true;
};

formToValidate.addEventListener('submit', validate);

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

var checkPrice = function () {
  if (parseInt(minPrice.value, 10) < 1000) {
    typeOfHouseOptions[1].selected = true;
  } else if (parseInt(minPrice.value, 10) >= 10000) {
    typeOfHouseOptions[2].selected = true;
  } else {
    typeOfHouseOptions[0].selected = true;
  }
};

minPrice.addEventListener('keyup', checkPrice);

minPrice.addEventListener('click', checkPrice);

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

