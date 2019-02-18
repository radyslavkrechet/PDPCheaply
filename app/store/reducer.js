import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import session from './session';
import categoryList from './categoryList';
import expenseList from './expenseList';

export default combineReducers({
  form,
  session,
  categoryList,
  expenseList,
});
