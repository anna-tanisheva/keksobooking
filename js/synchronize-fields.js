'use strict';

window.useFields = function () {

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncMin = function (element, value) {
    element.min = value;
  };

  var synchronizeFields = function (node1, node2, valuesArray1, valuesArray2, syncAttributes) {
    node1.addEventListener('change', function () {
      for (var j = 0; j < valuesArray1.length; j++) {
        if (node1.value === valuesArray1[j]) {
          syncAttributes(node2, valuesArray2[j]);
        }
      }
    });
  };

  var checkInTime = document.querySelector('#time');
  var checkOutTime = document.querySelector('#timeout');
  var valuesCheckIn = ['12', '13', '14'];
  var valuesCheckOut = ['12', '13', '14'];

  var typeOfHouse = document.querySelector('#type');
  var price = document.querySelector('#price');
  var valuesOfHouse = ['apartaments', 'bad-house', 'palace'];
  var minPrice = [1000, 0, 10000];

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var valuesOfRoomNumber = ['1', '2', '3'];
  var valuesOfCapacity = ['0', '3', '3'];

  synchronizeFields(checkInTime, checkOutTime, valuesCheckIn, valuesCheckOut, syncValues);
  synchronizeFields(checkOutTime, checkInTime, valuesCheckOut, valuesCheckIn, syncValues);

  synchronizeFields(typeOfHouse, price, valuesOfHouse, minPrice, syncMin);
  synchronizeFields(typeOfHouse, price, valuesOfHouse, minPrice, syncValues);

  synchronizeFields(roomNumber, capacity, valuesOfRoomNumber, valuesOfCapacity, syncValues);
  synchronizeFields(capacity, roomNumber, valuesOfCapacity, valuesOfRoomNumber, syncValues);
};
