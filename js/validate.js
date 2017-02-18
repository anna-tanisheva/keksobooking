'use strict';

window.validation = function () {
  var title = document.querySelector('#title');
  var address = document.querySelector('#address');
  var price = document.querySelector('#price');
  var formToValidate = document.querySelector('.notice__form');

  price.setAttribute('type', 'number');
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

    if (!price.value || price.value > 1000000) {
      showError(form, price);
      price.classList.add('error');
      return false;
    }

    form.submit();
    return true;
  };

  return (formToValidate.addEventListener('submit', validate));
};
