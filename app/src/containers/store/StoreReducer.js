import { config } from "utils/Config";
import { converToStoreDetails } from 'utils/helpers';

const initialState = {
	status: 'IN_PROGRESS',
	banners: [
		{
			id: 1,
			name: 'Banner 1',
			img: config.imagesBasePath + '/banner1.jpg'
		},
		{
			id: 2,
			name: 'Banner 1',
			img: config.imagesBasePath + '/banner2.jpg'
		},
		{
			id: 3,
			name: 'Banner 3',
			img: config.imagesBasePath + '/banner3.jpg'
		},
		{
			id: 4,
			name: 'Banner 4',
			img: config.imagesBasePath + '/banner4.jpg'
		}
	]
};

const mapCategoriesData = (category, parentCat) => {
	let subCategories = [];
	let parentCatLink = (parentCat && parentCat.link) || config.basePath;
	let newCategory = {
		id: category.id,
		name: category.name,
		seoName: category.seoName,
		description: category.shortDescription,
		imageLrg: category.imgLarge,
		imageSml: category.imgSmall,
		link: parentCatLink + '/' + category.seoName
	}
	if (category.subCategories && category.subCategories.length > 0) {
		subCategories = category.subCategories.map((subCategory) => mapCategoriesData(subCategory, newCategory));
	}	
	newCategory.subCategories = subCategories;
	return newCategory;
};

const mapStoreData = (state, data) => {
	const store = data && data.stores && data.stores[0];
	if (!store) {
		return {};
	}
	const storeDetails = {
		storeDetails: converToStoreDetails(store),
		categories: store.categories.map((category) => mapCategoriesData(category, null)),

		banners: initialState.banners
	};
	return storeDetails;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
		case 'SET_STORE':
			return {
				...mapStoreData(state, action.payload)
			};
		case 'SET_STORE_INPROGRESS':
			return {
				...state,
				status: 'IN_PROGRESS'
			};
		case 'SET_STORE_SUCCESS':
			return {
				...state,
				status: 'SUCCESS'
			};
        default:
            return state;
    }
};

export default reducer;