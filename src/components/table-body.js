import React from 'react';

import { formatStringToCurrency } from '../lib/formatters';

const TableBody = ({ rows }) => (
  <tbody>
    {
      rows.map((row, i) => (
        <tr key={i}>
          <td>{row.Date}</td>
          <td>{row.Company}</td>
          <td>{row.Ledger}</td>
          <td>{formatStringToCurrency(row.Amount)}</td>
        </tr>
      ))
    }
  </tbody>
);

export default TableBody;
