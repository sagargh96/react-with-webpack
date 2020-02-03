import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import { routerReducer } from 'react-router-redux';
//import { reducer as formReducer } from 'redux-form';
import  LocationReducer from 'containers/location/LocationReducer';
import  LocationUIReducer from 'containers/location/LocationUIReducer';
import cartDataReducer from 'containers/cart/CartReducer';
import cartUiReducer from 'containers/cart/CartModalReducer';
import StoreReducer from 'containers/Store/StoreReducer';
import ProductsReducer from 'containers/products/ProductsReducer';
import ProductDetailReducer from 'containers/productDetail/ProductDetailReducer';
import BrowseDepartmentReducer from 'containers/browseDepartment/BrowseDepartmentReducer';
import AccountReducer from 'containers/account/AccountReducer';
import AccountUIReducer from 'containers/account/AccountUIReducer';
import SignupReducer from 'containers/signup/SignupReducer';
import HeaderUIReducer from 'containers/header/HeaderReducer';
import CheckoutUIReducer from 'containers/checkout/CheckoutUIReducer';
import CheckoutDataReducer from 'containers/checkout/CheckoutDataReducer';
import PaymentTxnDataReducer from 'containers/orderConfirmation/PaymentTxnDataReducer';
import OrderConfirmationDataReducer from 'containers/orderConfirmation/OrderConfirmationReducer';
import SearchReducer from 'containers/search/SearchReducer';
import ProductsPopularSliderReducer from 'containers/productsPopularSlider/ProductsPopularSliderReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// Import all of your reducers here:
const dataReducers = combineReducers({
  location: LocationReducer,
  cart: cartDataReducer,
  store: StoreReducer,
  account: AccountReducer,
  checkout: CheckoutDataReducer,
  paymentTxn: PaymentTxnDataReducer,
  orderConfirmation: OrderConfirmationDataReducer,
  search: SearchReducer
});

const uiReducer = combineReducers({
  location: LocationUIReducer,
  account: AccountUIReducer,
  signup: SignupReducer,
  browseDepartment: BrowseDepartmentReducer,
  products: ProductsReducer,
  productDetail: ProductDetailReducer,
  cart: cartUiReducer,
  header: HeaderUIReducer,
  checkout: CheckoutUIReducer,
  productsPoupularSlider: ProductsPopularSliderReducer
});

/*const pageReducers = combineReducers({
  productsPage: ProductsReducer,
  productDetail: ProductDetailReducer
});*/


/* Persist state config */
const dataPersistConfig = {
  key: 'data',
  storage,
  whitelist: ['location', 'account', 'cart'],
  stateReconciler: autoMergeLevel2
};
const rootReducer = combineReducers({
  // Apply all of the reducers here.
  routing: routerReducer,
  data: persistReducer(dataPersistConfig, dataReducers),
  ui: uiReducer,
  browser: createResponsiveStateReducer({
    small: 492,
    medium: 1024,
    large: 1260,
}, {
  infinity: 'extraLarge'
}),
});
export default rootReducer;