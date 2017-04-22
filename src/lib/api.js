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

/*
  In this function I chose to optimize response time
  by fetching all remaining pages concurrently.

  Obviously this is a solution that doesn't scale,
  but I thought it would be a nice tweak considering I
  knew how few pages there were.
*/
const fetchRemainingPages = (pagesRemaining) => {
  const remainingPageNumbers = getRemainingPageNumbers(pagesRemaining);
  return Promise.all(remainingPageNumbers.map(getPage));
};

const getBalance = rows => (
  rows.reduce((balance, row) => (
    balance + parseFloat(row.Amount)
  ), 0)
);

/*
  The fact that I need do download multiple pages in order to
  calculate the balance is definitely not ideal.

  In the real world, I'd tell the API devs to either provide the total balance
  as a property in each response, or to provide a separate endpoint for the balance.

  Obviously there aren't any backend devs in coding tests, so I had to do some ugly
  shared scope stuff to do this efficiently.
*/
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
