import moment from 'moment';

import CONFIGS from '../../constants/firebaseConfigs';
import api from '../../services/firebaseFirestoreApi';

import * as TYPES from './types';

export const loadExpenseList = (familyId, categoryList, startAt) => (dispatch) => {
  dispatch(expenseListLoading());

  const timestampValue = startAt || now();

  api.post(`/families/${familyId}:runQuery`, loadExpenseListBody(timestampValue))
    .then((response) => {
      const expenseList = mapToExpenseList(response.data, categoryList);

      dispatch(expenseListSuccess(expenseList));
    })
    .catch((error) => {
      dispatch(expenseListError(error.message));
    });
};

export const refreshExpenseList = (familyId, categoryList) => (dispatch) => {
  dispatch(expenseListRefreshing());
  dispatch(loadExpenseList(familyId, categoryList));
};

export const addExpense = (familyId, categoryList, categoryId, amount) => (dispatch) => {
  dispatch(expenseListAddExpenseLoading());

  api.post(`/families/${familyId}/expenses`, addExpenseBody(categoryId, amount))
    .then((response) => {
      const addedExpense = mapToExpense(response.data, categoryList);

      dispatch(expenseListAddExpenseSuccess(addedExpense));
    })
    .catch((error) => {
      dispatch(expenseListAddExpenseError(error.message));
    });
};

const expenseListLoading = () => ({
  type: TYPES.EXPENSE_LIST_LOADING,
});

const expenseListRefreshing = () => ({
  type: TYPES.EXPENSE_LIST_REFRESHING,
});

const expenseListSuccess = expenseList => ({
  type: TYPES.EXPENSE_LIST_SUCCESS,
  expenseList,
});

const expenseListError = error => ({
  type: TYPES.EXPENSE_LIST_ERROR,
  error,
});

const expenseListAddExpenseLoading = () => ({
  type: TYPES.EXPENSE_LIST_ADD_EXPENSE_LOADING,
});

const expenseListAddExpenseSuccess = expense => ({
  type: TYPES.EXPENSE_LIST_ADD_EXPENSE_SUCCESS,
  expense,
});

const expenseListAddExpenseError = error => ({
  type: TYPES.EXPENSE_LIST_ADD_EXPENSE_ERROR,
  error,
});

const now = () => moment(Date.now()).utc().format();

const loadExpenseListBody = timestampValue => ({
  structuredQuery: {
    from: [
      {
        collectionId: 'expenses',
      },
    ],
    orderBy: {
      field: {
        fieldPath: 'time',
      },
      direction: 'DESCENDING',
    },
    startAt: {
      values: [
        {
          timestampValue,
        },
      ],
    },
    limit: CONFIGS.PAGE_SIZE,
  },
});

const addExpenseBody = (categoryId, amount) => ({
  fields: {
    category: {
      referenceValue: `projects/${CONFIGS.PROJECT_ID}/databases/${CONFIGS.DATABASE_NAME}/documents/categories/${categoryId}`,
    },
    time: {
      timestampValue: now(),
    },
    amount: {
      doubleValue: amount,
    },
  },
});

const mapToExpenseList = (data, categoryList) => {
  let expenseList = [];

  if (data[0].document) {
    expenseList = data.map(datum => mapToExpense(datum.document, categoryList));
  }

  return expenseList;
};

const mapToExpense = (data, categoryList) => {
  const categoryId = data.fields.category.referenceValue.split('/').pop();
  const expenseCategory = categoryList.find(category => category.id === categoryId);

  const expense = {
    categoryIconUrl: expenseCategory.iconUrl,
    categoryName: expenseCategory.name,
    time: data.fields.time.timestampValue,
    amount: data.fields.amount.doubleValue,
  };

  return expense;
};
