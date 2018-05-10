import React from 'react'
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom'
import moment from 'moment'
import MealCard from './MealCard'
import { getMealsByDay } from '../../actions/log_actions';

class DayView extends React.Component {
  constructor(props) {
    super(props);
    const pathname = window.location.pathname.split( '/' )
    this.state = {
      day: (window.location.pathname === '/') ? moment().format('MM-DD-YYYY') : pathname[2]
    }
  }

  componentDidMount(){
    if(!(this.state.day in this.props.log.loadedDays)){
      console.log('getting day from server: ' + this.state.day)
      this.props.getMealsByDay(this.state.day)
    }
  }

  render() {
    const cards = (this.state.day in this.props.log.loadedDays && Object.keys(this.props.log.loadedDays[this.state.day]).length) ? Object.values(this.props.log.loadedDays[this.state.day]).map( (meal, index) =>
      <MealCard key={index} meal={this.props.log.loadedMeals[meal]} showViewLink={true} showEditLink={true} />
    ) : (
      <div className="day-help-text">
        Use the plus below to log a meal or snack.
      </div>
    );
    const today = moment()
    const currentDay = moment(this.state.day)
    const isToday = today.isSame(currentDay, 'd')
    const prevLink = <Link className="ion-chevron-left" to={'/day/' + currentDay.subtract(1, 'days').format('MM-DD-YYYY')} />
    const nextLink = (isToday) ? <div></div> : <Link className="ion-chevron-right" to={'/day/' + currentDay.add(2, 'days').format('MM-DD-YYYY')} />
    return (
      <div className="container daily-view">
        <div className="row">
          <div className="col-xs-12">
            <div className="view-header">
              {prevLink}
              <h1>{moment(this.state.day).format("dddd")}<span>{moment(this.state.day).format("MMMM Do")}</span></h1>
              {nextLink}
            </div>
          </div>
        </div>
        <div className="meal-summary-wrapper row">
          {cards}
          <Link to={"/calendar/" + currentDay.format('MM-YYYY')} className="cta-calendar ion-chevron-left">Calendar</Link>
        </div>
        <div className="container log-cta-wrapper">
          <div className="row">
            <div className="col-xs-12">
              <Link to="/log-meal" className="log-cta ion-plus-round"></Link>
            </div>
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
  { getMealsByDay }
)(DayView)

export default DayView