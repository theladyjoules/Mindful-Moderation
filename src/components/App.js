import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable';
import { withRouter } from 'react-router'
import Loader from './global/Loader'
import Header from './global/Header'
import Footer from './global/Footer'
import NotFound404 from './global/NotFound404'
import RequireAuth from './auth/Require-Auth';
import NavDrawer from './global/NavDrawer';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false
    }
    this.toggleNavDrawer = this.toggleNavDrawer.bind(this);
  }

  toggleNavDrawer(){
    this.setState({navDrawerOpen:!this.state.navDrawerOpen});
  }

  render() {
    return (
      <div className="main-wrapper">
        <main>
          <Header toggleNavDrawer={this.toggleNavDrawer} />
          <NavDrawer isOpen={this.state.navDrawerOpen} toggleNavDrawer={this.toggleNavDrawer} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/account' component={RequireAuth(Account)} />  
            <Route exact path='/log-meal' component={LogMeal} />
            <Route component={NotFound404} />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App)