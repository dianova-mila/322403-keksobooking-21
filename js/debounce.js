'use strict';

const DEBOUNCE_INTERVAL = 500; // ms

window.debounce = (callback) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      callback(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
