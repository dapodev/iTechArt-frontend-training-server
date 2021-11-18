const PORT = process.env.PORT || 3000;

const SERVER_LOCALE = 'en-US';

const SERVER_DATETIME_OPTIONS = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Europe/Moscow',
};

export { PORT , SERVER_LOCALE, SERVER_DATETIME_OPTIONS};
