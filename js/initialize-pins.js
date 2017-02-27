'use strict';
window.initializePins = (function () {
  var pinTemplate = document.querySelector('#pin-template');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var similarApartments = [];
  var filterField = document.querySelector('.tokyo__filters-container');

  var ENTER_KEY_CODE = 13;

  // функция рандоммизации
  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomElementExcept = function (array1, array2) {
    var randomElem = getRandomElement(array1);
    while (!randomElem || array2.indexOf(randomElem) !== -1) {
      randomElem = getRandomElement(array1);
    }
    return randomElem;
  };

  // функция отрисовки
  var parsePin = function (element) {
    var elementToClone = pinTemplate.content.querySelector('div.pin');
    var pin = elementToClone.cloneNode(true);
    var img = pin.querySelector('img');
    pinMap.appendChild(pin);
    pin.classList.add('templated-pin');
    var position = element.location;
    pin.style.top = position.y + 'px';
    pin.style.left = position.x + 'px';
    img.setAttribute('src', '' + element.author.avatar);
    pin.setAttribute('id', similarApartments.indexOf(element));
  };

  // функция удаления пинов
  var deletePins = function () {
    var pinsForDelete = pinMap.querySelectorAll('.templated-pin');
    for (var i = 0; i < pinsForDelete.length; i++) {
      deletePin(pinsForDelete[i]);
    }
  };

  var deletePin = function (node) {
    pinMap.removeChild(node);
  };

  // получаем с сервера массив объявлений и отрисовываем 3 рандомных.
  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (evt) {
    similarApartments = JSON.parse(evt);
    var parsedElements = [];
    for (var i = 0; i < 3; i++) {
      if (i === 0) {
        var elementToParce = getRandomElement(similarApartments);
      } else {
        elementToParce = getRandomElementExcept(similarApartments, parsedElements);
      }
      parsedElements.push(elementToParce);
    }
    for (i = 0; i < parsedElements.length; i++) {
      parsePin(parsedElements[i]);
    }
  });

  var initializeObject = {

    callBack: null,

    curTarget: null,

    dialog: null,

    // обработчик на клик по пину
    mapHandlerClick: function () {
      pinMap.addEventListener('click', function (evt) {
        var target = evt.target.parentNode;
        if (similarApartments[target.getAttribute('id')]) {
          window.showCard(target, similarApartments[target.getAttribute('id')]);
        }
      });
    },

    // обработчик на клавиатуру по пину
    mapHandlerKeydown: function () {
      pinMap.addEventListener('keydown', function (evt) {
        if (evt && evt.keyCode === ENTER_KEY_CODE) {
          var target = evt.target;
          if (similarApartments[target.getAttribute('id')]) {
            window.showCard(target, similarApartments[target.getAttribute('id')]);
          }
          initializeObject.curTarget = target;
          initializeObject.callBack = function () {
            initializeObject.curTarget.focus();
          };
        }
      });
    },

    // фильтрация массива по заданным параметрам
    filterChangeHandler: function () {
      var checkBoxes = filterField.querySelectorAll('input');
      var fields = filterField.querySelectorAll('select');


      filterField.addEventListener('change', function (evt) {
        var filtresValues = [];
        deletePins();
        fields.forEach(function (element, index, arr) {
          filtresValues.push(element.value);
        });
        checkBoxes.forEach(function (elem, i, arr) {
          if (elem.checked) {
            filtresValues.push(elem.value);
          } else {
            filtresValues.push('any');
          }
        });

        similarApartments.forEach(function (obj) {
          var parametrs = [];
          parametrs.push('' + obj.offer.type.valueOf());
          if (obj.offer.price < 10000) {
            var price = 'low';
          } else if (obj.offer.price > 50000) {
            price = 'hight';
          } else {
            price = 'middle';
          }
          parametrs.push(price);
          parametrs.push('' + obj.offer.rooms.valueOf());
          parametrs.push('' + obj.offer.guests.valueOf());
          var features = obj.offer.features.valueOf();
          features.forEach(function (elem, i) {
            parametrs.push(elem);
          });
          var arrayToParce = [];
          filtresValues.forEach(function (elem, i, arr) {
            if (elem !== 'any' && parametrs.indexOf(elem) === -1) {
              arrayToParce.push(false);
            } else {
              arrayToParce.push(elem);
            }
          });
          if (!arrayToParce.includes(false)) {
            parsePin(obj);
          }
        });
      });

    }
  };

  return initializeObject;
})();
