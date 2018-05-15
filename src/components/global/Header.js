import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser }from '../../actions/auth_actions';
import moment from 'moment'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(){
    this.props.logoutUser()
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
            <li className="divider"></li>
            <li><Link to='/about'>About</Link></li>
            <li className="nav-dropdown-item">
              <div className="dropdown-label ion-chevron-down">{this.props.firstName}</div>
              <ul>
                <li><Link to='/account'>Acccount &amp; Settings</Link></li>
                <li><a onClick={this.handleLogoutClick}>Logout</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      );
    }
    else if(!this.props.isLoggedIn){
      userNav = (
        <nav className="logged-out">
          <ul>
            <li><Link to='/login' className="login-cta">Login</Link></li>
            <li><Link to='/register' className="register-cta">Join</Link></li>
          </ul>
        </nav>
      );
    }
    return (
      <header id="main-header">
        <div className="container">
          <div className="row">
            <div className="col-xs-4">
              <Link to='/' className="logo">
                <div className="logo-circle"></div>
                <div className="logo-text">eat<span>Mindful</span></div>
              </Link>
            </div>
            <div className={"col-xs-8 main-menu-hamburger-wrapper" + (!this.props.isLoggedIn ? ' logged-out' : '')}>
              <a className="main-menu-hamburger ion-navicon" onClick={this.props.toggleNavDrawer}></a>
            </div>
            <div className={"col-xs-8 main-menu-wrapper" + (!this.props.isLoggedIn ? ' logged-out' : '')}>
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
    firstName: state.auth.firstName
  }),
  { logoutUser }
)(Header)

export default Header