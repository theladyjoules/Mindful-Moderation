import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser }from '../../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nav = null;
    console.log(this.props)
    if(this.props.isLoggedIn){
      nav = (
        <ul>
          <li><Link to='/account' className="btn btn-amaranth">Calendar</Link></li>
          <li><Link to='/account' className="btn btn-amaranth">Resources</Link></li>
          <li><a className="btn btn-white" onClick={this.props.logoutUser}>Logout</a></li>
        </ul>
      );
    }
    else if(!this.props.isLoggedIn && window.location.pathname.indexOf('join') === -1){
      nav = (
        <ul>
          <li><Link to='/login' className="btn btn-white">Login</Link></li>
          <li><Link to='/register' className="btn btn-amaranth">Register</Link></li>
        </ul>
      );
    }
    return (
      <header id="main-header">
        <div className="container">
          <div className="row">
            <div className="col-xs-3 col-sm-3">
              <Link to='/' className="logo">MindfuldModeration</Link>
            </div>
            <nav className="col-xs-9 col-sm-9">
              {nav}
            </nav>
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