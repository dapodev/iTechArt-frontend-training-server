import { SERVER_DATETIME_OPTIONS, SERVER_LOCALE } from 'config/constants';

const getServerCurrentDateTime = () => {
  const currentDate = new Date();

  const convertedDateString = currentDate.toLocaleDateString(
    SERVER_LOCALE,
    SERVER_DATETIME_OPTIONS
  );

  const convertedDate = new Date(convertedDateString);

  return convertedDate;
};

export { getServerCurrentDateTime };
