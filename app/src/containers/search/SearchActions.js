
import { createAction } from 'utils/helpers';

export const setSearchKeyword = keyword => (dispatch) => {
    dispatch(createAction('SET_SEARCH_KEYWORD', keyword));
};

export const showSearchBox = () => (dispatch) => {
    dispatch(createAction('SHOW_SEARCH_BOX'));
};

export const hideSearchBox = () => (dispatch) => {
    dispatch(createAction('HIDE_SEARCH_BOX'));
};

