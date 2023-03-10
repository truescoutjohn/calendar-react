export const HOURS_IN_DAY = 24;
export const MILLISECONDS_IN_HOUR = 1000 * 60 * 60;
export const MILLISECONDS_IN_MINUTE = 1000 * 60;

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(":");
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = (mins) => (mins < 10 ? `0${mins}` : mins);

export const getApproppriateMonths = (weekStartDate) => {
  const weekDays = generateWeekRange(weekStartDate);
  return weekDays
    .reduce(
      (monthes, day) =>
        monthes.includes(months[day.getMonth()])
          ? monthes
          : [...monthes, months[day.getMonth()]],
      []
    )
    .join(" - ");
};

const convertFormFieldsToServerFormat = (
  selectedDate,
  transformedEventData
) => ({
  title: transformedEventData.title,
  description: transformedEventData.description,
  dateFrom: new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    transformedEventData.startTime[0],
    transformedEventData.startTime[1]
  ),
  dateTo: new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    transformedEventData.endTime[0],
    transformedEventData.endTime[1]
  ),
});

export const normalizeFormFields = (eventData) => {
  let transformedEventData = { ...eventData };
  let { startTime, endTime } = transformedEventData;
  if (startTime.split(":")[0] > endTime.split(":")[0]) {
    [endTime, startTime] = [startTime, endTime];
  }
  transformedEventData = {
    ...transformedEventData,
    startTime: startTime.split(":"),
    endTime: endTime.split(":"),
  };
  const selectedDate = new Date(transformedEventData.date);

  return convertFormFieldsToServerFormat(selectedDate, transformedEventData);
};
