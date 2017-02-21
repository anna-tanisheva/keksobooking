'use strict';

window.load = function (url, cb) {
  var newRequest = new XMLHttpRequest();

  newRequest.addEventListener('load', function (evt) {
    if (evt.target.status >= 400) {
      document.querySelector('header').innerText += 'Error' + evt.target.status;
    } else if (evt.target.status >= 200) {
      cb(evt.target.response);
    }
  });


  newRequest.open('GET', url);
  newRequest.send();

};
