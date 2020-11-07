'use strict';

(() => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const PRICES = {
    bungalow: 500,
    flat: 1000,
    house: 5000,
    palace: 10000,
    max: 100000,
  };

  const roomsSelect = document.querySelector(`#room_number`);
  const guestsSelect = document.querySelector(`#capacity`);
  const titleInput = document.querySelector(`#title`);
  const priceInput = document.querySelector(`#price`);
  const advertTypeSelect = document.querySelector(`#type`);
  const timeInSelect = document.querySelector(`#timein`);
  const timeOutSelect = document.querySelector(`#timeout`);

  // Валидация поля ввода гостей и комнат

  const validateGuests = () => {
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
  };

  // Валидация заголовка

  const validateTitle = () => {
    const titleLength = titleInput.value.length;

    if (titleLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
    } else if (titleLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();
  };

  // Валидация поля ввода цены

  const validatePrice = () => {
    const priceValue = parseInt(priceInput.value, 10);
    switch (advertTypeSelect.value) {
      case `bungalow`:
        priceInput.placeholder = PRICES.bungalow;
        priceInput.min = 0;
        if (priceValue > PRICES.max) {
          priceInput.setCustomValidity(`Цена не может быть больше 100000 за ночь`);
        } else {
          priceInput.setCustomValidity(``);
        }
        break;
      case `flat`:
        priceInput.placeholder = PRICES.flat;
        priceInput.min = PRICES.flat;
        if (priceValue > PRICES.max || priceValue < PRICES.flat) {
          priceInput.setCustomValidity(`Цена за квартиру не может быть меньше 1000 и больше 100000 за ночь`);
        } else {
          priceInput.setCustomValidity(``);
        }
        break;
      case `house`:
        priceInput.placeholder = PRICES.house;
        priceInput.min = PRICES.house;
        if (priceValue > PRICES.max || priceValue < PRICES.house) {
          priceInput.setCustomValidity(`Цена за дом не может быть меньше 5000 и больше 100000 за ночь`);
        } else {
          priceInput.setCustomValidity(``);
        }
        break;
      case `palace`:
        priceInput.placeholder = PRICES.palace;
        priceInput.min = PRICES.palace;
        if (priceValue > PRICES.max || priceValue < PRICES.palace) {
          priceInput.setCustomValidity(`Цена за дворец не может быть меньше 10000 и больше 100000 за ночь`);
        } else {
          priceInput.setCustomValidity(``);
        }
        break;
    }

    priceInput.reportValidity();
  };

  // Настройка времени выезда

  const tuneTimeOut = () => {
    timeOutSelect.value = timeInSelect.value;
  };

  // Настройка времени заезда

  const tuneTimeIn = () => {
    timeInSelect.value = timeOutSelect.value;
  };

  window.validators = {
    'validateGuests': validateGuests,
    'validateTitle': validateTitle,
    'validatePrice': validatePrice,
    'tuneTimeOut': tuneTimeOut,
    'tuneTimeIn': tuneTimeIn,
  };
})();
