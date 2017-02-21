'use strict';

var similarApartments = [];
window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (evt) {
  similarApartments = JSON.parse(evt);

  var pinTemplate = document.querySelector('#pin-template');
  var pinMap = document.querySelector('.tokyo__pin-map');

  for (var i = 0; i < 3; i++) {
    var elementToClone = pinTemplate.content.querySelector('div.pin');
    var pin = elementToClone.cloneNode(true);
    var img = pin.querySelector('img');
    pinMap.appendChild(pin);
    var position = similarApartments[i].location;
    pin.style.top = position.y + 'px';
    pin.style.left = position.x + 'px';
    img.setAttribute('src', '' + similarApartments[i].author.avatar);
    pin.setAttribute('id', i);
  };
});

window.initializePins = (function () {

  var map = document.querySelector('div.tokyo__pin-map');

  var ENTER_KEY_CODE = 13;

  var initializeObject = {

    callBack: null,

    curTarget: null,

    mapHandlerClick: function () {
      map.addEventListener('click', function (evt) {
        var target = evt.target.parentNode;
        if (similarApartments[target.getAttribute('id')]) {
          window.showCard(target, similarApartments[target.getAttribute('id')]);
        }
      });
    },

    mapHandlerKeydown: function () {
      map.addEventListener('keydown', function (evt) {
        if (evt && evt.keyCode === ENTER_KEY_CODE) {
          var target = evt.target;
          if (similarApartments[target.getAttribute('id')]) {
            window.showCard(target, similarApartments[target.getAttribute('id')]);
          }
          initializeObject.curTarget = target;
          console.log(initializeObject.curTarget);
          initializeObject.callBack = function () {
            initializeObject.curTarget.focus();
          };
        }
      });
    },
  };

  return initializeObject;
})();
