import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser }from '../../actions/auth_actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nav = null;
    console.log(this.props)
    if(this.props.isLoggedIn){
      nav = (
        <nav className="col-xs-9 col-sm-9 main-menu-hamburger-wrapper">
          <a className="main-menu-hamburger" onClick={this.props.logoutUser}><i className="fas fa-bars"></i></a>
        </nav>
      );
    }
    else if(!this.props.isLoggedIn && window.location.pathname.indexOf('join') === -1){
      nav = (
        <nav className="col-xs-9 col-sm-9">
          <ul>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Sign Up</Link></li>
          </ul>
        </nav>
      );
    }
    return (
      <header id="main-header">
        <div className="container">
          <div className="row">
            <div className="col-xs-3 col-sm-3">
              <Link to='/' className="logo">MM</Link>
            </div>
            {nav}
          </div>
        </div>
      </header>
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