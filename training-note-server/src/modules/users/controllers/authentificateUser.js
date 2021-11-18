const authentificateUser = async (req, res, next) => {
  const { userData } = res.locals;

  try {
    const { email, password, firstName, lastName, birthday } = userData;

    const userPayload = { email, password, firstName, lastName, birthday };

    res.json(userPayload);
  } catch (err) {
    next(err);
  }
};

export default authentificateUser;
