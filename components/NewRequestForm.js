import React, { Component } from 'react';
import { Container, Form, Label, Input, Icon, Button } from 'semantic-ui-react';
import Campign from '../ethereum/Campign';
import web3 from '../ethereum/web3';

export default class NewRequestForm extends Component {
  state = {
    description: '',
    value: '',
    address: ''
  };
  onClickAdd = async () => {
    const { address: CampingAddress } = this.props;
    const CampignInstance = Campign(CampingAddress);
    const { description, value, address } = this.state;
    const account = await web3.eth.getAccounts();
    const valueInEther = web3.utils.toWei(value, 'ether');
    const newRequest = await CampignInstance.methods
      .createRequest(description, valueInEther, address)
      .send({
        from: account[0]
      });
    console.log(newRequest);
    try {
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { value, address, description } = this.state;
    return (
      <Container fluid style={{ margin: 16 }}>
        <Form>
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

          <Button color="teal" floated="right" onClick={this.onClickAdd}>
            Add
          </Button>
          <Button basic color="red" floated="right">
            Cancel
          </Button>
        </Form>
      </Container>
    );
  }
}
