
const commonConfig = {
	basePath: '/store',
	offersPath: '/offers',
	imagesBasePath: '/static/images',
	isProd: process.env.NODE_ENV === 'production' ? true : false,
	isDev: process.env.NODE_ENV === 'development' ? true : false
};

const prodConfig = {
	...commonConfig,
	serverUrl: 'https://limitless-cliffs-82484.herokuapp.com',
	imagesBasePath: 'https://limitless-cliffs-82484.herokuapp.com/resource/images',
};

const devConfig = {
	...commonConfig,
	serverUrl: 'http://localhost:5000',
	imagesBasePath: 'http://localhost:5000/resource/images',
};

export const config = commonConfig.isProd ? prodConfig : devConfig; 