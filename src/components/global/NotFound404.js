import React from 'react'
import { Link } from 'react-router-dom'

class NotFound404 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-sm-push-3">
              <div className="error-404">
                <h2>The page you are looking for can't be found.</h2>
                <Link to='/' className="btn btn-green">Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound404