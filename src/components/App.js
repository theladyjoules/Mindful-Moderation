import React from 'react'
import { connect } from 'react-redux';  
import { Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable';
import { withRouter } from 'react-router'
import Loader from './global/Loader'
import Header from './global/Header'
import Footer from './global/Footer'
import NotFound404 from './global/NotFound404'
import RequireAuth from './auth/Require-Auth';
import NavDrawer from './global/NavDrawer';
import HungerScaleDrawer from './global/HungerScaleDrawer';

import '../styles/vendor/bootstrap.min.css';
import '../styles/vendor/ionicons.min.css';
import '../styles/global/styles.css';

const Home = Loadable({
  loader: () => import('./home/Home'),
  loading: Loader,
});

const Register = Loadable({
  loader: () => import('./auth/Register'),
  loading: Loader,
});

const Login = Loadable({
  loader: () => import('./auth/Login'),
  loading: Loader,
});

const Account = Loadable({
  loader: () => import('./auth/AccountMain'),
  loading: Loader,
});

const LogMeal = Loadable({
  loader: () => import('./log/LogMeal'),
  loading: Loader,
});

const DayView = Loadable({
  loader: () => import('./log/DayView'),
  loading: Loader,
});

const MealView = Loadable({
  loader: () => import('./log/MealView'),
  loading: Loader,
});

const EditMealWrapper = Loadable({
  loader: () => import('./log/EditMealWrapper'),
  loading: Loader,
});

const Calendar = Loadable({
  loader: () => import('./calendar/Calendar'),
  loading: Loader,
});

const Stats = Loadable({
  loader: () => import('./stats/Stats'),
  loading: Loader,
});

const HungerScale = Loadable({
  loader: () => import('./resources/HungerScale'),
  loading: Loader,
});

const About = Loadable({
  loader: () => import('./about/About'),
  loading: Loader,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      hungerScaleDrawerOpen: false
    }
    this.toggleNavDrawer = this.toggleNavDrawer.bind(this);
    this.toggleHungerScaleDrawer = this.toggleHungerScaleDrawer.bind(this);
  }

  toggleNavDrawer(){
    this.setState({navDrawerOpen:!this.state.navDrawerOpen});
  }

  toggleHungerScaleDrawer(){
    this.setState({hungerScaleDrawerOpen:!this.state.hungerScaleDrawerOpen});
  }

  render() {
    return (
      <div className="main-wrapper">
        <main className={this.props.hungerScaleDrawerOpen || this.state.navDrawerOpen ? 'drawer-open' : ''}>
          <Header toggleNavDrawer={this.toggleNavDrawer} />
          <NavDrawer isOpen={this.state.navDrawerOpen} toggleNavDrawer={this.toggleNavDrawer} />
          <HungerScaleDrawer isOpen={this.state.hungerScaleDrawerOpen} toggleHungerScaleDrawer={this.toggleHungerScaleDrawer} />
          <Switch>
            <Route exact path='/' render={()=> 
                <Home toggleHungerScaleDrawer={this.toggleHungerScaleDrawer} />
            } />
            <Route exact path='/about' render={()=> 
                <About toggleHungerScaleDrawer={this.toggleHungerScaleDrawer} />
            } />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/account' component={RequireAuth(Account)} />  
            <Route exact path='/log-meal' render={()=> 
              this.props.isAuthenticated ? (
                <LogMeal toggleHungerScaleDrawer={this.toggleHungerScaleDrawer} />
              ) : (
                <Login /> 
              )
            } />
            <Route exact path='/edit-meal/:meal' render={()=> 
              this.props.isAuthenticated ? (
                <EditMealWrapper toggleHungerScaleDrawer={this.toggleHungerScaleDrawer} />
              ) : (
                <Login /> 
              )
            } />
            <Route exact path='/day/:day' render={()=> 
              this.props.isAuthenticated ? (
                <DayView toggleHungerScaleDrawer={this.toggleHungerScaleDrawer} />
              ) : (
                <Login /> 
              )
            } />
            <Route exact path='/meal/:meal' render={()=> 
              this.props.isAuthenticated ? (
                <MealView toggleHungerScaleDrawer={this.toggleHungerScaleDrawer} />
              ) : (
                <Login /> 
              )
            } />
            <Route exact path='/calendar/:month' component={RequireAuth(Calendar)} />
            <Route exact path='/stats' render={()=> 
              this.props.isAuthenticated ? (
                <Stats toggleHungerScaleDrawer={this.toggleHungerScaleDrawer} />
              ) : (
                <Login /> 
              )
            } />
            <Route component={NotFound404} />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

App = connect(
  state => ({
    hungerScaleDrawerOpen: state.utility.hungerScaleDrawerOpen,
    isAuthenticated: state.auth.authenticated
  }),
  null
)(App)

export default withRouter(App)