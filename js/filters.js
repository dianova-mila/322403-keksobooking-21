'use strict';

(() => {
  const PRICE = {
    'middle': 10000,
    'high': 50000,
  };
  const filter = document.querySelector(`.map__filters`);
  const advertTypeSelect = document.querySelector(`#housing-type`);
  const advertPriceSelect = document.querySelector(`#housing-price`);
  const advertRoomsSelect = document.querySelector(`#housing-rooms`);
  const advertGuestsSelect = document.querySelector(`#housing-guests`);

  const checkType = (advert) => {
    return advertTypeSelect.value === `any` || advert.offer.type === advertTypeSelect.value;
  };

  const checkRooms = (advert) => {
    return advertRoomsSelect.value === `any` || advert.offer.rooms === parseInt(advertRoomsSelect.value, 10);
  };

  const checkGuests = (advert) => {
    return advertGuestsSelect.value === `any` || advert.offer.guests === parseInt(advertGuestsSelect.value, 10);
  };

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

  const filterAdverts = (advert) => {
    return checkType(advert) && checkRooms(advert) && checkGuests(advert) && checkPrice(advert) && checkFeatures(advert);
  };

  const onFilterChange = window.debounce(() => {
    window.card.remove();

    const filteredAdverts = window.data.get().filter(filterAdverts);

    window.pins.render(filteredAdverts);
  });

  filter.addEventListener(`change`, onFilterChange);
})();
