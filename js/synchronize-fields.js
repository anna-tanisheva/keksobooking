'use strict';

window.useFields = function () {

  var synchronizeFields = function (node1, node2, valuesArray1, valuesArray2, propertyName) {
    node1.addEventListener('change', function () {
      for (var j = 0; j < valuesArray1.length; j++) {
        if (node1.value === valuesArray1[j]) {
          node2[propertyName] = valuesArray2[j];
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

  synchronizeFields(checkInTime, checkOutTime, valuesCheckIn, valuesCheckOut, 'value');
  synchronizeFields(checkOutTime, checkInTime, valuesCheckOut, valuesCheckIn, 'value');

  synchronizeFields(typeOfHouse, price, valuesOfHouse, minPrice, 'min');
  synchronizeFields(typeOfHouse, price, valuesOfHouse, minPrice, 'value');

  synchronizeFields(roomNumber, capacity, valuesOfRoomNumber, valuesOfCapacity, 'value');
  synchronizeFields(capacity, roomNumber, valuesOfCapacity, valuesOfRoomNumber, 'value');
};
