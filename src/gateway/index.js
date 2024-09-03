const baseUrl = "https://666441d2932baf9032aa81f9.mockapi.io/api/v1/events";
const defaultError = "Response status: ";

const mapList = (lists) =>
  lists.map(({ _id, dateFrom, dateTo, ...rest }) => ({
    id: _id,
    dateFrom: new Date(dateFrom),
    dateTo: new Date(dateTo),
    ...rest,
  }));

export const getEventsListsFromDB = () =>
  fetch(`${baseUrl}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${defaultError} ${response.status}`);
    })
    .then((lists) => mapList(lists));

export const getEventByIdFormDB = (eventId) =>
  fetch(`${baseUrl}/${eventId}`).then((lists) => lists.json());

export const createEventInDB = (event) =>
  fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${defaultError} ${response.status}`);
  });

export const deleteEventInDB = (eventId) =>
  fetch(`${baseUrl}/${eventId}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${defaultError} ${response.status}`);
  });

export const updateEventInDB = (eventId, event) =>
  fetch(`${baseUrl}/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${defaultError} ${response.status}`);
  });
