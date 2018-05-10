import React from 'react'
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getMealsByMonth } from '../../actions/log_actions';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    let pathname = window.location.pathname.split( '/' )
    const params = pathname[2].split('-')
    const month = moment(params[1] + params[0] + '01')
    this.state = {
      month: month,
      monthKey: month.format('MM')+ month.format('YYYY')
    }
  }

  componentDidMount(){
    if(!(this.state.monthKey in this.props.log.loadedMonths)){
      console.log('getting day from server: ' + this.state.params)
      this.props.getMealsByMonth(this.state.month.format('MM'), this.state.month.format('YYYY'))
    }
  }

  generateDayMeals(day){
    let self = this
    if(this.state.monthKey in this.props.log.loadedMonths && day in this.props.log.loadedMonths[this.state.monthKey]){
      console.log(day)
      let mealKeys = Object.keys(this.props.log.loadedMonths[this.state.monthKey][day])
      let mealsToDisplay
      let mealCountClass = ''
      if(mealKeys.length <= 7){
        mealsToDisplay = this.props.log.loadedMonths[this.state.monthKey][day]
      } 
      else{
        mealsToDisplay = {
          [mealKeys[0]]: this.props.log.loadedMonths[this.state.monthKey][day][mealKeys[0]],
          [mealKeys[1]]: this.props.log.loadedMonths[this.state.monthKey][day][mealKeys[1]],
          [mealKeys[2]]: this.props.log.loadedMonths[this.state.monthKey][day][mealKeys[2]],
          [mealKeys[2]]: this.props.log.loadedMonths[this.state.monthKey][day][mealKeys[3]],
          [mealKeys[2]]: this.props.log.loadedMonths[this.state.monthKey][day][mealKeys[4]],
          [mealKeys[2]]: this.props.log.loadedMonths[this.state.monthKey][day][mealKeys[5]],
          [mealKeys[2]]: this.props.log.loadedMonths[this.state.monthKey][day][mealKeys[6]]
        }
        mealCountClass = ' truncate'
      }
      return Object.keys(mealsToDisplay).map(function (mealId, i) {
        return <div className={"calendar-meal" + mealCountClass + (self.props.log.loadedMonths[self.state.monthKey][day][mealId].mealType === 'meal' ? ' meal-theme' : ' snack-theme')} key={i}>
          <div className="calendar-meal-hunger">
          </div>
        </div>
      })
    }
  }

  generateCalendarRow(week){
    let calendarMonth = this.state.month.month()
    let currentMonth = moment().month()
    let currentDay = moment().date()
    let self = this
    return week.map(function(day, i){
      return <Link key={i} className={"calendar-day" + (calendarMonth !== day.month ? " inactive" : "")} to={"/day/" + (day.dateHumanFormat)}>
        <div className={currentDay === day.date && currentMonth === day.month ? "current" : ""}>
          <div className="calendar-date">{day.date}</div>
          <div className="calendar-meal-wrapper">
            {self.generateDayMeals(day.dateHumanFormat)}
            <div className="day-ellipsis">
              <div className="ellipsis-dot"></div>
              <div className="ellipsis-dot"></div>
              <div className="ellipsis-dot"></div>
            </div>
          </div>
        </div>
      </Link>
    })
  }

  render() {
    const startDay = this.state.month.clone().startOf('month').startOf('week').subtract(1, 'day');
    const endDay = this.state.month.clone().endOf('month').endOf('week').subtract(1, 'day');
    let calendar = [];
    let index = startDay.clone();
    while (index.isBefore(endDay, 'day')) {
        calendar.push(
            new Array(7).fill(0).map(
                function(n, i) {
                    return {
                      date: index.add(1, 'day').date(),
                      month: index.month(),
                      dateHumanFormat: index.format('MM-DD-YYYY')
                    };
                }
            )
        );
    }
    console.log(calendar)
    let row1 = this.generateCalendarRow(calendar[0]);
    let row2 = this.generateCalendarRow(calendar[1]);
    let row3 = this.generateCalendarRow(calendar[2]);
    let row4 = this.generateCalendarRow(calendar[3]);
    let row5 = null;
    let row6 = null;
    let calendarLengthClass = "rows-5"
    if(calendar.length >= 5){
      row5 = this.generateCalendarRow(calendar[4])
      calendarLengthClass = "rows-6"
    } 
    if(calendar.length === 6){
      row6 = this.generateCalendarRow(calendar[5])
      calendarLengthClass = "rows-7"
    } 
    return (
      <div className="container calendar-wrapper">
        <div className="view-header">
          <Link className="ion-chevron-left" to={'/calendar' + ('/' + this.state.month.clone().subtract(1, 'month').format('MM-YYYY'))} />
          <h1>{this.state.month.format("MMMM YYYY")}</h1>
          <Link className="ion-chevron-right" to={'/calendar' + ('/' + this.state.month.clone().add(1, 'month').format('MM-YYYY'))} />
        </div>
        <div className={"calendar " + (calendarLengthClass)}>
          <div className="calendar-row calendar-header">
            <div className="calendar-day"><div className="calendar-date">S<span>unday</span></div></div>
            <div className="calendar-day"><div className="calendar-date">M<span>onday</span></div></div>
            <div className="calendar-day"><div className="calendar-date">T<span>uesday</span></div></div>
            <div className="calendar-day"><div className="calendar-date">W<span>ednesday</span></div></div>
            <div className="calendar-day"><div className="calendar-date">T<span>hursday</span></div></div>
            <div className="calendar-day"><div className="calendar-date">F<span>riday</span></div></div>
            <div className="calendar-day"><div className="calendar-date">S<span>atruday</span></div></div>
          </div>
          <div className="calendar-row clearfix">
            {row1}
          </div>
          <div className="calendar-row clearfix">
            {row2}
          </div>
          <div className="calendar-row clearfix">
            {row3}
          </div>
          <div className="calendar-row clearfix">
            {row4}
          </div>
          {row5 ? (
            <div className="calendar-row clearfix">
              {row5}
            </div>
          ) : null}
          {row6 ? (
            <div className="calendar-row clearfix">
              {row6}
            </div>
          ) : null}
        </div>
        <nav>
        </nav>
      </div>
    )
  }
}

Calendar = connect(
  state => ({
    log: state.log,
  }),
  { getMealsByMonth }
)(Calendar)

export default Calendar