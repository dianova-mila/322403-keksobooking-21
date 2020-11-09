'use strict';

let value = [];

const save = (data) => {
  value = data;
};

const get = () => value;

window.data = {
  'save': save,
  'get': get,
};

