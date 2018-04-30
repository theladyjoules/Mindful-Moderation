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
    if(this.props.log.loadedDays.indexOf(this.state.day) === -1){
      console.log('getting day from server: ' + this.state.day)
      this.props.getMealsByDay(this.state.day)
    }
  }

  render() {
    const cards = (this.props.log.loadedDays.indexOf(this.state.day) > -1 && Object.keys(this.props.log[this.state.day]).length) ? Object.keys(this.props.log[this.state.day]).map( (meal, index) =>
      <MealCard key={index} meal={this.props.log[this.state.day][meal]} showViewLink={true} showEditLink={true} />
    ) : (
      <div>
        Click on the orange plus below to log a meal. :)
      </div>
    );
    const today = moment()
    const currentDay = moment(this.state.day)
    const isToday = today.isSame(currentDay, 'd')
    const prevLink = <Link className="ion-chevron-left" to={'/day/' + currentDay.subtract(1, 'days').format('MM-DD-YYYY')} />
    const nextLink = (isToday) ? <div></div> : <Link className="ion-chevron-right" to={'/day/' + currentDay.add(2, 'days').format('MM-DD-YYYY')} />
    return (
      <div className="container daily-view">
        <div className="day-view-header">
          {prevLink}
          <h1>{moment(this.state.day).format("dddd")}<span>{moment(this.state.day).format("MMMM Do")}</span></h1>
          {nextLink}
        </div>
        <div className="meal-summary-wrapper row">
          {cards}
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
  { getMealsByDay }
)(DayView)

export default DayView