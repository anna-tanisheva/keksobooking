'use strict';
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
var price = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var roomNumberOptions = roomNumber.querySelectorAll('#room_number option');
var capacity = document.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('#capacity option');
var formToValidate = document.querySelector('.notice__form');
var map = document.querySelector('div.tokyo__pin-map');

var ENTER_KEY_CODE = 13;

// Открытие-закрытие диалога
function openDialog(item) {
  pinActive.classList.remove('pin--active');
  item.classList.add('pin--active');
  pinActive = item;
  dialog.classList.remove('invisible');
  item.setAttribute('aria-pressed', true);
}

function closeDialog() {
  dialog.classList.add('invisible');
  pinActive.classList.remove('pin--active');
  pinActive.setAttribute('aria-pressed', false);
}

map.addEventListener('click', function (evt) {
  var target = evt.target.parentNode;
  openDialog(target);
});

map.addEventListener('keydown', function (evt) {
  if (evt && evt.keyCode === ENTER_KEY_CODE) {
    var target = evt.target;
    openDialog(target);
  }
});

close.addEventListener('click', function () {
  closeDialog();
});

close.addEventListener('keydown', function (evt) {
  if (evt && evt.keyCode === ENTER_KEY_CODE) {
    closeDialog();
  }
});

// Валидация формы
price.setAttribute('type', 'number');
price.setAttribute('min', '1000');
price.setAttribute('max', '1000000');

var showError = function (container, node) {
  container.classList.add('error');
  var nodeName = node.getAttribute('id');
  var msgElem = container.querySelector('.' + nodeName);
  msgElem.classList.remove('invisible');
};

var resetError = function (container) {
  container.classList.remove('error');
  var nodeList = [title, address, price];
  for (var z = 0; z < nodeList.length; z++) {
    nodeList[z].classList.remove('error');
  }
  var message = container.querySelectorAll('span.error-message');
  for (var j = 0; j < message.length; j++) {
    if (!message[j].classList.contains('invisible')) {
      message[j].classList.add('invisible');
    }
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

  if (!price.value || price.value < 1000 || price.value > 1000000) {
    showError(form, price);
    price.classList.add('error');
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
    price.setAttribute('value', 1000);
  } else if (index === 1) {
    price.setAttribute('value', 0);
  } else {
    price.setAttribute('value', 10000);
  }
});

var checkPrice = function () {
  if (parseInt(price.value, 10) < 1000) {
    typeOfHouseOptions[1].selected = true;
  } else if (parseInt(price.value, 10) >= 10000) {
    typeOfHouseOptions[2].selected = true;
  } else {
    typeOfHouseOptions[0].selected = true;
  }
};

price.addEventListener('keyup', checkPrice);

price.addEventListener('click', checkPrice);

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

