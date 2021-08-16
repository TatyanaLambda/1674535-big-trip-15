import {createElement} from '../helpers/utils.js';

const createSortItemTemplate = (field, isChecked) => (
  `
  <div class="trip-sort__item  trip-sort__item--${field}">
    <input id="sort-${field}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${field}" ${isChecked ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${field}">${field}</label>
  </div>
  `
);

const createSortTemplate = (fieldItems) => {
  const sortTemplate = fieldItems.map((field, index) =>createSortItemTemplate(field, index === 0)).join('');

  return`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortTemplate}
  </form>
`;};

export default class Sort {
  constructor(fields) {
    this._fields = fields;
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._fields);
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
