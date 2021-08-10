import {getRandomInteger, getMixedRandomLenghtArray, getRandomBoolean} from '../helpers/random-helper.js';
import {POINT_TYPES, CITY_NAMES, OFFER_TITLES} from '../const.js';
import dayjs from 'dayjs';
const MAX_DESСRIPTION_PHRASE_COUNT = 5;
const MIN_PHOTO_COUNT = 1;
const MAX_PHOTO_COUNT = 5;
const MIN_PRICE = 20;
const MAX_PRICE = 1000;
const MIN_ADD_PRICE = 1;
const MAX_ADD_PRICE = 50;


const generatePrice = () => {
  const price = getRandomInteger(MIN_PRICE, MAX_PRICE);
  return price;
};

const generateDate = () => {
  const MAX_MINUTE_GAP = 7*24*60;
  const minutesGap = getRandomInteger(-MAX_MINUTE_GAP, MAX_MINUTE_GAP);
  return dayjs().add(minutesGap, 'minute').toDate();
};

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};

const generateCityName = () => {
  const randomIndex = getRandomInteger(0, CITY_NAMES.length - 1);
  return CITY_NAMES[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];
  const indexArray = Array.from({ length: MAX_DESСRIPTION_PHRASE_COUNT }, (_v, i) =>  i + 1);
  const mixedArray = getMixedRandomLenghtArray(indexArray);
  let text = '';
  for (let i = 0; i < mixedArray.length; i++) {
    text+=descriptions[mixedArray[i]-1];
  }
  return text;
};

const generatePictures = () => {
  const pictureCount = getRandomInteger(MIN_PHOTO_COUNT, MAX_PHOTO_COUNT);
  const pictures = [];
  for (let i = 0; i < pictureCount; i++) {
    const pictureNumber = Math.random();
    const pictureSrc =  `http://picsum.photos/300/200?r=${ pictureNumber }`;
    const pictureDescription = `Photo=${ pictureNumber }`;
    pictures[i] = {
      src: pictureSrc,
      description: pictureDescription,
    };
  }
  return pictures;
};

const generateDestination = () => ({
  description: generateDescription(),
  name: generateCityName(),
  pictures: generatePictures(),
});

const generateOffers = () => {
  const indexArray = Array.from({ length: OFFER_TITLES.length }, (_v, i) =>  i + 1);
  const mixedArray = getMixedRandomLenghtArray(indexArray);
  const offers=[];
  for (let i = 0; i < mixedArray.length; i++) {
    offers[i] = {
      title: OFFER_TITLES[mixedArray[i]-1],
      addPrice: getRandomInteger(MIN_ADD_PRICE, MAX_ADD_PRICE),
    };
  }
  return offers;
};

export const generatePoint = () => {
  let dateFrom = generateDate();
  let dateTo = generateDate();
  if (dateFrom>dateTo){
    const tempDate = dateFrom;
    dateFrom = dateTo;
    dateTo = tempDate;
  }

  return {
    id: 0,
    basePrice: generatePrice(),
    type: generatePointType(),
    destination: generateDestination(),
    dateFrom,
    dateTo,
    offers: generateOffers(),
    isFavorite: getRandomBoolean(),
  };
};
