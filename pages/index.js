import React, { Component } from 'react';
import Link from 'next/link';
import { Header, Grid, Button, Icon } from 'semantic-ui-react';
import factory from '../ethereum/facotory';
import web3 from '../ethereum/web3';
import Layout from '../components/Layout/Layout';
import CampignCard from '../components/CampignCard';

export default class show extends Component {
  static async getInitialProps() {
    const campignCountNum = await factory.methods.getCampignCount().call();
    // let campigns =  Array.from({length : campignCountNum}, (_,i) => i);
    // console.log(campigns);
    let campigns = Array.from({ length: campignCountNum }, (_, i) =>
      factory.methods.campigns(i).call()
    );
    campigns = await Promise.all(campigns);
    // for (let i = 0; i < campignCountNum; i++) {
    //   const campign = await factory.methods.campigns(i).call();
    //   campigns.push(campign);
    // }
    return { campignCountNum, campigns };
  }
  render() {
    const { campignCountNum, campigns } = this.props;
    return (
      <Layout>
        <Header as="h3">
          Campaigns
          <Header.Subheader>
            All current campaigns are displayed here.
          </Header.Subheader>
        </Header>
        <Grid>
          <Grid.Column width={13}>
            <CampignCard campigns={campigns} />
          </Grid.Column>
          <Grid.Column width={3}>
            <Link href="/campign/new">
              <a>
                <Button color="teal">
                  <Icon name="add circle" />
                  Add Campign
                </Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}
