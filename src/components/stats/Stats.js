import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import moment from 'moment'
import Loader from '../global/Loader'
import { getStats, setActiveTab } from '../../actions/stats_actions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.getStats()
  }

  handleTabClick(tab, event){
    this.props.setActiveTab(tab)
  }

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="stats">
              <header className="stats-header">
                <div className="avatar"><span>J</span></div>
                <h1>Julie</h1>
              </header>
              {'total' in this.props.allTimeStats && 'streak' in this.props.allTimeStats ? (
                <div className="row highlight-band">
                  <div className="col-xs-6">
                    <div className="streak-number">{this.props.allTimeStats.streak}</div>
                    <h2>{this.props.allTimeStats.streak === 1 ? ('day') : ('days')} in a row logged</h2>
                  </div>
                  <div className="col-xs-6">
                    <div className="streak-number">{this.props.allTimeStats.total}</div>
                    <h2>total meals and snacks logged</h2>
                  </div>
                </div>
              ) : null}
              {Object.keys(this.props.allTimeStats).length ? (
                <div>
                  <div className="row">
                    <div className="col-xs-12">
                      <nav className="stat-tabber">
                        <div className={"tab" + (this.props.activeTab === 'Meals' ? ' active' : '')} onClick={(event) => this.handleTabClick('Meals', event)}>
                          <div className="tab-title">Meals</div>
                        </div>
                        <div className={"tab" + (this.props.activeTab === 'Snacks' ? ' active' : '')} onClick={(event) => this.handleTabClick('Snacks', event)}>
                          <div className="tab-title">Snacks</div>
                       </div>
                      </nav>
                    </div>
                  </div>
                  <div className={"row tab-content meal-tab" + (this.props.activeTab === 'Meals' ? ' active' : '')}>
                    {this.props.mealStats.averageMealsPerDay ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>Average Meals Per Day</h2>
                          <div className="stat">
                            <h3>{this.props.mealStats.averageMealsPerDay}</h3>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.props.mealStats.averageHungerBefore ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>
                            <span className="title">
                              Average Starting Hunger
                              <span className="tooltip ion-help" onClick={this.props.toggleHungerScaleDrawer}></span>
                            </span>
                          </h2>
                          <div className="stat">
                            <h3>{this.props.mealStats.averageHungerBefore}</h3>
                            <div className="hunger-icon">
                              <div className={"hunger-icon-" + (Math.round(this.props.mealStats.averageHungerBefore))}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.props.mealStats.averageHungerAfter ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>
                            <span className="title">
                              Average Stopping Hunger
                              <span className="tooltip ion-help" onClick={this.props.toggleHungerScaleDrawer}></span>
                            </span>
                          </h2>
                          <div className="stat">
                            <h3>{this.props.mealStats.averageHungerAfter}</h3>
                            <div className="hunger-icon">
                              <div className={"hunger-icon-" + (Math.round(this.props.mealStats.averageHungerAfter))}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.props.mealStats.averageDuration ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>Average Meal or Snack Duration</h2>
                          <div className="stat">
                            <h3>{this.props.mealStats.averageDuration}<span> {this.props.mealStats.averageDuration === 1 ? ('minute') : ('minutes')}</span></h3>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.props.mealStats.topMoods ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>Most Common Moods</h2>
                          <div className="chip-wrapper">
                            {this.props.mealStats.topMoods.map((mood, index) =>
                              <div className="chip" key={index}>{mood[0]} ({mood[1]})</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.props.mealStats.topSettings ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>Most Common Setting</h2>
                          <div className="chip-wrapper">
                            {this.props.mealStats.topSettings.map((setting, index) =>
                              <div className="chip" key={index}>{setting[0]} ({setting[1]})</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className={"row tab-content snack-tab" + (this.props.activeTab === 'Snacks' ? ' active' : '')}>
                    {this.props.snackStats.averageSnacksPerDay ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>Average Snacks Per Day</h2>
                          <div className="stat">
                            <h3>{this.props.snackStats.averageSnacksPerDay}</h3>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.props.snackStats.averageHungerBefore ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>
                            <span className="title">
                              Average Starting Hunger
                              <span className="tooltip ion-help" onClick={this.props.toggleHungerScaleDrawer}></span>
                            </span>
                          </h2>
                          <div className="stat">
                            <h3>{this.props.snackStats.averageHungerBefore}</h3>
                            <div className="hunger-icon">
                              <div className={"hunger-icon-" + (Math.round(this.props.snackStats.averageHungerBefore))}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.props.snackStats.averageHungerAfter ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>
                            <span className="title">
                              Average Stopping Hunger
                              <span className="tooltip ion-help" onClick={this.props.toggleHungerScaleDrawer}></span>
                            </span>
                          </h2>
                          <div className="stat">
                            <h3>{this.props.snackStats.averageHungerAfter}</h3>
                            <div className="hunger-icon">
                              <div className={"hunger-icon-" + (Math.round(this.props.snackStats.averageHungerAfter))}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.props.snackStats.averageDuration ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>Average Meal or Snack Duration</h2>
                          <div className="stat">
                            <h3>{this.props.snackStats.averageDuration}<span> {this.props.snackStats.averageDuration === 1 ? ('minute') : ('minutes')}</span></h3>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.props.snackStats.topMoods ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>Most Common Moods</h2>
                          <div className="chip-wrapper">
                            {this.props.snackStats.topMoods.map((mood, index) =>
                              <div className="chip" key={index}>{mood[0]} ({mood[1]})</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.props.snackStats.topSettings ? (
                      <div className="col-xs-12 col-md-6">
                        <div className="stat-row">
                          <h2>Most Common Setting</h2>
                          <div className="chip-wrapper">
                            {this.props.snackStats.topSettings.map((setting, index) =>
                              <div className="chip" key={index}>{setting[0]} ({setting[1]})</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : <Loader />}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Profile = connect(
  state => ({
    allTimeStats: state.stats.allTimeStats,
    activeTab: state.stats.activeTab,
    mealStats: state.stats.allTimeStats.meal,
    snackStats: state.stats.allTimeStats.snack
  }),
  {getStats, setActiveTab}
)(Profile)

export default Profile