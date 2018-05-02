import React from 'react'
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom'
import moment from 'moment'
// import { getMealsByMonth } from '../../actions/log_actions';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    let pathname = window.location.pathname.split( '/' )
    const params = pathname[2].split('-')
    this.state = {
      month: moment(params[1] + params[0] + '01')
    }
  }

  componentDidMount(){
    // if(!(this.state.day in this.props.log.loadedDays)){
    //   console.log('getting day from server: ' + this.state.day)
    //   this.props.getMealsByDay(this.state.day)
    // }
  }

  render() {
    // const cards = (this.state.day in this.props.log.loadedDays && Object.keys(this.props.log.loadedDays[this.state.day]).length) ? Object.values(this.props.log.loadedDays[this.state.day]).map( (meal, index) =>
    //   <MealCard key={index} meal={this.props.log.loadedMeals[meal]} showViewLink={true} showEditLink={true} />
    // ) : (
    //   <div>
    //     Click on the orange plus below to log a meal. :)
    //   </div>
    // );
    // const today = moment()
    // const currentDay = moment(this.state.day)
    // const isToday = today.isSame(currentDay, 'd')
    // const prevLink = <Link className="ion-chevron-left" to={'/day/' + currentDay.subtract(1, 'days').format('MM-DD-YYYY')} />
    // const nextLink = (isToday) ? <div></div> : <Link className="ion-chevron-right" to={'/day/' + currentDay.add(2, 'days').format('MM-DD-YYYY')} />
    const startDay = moment().clone().startOf('month').startOf('week');
    const endDay = moment().clone().endOf('month').endOf('week');

    var calendar = [];
    var index = startDay.clone();
    while (index.isBefore(endDay, 'day')) {
        calendar.push(
            new Array(7).fill(0).map(
                function(n, i) {
                    return {date: index.add(1, 'day').date()};
                }
            )
        );
    }
    console.log(calendar)
    let row1 = calendar[0].map(function(day, i){
      return <td key={i}>{day.date}</td>
    })
    let row2 = calendar[1].map(function(day, i){
      return <td key={i}>{day.date}</td>
    })
    let row3 = calendar[2].map(function(day, i){
      return <td key={i}>{day.date}</td>
    })
    let row4 = calendar[3].map(function(day, i){
      return <td key={i}>{day.date}</td>
    })
    let row5 = calendar[4].map(function(day, i){
      return <td key={i}>{day.date}</td>
    })
    return (
      <div className="container">
        <div className="calendar">
          <table>
            <thead>
              <tr>
                <th>S<span>unday</span></th>
                <th>M<span>onday</span></th>
                <th>T<span>uesday</span></th>
                <th>W<span>ednesday</span></th>
                <th>T<span>hursday</span></th>
                <th>F<span>riday</span></th>
                <th>S<span>atruday</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {row1}
              </tr>
              <tr>
                {row2}
              </tr>
              <tr>
                {row3}
              </tr>
              <tr>
                {row4}
              </tr>
              <tr>
                {row5}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

// Calendar = connect(
//   state => ({
//     log: state.log,
//   }),
//   { getMealsByMonth }
// )(Calendar)

export default Calendar