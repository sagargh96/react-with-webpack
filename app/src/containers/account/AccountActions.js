import axios from 'api';
import { createAction } from 'utils/helpers';
import { checkZipCode } from 'containers/location/LocationAction';
import { accountRoles } from './Constants';

const authURL = '/auth';
const loginURL = '/auth/login?redirectUrl=';

export const openMyAccountModal = () => {
    return {
        type: 'OPEN_MY_ACCOUNT_MODAL'
    }
};
export const closeMyAccountModal = () => {
    return {
        type: 'CLOSE_MY_ACCOUNT_MODAL'
    }
};

export const getUserContext = (withoutStoreDetails) => {
    return (dispatch, getState) => {
        const state = getState().data;
        const store = state.store;
        const currentLocation = state.location;
        return axios.get(authURL + '/context')
        .then((res) => {
            const resData = res.data.data;
            const userLocationZip = resData && resData.region && resData.region.zipCode;
            dispatch(createAction('USER_CONTEXT_LOADED', resData));
            if(withoutStoreDetails) {
                return;
            }
            
            //if currently selected location is default then call
            //check zipcode for user's location
            if ((!store || !store.storeDetails || !store.storeDetails.id) ||
                userLocationZip && !currentLocation.zipCode || currentLocation.isDefault) {
                dispatch(checkZipCode({
                    zipCode: location.isDefault === true ? userLocationZip || currentLocation.zipCode : currentLocation.zipCode,
                    isDefault: !userLocationZip ? location.isDefault : false,
                    loadDefaultOnNotAvailable: true
                }));
            }
        }).catch((error) => {
            dispatch(createAction('INVALID_AUTH_TOKEN', {error: 'Invliad auth token'}));
            if (!store || !store.storeDetails || !store.storeDetails.id) {
                dispatch(checkZipCode({
                    zipCode: currentLocation.zipCode,
                    isDefault: currentLocation.isDefault,
                    loadDefaultOnNotAvailable: true
                }));
            }
        });
    }
};

export const getCurrentUser = (state) => {
    const currentAccount = state.data && state.data.account;
    if (currentAccount && (currentAccount.isAuthenticated || isUnverifiedUser(currentAccount))) {
        return currentAccount;
    }
    return null;
};

export const isUnverifiedUser = (userAccount) => {
    return userAccount && userAccount.roles && userAccount.roles.indexOf(accountRoles.unverifiedUser) >= 0;
};
