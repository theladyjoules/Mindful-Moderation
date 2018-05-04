import React from 'react'
import { connect } from 'react-redux'
import EditMeal from './EditMeal'
import { getMealById, setCurrentDayMeal } from '../../actions/log_actions'

class EditMealWrapper extends React.Component {
  constructor(props) {
    super(props);
    const pathname = window.location.pathname.split( '/' )
    this.state = {
      mealId: pathname[2]
    }
  }

  componentDidMount(){
    console.log(this.state.mealId)
    if(this.state.mealId in this.props.log.loadedMeals){
      this.props.setCurrentDayMeal(this.state.day, this.state.mealId)
    }
    else{
      this.props.getMealById(this.state.mealId)
    }
  }

  render() {
    return (
      <div>
        {this.state.mealId === this.props.currentMeal ? (
            <EditMeal day={this.props.log.loadedMeals[this.state.mealId].mealDateHumanFormat} mealId={this.state.mealId} />
          ) : null
        }
      </div>
    )
  }
}

EditMealWrapper = connect(
  state => ({
    log: state.log,
    currentDay: state.log.currentDay,
    currentMeal: state.log.currentMeal
  }),
  { getMealById, setCurrentDayMeal }
)(EditMealWrapper)

export default EditMealWrapper