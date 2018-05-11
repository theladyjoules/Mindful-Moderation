import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser }from '../../actions/auth_actions';
import moment from 'moment'

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userNav = null;
    if(this.props.isLoggedIn){
      userNav = (
        <nav>
          <ul>
            <li><Link to='/log-meal'>Log+</Link></li>
            <li><Link to='/'>Today</Link></li>
            <li><Link to={'/calendar' + ('/' + moment().format('MM-YYYY'))}>Calendar</Link></li>
            <li><Link to='/stats'>Stats</Link></li>
            <li className="nav-dropdown-item">
              <div className="dropdown-label ion-chevron-down">MindfulMod</div>
              <ul>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/resources'>Resources</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
              </ul>
            </li>
            <li className="nav-dropdown-item">
              <div className="dropdown-label ion-chevron-down">Julie</div>
              <ul>
                <li><Link to='/account'>Acccount &amp; Settings</Link></li>
                <li><a>Logout</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      );
    }
    else if(!this.props.isLoggedIn){
      userNav = (
        <nav>
          <ul>
            <li><Link to='/login' className="btn btn-white">Login</Link></li>
            <li><Link to='/register' className="btn btn-green">Sign Up</Link></li>
          </ul>
        </nav>
      );
    }
    return (
      <header id="main-header">
        <div className="container">
          <div className="row">
            <div className="col-xs-3 col-sm-3">
              <Link to='/' className="logo"></Link>
            </div>
            <div className="col-xs-9 col-sm-9 main-menu-hamburger-wrapper">
              <a className="main-menu-hamburger ion-navicon" onClick={this.props.toggleNavDrawer}></a>
            </div>
            <div className="col-xs-9 col-sm-9 main-menu-wrapper">
              {userNav}
            </div>
          </div>
        </div>
      </header>
    )
  }
}


Header = connect(
  state => ({
    isLoggedIn: state.auth.authenticated,
  }),
  { logoutUser }
)(Header)

export default Header