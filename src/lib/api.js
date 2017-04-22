import getJson from 'fetch-json/get';

const FIRST_PAGE = 1;

const buildUrl = page => `http://resttest.bench.co/transactions/${page}.json`;
const getPage = page => getJson(buildUrl(page));

const getRemainingPageNumbers = (pagesRemaining) => {
  const numbers = [];
  for (let i = FIRST_PAGE + 1; i <= FIRST_PAGE + pagesRemaining; i++) {
    numbers.push(i);
  }
  return numbers;
};

const fetchRemainingPages = (pagesRemaining) => {
  const remainingPageNumbers = getRemainingPageNumbers(pagesRemaining);
  return Promise.all(remainingPageNumbers.map(getPage));
};

const getBalance = rows => (
  rows.reduce((balance, row) => (
    balance + parseFloat(row.Amount)
  ), 0)
);

const loadBalanceData = () => {
  let rows;

  return getPage(FIRST_PAGE)
    .then(({ totalCount, transactions }) => {
      rows = transactions;

      const pagesRemaining = Math.ceil((totalCount - transactions.length) / transactions.length);
      return fetchRemainingPages(pagesRemaining);
    })
    .then((results) => {
      // Flatten transactions arrays into the rows array
      results.forEach(({ transactions }) => {
        rows = [...rows, ...transactions];
      });

      return {
        rows,
        balance: getBalance(rows)
      };
    });
};

export default loadBalanceData;
