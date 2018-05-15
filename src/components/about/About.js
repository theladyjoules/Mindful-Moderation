import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class About extends React.Component {

  render() {
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="about">
                <h1>about</h1>
                <p><span className="logo">eat<span>mindful</span></span> is a free mindful eating tracker that allows users to track their meals and snacks and view them in daily and a calendar views. Logging meals and snacks is the main focus of the tracker, with the key pieces of information being starting hunger and stopping hunger (measured on a 0-10 scale)<sup><span className="tooltip ion-help" onClick={this.props.toggleHungerScaleDrawer}></span></sup> and moods experienced while eating. <span className="logo">eat<span>mindful</span></span> also allows users to track the duration of their time spent eating, the setting of the meal or snack, and any additional notes about the experience. In addtion, <span className="logo">eat<span>mindful</span></span> also allows users to view useful statistics about their mindful eating habits including their average hunger when starting a meal or snack and when ending one, their average number of meals and snacks per day, their most common moods when eating, their most common meal and snack locations, and their number of days in a row of logging meals and snacks.</p>
                <p><span className="logo">eat<span>mindful</span></span> is based on the concept of mindful eating put forward by the following sources: <a href="https://thecenterformindfuleating.org/" target="_blank">The Center for Mindful Eating</a>, <a href="https://www.mindful.org/" target="_blank"><em>Mindful</em></a>, <em>Savor</em> by Thich Nhat Hanh and Lilian Cheung, <em>Eating Mindfully</em> by Susan Albers, <em>The Headspace Diet</em> by Andy Puddicombe, and the work of <a href="http://www.sandraaamodt.com/" target="_blank">Sandra Aamodt</a>. For more information on mindful eating, please explore these excellent resources.</p>
                <p>Launched in May of 2018, <span className="logo">eat<span>mindful</span></span> was created by Julie Hiller, a Chicago-based web developer. She personally feels that mindful eating has been an enormous asset to her life, and hopes that <span className="logo">eat<span>mindful</span></span> will be a useful tool for others looking to incorporate healthier eating habits into their lives.</p>
                <h2 id="contact">contact</h2>
                <p>Please send all comments, questions, and feedback to:</p>
                <a className="contact-email" href="mailto:eatmindful@gmail.com"><span className="logo">eat<span>mindful</span></span>@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

// About = connect(
//    state => ({
//      isLoggedIn: state.auth.authenticated,
//    }),
//    null
// )(About)

export default About