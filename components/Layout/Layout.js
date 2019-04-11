import React, { Component } from 'react';
import { Container, Menu, Icon } from 'semantic-ui-react';
import Head from 'next/head';
import Link from 'next/link';
export default class Layout extends Component {
  render() {
    return (
      <Container>
        <Head>
          <title>CollabCoin</title>
        </Head>
        <Menu>
          <Menu.Item header link>
            <Link href="/">
              <div>
                <Icon name="viacoin" color="teal" size="large" /> CrowdCoin
              </div>
            </Link>
          </Menu.Item>
        </Menu>
        {this.props.children}
      </Container>
    );
  }
}
