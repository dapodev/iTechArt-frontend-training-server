const PORT = process.env.PORT || 3000;

const SERVER_LOCALE = 'en-US';

const SERVER_DATETIME_OPTIONS = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Europe/Moscow',
};

const TOKEN_LIFE_TIME = '24h';
const REFRESH_TOKEN_LIFE_TIME = '24h';

export {
  PORT,
  SERVER_LOCALE,
  SERVER_DATETIME_OPTIONS,
  TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
};
