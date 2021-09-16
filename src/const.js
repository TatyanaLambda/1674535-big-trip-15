const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const CITY_NAMES = [
  'Pskov',
  'Sochi',
  'S-Peterburg',
  'Rim',
  'Milan',
  'London',
  'Paris',
  'Rostov',
  'Ufa',
];

const OFFER_TITLES = [
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train',
];

const OFFER_TITLES_LABEL = {
  'Add luggage': 'luggage',
  'Switch to comfort class': 'comfort',
  'Add meal': 'meal',
  'Choose seats': 'seats',
  'Travel by train': 'train',
};

const SORT_FIELDS = {
  'DEFAULT':'day',
  'TIME':'time',
  'COST':'cost',
};

const FILTER_NAME = [
  'everything',
  'future',
  'past',
];

export {POINT_TYPES, CITY_NAMES, OFFER_TITLES, OFFER_TITLES_LABEL, SORT_FIELDS, FILTER_NAME};
