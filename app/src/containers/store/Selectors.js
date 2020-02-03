import isEqual from 'lodash.isequal';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

const getProps = (state, props) => (props);

const createStoreSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
);

// export const getStoreDetails = createStoreSelector(
//     state => state.data.store && state.data.store.storeDetails,
//     storeDetails => storeDetails
// );


export const getStoreDetails = state => state.data.store && state.data.store.storeDetails;