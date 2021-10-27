const STATUS_CODES = {
  success: {
    OK: 200,
  },
  clientErrors: {
    INVALID_REQUEST: 400,
  },
  serverErrors: {
    INTERNAL_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },
};

export default STATUS_CODES;
