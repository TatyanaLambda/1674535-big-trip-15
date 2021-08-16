import dayjs from 'dayjs';
import {POINT_TYPES, CITY_NAMES, OFFER_TITLES_LABEL} from '../const.js';
import {getDateForEditForm} from '../helpers/date-helper.js';
import {createElement} from '../helpers/utils.js';

const BLANK_POINT = {
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  type: 'bus',
  dateFrom: dayjs(),
  dateTo: dayjs(),
  basePrice: null,
  offers: [],
};

const createTypesTemplate = (type) => (
  POINT_TYPES.map((element) =>
    `
    <div class="event__type-item">
      <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}" ${element===type?'ckecked':''}>
      <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${element}</label>
    </div>
    `).join('')
);


const createDestinationListTemplate = () => (
  CITY_NAMES.map((cityName) =>`<option value="${cityName}"></option>`).join('')
);
const destinationListTemplate = createDestinationListTemplate();


const createOfferTemplate = (offer) => (`
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${OFFER_TITLES_LABEL[offer.title]}-1" type="checkbox" name="event-offer-${OFFER_TITLES_LABEL[offer.title]}" ckecked}>
    <label class="event__offer-label" for="event-offer-${OFFER_TITLES_LABEL[offer.title]}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.addPrice}</span>
    </label>
  </div>
`);

const createOffersTemplate = (offers) => (`
  ${offers.length !== 0 ?`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
    ${offers.map((offer) => createOfferTemplate(offer)).join('')}
      </div>
      </section>
  `:''}
`);

const createPictureTemplate = (photo) => (
  `<img class="event__photo" src="${photo.src}" alt="Event photo"></img>`
);

const createDestinationTemplate = (destination) => (`
  ${destination.name !== '' ?`
    <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${destination.pictures.map((photo) => createPictureTemplate(photo)).join('')}
      </div>
    </div>
    </section>
  `:''}
`);

const createEditTemplate = (point) => {
  const {destination, type, dateFrom, dateTo, basePrice, offers} = point;
  const typesTemplate = createTypesTemplate(type);
  const offersTemplate = createOffersTemplate(offers);
  const destinationTemplate = createDestinationTemplate(destination);

  return `
  <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${typesTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationListTemplate}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateForEditForm(dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateForEditForm(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
          ${offersTemplate}
          ${destinationTemplate}
    </section>
  </form>
  </li>
`;};

export default class Sort {
  constructor(point = BLANK_POINT) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createEditTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
