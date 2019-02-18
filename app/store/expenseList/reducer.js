import CONFIGS from '../../constants/firebaseConfigs';

import * as TYPES from './types';

const initialState = {
  loading: false,
  refreshing: false,
  canLoadMore: true,
  expenseList: null,
  error: null,
  addExpenseLoading: false,
  addExpenseError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.EXPENSE_LIST_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TYPES.EXPENSE_LIST_REFRESHING:
      return {
        ...state,
        refreshing: true,
        error: null,
      };
    case TYPES.EXPENSE_LIST_SUCCESS: {
      const canLoadMore = action.expenseList.length === CONFIGS.PAGE_SIZE;
      const { expenseList } = action;

      if (!state.refreshing && state.expenseList) {
        expenseList.unshift(...state.expenseList);
      }

      return {
        ...state,
        loading: false,
        refreshing: false,
        canLoadMore,
        expenseList,
        error: null,
      };
    }
    case TYPES.EXPENSE_LIST_ERROR:
      return {
        ...state,
        loading: false,
        refreshing: false,
        expenseList: null,
        error: action.error,
      };
    case TYPES.EXPENSE_LIST_ADD_EXPENSE_LOADING:
      return {
        ...state,
        addExpenseLoading: true,
        addExpenseError: null,
      };
    case TYPES.EXPENSE_LIST_ADD_EXPENSE_SUCCESS: {
      const expenseList = [...state.expenseList];
      expenseList.unshift(action.expense);

      return {
        ...state,
        addExpenseLoading: false,
        addExpenseError: null,
        expenseList,
      };
    }
    case TYPES.EXPENSE_LIST_ADD_EXPENSE_ERROR:
      return {
        ...state,
        addExpenseLoading: false,
        addExpenseError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
