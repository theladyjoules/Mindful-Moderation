import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import MealCard from '../meal/MealCard'

class Home extends React.Component {

  render() {
    return (
      <div className="container daily-view">
        <h1>{moment().format("dddd")}<span>{moment().format("MMMM Do")}</span></h1>
        <div className="meal-summary-wrapper row">
          <MealCard />
          <MealCard />
          <MealCard />
          <MealCard />
        </div>
      </div>
    )
  }
}

export default Home