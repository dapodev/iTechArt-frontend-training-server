import { parsePage } from 'utils/parsers';

const getNotesParser = (req, res, next) => {
  const { page = 1 } = req.query;

  const parsedPage = parsePage(page);
  req.query.page = parsedPage;

  next();
};

export default getNotesParser;
