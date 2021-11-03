import { parsePage } from 'utils/parsers';

const getNotesParser = (req, res, next) => {
  const { page = 1 } = req.query;

  try {
    const parsedPage = parsePage(page);
    req.query.page = parsedPage;
  } catch (err) {
    next(err);
  }

  next();
};

export default getNotesParser;
