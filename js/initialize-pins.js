'use strict';

var initializePins = function () {

  var pinActive = document.querySelector('.pin.pin--active');
  var dialog = document.querySelector('.dialog');
  var close = dialog.querySelector('.dialog__close');
  var map = document.querySelector('div.tokyo__pin-map');

  var ENTER_KEY_CODE = 13;

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
};
