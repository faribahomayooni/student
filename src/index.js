import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './helper';

// import cfgStore, {persistor} from './store/configureStore';

import Root from './containers';
import AppNavigator from './routers/AppNavigator';

// window.$test = 'medisa';
// const store = cfgStore();
export default class App extends Component {
  render() {
    return (
      <>
        <AppNavigator />
      </>
    );
  }
}
