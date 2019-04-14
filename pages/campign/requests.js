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
    contributorCount: 0
  };
  async componentDidMount() {
    const { router } = this.props;
    const { query } = router;
    const CampaingInstance = Campign(query.address);
    const manager = await CampaingInstance.methods.manager().call();
    const request = await CampaingInstance.methods.requestCount().call();
    const contributorCount = await CampaingInstance.methods
      .contributorCount()
      .call();
    const requestCount = web3.utils.hexToNumber(request._hex);
    let data = Array.from({ length: requestCount }, (_, i) =>
      CampaingInstance.methods.getRequest(i + 1).call()
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
      appoversCount: web3.utils.hexToNumber(d._contribCount._hex)
    }));
    this.setState({
      data: tableData,
      requestCount,
      contributorCount: web3.utils.hexToNumberString(contributorCount._hex),
      manager
    });
  }
  render() {
    const { data, requestCount, open, contributorCount } = this.state;
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
                        <Button color="green">Approve</Button>
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
              <Button
                floated="right"
                basic
                color="teal"
                onClick={() => this.setState({ open: true })}
              >
                Add a New Request
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal open={open} centered={false}>
          <Modal.Header>Add a New Request</Modal.Header>
          <Modal.Content>
            <Modal.Description style={{ paddingBottom: 48 }}>
              <NewRequestForm address={query.address} />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Layout>
    );
  }
}

export default withRouter(Requests);
