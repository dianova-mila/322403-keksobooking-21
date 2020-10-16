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
const ADVERTS_COUNT = 8;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 84;

const map = document.querySelector(`.map`);
const mainMapPin = document.querySelector(`.map__pin--main`);
const mapFilters = document.querySelector(`.map__filters`);
const mapFiltersArray = mapFilters.children;
const pinContainer = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const form = document.querySelector(`.ad-form`);
const formFieldsets = form.querySelectorAll(`fieldset`);
const addressInput = document.querySelector(`#address`);
const roomsInput = document.querySelector(`#room_number`);
const guestsInput = document.querySelector(`#capacity`);

// const advertCardTemplate = document.querySelector(`#card`)
//   .content
//   .querySelector(`.map__card`);
// const filters = document.querySelector(`.map__filters-container`);

// mainMapPin.addEventListener()

// Страница неактивна
const switchForm = (formArray, disable) => {
  for (let element of formArray) {
    element.disabled = disable;
  }
};

const setAddressValue = () => {
  let mainMapPinX = parseInt(getComputedStyle(mainMapPin).left, 10) + (MAIN_PIN_WIDTH / 2);
  let mainMapPinY = parseInt(getComputedStyle(mainMapPin).top, 10) + MAIN_PIN_HEIGHT;
  addressInput.value = `${mainMapPinX}, ${mainMapPinY}`;
};

switchForm(formFieldsets, true);
switchForm(mapFiltersArray, true);
setAddressValue();


// Активация страницы
const activatePage = () => {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  switchForm(formFieldsets, false);
  switchForm(mapFiltersArray, false);
  renderPinsAndCard(getAdvertsArray());
};

mainMapPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activatePage();
    setAddressValue();
  }
});

mainMapPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
});

// Валидация

const validateGuests = () => {
  const guestCount = parseInt(guestsInput.value, 10);
  switch (roomsInput.value) {
    case `1`:
      if (guestCount !== 1) {
        guestsInput.setCustomValidity(`Одна комната только для одного гостя`);
      } else {
        guestsInput.setCustomValidity(``);
      }
      break;
    case `2`:
      if (guestCount < 1 || guestCount > 2) {
        guestsInput.setCustomValidity(`Две комнаты только для одного или двух гостей`);
      } else {
        guestsInput.setCustomValidity(``);
      }
      break;
    case `3`:
      if (guestCount < 1 || guestCount > 3) {
        guestsInput.setCustomValidity(`Три комнаты только для 1-3 гостей`);
      } else {
        guestsInput.setCustomValidity(``);
      }
      break;
    case `100`:
      if (guestCount !== 0) {
        guestsInput.setCustomValidity(`100 комнат не для гостей`);
      } else {
        guestsInput.setCustomValidity(``);
      }
      break;
  }

  guestsInput.reportValidity();
};

guestsInput.addEventListener(`input`, () => validateGuests());
roomsInput.addEventListener(`input`, () => validateGuests());

const getRandomItemFromArray = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomNumber = (minValue, maxValue) => minValue + Math.floor(Math.random() * (maxValue + 1 - minValue));

const getArrayRandomLength = (array) => array.slice(0, getRandomNumber(1, (array.length - 1)));

const getAdvert = (advertId) => {
  const locationX = getRandomNumber(0, 1200);
  const locationY = getRandomNumber(130, 630);

  return {
    author: {
      avatar: `img/avatars/user0${advertId + 1}.png`
    },
    offer: {
      title: ADVERT_TITLES[advertId],
      address: `${locationX}, ${locationY}`,
      price: ADVERT_PRICES[advertId],
      type: getRandomItemFromArray(ADVERT_TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomItemFromArray(ADVERT_TIMES),
      checkout: getRandomItemFromArray(ADVERT_TIMES),
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

  for (let i = 0; i < ADVERTS_COUNT; i++) {
    const advert = getAdvert(i);
    advertsArray.push(advert);
  }

  return advertsArray;
};

const createPin = (advert) => {
  let pin = pinTemplate.cloneNode(true);

  pin.style.left = `${advert.location.x - PIN_WIDTH / 2}px`;
  pin.style.top = `${advert.location.y - PIN_HEIGHT}px`;

  let pinImage = pin.querySelector(`img`);
  pinImage.src = advert.author.avatar;
  pinImage.alt = advert.offer.title;

  return pin;
};

// const getCardType = (advertType) => {
//   let advertCardType;
//   switch (advertType) {
//     case `flat`:
//       advertCardType = `Квартира`;
//       break;
//     case `bungalow`:
//       advertCardType = `Бунгало`;
//       break;
//     case `house`:
//       advertCardType = `Дом`;
//       break;
//     case `palace`:
//       advertCardType = `Дворец`;
//       break;
//   }
//   return advertCardType;
// };
//
// const createAdvertCard = (advert) => {
//   let advertCard = advertCardTemplate.cloneNode(true);
//
//   advertCard.querySelector(`.popup__avatar`).src = advert.author.avatar;
//   advertCard.querySelector(`.popup__title`).textContent = advert.offer.title;
//   advertCard.querySelector(`.popup__text--address`).textContent = advert.offer.address;
//   advertCard.querySelector(`.popup__text--price`).textContent = `${advert.offer.price}₽/ночь`;
//   advertCard.querySelector(`.popup__text--capacity`).textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests}`;
//   advertCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
//   advertCard.querySelector(`.popup__description`).textContent = advert.offer.description;
//   advertCard.querySelector(`.popup__type`).textContent = getCardType(advert.offer.type);
//
//   let advertCardFeatures = advertCard.querySelector(`.popup__features`);
//   let advertCardFeaturesList = advertCard.querySelectorAll(`.popup__feature`);
//   let advertCardFeature = advertCard.querySelector(`.popup__feature--wifi`).cloneNode(true);
//   advertCardFeature.classList.remove(`popup__feature--wifi`);
//
//   for (let i = 0; i < advertCardFeaturesList.length; i++) {
//     advertCardFeaturesList[i].remove();
//   }
//   for (let i = 0; i < advert.offer.features.length; i++) {
//     let advertCardFeatureClone = advertCardFeature.cloneNode(true);
//     advertCardFeatureClone.classList.add(`popup__feature--${advert.offer.features[i]}`);
//     advertCardFeatures.appendChild(advertCardFeatureClone);
//   }
//
//   let advertCardPhotos = advertCard.querySelector(`.popup__photos`);
//   let advertCardPhoto = advertCardPhotos.querySelector(`.popup__photo`).cloneNode(true);
//   advertCardPhotos.querySelector(`.popup__photo`).remove();
//   for (let i = 0; i < advert.offer.photos.length; i++) {
//     advertCardPhoto.src = advert.offer.photos[i];
//     advertCardPhotos.appendChild(advertCardPhoto);
//   }
//
//   return advertCard;
// };

const renderPinsAndCard = (adverts) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < adverts.length; i++) {
    const pin = createPin(adverts[i]);
    fragment.appendChild(pin);
  }

  pinContainer.appendChild(fragment);

  // const advertCard = createAdvertCard(adverts[0]);
  // map.insertBefore(advertCard, filters);
};
