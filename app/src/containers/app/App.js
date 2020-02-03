import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppComponent from 'grommet/components/App';
import Box from 'grommet/components/Box';
import 'styles/styles.scss';
import './App.module.scss';
import Header from 'containers/header/Header';

import { enableMiniHeaderMode, disableMiniHeaderMode } from '../header/HeaderAction';
//import {Header} from 'containers';

class App extends React.Component {
    constructor () {
        super();
        this._onRouteChange = this._onRouteChange.bind(this);
    }

    componentWillMount() {
        this._onRouteChange(this.props.routes);   
    }
    componentWillReceiveProps (nextProps) {
        this._onRouteChange(nextProps.routes);
    }

    _onRouteChange (routes) {        
        const currentRoute = routes[routes.length - 1].name;
        if (['checkoutPage', 'authPage', 'orderConfirmationPage'].indexOf(currentRoute) > -1) {
            this.props.enableMiniHeader();
        } else {
            this.props.disableMiniHeader();
        }
    }

    render () {
         return (
            <AppComponent className='ps-app' centered={false}>            
                <main id="content">
                    <Header/>
                    { this.props.children }
                </main>
            </AppComponent>
        );
    }
}

App.PropTypes = {
    location: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    onLocationClick: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators ({
        enableMiniHeader: enableMiniHeaderMode,
        disableMiniHeader: disableMiniHeaderMode
    }, dispatch)
});

const mapStateToProps = (state) => ({
    location: state.data.location,
    store: state.data.store
});

export default connect(mapStateToProps, mapDispatchToProps)(App);