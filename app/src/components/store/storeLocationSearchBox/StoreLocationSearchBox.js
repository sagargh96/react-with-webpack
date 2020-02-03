import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LocationIcon from 'grommet/components/icons/base/Location'

/*style*/ import './StoreLocationSearchBox.module.scss';
import PlacesAutoComplete from 'components/common/placesAutoComplete/PlacesAutoComplete';

//import { PlacesAutoComplete } from 'components/common';

class StoreLocationSearchBox extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const cssClasses = {
            root: 'ps-store-location-search-box',
            input: 'search-input',
            autocompleteContainer: 'autocomplete-container',
            autocompleteContainerHidden: 'autocomplete-container-hidden',
            autocompleteItem: 'autocomplete-item',
            autocompleteItemActive: 'autocomplete-item-active'
        };
        const options = {
            componentRestrictions: {country: 'in'}
        };
        const AutocompleteItem = ({ formattedSuggestion }) => (
            <div className="suggestion-item">
                <LocationIcon className="icon-small"/>
                <strong>{formattedSuggestion.mainText}</strong>{' '}
                <span className="text-muted">{formattedSuggestion.secondaryText}</span>
            </div>)
    
        const inputProps = {
            type: "text",
            value: this.props.place,
            onChange: this.props.onChange,
            autoFocus: true,
            placeholder: this.props.placeholder || "Search Places"
        };
        return (
            <PlacesAutoComplete
                inputProps={inputProps}
                autocompleteItem={AutocompleteItem}
                classNames={cssClasses}
                options = {options}
            />
        );
    }
}

StoreLocationSearchBox.PropTypes = {
    place: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}

export default StoreLocationSearchBox;