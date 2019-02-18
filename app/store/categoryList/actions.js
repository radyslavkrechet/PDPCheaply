import { AsyncStorage } from 'react-native';

import KEYS from '../../constants/asyncStorageKeys';
import api from '../../services/firebaseFirestoreApi';

import * as TYPES from './types';

export const restoreCategoryList = () => (dispatch) => {
  AsyncStorage.getItem(KEYS.CATEGORY_LIST)
    .then((value) => {
      dispatch(categoryListSuccess(JSON.parse(value)));
    });
};

export const loadCategoryListIfNeeded = () => (dispatch) => {
  AsyncStorage.getItem(KEYS.CATEGORY_LIST)
    .then((value) => {
      if (value === null) {
        dispatch(loadCategoryList());
      }
    });
};

const categoryListSuccess = categoryList => ({
  type: TYPES.CATEGORY_LIST_SUCCESS,
  categoryList,
});

const loadCategoryList = () => (dispatch) => {
  api.get('/categories')
    .then((response) => {
      const categoryList = mapToCategoryList(response);

      AsyncStorage.setItem(KEYS.CATEGORY_LIST, JSON.stringify(categoryList));

      dispatch(categoryListSuccess(categoryList));
    });
};

const mapToCategoryList = (response) => {
  const categoryList = response.data.documents.map(document => ({
    id: document.name.split('/').pop(),
    name: document.fields.name.stringValue,
    iconUrl: document.fields.icon.stringValue,
  }));

  return categoryList;
};
