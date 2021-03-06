import React from 'react'
import { Link } from 'react-router-dom'

class MealCard extends React.Component {

  render() {
    const chips = (this.props.meal.mealMood && this.props.meal.mealMood[0] !== '') ? this.props.meal.mealMood.map((mood) =>
      <div className="chip" key={mood}>
        {mood}
      </div>
    ) : null;
    return (
      <div className={"col-xs-12 col-md-6" + (this.props.cardClass ? this.props.cardClass : '')}>
        <article className={"meal-card clearfix " + (this.props.meal.mealType === 'meal' ? 'meal-theme' : 'snack-theme')}>
          <header>
            <h2>{this.props.meal.mealName}</h2>
            <h2>{this.props.meal.mealTimeHumanFormat}</h2>
          </header>
          <main>
            <div className="meal-card-section hunger-section">
              <h3>
                <div className="hunger-title">
                  Hunger:
                  <span className="tooltip ion-help" onClick={this.props.toggleHungerScaleDrawer}></span>
                </div>
              </h3>
              <div className="meal-card-value">
                <div className="hunger-start">
                  <div className="hunger-start-index">{this.props.meal.mealHungerBefore}</div>
                  <div className="hunger-icon">
                    <div className={"hunger-icon-" + this.props.meal.mealHungerBefore}></div>
                  </div>
                </div>
                <div className="hunger-divider">&ndash;</div>
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
                <div className="meal-card-value">{this.props.meal.mealDuration} minutes</div>
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
              {this.props.showViewLink ? (
                <Link to={"/meal/" + this.props.meal._id}>View</Link>
              ) : null}
            </div>
            <div className="col-xs-3 col-xs-push-6">
              {this.props.showEditLink ? (
                <Link to={"/edit-meal/" + this.props.meal._id}>Edit</Link>
              ) : null}
            </div>
          </footer>
        </article>
      </div>
    )
  }
}

export default MealCard