import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Grid, Header, Card, Placeholder } from 'semantic-ui-react';
import PlaceHolderCard from '../../components/PlaceholderCard';
import Layout from '../../components/Layout/Layout';
import Campign from '../../ethereum/Campign';
import web3 from '../../ethereum/web3';

class Show extends Component {
  state = {
    loading: true,
    manager: '',
    balance: '',
    contributorCount: '',
    requestCount: ''
  };
  async componentDidMount() {
    const { router } = this.props;
    const { query } = router;
    const CampaingInstance = Campign(query.address);
    try {
      const manager = await CampaingInstance.methods.manager().call();
      const balance = await web3.eth.getBalance(query.address);
      const request = await CampaingInstance.methods.requestCount().call();
      const contributorCountHex = await CampaingInstance.methods
        .contributorCount()
        .call();
      const contributorCount = web3.utils.hexToNumber(contributorCountHex._hex);
      const requestCount = web3.utils.hexToNumber(request._hex);
      this.setState({
        loading: false,
        manager,
        balance,
        requestCount,
        contributorCount
      });
    } catch (e) {}
  }
  render() {
    const { router } = this.props;
    const { query } = router;
    const {
      loading,
      manager,
      balance,
      contributorCount,
      requestCount
    } = this.state;
    return (
      <Layout>
        <Grid>
          <Grid.Row>
            <Header as="h4">
              Campaing Information
              <Header.Subheader>
                Showing Information for {query.address}
              </Header.Subheader>
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="12">
              <Card.Group itemsPerRow="2">
                <PlaceHolderCard
                  loading={loading}
                  cardHeader="Manager"
                  cardMeta="managed by"
                  cardDesc={manager}
                />
                <PlaceHolderCard
                  loading={loading}
                  cardHeader="Balance"
                  cardMeta="Eth"
                  cardDesc={balance}
                />
                <PlaceHolderCard
                  loading={loading}
                  cardHeader="Requests"
                  cardMeta={`total request ${requestCount}`}
                />
                <PlaceHolderCard
                  loading={loading}
                  cardHeader="Contributions"
                  cardMeta="Number of Contributions"
                  cardDesc={contributorCount}
                />
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default withRouter(Show);
