import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';
import { Table, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';
import Campign from '../../ethereum/Campign';
import web3 from '../../ethereum/web3';

class Requests extends Component {
  state = {
    data: [],
    tableData: [],
    manager: ''
  };
  async componentDidMount() {
    const { router } = this.props;
    const { query } = router;
    const CampaingInstance = Campign(query.address);
    const manager = await CampaingInstance.methods.manager().call();
    const request = await CampaingInstance.methods.requestCount().call();
    const requestCount = web3.utils.hexToNumber(request._hex);
    const data = [];
    for (let i = 1; i <= requestCount; i++) {
      const request = await CampaingInstance.methods.getRequest(i).call();
      data.push({
        id: i,
        desc: request._desc,
        beneficary: request._beneficary,
        value: web3.utils.hexToNumber(request._val._hex),
        isCompleted: request.isCompleted,
        appoversCount: web3.utils.hexToNumber(request._contribCount._hex)
      });
    }
    this.setState({
      data,
      manager
    });
  }
  render() {
    const { data } = this.state;
    return (
      <Layout>
        <Table
          tableData={data}
          headerRow={
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Beneficary</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
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
                  <Button color="green">Approve</Button>
                  <Button color="teal" disabled>
                    Finalize
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          }}
        />
      </Layout>
    );
  }
}

export default withRouter(Requests);
