import STATUS_CODES from '../../config/constants/statusCodes';

const greeting = (request, response) => {
  const { name } = request.query;

  if (name) {
    const htmlResponse = `
        <h1>
          Hello, ${name}!
        </h1>
      `;
    response.status(STATUS_CODES.success.OK);
    response.set('Content-Type', 'text/html');
    response.send(htmlResponse);
  } else {
    response.status(STATUS_CODES.clientErrors.INVALID_REQUEST);
    response.set('Content-Type', 'application/json');
    response.send(
      JSON.stringify({
        errorMessage: `Error ${STATUS_CODES.clientErrors.INVALID_REQUEST}: query parameter 'name' expected.`,
        errorCode: STATUS_CODES.INVALID_REQUEST,
      })
    );
  }
};

export default greeting;
