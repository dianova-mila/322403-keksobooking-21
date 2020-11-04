'use strict';

(function () {
  const save = (dataName, data) => {
    window.data[dataName] = data;
  };

  const get = (data) => window.data[data];

  window.data = {
    'save': save,
    'get': get,
  };
})();
