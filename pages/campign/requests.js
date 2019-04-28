import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';
import { Table, Button, Grid, Modal } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';
import Campign from '../../ethereum/Campign';
import web3 from '../../ethereum/web3';
import NewRequestForm from '../../components/NewRequestForm';

class Requests extends Component {
  state = {
    data: [],
    tableData: [],
    requestCount: '',
    manager: '',
    open: false,
    contributorCount: 0,
    account: ''
  };

  async componentDidMount() {
    const { router } = this.props;
    const { query } = router;
    const CampaingInstance = Campign(query.address);
    const account = await web3.eth.getAccounts();
    const isContributor = await CampaingInstance.methods
      .isContributed(account[0])
      .call();
    const manager = await CampaingInstance.methods.manager().call();
    const contributorCount = await CampaingInstance.methods
      .contributorCount()
      .call();
    const request = await CampaingInstance.methods.requestCount().call();
    const requestCount = web3.utils.hexToNumber(request._hex);
    let data = Array.from({ length: requestCount }, (_, i) =>
      CampaingInstance.methods.getRequest(i + 1, account[0]).call()
    );
    data = await Promise.all(data);
    const tableData = await data.map((d, i) => ({
      id: i + 1,
      desc: d._desc,
      beneficary: d._beneficary,
      value: web3.utils.fromWei(
        web3.utils.hexToNumberString(d._val._hex),
        'ether'
      ),
      isCompleted: d.isCompleted,
      appoversCount: web3.utils.hexToNumber(d._contribCount._hex),
      canApprove: isContributor && !d.hasApporved
    }));
    console.log(tableData);
    this.setState({
      data: tableData,
      requestCount,
      contributorCount: web3.utils.hexToNumberString(contributorCount._hex),
      manager,
      account: account[0]
    });
  }

  closeModal = async () => {
    const { router } = this.props;
    const { query } = router;
    const CampaingInstance = Campign(query.address);
    const request = await CampaingInstance.methods.requestCount().call();
    const account = await web3.eth.getAccounts();
    const requestCount = web3.utils.hexToNumber(request._hex);
    let data = Array.from({ length: requestCount }, (_, i) =>
      CampaingInstance.methods.getRequest(i + 1, account[0]).call()
    );
    data = await Promise.all(data);
    const tableData = data.map((d, i) => ({
      id: i + 1,
      desc: d._desc,
      beneficary: d._beneficary,
      value: web3.utils.fromWei(
        web3.utils.hexToNumberString(d._val._hex),
        'ether'
      ),
      isCompleted: d.isCompleted,
      appoversCount: web3.utils.hexToNumber(d._contribCount._hex),
      hasApproved: d.hasApproved
    }));
    this.setState({
      data: tableData,
      requestCount,
      open: false
    });
  };

  render() {
    const {
      data,
      requestCount,
      open,
      contributorCount,
      manager,
      account
    } = this.state;
    const { router } = this.props;
    const { query } = router;
    return (
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column width="16">
              <Table
                tableData={data}
                headerRow={
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Beneficary</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                    <Table.HeaderCell>Approvers</Table.HeaderCell>
                  </Table.Row>
                }
                renderBodyRow={(data, index) => {
                  return (
                    <Table.Row key={data.id}>
                      <Table.Cell>{data.id}</Table.Cell>
                      <Table.Cell>{data.desc}</Table.Cell>
                      <Table.Cell>{data.beneficary}</Table.Cell>
                      <Table.Cell>{data.value} ETH</Table.Cell>
                      <Table.Cell>
                        {data.appoversCount}/{contributorCount}
                      </Table.Cell>
                      <Table.Cell>
                        <Button color="green" disabled={!data.canApprove}>
                          Approve
                        </Button>
                        <Button color="teal" disabled>
                          Finalize
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="16">
              {manager === account && (
                <Button
                  floated="right"
                  basic
                  color="teal"
                  onClick={() => this.setState({ open: true })}
                >
                  Add a New Request
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal open={open} centered={false}>
          <Modal.Header>Add a New Request</Modal.Header>
          <Modal.Content>
            <Modal.Description style={{ paddingBottom: 48 }}>
              <NewRequestForm
                address={query.address}
                onClose={this.closeModal}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Layout>
    );
  }
}

export default withRouter(Requests);
