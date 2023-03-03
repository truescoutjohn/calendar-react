import { MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE } from "./dateUtils.js";

export const QUARTER_HOUR = 15;
const MAX_DIFFERENCE_HOURS_EVENTS = 6;
const MAX_ALLOWED_START_TIME = 18;
const TIME_SEPARATOR = ":";

const isDivideQuarterTimeInputs = (inputs) =>
  inputs.filter((input) => input.split(TIME_SEPARATOR)[1] % QUARTER_HOUR !== 0)
    .length === 0;

const isNotSingleDayTimeInput = (inputTime1, inputTime2) =>
  inputTime1.split(TIME_SEPARATOR)[0] >= MAX_ALLOWED_START_TIME &&
  inputTime1.split(TIME_SEPARATOR)[1] >= 0 &&
  inputTime2.split(TIME_SEPARATOR)[0] < MAX_ALLOWED_START_TIME;

const isValidTimeInputs = (inputTime1, inputTime2) =>
  Math.abs(
    inputTime1.split(TIME_SEPARATOR)[0] - inputTime2.split(TIME_SEPARATOR)[0]
  ) <= MAX_DIFFERENCE_HOURS_EVENTS;

export const isDeletable = (event, dataCurrentDate = new Date()) => {
  const isPossibleDelete =
    (event.dateFrom >=
      new Date(
        dataCurrentDate.getTime() + QUARTER_HOUR * MILLISECONDS_IN_MINUTE
      ) &&
      new Date(
        dataCurrentDate.getTime() +
          QUARTER_HOUR * MILLISECONDS_IN_MINUTE +
          MAX_DIFFERENCE_HOURS_EVENTS * MILLISECONDS_IN_HOUR
      ) <= event.dateTo) ||
    event.dateTo < dataCurrentDate;
  if (!isPossibleDelete) {
    return [false, "Can't delete event before 15 minutes to start"];
  }
  return [true, ""];
};

export default (startTime, endTime) => {
  if (!isDivideQuarterTimeInputs([startTime, endTime])) {
    return [false, "Events should be divide by quarter"];
  }

  if (isNotSingleDayTimeInput(startTime, endTime)) {
    return [false, "Event should create in a  single day"];
  }

  if (!isValidTimeInputs(startTime, endTime)) {
    return [false, "Events should have difference not more 6 hours"];
  }
  return [true, ""];
};
