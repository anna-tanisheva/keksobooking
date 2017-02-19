'use strict';

var pinActive = document.querySelector('.pin.pin--active');
var dialog = document.querySelector('.dialog');


window.showCard = function (item) {
  pinActive.classList.remove('pin--active');
  item.classList.add('pin--active');
  pinActive = item;
  dialog.classList.remove('invisible');
  item.setAttribute('aria-pressed', true);
};

window.closeDialog = function () {
  dialog.classList.add('invisible');
  pinActive.classList.remove('pin--active');
  pinActive.setAttribute('aria-pressed', false);
};
