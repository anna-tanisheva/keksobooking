'use strict';

window.initializePins = (function () {

  var map = document.querySelector('div.tokyo__pin-map');
  var close = document.querySelector('.dialog__close');

  var ENTER_KEY_CODE = 13;

  var obj = {
    callBack: null,

    curTarget: null,

    mapHandlerClick: function () {
      map.addEventListener('click', function (evt) {
        var target = evt.target.parentNode;
        window.showCard(target);
      });
    },

    mapHandlerKeydown: function () {
      map.addEventListener('keydown', function (evt) {
        if (evt && evt.keyCode === ENTER_KEY_CODE) {
          var target = evt.target;
          window.showCard(target);
          obj.curTarget = target;
          obj.callBack = function () {
            obj.curTarget.focus();
          };
        }
      });
    },

    closeClick: function () {
      close.addEventListener('click', function () {
        window.closeDialog();
        if (typeof obj.callBack === 'function') {
          obj.callBack();
        }
      });
    },

    closeKeydown: function () {
      close.addEventListener('keydown', function (evt) {
        if (evt && evt.keyCode === ENTER_KEY_CODE) {
          window.closeDialog();
          if (typeof obj.callBack === 'function') {
            obj.callBack();
          }
        }
      });
    }
  };

  return obj;
})();
