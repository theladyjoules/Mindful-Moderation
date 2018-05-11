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
      mealId: pathname[2]
    }
  }

  componentDidMount(){
    if(!(this.state.mealId in this.props.log.loadedMeals)){
      console.log('getting meal from server: ' + this.state.mealId)
      this.props.getMealById(this.state.mealId)
    }
  }

  render() {
    let displayDate = null
    let pageContent = <Loader />
    if(this.state.mealId in this.props.log.loadedMeals){
      const thisMeal = this.props.log.loadedMeals[this.state.mealId]
      const mealDate = moment(thisMeal.mealDate)
      displayDate = <h1>{mealDate.format("dddd")}<span>{mealDate.format("MMMM Do")}</span></h1>
      pageContent = (
        <div className="meal-summary-wrapper">
          <div className="row">
            <MealCard meal={thisMeal} showEditLink={true} cardClass=" col-md-push-3" />
          </div>
          <Link to={"/day/" + thisMeal.mealDateHumanFormat} className="cta-back ion-chevron-left">Back</Link>
        </div>
      )
    }
    return (
      <div className="container meal-view">
        <div className="row">
          <div className="col-xs-12">
            <div className="view-header">
              {displayDate}
            </div>
            {pageContent}
            <Link to="/log-meal" className="log-cta ion-plus-round"></Link>
          </div>
        </div>
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