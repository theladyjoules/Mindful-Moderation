import React from 'react'
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom'
import moment from 'moment'
import Loader from '../global/Loader'
import MealCard from './MealCard'
import { getMealById } from '../../actions/log_actions';

class DayView extends React.Component {
  constructor(props) {
    super(props);
    const pathname = window.location.pathname.split( '/' )
    this.state = {
      day: pathname[2],
      mealId: pathname[4]
    }
  }

  componentDidMount(){
    if(!(this.state.day in this.props.log) || (this.state.day in this.props.log && !(this.state.mealId in this.props.log[this.state.day]))){
      console.log('getting meal from server: ' + this.state.mealId)
      this.props.getMealById(this.state.mealId)
    }
  }

  render() {
    let displayDate = null
    let pageContent = <Loader />
    if(this.state.day in this.props.log && this.state.mealId in this.props.log[this.state.day]){
      const thisMeal = this.props.log[this.state.day][this.state.mealId]
      const mealDate = moment(thisMeal.mealDate)
      displayDate = <h1>{mealDate.format("dddd")}<span>{mealDate.format("MMMM Do")}</span></h1>
      pageContent = <MealCard meal={thisMeal} />
    }
    return (
      <div className="container meal-view">
        <div className="day-view-header">
          {displayDate}
        </div>
        <div className="meal-summary-wrapper row">
          {pageContent}
        </div>
        <Link to="/log-meal" className="log-cta ion-plus-round"></Link>
      </div>
    )
  }
}

DayView = connect(
  state => ({
    log: state.log,
  }),
  { getMealById  }
)(DayView)

export default DayView