import * as TYPES from './types';

const initialState = {
  categoryList: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CATEGORY_LIST_SUCCESS:
      return {
        categoryList: action.categoryList,
      };
    default:
      return state;
  }
};

export default reducer;
