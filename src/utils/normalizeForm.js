import makeValidationForm from "./validateForm.js";
import { normalizeFormFields } from "./dateUtils";

export default (event, events) => {
  const eventData = Object.fromEntries(new FormData(event.target));
  try {
    makeValidationForm(eventData.startTime, eventData.endTime);
  } catch (exception) {
    throw exception;
  }

  const normalizedEventData = normalizeFormFields(eventData);
  const isIntersectEvents = events.some(
    (eventFromArray) =>
      (eventFromArray.dateFrom <= normalizedEventData.dateFrom &&
        normalizedEventData.dateFrom <= eventFromArray.dateTo) ||
      (eventFromArray.dateFrom <= normalizedEventData.dateTo &&
        normalizedEventData.dateTo <= eventFromArray.dateTo)
  );

  if (isIntersectEvents) {
    throw "Can't create event because this range is selected";
  }
  return normalizedEventData;
};
