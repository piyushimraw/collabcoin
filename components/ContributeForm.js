import React, { Component } from 'react';
import { Form, Button, Input, Label } from 'semantic-ui-react';

export default class ContributeForm extends Component {
  state = {
    value: ''
  };
  render() {
    const { value } = this.state;
    const { minimumAmount = 0, contribute } = this.props;
    return (
      <Form>
        <Form.Field>
          <label>Contribute!</label>
          <Input
            value={value}
            onChange={e => this.setState({ value: e.target.value })}
            labelPosition="right"
            type="text"
            placeholder={`minimum amount ${minimumAmount}`}
          >
            <input />
            <Label>eth</Label>
          </Input>
        </Form.Field>
        <Button color="teal" onClick={() => contribute(value)} role="submit">
          Contribute
        </Button>
      </Form>
    );
  }
}
