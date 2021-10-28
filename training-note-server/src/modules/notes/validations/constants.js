const MIN_TITLE_LENGTH = 3;

const MIN_DESCRIPTION_LENGTH = 3;
const MAX_DESCRIPTION_LENGTH = 500;

const ID_PATTERN = /^-{0,1}\d+$/;

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const NAME_PATTERN = /^[A-Z][a-z]+(-[A-Z][a-z]+)*$/;

const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9]{8,})$/;

export {
  MIN_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  ID_PATTERN,
  EMAIL_PATTERN,
  NAME_PATTERN,
  PASSWORD_PATTERN,
};
