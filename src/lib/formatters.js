export const formatStringToCurrency = (amountString) => {
  const floatAmount = parseFloat(amountString);
  const stringAmount = floatAmount.toFixed(2).toString().replace('-', '');
  return floatAmount >= 0 ? `$${stringAmount}` : `($${stringAmount})`;
};
