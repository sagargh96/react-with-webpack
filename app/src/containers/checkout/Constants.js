const checkoutStepKeys = {
    userDetails: 'userDetails',
    deliveryAddress: 'deliveryAddress',
    deliverySlot: 'deliverySlot',
    paymentMethod: 'paymentMethod'
};

const checkoutSteps = [
    {
        key: checkoutStepKeys.userDetails,
        title: 'Your Details',
        number: 1,
        nextDependentSteps: [checkoutStepKeys.deliveryAddress, 
            checkoutStepKeys.deliverySlot, 
            checkoutStepKeys.paymentMethod]
    },
    {
        key: checkoutStepKeys.deliveryAddress,
        title: 'Delivery Address',
        number: 2,
        status: null,
        nextDependentSteps: [checkoutStepKeys.deliverySlot, 
            checkoutStepKeys.paymentMethod]
    },
    {
        key: checkoutStepKeys.deliverySlot,
        title: 'Delivery Time',
        number: 3,
        status: null,
        nextDependentSteps: [checkoutStepKeys.paymentMethod]
    },
    {
        key: checkoutStepKeys.paymentMethod,
        title: 'Pyment Method',
        number: 4,
        status: null,
        nextDependentSteps: []
    }
];

const paymentTypesConst = {
    cardWalletNetBanking: 1,
    cash: 2
}

const paymentOptionsConst = {
    pauUMoney: 1,
    cod: 2,
    paytm: 4
}

const payUMoneyConfig = {
    boltScriptUrl: 'https://sboxcheckout-static.citruspay.com/bolt/run/bolt.min.js',
    brandColor: '#43B02A',
    brandLogo: ''
}

const paytmConfig = {
    url: 'https://securegw-stage.paytm.in/theia/processTransaction?ORDER_ID='
}

export { 
    checkoutStepKeys, 
    checkoutSteps,
    paymentTypesConst,
    paymentOptionsConst,
    payUMoneyConfig,
    paytmConfig
};