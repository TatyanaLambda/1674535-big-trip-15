import {createElement} from '../helpers/utils.js';

const createEmptyListTemplate = () => `
  <p class="trip-events__msg">Click New Event to create your first point</p>
`;

export default class EmptyMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEmptyListTemplate();
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