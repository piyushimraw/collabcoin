import React, { Component } from 'react';
import factory from '../ethereum/facotory';
import web3 from '../ethereum/web3';

export default class show extends Component {
  static async getInitialProps() {
    const campignCount = await factory.methods.getCampignCount().call();

    return { campignCount };
  }
  render() {
    const { campignCount } = this.props;
    return (
      <div>No of Campigns {web3.utils.hexToNumber(campignCount._hex)}</div>
    );
  }
}
