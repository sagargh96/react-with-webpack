const initData = {
    errorMessages: {
        networkError: {
            code: 'NETWORK_ERROR',
            message: 'Please check your network connection',
        },
        zipNotFound: {
            code: 'NOT_AVAILABLE',
            message: 'We\'re sorry - there are currently no delivery stores near', 
        }
    }
};

const defaultRegionList = {
    '411028': {
        isDefault: true,
        lat: 28.4472372,
        lon: 77.04061469999999,
        locality: 'Magarpatta City',
        city: 'Pune',
        isAvailable: true,
        zipCode: '411028',
        id: 2
    },
    '411040': {
        isDefault: true,
        lat: 18.5362084,
        lon: 73.89397480000002,
        locality: 'Wanawadi',
        city: 'Pune',
        isAvailable: true,
        zipCode: '411040',
        id: 1
    }
};
const defaultRegion = defaultRegionList['411040'];
export { initData, defaultRegion };