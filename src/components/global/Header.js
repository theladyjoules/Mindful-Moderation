import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false
    }
  }

  render() {
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
          </div>
        </div>
      </header>
    )
  }
}

export default Header