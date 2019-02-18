import { AsyncStorage } from 'react-native';

import CONFIGS from '../../constants/firebaseConfigs';
import KEYS from '../../constants/asyncStorageKeys';
import api from '../../services/firebaeAuthorizationApi';

import * as TYPES from './types';

export const restoreSession = () => (dispatch) => {
  AsyncStorage.getItem(KEYS.USER)
    .then((value) => {
      if (value !== null) {
        dispatch(sessionSuccess(JSON.parse(value)));
      } else {
        dispatch(sessionLogout());
      }
    });
};

export const signIn = (email, password) => (dispatch) => {
  dispatch(sessionLoading());

  api.post(`/verifyPassword?key=${CONFIGS.API_KEY}`, {
    email,
    password,
  })
    .then((response) => {
      const user = mapToUser(response);

      AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));

      dispatch(sessionSuccess(user));
    })
    .catch((error) => {
      dispatch(sessionError(error.message));
    });
};

export const signUp = (email, password) => (dispatch) => {
  dispatch(sessionLoading());

  api.post(`/signupNewUser?key=${CONFIGS.API_KEY}`, {
    email,
    password,
  })
    .then((response) => {
      const user = mapToUser(response);

      AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));

      dispatch(sessionSuccess(user));
    })
    .catch((error) => {
      dispatch(sessionError(error.message));
    });
};

export const logout = () => (dispatch) => {
  AsyncStorage.removeItem(KEYS.USER)
    .then(() => {
      dispatch(sessionLogout());
    });
};

const sessionLoading = () => ({
  type: TYPES.SESSION_LOADING,
});

const sessionSuccess = user => ({
  type: TYPES.SESSION_SUCCESS,
  user,
});

const sessionError = error => ({
  type: TYPES.SESSION_ERROR,
  error,
});

const sessionLogout = () => ({
  type: TYPES.SESSION_LOGOUT,
});

const mapToUser = (response) => {
  const user = {
    id: response.data.localId,
    email: response.data.email,
  };

  return user;
};
