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
    if(this.props.log.loadedMeals.indexOf(this.state.mealId) === -1){
      console.log('getting meal from server: ' + this.state.mealId)
      this.props.getMealById(this.state.mealId)
    }
  }

  render() {
    let displayDate = null
    let pageContent = <Loader />
    if(this.props.log.loadedMeals.indexOf(this.state.mealId) > -1){
      const thisMeal = this.props.log[this.state.day][this.state.mealId]
      const mealDate = moment(thisMeal.mealDate)
      displayDate = <h1>{mealDate.format("dddd")}<span>{mealDate.format("MMMM Do")}</span></h1>
      pageContent = <MealCard meal={thisMeal} showEditLink={true} />
    }
    return (
      <div className="container meal-view">
        <div className="day-view-header">
          {displayDate}
        </div>
        <div className="meal-summary-wrapper row">
          {pageContent}
        </div>
        <Link to={"/day/" + this.state.day} className="cta-back ion-chevron-left">Back</Link>
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