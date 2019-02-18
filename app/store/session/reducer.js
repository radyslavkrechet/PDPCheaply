import * as TYPES from './types';

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SESSION_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TYPES.SESSION_SUCCESS:
      return {
        loading: false,
        user: action.user,
        error: null,
      };
    case TYPES.SESSION_ERROR:
      return {
        loading: false,
        user: null,
        error: action.error,
      };
    case TYPES.SESSION_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
