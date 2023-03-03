const baseUrl = 'https://63cecea06d27349c2b76151b.mockapi.io/events';
export const getEvents = () =>
  fetch(baseUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert("User Error. Can't display events");
      return undefined;
    })
    .then(events =>
      events.map(event => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      })),
    )
    .catch(() => alert("Internal Server Error. Can't display events"));

export const addEvent = event =>
  fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  })
    .then(response => {
      if (response.ok) {
        return true;
      }
      alert("User Error. Can't display events");
      return false;
    })
    .catch(() => alert("Internal Server Error. Can't display events"));

export const deleteEvent = id =>
  fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        return true;
      }
      alert("User Error. Can't display events");
      return false;
    })
    .catch(() => alert("Internal Server Error. Can't display events"));
