import isValidForm from './validateForm.js';

const createTransformedDate = (selectedDate, transformedEventData) => ({
  title: transformedEventData.title,
  description: transformedEventData.description,
  dateFrom: new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    transformedEventData.startTime[0],
    transformedEventData.startTime[1],
  ),
  dateTo: new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    transformedEventData.endTime[0],
    transformedEventData.endTime[1],
  ),
});

const transformData = eventData => {
  let transformedEventData = { ...eventData };
  let { startTime, endTime } = transformedEventData;
  if (startTime.split(':')[0] > endTime.split(':')[0]) {
    [endTime, startTime] = [startTime, endTime];
  }
  transformedEventData = {
    ...transformedEventData,
    startTime: startTime.split(':'),
    endTime: endTime.split(':'),
  };
  const selectedDate = new Date(transformedEventData.date);

  return createTransformedDate(selectedDate, transformedEventData);
};

export default (event, events) => {
  const eventData = Object.fromEntries(new FormData(event.target));
  const [isValid, errorText] = isValidForm(eventData.startTime, eventData.endTime);
  if (!isValid) {
    return [null, errorText];
  }

  const transformedEventData = transformData(eventData);
  const isIntersectEvents = events.some(
    eventFromArray =>
      (eventFromArray.dateFrom <= transformedEventData.dateFrom &&
        transformedEventData.dateFrom <= eventFromArray.dateTo) ||
      (eventFromArray.dateFrom <= transformedEventData.dateTo &&
        transformedEventData.dateTo <= eventFromArray.dateTo),
  );

  if (isIntersectEvents) {
    return [null, "Can't create event because this range is selected"];
  }
  return [transformedEventData, ''];
};
