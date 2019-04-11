import React, { Component } from 'react';
import {
  Header,
  Form,
  Input,
  Dropdown,
  Button,
  Message,
  Icon
} from 'semantic-ui-react';
import factory from '../../ethereum/facotory';
import Layout from '../../components/Layout/Layout';
import web3 from '../../ethereum/web3';

export default class New extends Component {
  state = {
    minimumAmount: '',
    error: '',
    message: '',
    loading: false
  };

  onFormSubmit = async e => {
    e.preventDefault();
    this.setState({ error: '', loading: true });
    if (!this.state.minimumAmount) {
      this.setState({
        error: 'please enter some minimum amount',
        loading: false
      });
      return;
    }
    try {
      const { minimumAmount } = this.state;
      const minimum = web3.utils.toWei(minimumAmount, 'wei');
      const account = await web3.eth.getAccounts();
      if (account.length === 0 && window && window.ethereum)
        await ethereum.enable();
      else {
        const campign = factory.methods
          .createNewCampign(minimum)
          .send({
            from: account[0]
          })
          .on('transactionHash', hash =>
            this.setState({ message: `trasaction is being hashed ${hash}` })
          )
          .on('confirmation', (number, reciept) =>
            this.setState({
              message: `${number} out of 24 confirmations Done!!`
            })
          )
          .then(() => this.setState({ loading: false }));
      }
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <Layout>
        <Header>
          Want to create your own Campign ?
          <Header.Subheader>
            Create a new campign with some minimum wei and build your idea.
          </Header.Subheader>
        </Header>
        <Form onSubmit={this.onFormSubmit} error={!!this.state.error}>
          <Form.Field>
            <label>Please Enter Minimum value for Your Contract</label>
            <Input
              value={this.state.minimumAmount}
              onChange={e => this.setState({ minimumAmount: e.target.value })}
              label={
                <Dropdown
                  defaultValue="wei"
                  options={[
                    { key: 'wei', text: 'wei', value: 'wei' },
                    { key: 'kwei', text: 'kwei', value: 'kwei' }
                  ]}
                />
              }
              labelPosition="right"
              placeholder="Enter Amount"
            />{' '}
          </Form.Field>
          <Button role="submit" color="teal" loading={this.state.loading}>
            Create campign
          </Button>
        </Form>
        <Message error hidden={!this.state.error}>
          {this.state.error}
        </Message>
        <Message icon hidden={!this.state.loading}>
          <Icon name="circle notched" loading={this.state.loading} />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            {this.state.message || 'We are fetching that content for you'}
          </Message.Content>
        </Message>
      </Layout>
    );
  }
}
