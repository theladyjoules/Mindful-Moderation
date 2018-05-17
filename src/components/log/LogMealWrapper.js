import React from 'react'
import { connect } from 'react-redux'
import LogMeal from './LogMeal'
import { setCurrentDateTime } from '../../actions/log_actions'
import { getUrlParameter } from '../../utilities/getUrlParameter';
import moment from 'moment'

class LogMealWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryDate: getUrlParameter('date') ? getUrlParameter('date') : moment().format('YYYY-MM-DD')
    }
  }

  componentDidMount(){
    if(this.state.queryDate !== this.props.currentDate || moment().format('HH:mm') !== this.props.currentTime){
      this.props.setCurrentDateTime(this.state.queryDate)
    }
  }

  render() {
    return (
      <div>
        {this.state.queryDate === this.props.currentDate && moment().format('HH:mm') === this.props.currentTime ? (
            <LogMeal />
          ) : null
        }
      </div>
    )
  }
}

LogMealWrapper = connect(
  state => ({
    currentDate: state.log.currentDate,
    currentTime: state.log.currentTime
  }),
  { setCurrentDateTime }
)(LogMealWrapper)

export default LogMealWrapper