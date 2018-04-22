import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Home extends React.Component {

  render() {
    return (
      <div>
        <h1>{moment().format("dddd, MMMM Do")}</h1>
        <div className="meal-summary-wrapper">
          Logged meals will go here.
        </div>
        <Link to='/log-meal' className="btn">Log Meal</Link>
      </div>
    )
  }
}

export default Home