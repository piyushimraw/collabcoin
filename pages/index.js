import React, { Component } from 'react';
import factory from '../ethereum/facotory';
import web3 from '../ethereum/web3';
import Layout from '../components/Layout/Layout';
import CampignCard from '../components/CampignCard';

export default class show extends Component {
  static async getInitialProps() {
    const campignCount = await factory.methods.getCampignCount().call();
    const campignCountNum = web3.utils.hexToNumber(campignCount._hex);
    const campigns = [];
    for (let i = 0; i < campignCountNum; i++) {
      const campign = await factory.methods.campigns(i).call();
      console.log(campign);
      campigns.push(campign);
    }
    return { campignCount, campigns };
  }
  render() {
    const { campignCount, campigns } = this.props;
    console.log(campigns);
    return (
      <Layout>
        <CampignCard campigns={campigns} />
        <div>No of Campigns {web3.utils.hexToNumber(campignCount._hex)}</div>
      </Layout>
    );
  }
}
