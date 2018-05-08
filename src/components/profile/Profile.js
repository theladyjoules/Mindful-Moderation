import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import moment from 'moment'
import Loader from '../global/Loader'
import { getStats, setActiveTab } from '../../actions/stats_actions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment().format('MM-YYYY'),
      monthTitle: moment().format('MMM YYYY')
    }
  }

  componentWillMount(){
    this.props.getStats()
  }

  handleTabClick(tab, event){
    this.props.setActiveTab(tab)
    if(tab === this.state.month && !(this.state.month in this.props.stats)){
      let statDate = moment()
      this.props.getStats(statDate.format('MM'), statDate.format('YYYY'))
    }
  }

  render() {
    return (
      <section className="profile container">
        <div>
          <div className="row profile-header">
            <div className="col-xs-12 col-md-6">
              <header>
                <div className="avatar"><span>J</span></div>
                <h1>Julie</h1>
              </header>
            </div>
          </div>
          {'totalMeals' in this.props.allTimeStats && 'streak' in this.props.allTimeStats ? (
            <div className="row streak">
              <div className="col-xs-6">
                <div className="streak-number">{this.props.allTimeStats.streak}</div>
                <h2>{this.props.allTimeStats.streak === 1 ? ('day') : ('days')} in a row logged</h2>
              </div>
              <div className="col-xs-6">
                <div className="streak-number">{this.props.allTimeStats.totalMeals}</div>
                <h2>total meals and snacks logged</h2>
              </div>
            </div>
          ) : null}
          <div className="row">
            <div className="col-xs-12">
              <nav className="stat-tabber">
                <div className={"tab" + (this.props.activeTab === 'allTimeStats' ? ' active' : '')} onClick={(event) => this.handleTabClick('allTimeStats', event)}>
                  <div className="tab-title">All Time</div>
                </div>
                <div className={"tab" + (this.props.activeTab === this.state.month ? ' active' : '')} onClick={(event) => this.handleTabClick(this.state.month, event)}>
                  <div className="tab-title">{this.state.monthTitle}</div>
               </div>
              </nav>
            </div>
          </div>
          <div className={"row tab-content" + (this.props.activeTab === 'allTimeStats' ? ' active' : '')}>
            {Object.keys(this.props.allTimeStats).length ? (
              <div className="col-xs-12 col-md-6">
                {this.props.allTimeStats.averageHungerBefore ? (
                  <div className="stat-row">
                    <h2>Average Starting Hunger</h2>
                    <div className="stat">
                      <h3>{this.props.allTimeStats.averageHungerBefore}</h3>
                      <div className="hunger-icon">
                        <div className={"hunger-icon-" + (Math.round(this.props.allTimeStats.averageHungerBefore))}></div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {this.props.allTimeStats.averageHungerAfter ? (
                  <div className="stat-row">
                    <h2>Average Stopping Hunger</h2>
                    <div className="stat">
                      <h3>{this.props.allTimeStats.averageHungerAfter}</h3>
                      <div className="hunger-icon">
                        <div className={"hunger-icon-" + (Math.round(this.props.allTimeStats.averageHungerAfter))}></div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {this.props.allTimeStats.averageDuration ? (
                  <div className="stat-row">
                    <h2>Average Meal or Snack Duration</h2>
                    <div className="stat">
                      <h3>{this.props.allTimeStats.averageDuration}<span> {this.props.allTimeStats.averageDuration === 1 ? ('minute') : ('minutes')}</span></h3>
                    </div>
                  </div>
                ) : null}
                {this.props.allTimeStats.topMoods ? (
                  <div className="stat-row">
                    <h2>Most Common Moods</h2>
                    <div className="chip-wrapper">
                      {this.props.allTimeStats.topMoods.map((mood, index) =>
                        <div className="chip" key={index}>{mood[0]} ({mood[1]})</div>
                      )}
                    </div>
                  </div>
                ) : null}
                {this.props.allTimeStats.topSettings ? (
                  <div className="stat-row">
                    <h2>Most Common Setting</h2>
                    <div className="chip-wrapper">
                      {this.props.allTimeStats.topSettings.map((setting, index) =>
                        <div className="chip" key={index}>{setting[0]} ({setting[1]})</div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : <Loader />}
          </div>
          <div className={"row tab-content" + (this.props.activeTab === this.state.month ? ' active' : '')}>
            {this.state.month in this.props.stats ? (
              <div className="col-xs-12 col-md-6">
                {this.props.allTimeStats.averageHungerBefore ? (
                  <div className="stat-row">
                    <h2>Average Starting Hunger</h2>
                    <div className="stat">
                      <h3>{this.props.allTimeStats.averageHungerBefore}</h3>
                      <div className="hunger-icon">
                        <div className={"hunger-icon-" + (Math.round(this.props.allTimeStats.averageHungerBefore))}></div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {this.props.allTimeStats.averageHungerAfter ? (
                  <div className="stat-row">
                    <h2>Average Stopping Hunger</h2>
                    <div className="stat">
                      <h3>{this.props.allTimeStats.averageHungerAfter}</h3>
                      <div className="hunger-icon">
                        <div className={"hunger-icon-" + (Math.round(this.props.allTimeStats.averageHungerAfter))}></div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {this.props.allTimeStats.averageDuration ? (
                  <div className="stat-row">
                    <h2>Average Meal or Snack Duration</h2>
                    <div className="stat">
                      <h3>{this.props.allTimeStats.averageDuration}<span> {this.props.allTimeStats.averageDuration === 1 ? ('minute') : ('minutes')}</span></h3>
                    </div>
                  </div>
                ) : null}
                {this.props.allTimeStats.topMoods ? (
                  <div className="stat-row">
                    <h2>Most Common Moods</h2>
                    <div className="chip-wrapper">
                      {this.props.allTimeStats.topMoods.map((mood, index) =>
                        <div className="chip" key={index}>{mood[0]} ({mood[1]})</div>
                      )}
                    </div>
                  </div>
                ) : null}
                {this.props.allTimeStats.topSettings ? (
                  <div className="stat-row">
                    <h2>Most Common Setting</h2>
                    <div className="chip-wrapper">
                      {this.props.allTimeStats.topSettings.map((setting, index) =>
                        <div className="chip" key={index}>{setting[0]} ({setting[1]})</div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : <Loader />}
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
    stats: state.stats
  }),
  {getStats, setActiveTab}
)(Profile)

export default Profile