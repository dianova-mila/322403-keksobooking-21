'use strict';

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

const PIN_CONTAINER = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const showMap = () => document.querySelector(`.map`).classList.remove(`map--faded`);
showMap();

const getArrayRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomNumber = (minValue, maxValue) => minValue + Math.floor(Math.random() * (maxValue + 1 - minValue));

const getArrayRandomLength = (array) => array.slice(0, getRandomNumber(1, (array.length - 1)));

const getAdvert = (advertId) => {
  let locationX = getRandomNumber(0, 1200);
  let locationY = getRandomNumber(130, 630);

  return {
    author: {
      avatar: `img/avatars/user0${advertId + 1}.png`
    },
    offer: {
      title: ADVERT_TITLES[advertId],
      address: `${locationX}, ${locationY}`,
      price: ADVERT_PRICES[advertId],
      type: getArrayRandomElement(ADVERT_TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getArrayRandomElement(ADVERT_TIMES),
      checkout: getArrayRandomElement(ADVERT_TIMES),
      features: getArrayRandomLength(ADVERT_FEATURES),
      description: ADVERT_DESCRIPTIONS[advertId],
      photos: getArrayRandomLength(ADVERT_PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

const getAdvertsArray = () => {
  let advertsArray = [];

  for (let i = 0; i < 8; i++) {
    let advert = getAdvert(i);
    advertsArray.push(advert);
  }

  return advertsArray;
};

const createPin = (pinObject) => {
  let pin = PIN_TEMPLATE.cloneNode(true);

  pin.style.left = `${pinObject.location.x - PIN_WIDTH / 2}px`;
  pin.style.top = `${pinObject.location.y - PIN_HEIGHT}px`;

  let pinImage = pin.querySelector(`img`);
  pinImage.src = pinObject.author.avatar;
  pinImage.alt = pinObject.offer.title;

  return pin;
};

const renderPins = (advertsArray) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < advertsArray.length; i++) {
    let pin = createPin(advertsArray[i]);
    fragment.appendChild(pin);
  }

  PIN_CONTAINER.appendChild(fragment);
};

renderPins(getAdvertsArray());

