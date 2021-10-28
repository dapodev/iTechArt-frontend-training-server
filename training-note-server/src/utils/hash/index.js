import crypto from 'crypto';

const generateMD5fromString = (value) => {
  let totalValue;

  if (typeof value === 'string') {
    totalValue = crypto.createHash('md5').update(value).digest('hex');
  } else {
    totalValue = undefined;
  }

  return totalValue;
};

export { generateMD5fromString };
