import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../global/Header'

class NotFound404 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
  }

  render() {
    return (
      <div className="container terms-and-conditions">
        Please don't sue me.
      </div>
    )
  }
}

export default NotFound404