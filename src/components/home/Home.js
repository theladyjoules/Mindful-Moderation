import React from 'react'
import { connect } from 'react-redux';
import HomeMarketing from './HomeMarketing'

class Home extends React.Component {

  render() {
    return (
      <section>
        <HomeMarketing />
      </section>
    )
  }
}

export default Home