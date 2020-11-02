'use strict';

(function () {
  const advertTypeSelect = document.querySelector(`#housing-type`);

  // Фильтр по типу жилья

  const onFilterTypeChange = window.debounce(() => {
    if (advertTypeSelect.value === `any`) {
      window.data.activeAdvertsArray = window.data.advertsArray;
    } else {
      window.data.activeAdvertsArray = window.data.advertsArray.filter((advert) => advert.offer.type === advertTypeSelect.value);
    }

    window.card.removeCard();

    window.pins.renderPins(window.data.activeAdvertsArray);
  });

  advertTypeSelect.addEventListener(`change`, onFilterTypeChange);
})();
