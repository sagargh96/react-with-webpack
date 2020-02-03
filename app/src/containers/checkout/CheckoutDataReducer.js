const initialState = {
    'userDetails': {
    },
    'deliveryAddress': {
        // addresses: [{
        //     id: 1,
        //     name: 'Rohit Kedari',
        //     type: {
        //         id: 1,
        //         text: 'Home'
        //     },
        //     line1: '1st Floor Shiv Shambho Niwas1',
        //     line2: 'Shivarkar Road2',
        //     landmark: 'Near Jambhulkar Garden',
        //     city: 'Pune',
        //     zipCode: '411040'
        // }, {
        //     id: 2,
        //     name: 'Swapnil Kedari',
        //     type: {
        //         id: 2,
        //         text: 'Office'
        //     },
        //     line1: '1st Floor Shiv Shambho Niwas3',
        //     line2: 'Shivarkar Road',
        //     landmark: 'Near Jambhulkar Garden4',
        //     city: 'Pune',
        //     zipCode: '411040'
        // }, {
        //     id: 3,
        //     name: 'Nilima Kedari',
        //     type: {
        //         id: 1,
        //         text: 'Home'
        //     },
        //     line1: '1st Floor Shiv Shambho Niwas6',
        //     line2: 'Shivarkar Road',
        //     landmark: 'Near Jambhulkar Garden7',
        //     city: 'Pune',
        //     zipCode: '411040'
        // }],
        // selectedAddressId: 1
    },
    'deliveryTime': {
        // deliverySlots: [
        //     {
        //         day: 16,
        //         weekDay: 1,
        //         weekDayText: 'Sunday',
        //         month: 'OCTOBER',
        //         timeSlots: [
        //             {
        //                 start: 1537093800,
        //                 end: 1537104600,
        //                 timeStr: '4 PM - 7 PM'
        //             },
        //             {
        //                 start: 1537108200,
        //                 end: 1537119000,
        //                 timeStr: '8 PM - 11 PM'
        //             }
        //         ]
        //     },
        //     {
        //         day: 17,
        //         weekDay: 2,
        //         weekDayText: 'Monday',
        //         month: 'OCTOBER',
        //         timeSlots: [
        //             {
        //                 start: 1537144200,
        //                 end: 1537155000,
        //                 timeStr: '6 AM - 9 AM'
        //             },
        //             {
        //                 start: 1537144201,
        //                 end: 1537155001,
        //                 timeStr: '10 AM - 1 PM'
        //             },
        //             {
        //                 start: 1537144202,
        //                 end: 1537155002,
        //                 timeStr: '4 PM - 7 PM'
        //             },
        //             {
        //                 start: 1537144203,
        //                 end: 1537155003,
        //                 timeStr: '7 PM - 9 PM'
        //             }
        //         ]
        //     },{
        //         day: 18,
        //         weekDay: 3,
        //         weekDayText: 'Tuesday',
        //         month: 'OCTOBER',
        //         timeSlots: [
        //             {
        //                 start: 1537144200,
        //                 end: 1537155000,
        //                 timeStr: '6 AM - 9 AM'
        //             },
        //             {
        //                 start: 1537144201,
        //                 end: 1537155001,
        //                 timeStr: '10 AM - 1 PM'
        //             },
        //             {
        //                 start: 1537144202,
        //                 end: 1537155002,
        //                 timeStr: '4 PM - 7 PM'
        //             },
        //             {
        //                 start: 1537144203,
        //                 end: 1537155003,
        //                 timeStr: '7 PM - 9 PM'
        //             }
        //         ]
        //     },{
        //         day: 19,
        //         weekDay: 4,
        //         weekDayText: 'Wednesday',
        //         month: 'OCTOBER',
        //         timeSlots: [
        //             {
        //                 start: 1537144200,
        //                 end: 1537155000,
        //                 timeStr: '6 AM - 9 AM'
        //             },
        //             {
        //                 start: 1537144201,
        //                 end: 1537155001,
        //                 timeStr: '10 AM - 1 PM'
        //             },
        //             {
        //                 start: 1537144202,
        //                 end: 1537155002,
        //                 timeStr: '4 PM - 7 PM'
        //             },
        //             {
        //                 start: 1537144203,
        //                 end: 1537155003,
        //                 timeStr: '7 PM - 9 PM'
        //             }
        //         ]
        //     }
        // ]
        
    },
    'paymentMethod': {

    }
};

const checkoutData = (state = initialState, action) => {
    const payload = action.payload;
    const addresses = state.deliveryAddress && state.deliveryAddress.addresses || [];
    switch (action.type) {
        case 'CLEAR_CHECKOUT_DATA':
            return initialState;
        case 'SET_USER_DETAILS':
            return {
                ...state,
                userDetails: {
                    ...payload
                }
            }
        case 'LOAD_ADDRESSES_SUCCESS':
            return {
                ...state,
                deliveryAddress: {
                    addresses: [
                        ...payload
                    ]
                }
            }
        case 'SET_DELIVERY_ADDRESS':
            return {
                ...state,
                deliveryAddress: {
                    ...state.deliveryAddress,
                    selectedAddressId: payload.address ? payload.address.id : null
                }
            }
        case 'SAVE_ADDRESS_SUCCESS':
            let isNew = true;
            let updatedAddressList = addresses.map((address, index) => {
                if (address.id === payload.id) {
                    isNew = false;
                    return payload;
                }
                return address;
            });
            if (isNew) {
                updatedAddressList.push(payload);
            }
            return {
                ...state,
                deliveryAddress: {
                    ...state.deliveryAddress,
                    addresses: updatedAddressList
                }
            };
        case 'DELETE_ADDRESS_SUCCESS':
            updatedAddressList = addresses.filter((address, index) => {
                return address.id !== payload.id;
            });
            return {
                ...state,
                deliveryAddress: {
                    ...state.deliveryAddress,
                    addresses: updatedAddressList
                }
            };
        case 'LOAD_DELIVERY_SLOTS_SUCCESS':
            return {
                ...state,
                deliveryTime: {
                    ...state.deliveryTime,
                    deliverySlots: payload
                }
            };
        case 'SET_DELIVERY_TIME_SLOT':
            return {
                ...state,
                deliveryTime: {
                    ...state.deliveryTime,
                    selectedDeliverySlot: payload.deliverySlot
                }
            }
        case 'LOAD_PAYMENT_OPTIONS_SUCCESS':
            return {
                ...state,
                paymentMethod: {
                    ...state.paymentMethod,
                    paymentTypes: payload
                }
            };
        case 'SET_PAYMENT_OPTION':
            return {
                ...state,
                paymentMethod: {
                    ...state.paymentMethod,
                    selectedPaymentOption: payload.paymentOption
                }
            };
        case 'INITIATE_PAYTM_PAYMENT_SUCCESS':
            return {
                ...state,
                paymentMethod: {
                    ...state.paymentMethod,
                    paytmPaymentRequest: payload.paytmPaymentRequest
                }
            }
        default:
            return state;
    }
};

export default checkoutData;