import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';
import { Grid, Header, Card, Placeholder } from 'semantic-ui-react';
import PlaceHolderCard from '../../components/PlaceholderCard';
import ContributeForm from '../../components/ContributeForm';
import Layout from '../../components/Layout/Layout';
import Campign from '../../ethereum/Campign';
import web3 from '../../ethereum/web3';

class Show extends Component {
  state = {
    loading: true,
    manager: '',
    balance: '',
    contributorCount: '',
    requestCount: '',
    minimumVal: '',
    submitting: false,
    submissionMessage: '',
  };
  async componentDidMount() {
    const { router } = this.props;
    const { query } = router;
    const CampaingInstance = Campign(query.address);
    try {
      const manager = await CampaingInstance.methods.manager().call();
      const balance = await web3.eth.getBalance(query.address);
      const requestCount = await CampaingInstance.methods.requestCount().call();
      const contributorCount = await CampaingInstance.methods
        .contributorCount()
        .call();
      const minimumVal = await CampaingInstance.methods.minimumVal().call();
      this.setState({
        loading: false,
        manager,
        balance: web3.utils.fromWei(balance, 'ether'),
        requestCount,
        minimumVal: web3.utils.hexToNumberString(minimumVal._hex),
        contributorCount,
      });
    } catch (e) {}
  }

  contribute = async (value) => {
    this.setState({
      submitting: true,
    });
    const newValue = web3.utils.toWei(value, 'ether');
    const { router } = this.props;
    const { query } = router;
    const CampaingInstance = Campign(query.address);
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length !== 0) {
        await CampaingInstance.methods
          .contribute()
          .send({
            from: accounts[0],
            value: newValue,
          })
          .on('transactionHash', (hash) => {
            this.setState({
              submissionMessage: `trasaction is being hashed ${hash}`,
            });
          })
          .on('confirmation', (number, reciept) =>
            this.setState({
              submissionMessage: `${number} out of 10 confirmations Done!!`,
            })
          );
        const contributorCountHex = await CampaingInstance.methods
          .contributorCount()
          .call();
        const balance = await web3.eth.getBalance(query.address);
        const contributorCount = web3.utils.hexToNumber(
          contributorCountHex._hex
        );
        this.setState({
          submitting: false,
          balance: web3.utils.fromWei(balance, 'ether'),
          contributorCount,
          submissionMessage: '',
        });
      }
    } catch (e) {
      this.setState({
        submitting: false,
      });
    }
  };
  render() {
    const { router } = this.props;
    const { query } = router;
    const {
      loading,
      manager,
      balance,
      contributorCount,
      minimumVal,
      requestCount,
      submitting,
      submissionMessage,
    } = this.state;
    submissionMessage;
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
            <Grid.Column width="13">
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
                  onClick={() =>
                    Router.push(`
                  /campign/show/requests?address=${query.address}
                  `)
                  }
                  loading={loading}
                  cardHeader="Requests"
                  cardMeta={`total request`}
                  cardDesc={requestCount}
                />
                <PlaceHolderCard
                  loading={loading}
                  cardHeader="Contributions"
                  cardMeta="Number of Contributions"
                  cardDesc={contributorCount}
                />
              </Card.Group>
            </Grid.Column>
            <Grid.Column width="3">
              <ContributeForm
                minimumAmount={minimumVal}
                contribute={this.contribute}
                submitting={submitting}
                submissionMessage={submissionMessage}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default withRouter(Show);
