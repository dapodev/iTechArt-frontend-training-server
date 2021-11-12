import { parsePage } from 'utils/parsers';

const getSharedParser = (req, res, next) => {
  const { page = 1 } = req.query;

  const parsedPage = parsePage(page);
  req.query.page = parsedPage;

  next();
};

export default getSharedParser;
