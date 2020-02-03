
import { createAction } from 'utils/helpers';

export const enableMiniHeaderMode = () => (dispatch) => {
    dispatch(createAction('ENABLE_MINI_HEADER'));
}

export const disableMiniHeaderMode = () => (dispatch) => {
    dispatch(createAction('DISABLE_MINI_HEADER'));
}