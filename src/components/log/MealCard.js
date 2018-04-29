import React from 'react'
import { Link } from 'react-router-dom'

class MealCard extends React.Component {

  render() {
    console.log(this.props.meal)
    const chips = (this.props.meal.mealMood && this.props.meal.mealMood[0] !== '') ? this.props.meal.mealMood.map((mood) =>
      <div className="chip" key={mood}>
        {mood}
      </div>
    ) : null;
    return (
      <article className="meal-card col-xs-12 col-md-6">
        <header>
          <h2>{this.props.meal.mealName}</h2>
          <h2>{this.props.meal.mealTimeFormatted}</h2>
        </header>
        <main>
          <div className="meal-card-section hunger-section">
            <h3>Hunger:</h3>
            <div className="meal-card-value">
              <div className="hunger-start">
                <div className="hunger-start-index">{this.props.meal.mealHungerBefore}</div>
                <div className="hunger-icon">
                  <div className={"hunger-icon-" + this.props.meal.mealHungerBefore}></div>
                </div>
              </div>
              <div className="hunger-divider">&mdash;</div>
              <div className="hunger-end">
                <div className="hunger-end-index">{this.props.meal.mealHungerAfter}</div>
                <div className="hunger-icon">
                  <div className={"hunger-icon-" + this.props.meal.mealHungerAfter}></div>
                </div>
              </div>
            </div>
          </div>
          {'mealMood' in this.props.meal && 'mealMood' && this.props.meal.mealMood[0] !== '' ? (
            <div className="meal-card-section chip-wrapper">
              <h3>Mood:</h3>
              <div className="meal-card-value">{chips}</div>
            </div>
          ) : null}
          {'mealFoods' in this.props.meal && this.props.meal.mealFoods ? (
            <div className="meal-card-section">
              <h3>Foods:</h3>
              <div className="meal-card-value">{this.props.meal.mealFoods}</div>
            </div>
          ) : null}
          {'mealSetting' in this.props.meal && this.props.meal.mealSetting ? (
            <div className="meal-card-section">
              <h3>Setting:</h3>
              <div className="meal-card-value">{this.props.meal.mealSetting}</div>
            </div>
          ) : null}
          {'mealDuration' in this.props.meal && this.props.meal.mealDuration ? (
            <div className="meal-card-section">
              <h3>Duration:</h3>
              <div className="meal-card-value">{this.props.meal.mealDuration}</div>
            </div>
          ) : null}
          {'mealNotes' in this.props.meal && this.props.meal.mealNotes ? (
            <div className="meal-card-section">
              <h3>Notes:</h3>
              <div className="meal-card-value">{this.props.meal.mealNotes}</div>
            </div>
          ) : null}
        </main>
        <footer className="row">
          <div className="col-xs-3 col-xs-push-6" >
            <Link to={"/day/" + this.props.meal.mealDateFormatted + "/meal/" + this.props.meal._id}>View</Link>
          </div>
          <div className="col-xs-3 col-xs-push-6">
            <Link to='/log-meal'>Edit</Link>
          </div>
        </footer>
      </article>
    )
  }
}

export default MealCard