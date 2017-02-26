'use strict';
window.dialog = null;

window.showCard = function (item, obj) {
  var ENTER_KEY_CODE = 13;

  var pinActive = document.querySelector('.pin--active');

  var closeDialog = function (node) {
    node.parentNode.removeChild(node);
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      pinActive.setAttribute('aria-pressed', false);
    }
  };

  if (window.dialog !== null) {
    closeDialog(window.dialog);
    window.dialog = null;
  }

  item.classList.add('pin--active');
  pinActive = item;


  var dialogTemplate = document.querySelector('#dialog-template');
  var dialogToClone = dialogTemplate.content.querySelector('div.dialog');
  var placeToAdd = document.querySelector('.tokyo');
  var newDialog = dialogToClone.cloneNode(true);

  var createDialog = function () {
    placeToAdd.appendChild(newDialog);

    newDialog.querySelector('.dialog__title img').src = obj.author.avatar;
    newDialog.querySelector('.lodge__title').innerText = obj.offer.description;
    newDialog.querySelector('.lodge__address').innerText = obj.offer.address;
    newDialog.querySelector('.lodge__price').innerText = obj.offer.price;
    newDialog.querySelector('.lodge__type').innerText = obj.offer.type;
    newDialog.querySelector('.lodge__rooms-and-guests span:nth-child(1)').innerText = obj.offer.rooms;
    newDialog.querySelector('.lodge__rooms-and-guests span:nth-child(2)').innerText = obj.offer.guests;
    newDialog.querySelector('.lodge__checkin-time span:nth-child(1)').innerText = obj.offer.checkin;
    newDialog.querySelector('.lodge__checkin-time span:nth-child(2)').innerText = obj.offer.checkout;

    var features = newDialog.querySelectorAll('.feature__image');
    var featuresContainer = newDialog.querySelector('.lodge__features');

    features.forEach(function (feature, index) {
      var advantage = feature.classList[1].split('--')[1];
      if (obj.offer.features.indexOf(advantage) === -1) {
        featuresContainer.removeChild(feature);
      }
    });

    var photosContainer = newDialog.querySelector('.lodge__photos');
    var photos = photosContainer.querySelectorAll('img');

    if (obj.offer.photos.length > photos.length) {
      var difference = obj.offer.photos.length - photos.length;
      for (var i = 0; i < difference; i++) {
        var extraImg = photos[1].cloneNode();
        photosContainer.appendChild(extraImg);
      }
    } else if (photos.length > obj.offer.photos.length) {
      difference = photos.length - obj.offer.photos.length;
      for (i = 0; i < difference; i++) {
        photosContainer.removeChild(photos[i]);
      }
    }
    photos = photosContainer.querySelectorAll('img');

    for (i = 0; i < photos.length; i++) {
      photos[i].setAttribute('src', obj.offer.photos[i]);
    }

    item.setAttribute('aria-pressed', true);
}
  createDialog();
  var close = newDialog.querySelector('.dialog__close');

  close.addEventListener('click', function () {
    closeDialog(newDialog);
    if (typeof window.initializePins.callBack === 'function') {
      window.initializePins.callBack();
    }
    if (window.dialog !== null) {
      window.dialog = null;
    }
  });

  close.addEventListener('keydown', function (evt) {
    if (evt && evt.keyCode === ENTER_KEY_CODE) {
      closeDialog(newDialog);
      if (typeof window.initializePins.callBack === 'function') {
        window.initializePins.callBack();
      }
      if (window.dialog !== null) {
        window.dialog = null;
      }
    }
  });

  window.dialog = newDialog;
};
