import React from 'react'
import { connect } from 'react-redux';
import DayView from '../log/DayView'
import RequireAuth  from '../auth/Require-Auth'

class Home extends React.Component {

  render() {
    return (
      <section className="homepage-wrapper">
        {this.props.isLoggedIn ? (
          <DayView />
        ) : (
          <div>
            Welcome to MindfulModeration. Soon there will be more info here to tell you what this is all about.
          </div>
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