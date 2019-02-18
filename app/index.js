import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';
import Router from './navigation';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
