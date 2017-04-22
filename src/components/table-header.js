import React from 'react';

const TableHeader = ({ data }) => (
  <thead>
    <tr>
      { data.map((text, i) => <th key={i}>{text}</th>)}
    </tr>
  </thead>
);

export default TableHeader;
