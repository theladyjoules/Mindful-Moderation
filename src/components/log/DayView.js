import React from 'react'
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom'
import moment from 'moment'
import MealCard from './MealCard'
import { getMealsByDay } from '../../actions/log_actions';

class DayView extends React.Component {
  constructor(props) {
    super(props);
    let pathname = window.location.pathname.split( '/' )
    this.state = {
      day: (window.location.pathname === '/') ? moment().format('MM-DD-YYYY') : pathname[2]
    }
    this.loadThisDay = this.loadThisDay.bind(this);
  }

  componentDidMount(){
    this.loadThisDay()
  }

  componentDidUpdate(){
    let pathname = window.location.pathname.split( '/' )
    if(pathname[2] && this.state.day !== pathname[2]){
      this.setState({day: pathname[2]}, () => this.loadThisDay())
    }
  }

  shouldComponentUpdate(){
    return true
  }

  loadThisDay(){
    if(!(this.state.day in this.props.log.loadedDays)){
      console.log('getting day from server: ' + this.state.day)
      this.props.getMealsByDay(this.state.day)
    }
  }

  render() {
    const cards = (this.state.day in this.props.log.loadedDays && Object.keys(this.props.log.loadedDays[this.state.day]).length) ? Object.values(this.props.log.loadedDays[this.state.day]).map( (meal, index) =>
      <MealCard key={index} meal={this.props.log.loadedMeals[meal]} showViewLink={true} showEditLink={true} toggleHungerScaleDrawer={this.props.toggleHungerScaleDrawer} />
    ) : (
      <div className="day-help-text">
        Use the plus below to log a meal or snack.
      </div>
    );
    const today = moment()
    const currentDay = moment(this.state.day, 'MM-DD-YYYY')
    const isToday = today.isSame(currentDay, 'd')
    const prevLink = <Link className="ion-chevron-left" to={'/day/' + currentDay.subtract(1, 'days').format('MM-DD-YYYY')} />
    const nextLink = (isToday) ? <div></div> : <Link className="ion-chevron-right" to={'/day/' + currentDay.add(2, 'days').format('MM-DD-YYYY')} />
    return (
      <div className="container daily-view">
        <div className="row">
          <div className="col-xs-12">
            <div className="view-header">
              {prevLink}
              <h1>{moment(this.state.day, 'MM-DD-YYYY').format("dddd")}<span>{moment(this.state.day, 'MM-DD-YYYY').format("MMMM Do")}</span></h1>
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
              <Link to={"/log-meal" + ("?date=" + moment(this.state.day, 'MM-DD-YYYY').format("YYYY-MM-DD"))} className="log-cta ion-plus-round"></Link>
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
  { getMealsByDay },
  null,
  {pure: false}
)(DayView)

export default DayView