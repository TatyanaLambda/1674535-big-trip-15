export const createInfoTemplate = (info) => {
  const {path, period, cost} = info;
  const pathItemsTemplate = (elements) => (
    elements.map((element) =>
      `
      ${element}
      `).join(' &mdash; ')
  );

  const pathTemplate = pathItemsTemplate(path);

  return`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${pathTemplate}</h1>
        <p class="trip-info__dates">${period.minimumDate}&nbsp;&mdash;&nbsp;${period.maximumDate}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>
`;};
