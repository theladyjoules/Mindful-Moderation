import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import HungerScale from '../resources/HungerScale'
import {toggleHungerScaleDrawer} from '../../actions/utility_actions'

class HungerScaleDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"drawer-wrapper" + (this.props.hungerScaleDrawerOpen ? ' active' : '')}>
        <div className="drawer hunger-scale-drawer">
          <div className="hunger-scale-drawer-section">
            <ul>
              <li><a onClick={this.props.toggleHungerScaleDrawer} className="ion-android-close"></a></li>
            </ul>
          </div>
          <div className="hungerScale-drawer-section">
            <HungerScale />
          </div>
        </div>
      </div>
    )
  }
}

HungerScaleDrawer = connect(
  state => ({
    hungerScaleDrawerOpen: state.utility.hungerScaleDrawerOpen,
  }),
  { toggleHungerScaleDrawer }
)(HungerScaleDrawer)

export default HungerScaleDrawer