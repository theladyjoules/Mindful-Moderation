import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Loader from '../global/Loader'
import { getStats } from '../../actions/stats_actions';

class Profile extends React.Component {

  componentWillMount(){
    this.props.getStats()
  }

  render() {
    return (
      <section className="profile container">
        {this.props.stats.total.length && this.props.stats.streaks ? (
          <div>
            <div className="row profile-header">
              <div className="col-xs-12 col-md-6">
                <header>
                  <div className="avatar"><span>J</span></div>
                  <h1>Julie</h1>
                </header>
              </div>
            </div>
            <div className="row streak">
              <div className="col-xs-6">
                <div className="streak-number">10</div>
                <h2>days in a row logged</h2>
              </div>
              <div className="col-xs-6">
                <div className="streak-number">1,457</div>
                <h2>total meals and snacks logged</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <nav className="stat-tabber">
                  <div className="tab active">
                    <div className="tab-title">May 2018</div>
                  </div>
                  <div className="tab">
                    <div className="tab-title">All Time</div>
                 </div>
                </nav>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <div className="stat-row">
                  <h2>Average Starting Hunger</h2>
                  <div className="stat">
                    <h3>3.5</h3>
                    <div className="hunger-icon">
                      <div className="hunger-icon-3"></div>
                    </div>
                  </div>
                </div>
                <div className="stat-row">
                  <h2>Average Stopping Hunger</h2>
                  <div className="stat">
                    <h3>7.8</h3>
                    <div className="hunger-icon">
                      <div className="hunger-icon-7"></div>
                    </div>
                  </div>
                </div>
                <div className="stat-row">
                  <h2>Average Meal or Snack Duration</h2>
                  <div className="stat">
                    <h3>22<span> minutes</span></h3>
                  </div>
                </div>
                <div className="stat-row">
                  <h2>Most Common Moods</h2>
                  <div className="chip-wrapper">
                    <div className="chip">Happy (142)</div>
                    <div className="chip">Calm (99)</div>
                    <div className="chip">Stressed(78)</div>
                  </div>
                </div>
                <div className="stat-row">
                  <h2>Most Common Setting</h2>
                  <div className="chip-wrapper">
                    <div className="chip">Desk (139)</div>
                    <div className="chip">Dining Room table (55)</div>
                    <div className="chip">Couch (47)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : <Loader />}
      </section>
    )
  }
}

Profile = connect(
  state => ({
    stats: state.stats,
  }),
  {getStats}
)(Profile)

export default Profile