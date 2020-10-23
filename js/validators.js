'use strict';

(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const roomsSelect = document.querySelector(`#room_number`);
  const guestsSelect = document.querySelector(`#capacity`);
  const titleInput = document.querySelector(`#title`);
  const priceInput = document.querySelector(`#price`);
  const advertTypeSelect = document.querySelector(`#type`);
  const timeInSelect = document.querySelector(`#timein`);
  const timeOutSelect = document.querySelector(`#timeout`);

  window.validators = {
    'validateGuests': function () {
      const guestCount = parseInt(guestsSelect.value, 10);
      switch (roomsSelect.value) {
        case `1`:
          if (guestCount !== 1) {
            guestsSelect.setCustomValidity(`Одна комната только для одного гостя`);
          } else {
            guestsSelect.setCustomValidity(``);
          }
          break;
        case `2`:
          if (guestCount < 1 || guestCount > 2) {
            guestsSelect.setCustomValidity(`Две комнаты только для одного или двух гостей`);
          } else {
            guestsSelect.setCustomValidity(``);
          }
          break;
        case `3`:
          if (guestCount < 1 || guestCount > 3) {
            guestsSelect.setCustomValidity(`Три комнаты только для 1-3 гостей`);
          } else {
            guestsSelect.setCustomValidity(``);
          }
          break;
        case `100`:
          if (guestCount !== 0) {
            guestsSelect.setCustomValidity(`100 комнат не для гостей`);
          } else {
            guestsSelect.setCustomValidity(``);
          }
          break;
      }

      guestsSelect.reportValidity();
    },

    'validateTitle': function () {
      const titleLength = titleInput.value.length;

      if (titleLength < MIN_TITLE_LENGTH) {
        titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
      } else if (titleLength > MAX_TITLE_LENGTH) {
        titleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
      } else {
        titleInput.setCustomValidity(``);
      }

      titleInput.reportValidity();
    },

    'validatePrice': function () {
      const priceValue = parseInt(priceInput.value, 10);
      switch (advertTypeSelect.value) {
        case `bungalow`:
          priceInput.setAttribute(`placeholder`, `500`);
          priceInput.setAttribute(`min`, `0`);
          if (priceValue > 100000) {
            priceInput.setCustomValidity(`Цена не может быть больше 100000 за ночь`);
          } else {
            priceInput.setCustomValidity(``);
          }
          break;
        case `flat`:
          priceInput.setAttribute(`placeholder`, `1000`);
          priceInput.setAttribute(`min`, `1000`);
          if (priceValue > 100000 || priceValue < 1000) {
            priceInput.setCustomValidity(`Цена за квартиру не может быть меньше 1000 и больше 100000 за ночь`);
          } else {
            priceInput.setCustomValidity(``);
          }
          break;
        case `house`:
          priceInput.setAttribute(`placeholder`, `5000`);
          priceInput.setAttribute(`min`, `5000`);
          if (priceValue > 100000 || priceValue < 5000) {
            priceInput.setCustomValidity(`Цена за дом не может быть меньше 5000 и больше 100000 за ночь`);
          } else {
            priceInput.setCustomValidity(``);
          }
          break;
        case `palace`:
          priceInput.setAttribute(`placeholder`, `10000`);
          priceInput.setAttribute(`min`, `10000`);
          if (priceValue > 100000 || priceValue < 10000) {
            priceInput.setCustomValidity(`Цена за дворец не может быть меньше 10000 и больше 100000 за ночь`);
          } else {
            priceInput.setCustomValidity(``);
          }
          break;
      }

      priceInput.reportValidity();
    },

    'tuneTimeOut': function () {
      timeOutSelect.value = timeInSelect.value;
    },

    'tuneTimeIn': function () {
      timeInSelect.value = timeOutSelect.value;
    },
  };
})();
