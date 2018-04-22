import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer id="main-footer" className="footer">
    <div className="container sub-footer">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-3">&copy; 2018 MindfulModeration&trade;</div>
        <div className="col-xs-12 col-sm-6 col-md-3">
          <Link to='/terms-and-conditions'>Privacy Policy &amp; Terms of Use</Link>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
