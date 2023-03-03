const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const DIFFERENCE_BETWEEN_WEEKS_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;
export const HOURS_IN_DAY = 24;
export const afterSixDays = DIFFERENCE_BETWEEN_WEEKS_MILLISECONDS - MILLISECONDS_IN_DAY;
export const MILLISECONDS_IN_HOUR = 1000 * 60 * 60;
export const MILLISECONDS_IN_MINUTE = 1000 * 60;

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getWeekStartDate = date => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = startDate => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = mins => (mins < 10 ? `0${mins}` : mins);

export const goToCertainDate = (
  weekStartDate,
  direction,
  difference = DIFFERENCE_BETWEEN_WEEKS_MILLISECONDS,
) => {
  if (direction === 'forward') {
    const forward = new Date(getWeekStartDate(weekStartDate).getTime() + difference);
    return forward;
  }
  if (direction === 'backward') {
    return new Date(getWeekStartDate(weekStartDate) - difference);
  }
  throw new Error('Wrong argument');
};

export const getApproppriateMonths = weekStartDate => {
  const getMonthFromEndWeek = goToCertainDate(weekStartDate, 'forward', afterSixDays).getMonth();

  if (weekStartDate.getMonth() === getMonthFromEndWeek) {
    return months[weekStartDate.getMonth()];
  }

  return `${months[weekStartDate.getMonth()]} - ${
    months[(weekStartDate.getMonth() + 1) % months.length]
  }`;
};
