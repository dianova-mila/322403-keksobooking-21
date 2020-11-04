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


  // Фильтр жилья

  const onFilterChange = window.debounce(() => {
    let filteredArray = window.data.get(`advertsArray`);

    if (advertTypeSelect.value !== `any`) {
      filteredArray = filteredArray.filter((advert) => advert.offer.type === advertTypeSelect.value);
    }

    if (advertPriceSelect.value !== `any`) {
      switch (advertPriceSelect.value) {
        case `low`:
          filteredArray = filteredArray.filter((advert) => advert.offer.price < PRICE.middle);
          break;
        case `middle`:
          filteredArray = filteredArray.filter((advert) => {
            return advert.offer.price >= PRICE.middle && advert.offer.price <= PRICE.high;
          });
          break;
        case `high`:
          filteredArray = filteredArray.filter((advert) => advert.offer.price > PRICE.high);
          break;
      }
    }

    if (advertRoomsSelect.value !== `any`) {
      filteredArray = filteredArray.filter((advert) => {
        return advert.offer.rooms === parseInt(advertRoomsSelect.value, 10);
      });
    }

    if (advertGuestsSelect.value !== `any`) {
      filteredArray = filteredArray.filter((advert) => {
        return advert.offer.guests === parseInt(advertGuestsSelect.value, 10);
      });
    }

    const filterActiveCheckboxes = document.querySelectorAll(`.map__checkbox:checked`);

    for (let activeCheckbox of filterActiveCheckboxes) {
      filteredArray = filteredArray.filter((advert) => advert.offer.features.includes(activeCheckbox.value));
    }

    window.card.removeCard();

    window.pins.renderPins(filteredArray);
  });

  filter.addEventListener(`change`, onFilterChange);
})();
