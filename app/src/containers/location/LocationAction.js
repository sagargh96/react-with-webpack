import axios from 'api';
import { createAction } from 'utils/helpers';
import { initData, defaultRegion } from './Constants';

const locationUrl = '/locations';

export const openLocationModal = () => {
    return {
        type: 'OPEN_LOCATION_MODAL'
    }
}
export const closeLocationModal = () => {
    return {
        type: 'CLOSE_LOCATION_MODAL'
    }
}
export const changeLocation = (changedLocality) => {
    return {
        type: 'CHANGE_LOCATION',
        changedLocality: changedLocality
    }
}

export const selectDefaultLocation = () => {
    return (dispatch, getState) => {
        const state = getState();
        const location = {
            ...state.data.location,
            isDefault: false
        }
        dispatch(createAction('SELECT_DEFAULT_LOCATION'));
        dispatch(createAction('CLOSE_LOCATION_MODAL'));
    }
}
export const storeAvailabilityStatus = (zipCode, status, error) => {
    return {
        type: status,
        data: {
            error: error,
            zipCode: zipCode
        }
    };
}

export const loadDefaultLocation = () => {

}

export const checkZipCode = ({zipCode, isDefault, loadDefaultOnNotAvailable}) => {
    return (dispatch) => {
        dispatch({ type: 'CHECK_ZIPCODE_INPROGRESS' });
        axios.get(`${locationUrl}/check-availability/zip-code/${zipCode}`)
            .then((res) => {
                if (res.status === 200 && res.data) {
                    let data = res.data.data;
                    if (data && data.stores && data.stores.length > 0) {
                        data.isDefault = isDefault;                        
                        dispatch(createAction('SET_LOCATION',data));
                        dispatch(storeAvailabilityStatus(zipCode, 'CHECK_ZIPCODE_SUCCESS', null));                    
                        dispatch(createAction('SET_STORE',data));
                    } else {
                        //If do not found store for user's location then ask user
                        //to change location by opening location modal and call load store with
                        //default location
                        let error = { ...initData.errorMessages.zipNotFound };
                        error.message += ' ' + zipCode;
                        dispatch(storeAvailabilityStatus(zipCode, 'CHECK_ZIPCODE_ERROR', [error]));
                        if (!isDefault && loadDefaultOnNotAvailable) {
                            dispatch(checkZipCode(defaultRegion));
                        }
                    }
                    dispatch(createAction('SET_STORE_SUCCESS', null));                    
                    //Not default location then hide change location modal
                    if (!isDefault) {                    
                        dispatch(closeLocationModal());
                    } else { 
                        dispatch(openLocationModal());
                    }
                }
                
            }).catch ((error) => {
                if (error.response && error.response.status === 404) {
                    let error = { ...initData.errorMessages.zipNotFound };
                    error.message += ' ' + zipCode;
                    dispatch(storeAvailabilityStatus(zipCode, 'CHECK_ZIPCODE_ERROR', [error]));
                } else {                    
                    dispatch(storeAvailabilityStatus(zipCode, 'CHECK_ZIPCODE_ERROR',
                        [{...initData.errorMessages.networkError}]));
                }
            });
    };
};
export const detectLocation = () => {
    return {
        type: 'DETECT_LOCATION'
    }
};

function base64ToArrayBuffer(base64) {
	var binaryString = window.atob(base64);
	var binaryLen = binaryString.length;
	var bytes = new Uint8Array(binaryLen);
	for (var i = 0; i < binaryLen; i++) {
	   var ascii = binaryString.charCodeAt(i);
	   bytes[i] = ascii;
	}
	return bytes;
 }

 function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	  // Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}

	if (/android/i.test(userAgent)) {
		return "Android";
	}

	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return "iOS";
	}

	return "unknown";
}



function saveByteArray(reportName, byte) {
	//
	var os=getMobileOperatingSystem();

	if(os=="iOS")
	{
		var reader = new FileReader();
var out = new Blob([byte], {type: "application/pdf"});
reader.onload = function(e){
  window.location.href = reader.result;
}
reader.readAsDataURL(out);
	}


	else {

		var blob = new Blob([byte], {type: "application/pdf"});
		var link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		//link.href=window.webkitURL.createObjectURL(blob);
		//a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
		var fileName = reportName;
		link.download = fileName.substr(fileName.lastIndexOf('/') + 1);
		document.body.appendChild(link);
	 link.click();
	document.body.removeChild(link);
}

};
export const downloadTnC = () => {
    return (dispatch) => {
		axios.get(`/resource/terms-n-conditions`)
		.then((res) => {
			if (res) {
				var sampleArr = base64ToArrayBuffer(res);
    			saveByteArray("Sample Report", sampleArr);
			}
		});
	}
};