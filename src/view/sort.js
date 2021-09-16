import AbstractView from './abstract.js';
import {SORT_FIELDS} from '../const.js';

const createSortItemTemplate = (field, isChecked) => (
  `
  <div class="trip-sort__item  trip-sort__item--${field}">
    <input id="sort-${field}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${field}" ${isChecked ? 'checked' : ''}>
    <label class="trip-sort__btn" for="${field}">${field}</label>
  </div>
  `
);

const createSortTemplate = (currentSortType) => {
  const sortTemplate = SORT_FIELDS.map((field) =>createSortItemTemplate(field, field === currentSortType)).join('');

  return`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortTemplate}
  </form>
`;};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.getAttribute('for'));
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
