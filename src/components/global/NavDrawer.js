import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser }from '../../actions/auth_actions';

class Header extends React.Component {
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
    console.log(this.props)
    if(this.props.isLoggedIn){
      userNav = (
        <div className="nav-drawer-section">
          <ul>
            <li><Link to='/today' onClick={this.props.toggleNavDrawer}>Today's Log</Link></li>
            <li><Link to='/calendar' onClick={this.props.toggleNavDrawer}>Calendar</Link></li>
            <li><Link to='/journey' onClick={this.props.toggleNavDrawer}>Your Journey</Link></li>
            <li><a onClick={this.handleLogoutClick}>Logout</a></li>
          </ul>
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
      <div className={"main-nav-drawer-wrapper" + (this.props.isOpen ? ' active' : '')}>
        <nav className="main-nav-drawer">
          <div className="nav-drawer-section">
            <ul>
              <li><a onClick={this.props.toggleNavDrawer} className="ion-android-close"></a></li>
            </ul>
          </div>
          {userNav}
          <div className="nav-drawer-section">
            <ul>
              <li><Link to='/about' onClick={this.props.toggleNavDrawer}>About</Link></li>
              <li><Link to='/resources' onClick={this.props.toggleNavDrawer}>Resources</Link></li>
              <li><Link to='/contact' onClick={this.props.toggleNavDrawer}>Contact</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

const MapStateToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

Header = connect(
  state => ({
    isLoggedIn: state.auth.authenticated,
  }),
  MapStateToProps
)(Header)

export default Header