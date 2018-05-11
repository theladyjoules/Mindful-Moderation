import React from 'react'
import { connect } from 'react-redux';
import { strings } from '../../utilities/strings';

class HungerScale extends React.Component {

  render() {
    return (
      <div className="container">
        <div class="row">
          <div class="col-xs-12">
            <article>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-0"></div>
                </div>
                <div className="hunger-scale-number">0</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord0')}</div>
              </div>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-1"></div>
                </div>
                <div className="hunger-scale-number">1</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord1')}</div>
              </div>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-2"></div>
                </div>
                <div className="hunger-scale-number">2</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord2')}</div>
              </div>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-3"></div>
                </div>
                <div className="hunger-scale-number">3</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord3')}</div>
              </div>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-4"></div>
                </div>
                <div className="hunger-scale-number">4</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord4')}</div>
              </div>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-5"></div>
                </div>
                <div className="hunger-scale-number">5</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord5')}</div>
              </div>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-6"></div>
                </div>
                <div className="hunger-scale-number">6</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord6')}</div>
              </div>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-7"></div>
                </div>
                <div className="hunger-scale-number">7</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord7')}</div>
              </div>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-8"></div>
                </div>
                <div className="hunger-scale-number">8</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord8')}</div>
              </div>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-9"></div>
                </div>
                <div className="hunger-scale-number">9</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord9')}</div>
              </div>
              <div className="hunger-scale-row">
                <div className="hunger-scale-icon">
                  <div className="hunger-icon-10"></div>
                </div>
                <div className="hunger-scale-number">10</div>
                <div className="hunger-scale-word">{strings('hungerScaleWord10')}</div>
              </div>
            </article>
          </div>
        </div>
      </div>
    )
  }
}

// Home = connect(
//   state => ({
//     isLoggedIn: state.auth.authenticated,
//   }),
//   null
// )(Home)

export default HungerScale