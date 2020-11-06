'use strict';

(function () {
  const PRICE = {
    'middle': 10000,
    'high': 50000,
  };
  const filter = document.querySelector(`.map__filters`);
  const advertTypeSelect = document.querySelector(`#housing-type`);
  const advertPriceSelect = document.querySelector(`#housing-price`);
  const advertRoomsSelect = document.querySelector(`#housing-rooms`);
  const advertGuestsSelect = document.querySelector(`#housing-guests`);


  const checkPrice = (advert) => {
    if (advertPriceSelect.value !== `any`) {
      if (advertPriceSelect.value === `low` && advert.offer.price >= PRICE.middle) {
        return false;
      }
      if (advertPriceSelect.value === `middle` && advert.offer.price < PRICE.middle && advert.offer.price > PRICE.high) {
        return false;
      }
      if (advertPriceSelect.value === `high` && advert.offer.price < PRICE.high) {
        return false;
      }
    }

    return true;
  };

  const checkFeatures = (advert) => {
    const filterActiveCheckboxes = document.querySelectorAll(`.map__checkbox:checked`);

    for (let activeCheckbox of filterActiveCheckboxes) {
      if (!advert.offer.features.includes(activeCheckbox.value)) {
        return false;
      }
    }
    return true;
  };

  // Фильтр жилья

  const filterImplementation = (advert) => {
    if (advertTypeSelect.value !== `any` && advert.offer.type !== advertTypeSelect.value) {
      return false;
    }

    if (advertRoomsSelect.value !== `any` && advert.offer.rooms !== parseInt(advertRoomsSelect.value, 10)) {
      return false;
    }

    if (advertGuestsSelect.value !== `any` && advert.offer.guests !== parseInt(advertGuestsSelect.value, 10)) {
      return false;
    }

    if (!checkPrice(advert)) {
      return false;
    }

    if (!checkFeatures(advert)) {
      return false;
    }

    return true;
  };

  const onFilterChange = window.debounce(() => {
    window.card.removeCard();

    const filteredArray = window.data.get().filter(filterImplementation);

    window.pins.renderPins(filteredArray);
  });

  filter.addEventListener(`change`, onFilterChange);
})();
