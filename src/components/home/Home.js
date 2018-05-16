import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import DayView from '../log/DayView'
import MealCard from '../log/MealCard'
import RequireAuth  from '../auth/Require-Auth'
import ImageCalendarView from '../../images/calendar-view.png'
import ImageStatViewNarrow from '../../images/stat-view-narrow.png'
import ImageStatView from '../../images/stat-view.png'

class Home extends React.Component {

  componentWillMount() {
    if(!this.props.isLoggedIn){
      document.body.classList.add('homepage');
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('homepage');
  }

  shouldComponentUpdate(){
    if(this.props.isLoggedIn){
      document.body.classList.remove('homepage');
    }
    return true;
  }

  render() {
    let mealCardData = {
      mealDate:"2018-05-09T12:30:00.000Z",
      mealDateFormFormat:"2018-05-08",
      mealDateHumanFormat:"05-08-2018",
      mealDuration:25,
      mealFoods:"Grilled chicken salad with avocado and kale.",
      mealHungerAfter:"7",
      mealHungerBefore:"3",
      mealMood:["calm", "present", "happy"],
      mealName:"Lunch",
      mealNotes:"Gorgeous day & wonderful mindful meal!",
      mealSetting:"Park Bench",
      mealTimeFormFormat:"12:30 pm",
      mealTimeHumanFormat:"12:30 PM",
      mealType:"meal",
      mealUser:["1"]
    }
    return (
      <section>
        {this.props.isLoggedIn ? (
          <DayView />
        ) : (
          <div>
            <div className="homepage-section homepage-section-hero">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12">
                    <h1><span className="logo">eat<span>mindful</span></span> is a<br /> mindful eating tracker.</h1>
                  </div>
                </div>
              </div>
              <div className="scroll-cta ion-ios-arrow-down">learn more</div>
            </div>
            <div className="homepage-section homepage-section-meal-card">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <h2>Log your meals and snacks, recording:</h2>
                    <ul>
                      <li>hunger levels using a 0-10 scale<sup><span className="tooltip ion-help" onClick={this.props.toggleHungerScaleDrawer}></span></sup></li>
                      <li>mood</li>
                      <li>foods eaten</li>
                      <li>setting</li>
                      <li>duration</li>
                      <li>notes</li>
                    </ul>
                  </div>
                  <MealCard meal={mealCardData} showViewLink={false} showEditLink={false} toggleHungerScaleDrawer={this.props.toggleHungerScaleDrawer} />
                </div>
              </div>
              <div className="scroll-cta ion-ios-arrow-down">learn more</div>
            </div>
            <div className="homepage-section homepage-section-calendar">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-md-6 col-md-push-6">
                    <h2>View your meals and snacks on an easy-to-navigate calendar.</h2>
                  </div>
                  <div className="col-xs-12 col-md-6 col-md-pull-6 meal-card-wrapper">
                    <img src={ImageCalendarView} alt="eatmindful mindful eating tracker calendar" />
                  </div>
                </div>
              </div>
              <div className="scroll-cta ion-ios-arrow-down">learn more</div>
            </div>
            <div className="homepage-section homepage-section-stats">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <h2>Track your progress with useful statistics.</h2>
                  </div>
                  <div className="col-xs-12 col-md-6 meal-card-wrapper">
                    <img className="stat-image-narrow" src={ImageStatViewNarrow} alt="eatmindful mindful eating tracker user statistics" />
                    <img className="stat-image" src={ImageStatView} alt="eatmindful mindful eating tracker user statistics" />
                  </div>
                </div>
              </div>
            </div>
            <div className="homepage-section homepage-section-join">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>Ready to get started?</h2>
                    <div className="btn-wrapper">
                      <Link to="/register" className="btn btn-green">Sign Up</Link>
                    </div>
                    <p className="free-disclaimer">It's 100% free.</p>
                  </div>
                </div>
              </div>
            </div>
            <footer className="main-footer">
              <div className="footer-gradient"></div>
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <div className="footer-ctas">
                      <Link to="/about">about <span className="logo">eat<span>mindful</span></span></Link>
                      <Link to="/about#contact">contact</Link>
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <div className="footer-utility">
                      <h6>&copy; 2018 <span className="logo">eat<span>mindful</span></span></h6>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )}
      </section>
    )
  }
}

Home = connect(
  state => ({
    isLoggedIn: state.auth.authenticated,
  }),
  null
)(Home)

export default Home