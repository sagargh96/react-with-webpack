import React, {Component} from 'react';

import AppComponent from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';

import 'styles/styles.scss';
import './LandingPage.module.scss';

import ImageLazyLoader from 'components/common/imageLazyLoader/ImageLazyLoader';
import Overlay from 'components/common/overlay/Overlay';
import vendorImg from 'images/vendor.jpg';
import chooseProdImg from 'images/choose_products.jpg';
import shopImg from 'images/shop_delivery.jpg';
import deliveryImg from 'images/delivery_bag.jpg';
//import { ImageLazyLoader, Overlay } from 'components/common';

//import { Signup } from 'containers';
import Signup from 'containers/signup/Signup';
import { signUpInitTexts } from './messages/signUpInitTexts';

class LandingPage extends Component {
    
    constructor() {
        super();
    }
    render() {
        return (
            <AppComponent className='ps-app' centered={false}>            
                <main id="content">
                    <div className="fixed-bg" 
                        style={{background: `url(${vendorImg}) no-repeat center center fixed`,
                        backgroundSize: "cover"}}></div> 
                    <Article scrollStep={true} controls={true}>
                        <Section alignContent="center"
                            pad="none" justify="center" align="center">
                            <Overlay render={
                                () => {
                                    return <Signup
                                        showLocationHeading={true} 
                                        redirectUrl="/store"
                                        isLandingPageOverlay={true}
                                        initText={signUpInitTexts}/>
                                }
                            }/>                                                    
                        </Section>
                        <Section alignContent="center" className="how-it-works" 
                            justify="center" align="center"  colorIndex="light-1" pad='none'>
                            <div className="row">
                                <div className="columns small-12 large-4 v-normal-bottom ps-tile">                                                    
                                    <ImageLazyLoader src={chooseProdImg} 
                                        preLoader='{()=><Spinning/>}'>
                                        <span className='secondary-text'>Choose product image</span>
                                    </ImageLazyLoader>
                                    <div>
                                        <Heading tag="h1" margin="none" strong={true} align="center">
                                            Choose products
                                        </Heading>
                                        <div className="sub-heading align-center">
                                            Find products from wide range of verieties
                                        </div>
                                    </div>
                                </div>
                                <div className="columns small-12 large-4 v-normal-bottom ps-tile">                                                    
                                    <ImageLazyLoader src={shopImg} 
                                        preLoader='{()=><Spinning/>}'>
                                        <span className='secondary-text'>Choose product image</span>
                                    </ImageLazyLoader>
                                    <div>
                                        <Heading tag="h1" margin="none" strong={true} align="center">
                                            Select delivery time
                                        </Heading>
                                        <div className="sub-heading align-center">
                                            Find products from wide range of verieties
                                        </div>
                                    </div>
                                </div>
                                <div className="columns small-12 large-4 v-normal-bottom ps-tile">                                                    
                                    <ImageLazyLoader src={deliveryImg} 
                                        preLoader='{()=><Spinning/>}'>
                                        <span className='secondary-text'>Choose product image</span>
                                    </ImageLazyLoader>
                                    <div>
                                        <Heading tag="h1" margin="none" strong={true} align="center">
                                            Doorstep delivery
                                        </Heading>
                                        <div className="sub-heading align-center">
                                            Find products from wide range of verieties
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </Article>
                </main>
            </AppComponent>
        );
    }
}

export default LandingPage;