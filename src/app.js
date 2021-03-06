import React, { Component } from 'react';

import loadBalanceData from './lib/api';
import { formatStringToCurrency } from './lib/formatters';

import TableHeader from './components/table-header';
import TableBody from './components/table-body';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    loadBalanceData()
      .then((data) => {
        this.setState(data);
      })
      .catch(() => {
        this.setState({ empty: true });
      });
  }

  render() {
    return (
      <div>
        <h1>Bench Test</h1>

        { this.state.empty &&
          <h4 className="empty-list">Sorry, No Data Available.</h4>
        }

        { this.state.balance &&
          <table>
            <TableHeader data={['Date', 'Company', 'Account', formatStringToCurrency(this.state.balance)]} />
            <TableBody rows={this.state.rows} />
          </table>
        }
      </div>
    );
  }
}

export default App;
