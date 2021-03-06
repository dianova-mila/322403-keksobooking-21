'use strict';

const advertCardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);
const filters = document.querySelector(`.map__filters-container`);
const map = document.querySelector(`.map`);

// Создание карточки объявления

const getCardType = (advertType) => {
  let advertCardType;
  switch (advertType) {
    case `flat`:
      advertCardType = `Квартира`;
      break;
    case `bungalow`:
      advertCardType = `Бунгало`;
      break;
    case `house`:
      advertCardType = `Дом`;
      break;
    case `palace`:
      advertCardType = `Дворец`;
      break;
  }
  return advertCardType;
};

const createAdvertCard = (advert) => {
  let advertCard = advertCardTemplate.cloneNode(true);

  advertCard.querySelector(`.popup__avatar`).src = advert.author.avatar;
  advertCard.querySelector(`.popup__title`).textContent = advert.offer.title;
  advertCard.querySelector(`.popup__text--address`).textContent = advert.offer.address;
  advertCard.querySelector(`.popup__text--price`).textContent = `${advert.offer.price}₽/ночь`;
  advertCard.querySelector(`.popup__text--capacity`).textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests}`;
  advertCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  advertCard.querySelector(`.popup__description`).textContent = advert.offer.description;
  advertCard.querySelector(`.popup__type`).textContent = getCardType(advert.offer.type);

  let advertCardFeatures = advertCard.querySelector(`.popup__features`);
  let advertCardFeaturesList = advertCard.querySelectorAll(`.popup__feature`);
  let advertCardFeature = advertCard.querySelector(`.popup__feature--wifi`).cloneNode(true);
  advertCardFeature.classList.remove(`popup__feature--wifi`);

  for (let i = 0; i < advertCardFeaturesList.length; i++) {
    advertCardFeaturesList[i].remove();
  }
  for (let i = 0; i < advert.offer.features.length; i++) {
    let advertCardFeatureClone = advertCardFeature.cloneNode(true);
    advertCardFeatureClone.classList.add(`popup__feature--${advert.offer.features[i]}`);
    advertCardFeatures.appendChild(advertCardFeatureClone);
  }

  let advertCardPhotos = advertCard.querySelector(`.popup__photos`);
  let advertCardPhoto = advertCardPhotos.querySelector(`.popup__photo`).cloneNode(true);
  advertCardPhotos.querySelector(`.popup__photo`).remove();
  for (let i = 0; i < advert.offer.photos.length; i++) {
    let advertCardPhotoClone = advertCardPhoto.cloneNode(true);
    advertCardPhotoClone.src = advert.offer.photos[i];
    advertCardPhotos.appendChild(advertCardPhotoClone);
  }

  return advertCard;
};

// Рендер карточки объявления

const renderCard = (adverts) => {
  if (map.querySelector(`.map__card`)) {
    map.querySelector(`.map__card`).remove();
    const advertCard = createAdvertCard(adverts);
    map.insertBefore(advertCard, filters);
  } else {
    const advertCard = createAdvertCard(adverts);
    map.insertBefore(advertCard, filters);
  }

  const mapPinCloseButton = map.querySelector(`.popup__close`);
  mapPinCloseButton.addEventListener(`click`, onCardCloseButtonClick);
  map.addEventListener(`keydown`, onCardEscPress);
};

const onCardCloseButtonClick = (evt) => {
  evt.preventDefault();
  removeCard();
};

const onCardEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    removeCard();
  }
};

// Скрыть карточку

const removeCard = () => {
  if (map.querySelector(`.map__card`)) {
    map.querySelector(`.map__card`).remove();
    map.removeEventListener(`keydown`, onCardEscPress);
  }
  if (map.querySelector(`.map__pin--active`)) {
    map.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
  }
};

window.card = {
  'render': renderCard,
  'remove': removeCard,
};

