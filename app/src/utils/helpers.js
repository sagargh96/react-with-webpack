/* Parse QueryString using String Splitting */
import { config } from "utils/Config";

export const parseQueryString = (queryString) => {
    var dictionary = {};
     
    // remove the '?' from the beginning of the
    // if it exists
    if (queryString.indexOf('?') === 0) {
        queryString = queryString.substr(1);
    }
     
    // Step 1: separate out each key/value pair
    var parts = queryString.split('&');
     
    for(var i = 0; i < parts.length; i++) {
        var p = parts[i];
        // Step 2: Split Key/Value pair
        var keyValuePair = p.split('=');
         
        // Step 3: Add Key/Value pair to Dictionary object
        var key = keyValuePair[0];
        var value = keyValuePair[1];
         
        // decode URI encoded string
        value = decodeURIComponent(value);
        value = value.replace(/\+/g, ' ');
         
        dictionary[key] = value;
    }
     
    // Step 4: Return Dictionary Object
    return dictionary;
}

export const createAction = (type, payload) => {
    return { type, payload };
};

export const converToStoreDetails = (store) => {
    return {
        id: store.id,
        name: store.name,
        deliveryCharges: {
            charge: parseFloat(store.deliveryCharge),
            freeDeliveryText: "Free delivery above",
            freeDeliveryAmount: parseFloat(store.freeDeliveryAmount)
        },
        minOrderAmount: parseFloat(store.minOrderAmount),
        link: config.basePath
    }
}

export const trimWhiteSpace = (str) => {
    if (str) {
        return str.trim();
    }
    return '';
}