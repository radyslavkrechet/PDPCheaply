import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const configureStore = () => {
  const middleware = [thunk];
  const enchancer = applyMiddleware(...middleware);

  return createStore(reducer, enchancer);
};

export default configureStore;
