import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Home extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>{moment().format("dddd, MMMM Do")}</h1>
        <div className="meal-summary-wrapper row">
          <article className="meal-card col-xs-12 col-md-6">
            <header>
              <h2>10:30 am</h2>
              <h2>Breakfast</h2>
            </header>
            <main>
              <div className="meal-card-section hunger-section">
                <h3>Hunger:</h3>
                <div className="meal-card-value">
                  <div className="hunger-start">
                    <div className="hunger-start-index">3</div>
                    <div className="hunger-icon">
                      <div className="hunger-icon-3"></div>
                    </div>
                  </div>
                  <div className="hunger-divider">&mdash;</div>
                  <div className="hunger-end">
                    <div className="hunger-end-index">7</div>
                    <div className="hunger-icon">
                      <div className="hunger-icon-7"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="meal-card-section">
                <h3>Foods:</h3>
                <div className="meal-card-value">banana, oatmeal, coffee with milk</div>
              </div>
              <div className="meal-card-section">
                <h3>Setting:</h3>
                <div className="meal-card-value">desk</div>
              </div>
              <div className="meal-card-section">
                <h3>Duration:</h3>
                <div className="meal-card-value">10 minutes</div>
              </div>
              <div className="meal-card-section">
                <h3>Mood:</h3>
                <div className="meal-card-value">tired, busy</div>
              </div>
              <div className="meal-card-section">
                <h3>Notes:</h3>
                <div className="meal-card-value">Just got home from physical therapy and feeling really hungry but also kinda stressed because a bunch of work just rolled in.</div>
              </div>
            </main>
            <footer className="row">
              <div className="col-xs-6">
                <Link className="btn-meal-card" to='/log-meal'>View</Link>
              </div>
              <div className="col-xs-6">
                <Link className="btn-meal-card" to='/log-meal'>Edit</Link>
              </div>
            </footer>
          </article>
        </div>
      </div>
    )
  }
}

export default Home