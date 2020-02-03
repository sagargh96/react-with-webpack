import isFunction from 'lodash.isfunction';
import isRegExp from 'lodash.isregexp';

const rules = {
    emailId: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    indianMobileNum: /^[0]?[789]\d{9}$/,
    required: (value) => {
        value = value && typeof(value) === 'string'? value.trim() : value;
        return !value;
    }
}

export const buildValidationRules = (validationObj) => {
    let validationRules = {};
    Object.keys(validationObj).map(fieldName => {
        validationRules[fieldName] = createRule(validationObj[fieldName]);
    });
    return validationRules;
};

const createRule = (validationRules) => {
    return (value) => {
        for (let validationRule of validationRules) {
            if (!validationRule.rule) {
                return undefined;
            }
            if (isFunction(validationRule.rule)) {
                if(validationRule.rule(value)) {
                    return validationRule.message;
                };
            } else if (!rules[validationRule.rule]) {
                return undefined;
            } else if (isRegExp(rules[validationRule.rule])) {
                if (!rules[validationRule.rule].test(value)) {
                    return validationRule.message;
                }
            } else if (isFunction(rules[validationRule.rule])) {
                if (rules[validationRule.rule](value, validationRule.param)) {
                    return validationRule.message;
                }
            }
        };
        return undefined;
    }
}

export const emailIdWithRequired = (value) => {
    if (!value || value === '') {
      return 'Email adddress is required';
    } else if (!emailIdRegEx.test(value)) {
      return 'Email address is not valid';
    }
    return undefined;
};

export const indianMobileNumberWithRequired = (value) => {
    if (!value || value === '') {
        return 'Mobil number is required';
      } else if (!indianMobileNumRegEx.test(value)) {
        return 'Mobile number must be 10 ';
      }
      return undefined;
}