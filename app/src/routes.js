import App from './containers/app/App';

const onChangeHandler = () => {
	if (window) {
		document.getElementById('content').focus();
		window.scrollTo(0, 0);
	}
}
// throws an error in the console if the page wasn't able to load
function errorLoading(error) {
	throw new Error(`Dynamic page loading failed: ${error}`);
}

const routes = [
	{
		path: '/',
		getComponent: (location, cb) => {
			require.ensure([], function (require) {
				cb(null, require('./pages/landing/LandingPage').default);
			}, 'LandingPage');
		},
		onChange: onChangeHandler,
		name: 'landingPage'
	},{
		path: '/social-login-success',
		getComponent: (location, cb) => {
			require.ensure([], function (require) {
				cb(null, require('./pages/socialAuth/SocialAuthSuccessPage').default);
			}, 'SocialAuthSuccessPage');
		},
		onChange: onChangeHandler,
		name: 'socialLoginSuccessPage'
	},
	{
		path: '/store',
		component: App,
		onChange: onChangeHandler,
		indexRoute: {
			getComponent: (location, cb) => {
				require.ensure([], function (require) {
					cb(null, require('./pages/home/HomePage').default);
				}, 'HomePage');
			},
			name: 'store'
		},
		childRoutes: [
			{
				path: '/store/:categoryName(/:subCatName)',
				getComponent: (location, cb) => {
					require.ensure([], function (require) {
						cb(null, require('./pages/products/ProductsPage').default);
					}, 'ProductsPage');
				},
				name: 'productsPage'
			},
			{
				path: '/store/:categoryName/:subCatName/:productName',
				getComponent: (location, cb) => {
					require.ensure([], function (require) {
						cb(null, require('./pages/productDetail/ProductDetailPage').default);
					}, 'ProductDetailPage');
				},
				name: 'productDetailPage'
			},{
				path: '/auth/:step',
				getComponent: (location, cb) => {
					require.ensure([], function (require) {
						cb(null, require('./pages/auth/AuthPage').default);
					}, 'AuthPage');
				},
				name: 'authPage'
			},{
				path: '/checkout',
				getComponent: (location, cb) => {
					require.ensure([], function (require) {
						cb(null, require('./pages/checkout/CheckoutPage').default);
					}, 'CheckoutPage');
				},
				onChange: onChangeHandler,
				name: 'checkoutPage'
			},{
				path: '/make-payment',
				getComponent: (location, cb) => {
					require.ensure([], function (require) {
						cb(null, require('./pages/checkout/PaytmPaymentPage').default);
					}, 'PaytmPaymentPage');
				},
				onChange: onChangeHandler,
				name: 'paytmPaymentPage'
			},{
				path: '/order-confirmation',
				getComponent: (location, cb) => {
					require.ensure([], function (require) {
						cb(null, require('./pages/checkout/OrderConfirmationPage').default);
					}, 'OrderConfirmationPage');
				},
				onChange: onChangeHandler,
				name: 'orderConfirmationPage'
			},{
				path: '/offers',
				getComponent: (location, cb) => {
					require.ensure([], function (require) {
						cb(null, require('./pages/offers/OffersPage').default);
					}, 'OffersPage');
				},
				onChange: onChangeHandler,
				name: 'offersPage'
			}
		]
	}
];

export default routes;
