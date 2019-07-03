import { h, render } from 'preact';
import { Provider, connect } from 'react-redux';
import App from './pages/app';
import {store} from './reducer';

import './style/reset.css';
import './style/theme.css';

render(
  <Provider store={store}>
    <App />
  </Provider>
, document.querySelector('#app-container'));

// import 'preact/debug';
