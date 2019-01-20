import React, { Component } from 'react'

import { Layout } from '../shared' 
import { Logo } from '../svg'

export default class Home extends Component {
  render() {
    return (
      <Layout header={true}>
            <Logo />
      </Layout>
    )
  }
}
