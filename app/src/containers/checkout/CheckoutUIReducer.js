import { checkoutStepKeys, checkoutSteps } from './Constants';

const initialState = {
    checkoutSteps: checkoutSteps,
    activeStep:{
        key: checkoutStepKeys.userDetails
    },
    visitedSteps: [checkoutStepKeys.userDetails, checkoutStepKeys.deliveryAddress],
    completedSteps: [checkoutStepKeys.userDetails],
    showAddressForm: false
};

const setCheckoutStepStatus = (state, status, stepKey) => {
    const checkoutSteps = state.checkoutSteps.map((checkoutStep) => {
        if (checkoutStep.key === stepKey) {
            checkoutStep.status = status;
        }
        return checkoutStep;
    });
    return {
        ...state,
        checkoutSteps: checkoutSteps
    }
}

const setActiveStep = (state, stepToActive) => {
    let visitedSteps = [...state.visitedSteps];
    let completedSteps = [...state.completedSteps];
    const checkoutSteps = state.checkoutStpes;
    if (visitedSteps.indexOf(stepToActive.key) < 0) {
        visitedSteps.push(stepToActive.key);
    }
    
    if (stepToActive.completedStepKey && completedSteps.indexOf(stepToActive.completedStepKey) < 0) {
        completedSteps.push(stepToActive.completedStepKey);
    }
    //Remove next dependent completed steps
    let nextDependentSteps = stepToActive.nextDependentSteps;
    nextDependentSteps.forEach((nextDependentStep) => {
        const index = completedSteps.indexOf(nextDependentStep);
        if (index > -1 && completedSteps.length > index) {
            completedSteps.splice(index, 1);
        }
    });
    return {
        ...state,
        activeStep: {
            index: stepToActive.index,
            key: stepToActive.key
        },
        visitedSteps: visitedSteps,
        completedSteps: completedSteps
    };
}

const checkoutUI = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_STEP':
            return setActiveStep(state, action.payload);
        case 'SHOW_DELIVERY_ADDRESS_FORM': 
            return {
                ...state,
                showAddressForm: true
            }
        case 'HIDE_DELIVERY_ADDRESS_FORM': 
            return {
                ...state,
                showAddressForm: false
            }
        case 'LOAD_ADDRESSES_INPROGRESS':
            return {
                ...setCheckoutStepStatus(state, 'LOAD_ADDRESSES_INPROGRESS', 'deliveryAddress')
            }
        case 'LOAD_ADDRESSES_SUCCESS':
            return setCheckoutStepStatus(state, 'LOAD_ADDRESSES_SUCCESS', 'deliveryAddress');
        case 'LOAD_ADDRESSES_ERROR':
            return setCheckoutStepStatus(state, 'LOAD_ADDRESSES_ERROR', checkoutStepKeys.deliveryAddress);
        case 'SAVE_ADDRESS_INPROGRESS':
            return setCheckoutStepStatus(state, 'SAVE_ADDRESS_INPROGRESS', checkoutStepKeys.deliveryAddress); 
        case 'SAVE_ADDRESS_SUCCESS':
            return setCheckoutStepStatus(state, 'SAVE_ADDRESS_SUCCESS', checkoutStepKeys.deliveryAddress); 
        case 'SAVE_ADDRESS_ERROR':
            return setCheckoutStepStatus(state, 'SAVE_ADDRESS_ERROR', checkoutStepKeys.deliveryAddress);            
        case 'DELETE_ADDRESS_INPROGRESS':
            return setCheckoutStepStatus(state, 'DELETE_ADDRESS_INPROGRESS', checkoutStepKeys.deliveryAddress); 
        case 'DELETE_ADDRESS_SUCCESS':
            return setCheckoutStepStatus(state, 'DELETE_ADDRESS_SUCCESS', checkoutStepKeys.deliveryAddress); 
        case 'DELETE_ADDRESS_ERROR':
            return setCheckoutStepStatus(state, 'DELETE_ADDRESS_ERROR', checkoutStepKeys.deliveryAddress);
        case 'LOAD_ADDRESSES_INPROGRESS':
                return setCheckoutStepStatus(state, 'LOAD_ADDRESSES_INPROGRESS', checkoutStepKeys.deliveryAddress);
        case 'LOAD_ADDRESSES_SUCCESS':
            return setCheckoutStepStatus(state, 'LOAD_ADDRESSES_SUCCESS', checkoutStepKeys.deliveryAddress);
        case 'LOAD_ADDRESSES_ERROR':
            return setCheckoutStepStatus(state, 'LOAD_ADDRESSES_ERROR', checkoutStepKeys.deliveryAddress);
        case 'LOAD_DELIVERY_SLOT_INPROGRESS':
                return setCheckoutStepStatus(state, 'LOAD_DELIVERY_SLOT_INPROGRESS', checkoutStepKeys.deliverySlot);
        case 'LOAD_DELIVERY_SLOT_SUCCESS':
            return setCheckoutStepStatus(state, 'LOAD_DELIVERY_SLOT_SUCCESS', checkoutStepKeys.deliverySlot);
        case 'LOAD_DELIVERY_SLOT_ERROR':
            return setCheckoutStepStatus(state, 'LOAD_DELIVERY_SLOT_ERROR', checkoutStepKeys.deliverySlot);           
        default:
            return state;
    }
};

export default checkoutUI;