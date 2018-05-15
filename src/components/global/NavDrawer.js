import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser }from '../../actions/auth_actions';
import moment from 'moment'

class NavDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(){
    this.props.logoutUser()
    this.props.toggleNavDrawer()
  }

  render() {
    let userNav = null;
    if(this.props.isLoggedIn){
      userNav = (
        <div>
          <div className="nav-drawer-section">
            <ul>
              <li>
                <Link to='/log-meal' onClick={this.props.toggleNavDrawer} className="nav-log-cta">
                  <span className="ion-plus-circled"></span><span>Log a Meal or Snack</span>
                </Link>
              </li>
              <li><Link to='/' onClick={this.props.toggleNavDrawer}>Today's Log</Link></li>
              <li><Link to={'/calendar' + ('/' + moment().format('MM-YYYY'))} onClick={this.props.toggleNavDrawer}>Calendar</Link></li>
              <li><Link to='/stats' onClick={this.props.toggleNavDrawer}>Stats</Link></li>
            </ul>
          </div>
          <div className="nav-drawer-section">
            <ul>
              <li><Link to='/account' onClick={this.props.toggleNavDrawer}>Acccount &amp; Settings</Link></li>
              <li><a onClick={this.handleLogoutClick}>Logout</a></li>
            </ul>
          </div>
        </div>
      );
    }
    else if(!this.props.isLoggedIn){
      userNav = (
        <div className="nav-drawer-section">
          <ul>
            <li><Link to='/login' onClick={this.props.toggleNavDrawer}>Login</Link></li>
            <li><Link to='/register' onClick={this.props.toggleNavDrawer}>Sign Up</Link></li>
          </ul>
        </div>
      );
    }
    return (
      <div className={"drawer-wrapper" + (this.props.isOpen ? ' active' : '')}>
        <nav className="drawer">
          <div className="nav-drawer-section">
            <ul>
              <li><a onClick={this.props.toggleNavDrawer} className="ion-android-close"></a></li>
            </ul>
          </div>
          {userNav}
          <div className="nav-drawer-section">
            <ul>
              <li><Link to='/about' onClick={this.props.toggleNavDrawer}>About</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

NavDrawer = connect(
  state => ({
    isLoggedIn: state.auth.authenticated,
  }),
  {logoutUser}
)(NavDrawer)

export default NavDrawer