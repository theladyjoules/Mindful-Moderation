import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import store from "./store/index";
import { Provider } from "react-redux";
import App from './components/App';
import { unregister } from './registerServiceWorker';
import ScrollToTop from './components/global/ScrollToTop'

window.store = store;

ReactDOM.render((
  <Provider store={store}>
    <div className="sub-root">
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  </Provider>
), document.getElementById('root'));

unregister();