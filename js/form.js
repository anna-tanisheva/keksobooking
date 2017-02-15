'use strict';

var title = document.querySelector('#title');
var address = document.querySelector('#address');

var formToValidate = document.querySelector('.notice__form');
var price = document.querySelector('#price');

// Открытие-закрытие диалога
window.initializePins();

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
var checkInTime = document.querySelector('#time');
var checkOutTime = document.querySelector('#timeout');

var valuesCheckIn = ['12', '13', '14'];

var valuesCheckOut = ['12', '13', '14'];

window.synchronizeFields(checkInTime, checkOutTime, valuesCheckIn, valuesCheckOut, 'value');
window.synchronizeFields(checkOutTime, checkInTime, valuesCheckOut, valuesCheckIn, 'value');

// Зависимость минимальной цены от типа жилья
var typeOfHouse = document.querySelector('#type');
var typeOfHouseOptions = document.querySelectorAll('#type option')

var valuesOfHouse = ['apartaments', 'bad-house', 'palace'];
var minPrice = [1000, 0, 10000];

window.synchronizeFields(typeOfHouse, price, valuesOfHouse, minPrice, 'min');
window.synchronizeFields(typeOfHouse, price, valuesOfHouse, minPrice, 'value');

// Зависимость количества гостей и комнат
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var valuesOfRoomNumber = ['1', '2', '3'];
var valuesOfCapacity = ['0', '3', '3']

window.synchronizeFields(roomNumber, capacity, valuesOfRoomNumber, valuesOfCapacity, 'value');
window.synchronizeFields(capacity, roomNumber, valuesOfCapacity, valuesOfRoomNumber, 'value');
