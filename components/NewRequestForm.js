import React, { Component } from 'react';
import { Container, Form, Label, Input, Icon, Button } from 'semantic-ui-react';
import Campign from '../ethereum/Campign';
import web3 from '../ethereum/web3';

export default class NewRequestForm extends Component {
  state = {
    description: '',
    value: '',
    address: '',
    loading: false
  };
  onClickAdd = async () => {
    const { address: CampingAddress, onClose } = this.props;
    const CampignInstance = Campign(CampingAddress);
    const { description, value, address } = this.state;
    const account = await web3.eth.getAccounts();
    const valueInEther = web3.utils.toWei(value, 'ether');
    this.setState({
      loading: true
    });
    const newRequest = await CampignInstance.methods
      .createRequest(description, valueInEther, address)
      .send({
        from: account[0]
      });
    this.setState({
      loading: false
    });
    onClose();
    try {
    } catch (e) {
      this.setState({
        loading: false
      });
      console.log(e);
    }
  };
  render() {
    const { value, address, description, loading } = this.state;
    return (
      <Container fluid style={{ margin: 16 }}>
        <Form loading={loading}>
          <Form.Field>
            <label>Description</label>
            <Input
              placeholder="Add a Description"
              placeholder="Description"
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Eth</label>
            <Input
              value={value}
              labelPosition="right"
              placeholder="Value"
              label="ETH"
              onChange={e => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <Input
              value={address}
              placeholder="Address of Beneficiary"
              onChange={e => this.setState({ address: e.target.value })}
            />
          </Form.Field>

          <Button
            color="teal"
            floated="right"
            onClick={this.onClickAdd}
            loading={loading}
          >
            Add
          </Button>
          <Button basic color="red" floated="right" loading={loading}>
            Cancel
          </Button>
        </Form>
      </Container>
    );
  }
}
