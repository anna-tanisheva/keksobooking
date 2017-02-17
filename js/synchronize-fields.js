'use strict';

window.synchronizeFields = function (node1, node2, valuesArray1, valuesArray2, propertyName) {

  node1.addEventListener('change', function () {
    for (var j = 0; j < valuesArray1.length; j++) {
      if (node1.value === valuesArray1[j]) {
        node2[propertyName] = valuesArray2[j];
      }
    }
  });
};
