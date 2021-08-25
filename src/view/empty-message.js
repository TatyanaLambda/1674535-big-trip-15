import AbstractView from './abstract.js';

const createEmptyListTemplate = () => `
  <p class="trip-events__msg">Click New Event to create your first point</p>
`;

export default class EmptyMessage extends AbstractView {
  getTemplate() {
    return createEmptyListTemplate();
  }
}
