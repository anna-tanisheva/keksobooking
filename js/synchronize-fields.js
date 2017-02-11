'use strict';

var synchronizeFields = function (node1, node2, valuesArray1, valuesArray2, property_name) {

  node1.addEventListener('change', function () {
    for (var j = 0; j < valuesArray1.length; j++) {
      if (node1.value === valuesArray1[j]) {
        node2[property_name] = valuesArray2[j];
      };
    }
  });
};
