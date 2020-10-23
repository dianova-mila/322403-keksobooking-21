'use strict';

(function () {
  const ADVERT_TITLES = [
    `Уютная квартира на окраине`,
    `Чулан под лестницей`,
    `Нора хоббита`,
    `Трейлер в парке`,
    `Подсобка в книжном`,
    `Дом на дереве`,
    `Апартаменты в центре`,
    `Ходячий замок`
  ];
  const ADVERT_PRICES = [2500, 4000, 3400, 5800, 6000, 1400, 9000, 3400];
  const ADVERT_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const ADVERT_TIMES = [`12:00`, `13:00`, `14:00`];
  const ADVERT_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const ADVERT_DESCRIPTIONS = [
    `Уютное гнездышко`,
    `Не обязательно быть избранным`,
    `Для невысоких`,
    `Душ на улице`,
    `Для интеллектуалов`,
    `Вспомни детство`,
    `Громко, тесно, зато рядом метро!`,
    `Держись крепче!`
  ];
  const ADVERT_PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const ADVERTS_COUNT = 8;

  const getAdvert = (advertId) => {
    const locationX = window.utils.getRandomNumber(0, 1200);
    const locationY = window.utils.getRandomNumber(130, 630);

    return {
      author: {
        avatar: `img/avatars/user0${advertId + 1}.png`
      },
      offer: {
        title: ADVERT_TITLES[advertId],
        address: `${locationX}, ${locationY}`,
        price: ADVERT_PRICES[advertId],
        type: window.utils.getRandomItemFromArray(ADVERT_TYPES),
        rooms: window.utils.getRandomNumber(1, 5),
        guests: window.utils.getRandomNumber(1, 10),
        checkin: window.utils.getRandomItemFromArray(ADVERT_TIMES),
        checkout: window.utils.getRandomItemFromArray(ADVERT_TIMES),
        features: window.utils.getArrayRandomLength(ADVERT_FEATURES),
        description: ADVERT_DESCRIPTIONS[advertId],
        photos: window.utils.getArrayRandomLength(ADVERT_PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  const getAdvertsArray = () => {
    let advertsArray = [];

    for (let i = 0; i < ADVERTS_COUNT; i++) {
      const advert = getAdvert(i);
      advertsArray.push(advert);
    }

    return advertsArray;
  };

  window.data = {
    'advertsArray': getAdvertsArray(),
  };
})();
