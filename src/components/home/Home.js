import React from 'react'
import { connect } from 'react-redux';
import HomeMarketing from './HomeMarketing'
import HomeUser from './HomeUser'
import RequireAuth  from '../auth/Require-Auth'

class Home extends React.Component {

  render() {
    return (
      <section>
        {this.props.isLoggedIn ? (
          <HomeUser />
        ) : (
          RequireAuth(<HomeMarketing />)
        )}
      </section>
    )
  }
}

Home = connect(
  state => ({
    isLoggedIn: state.auth.authenticated,
  }),
  null
)(Home)

export default Home