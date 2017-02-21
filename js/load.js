'use strict';

window.load = function (url, cb) {
  var newRequest = new XMLHttpRequest();

  newRequest.addEventListener('load', function (evt) {
    if (evt.target.status >= 400) {
      console.log('Error');
    } else if (evt.target.status >= 200) {
      cb(evt.target.response);
    }
  });


  newRequest.open ('GET', url);
  newRequest.send();

};
