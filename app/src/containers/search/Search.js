import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autosuggest from 'react-autosuggest';
/*style*/ import './Search.module.scss';

import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import SearchIcon from 'grommet/components/icons/base/Search';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import HistoryIcon from 'grommet/components/icons/base/History';

import {setSearchKeyword, hideSearchBox} from './SearchActions';
import { trimWhiteSpace } from 'utils/helpers';

class Search extends Component {
    constructor (props) {
        super(props)
        this._getSuggestions = this._getSuggestions.bind(this);
        this._onSearchInputChange = this._onSearchInputChange.bind(this);
        this._onSearchInputKeyDown = this._onSearchInputKeyDown.bind(this);
        this._renderSearchInput = this._renderSearchInput.bind(this);
        //this._loadSuggestions = this._loadSuggestions.bind(this);
    }
    
    componentDidUpdate() {
        if (this.searchEl && this.props.search.showSearchBox) {
            this.searchEl.focus();
        }
    }
    _renderSuggestion (suggestion, { query }) {
        if (!suggestion || (!suggestion.keyword && !suggestion.suggestion)) {
            return null;
        }
        return (
            <Anchor>
                {
                    suggestion.searchCount ? <HistoryIcon/> : <SearchIcon/>
                }
                <span>{suggestion.keyword || suggestion.suggestion.name} </span>
                <span  className="link-next-icon"><LinkNextIcon/></span>
            </Anchor>
        );
    }
    _getSuggestions (keyword, trending, searchHistory, results) {
        if (keyword && keyword.length > 0 && results && results.length > 0) {
            const searchCategories = {
                title: 'Categories',
                suggestions: !results ? [] : results
                    .filter(result => result.category)
            };
            const searchProducts = {
                title: 'Products',
                suggestions: !results ? [] : results
                    .filter(result => result.suggestion)
            };            
            return [
                searchCategories,
                searchProducts
            ].filter(item => item.suggestions && item.suggestions.length > 0);
        } else {
            let trendingCount = 10;
            const searchHistoryToDisplay = {
                title: 'Frequesnt Searches',
                suggestions: !searchHistory ? [] : searchHistory.sort((a, b) => {
                    if (a.searchCount > b.searchCount) {
                        return -1;
                    } else if (a.searchCount === b.searchCount) {
                        return a.lastSearchTime > b.lastSearchTime ? -1 : 1;
                    }
                    return 1;
                }).slice(0, 20)
            };
            trendingCount = trendingCount - searchHistoryToDisplay.suggestions.length;
            const trendingToDisplay = {
                title: 'Trending',
                suggestions: !trending ? [] : trending.slice(0, trendingCount)
            }
            return [
                trendingToDisplay,
                searchHistoryToDisplay
            ].filter((item) => {return item.suggestions.length > 0});
        }
    }
    _getSuggestionValue (result) {
        if (result.keyword) {
            return result.keyword;
        } else if (result.suggestion) {
            return result.suggestion.name;
        }    
        return '';
    };
    _onSearchInputChange (event, {method, newValue}) {
        this.props.setSearchKeyword(newValue);
        if (newValue.length !== 0) {
            console.log('Load suggestions');
            //this._loadSuggestions(newValue);
        }
    }
    _onSearchInputKeyDown (event) {
        const keyword = trimWhiteSpace(this.props.search.keyword);

        // hide on escape press
        if (event.keyCode === 27) {
            this.hideTypeahead();
        }

        // handle enter
        if ((event.keyCode === 13) && keyword.length !== 0) {
            this.handleDirectSearch(keyword);
            trackEvent('userPressedEnterOnSearch');
        }
    }

    _renderSearchInput (inputProps) {
        return (
            <div className="search-box" data-test-id="search-box">                
                <Button className="search-back-btn"
                    icon={<LinkPreviousIcon/>}
                    onClick={() => {
                        this.props.hideSearchBox();
                        console.log('search clicked...');
                    }}
                />
                <input
                    {...inputProps}
                    ref={
                            el => {
                            if (inputProps.ref) { 
                                //inputProps.ref();
                            }
                            this.searchEl = el;
                        }
                    }
                />
                <Button className="search-btn"
                    icon={<SearchIcon/>}
                    onClick={() => {
                        // this.handleDirectSearch(keyword);
                        // trackEvent('userClickedSearchButton');
                        console.log('search clicked...');
                    }}
                />
            </div>
        );
    }

    
    _renderSectionTitle (section) {
        return (
            <div className="suggestion-title">
                {section.title}
            </div>
        );
    }

    _getSectionSuggestions (section) {
        return section.suggestions;
    }
    onSuggestionSelected(evt, { suggestion }) {
        return true;
    }

    render () {
        console.log("****Render search");
        const {
            search,
            searchUI,
            isMobile,
            isTablet,
            isDesktop
        } = this.props;
        const {
            keyword, 
            trending, 
            results,
            searchHistory,
            showSearchBox
        } = search;
        const suggestions = this._getSuggestions(keyword, trending, searchHistory, results);
        const inputProps = {
            value: keyword,
            placeholder: 'Search products or categories',
            onChange: (...args) => this._onSearchInputChange(...args),
            //onFocus: this.showTypeahead,
            onKeyDown: (...args) => this._onSearchInputKeyDown(...args)
        };
        return (
            (showSearchBox && (isMobile || isTablet)) || isDesktop ?
                <div className="search-widget">
                    <Autosuggest id="search"
                        suggestions={suggestions}
                        shouldRenderSuggestions={() => true}
                        onSuggestionsFetchRequested={() => null}
                        onSuggestionsClearRequested={() => null}
                        getSuggestionValue={this._getSuggestionValue}
                        renderSuggestion={this._renderSuggestion}
                        renderInputComponent={this._renderSearchInput}
                        inputProps={inputProps}
                        multiSection
                        renderSectionTitle={this._renderSectionTitle}                    
                        getSectionSuggestions={this._getSectionSuggestions}
                        //onSuggestionSelected={(...args) => this.onSuggestionSelected(...args)}
                        focusInputOnSuggestionClick={false}
                    />
                </div>
            : null
        );
    }
}

Search.PropTypes = {
    search: PropTypes.object,
    searchHistory: PropTypes.object
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        setSearchKeyword,
        hideSearchBox
    }, dispatch)
});

const mapStateToProps = (state) => ({
    search: state.data.search,
    searchUI: state.ui.search,
    isMobile: state.browser.is.small,
    isTablet: state.browser.is.medium,
    isDesktop: state.browser.is.large || state.browser.is.extraLarge,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);