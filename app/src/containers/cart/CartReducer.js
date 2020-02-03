const initialState = {
    count: 0,
	amount: 0,
	totalDeliveryCharges: 0,
	amtReqForFreeDelivery: 0,
	items: { /*
		"1": {
		  "storeDetails": {
			"id": 1,
			"name": "Super Store-1",
			"deliveryCharges": {
			  "charge": 30,
			  "freeDeliveryText": "Free delivery above",
			  "freeDeliveryAmount": 500
			},
			"minOrderAmount": null,
			"link": "/store",
			"count": 0,
			"subTotal": 0,
			"deliveryChargesApplied": 0
		  },
		  "products": {
			"9": {
				"id": 9,
				"name": "Cauliflower",
				"seoName": "cauliflower",
				"imgSmall": "image/cauliflower-s.jpeg",
				"imgLarge": null,
				"shortDescription": null,
				"longDescription": null,
				"uom": "Kg",
				"unitQty": 1,
				"productOptions": [
				  {
					"id": 7,
					"name": "cauliflower 1Kg",
					"qty": 1,
					"price": 30,
					"oldPrice": 20,
					"stockQty": 15,
					"count": 1,
					"totalQty": 1,
					"subTotal": 30,
					"productOptionStoreList": [
					  {
						"price": 30,
						"oldPrice": 20,
						"stockQty": 15
					  }
					]
				  },
				  {
					"id": 8,
					"name": "cauliflower 2Kg",
					"qty": 2,
					"productOptionStoreList": [
					  {
						"price": 60,
						"oldPrice": 70,
						"stockQty": 10
					  }
					]
				  },
				  {
					"id": 9,
					"name": "cauliflower 3Kg",
					"qty": 3,
					"productOptionStoreList": [
					  {
						"price": 50,
						"oldPrice": 60,
						"stockQty": 20
					  }
					]
				  }
				]
			  }
			}
		  },
		  "subTotal": 30,
		  "count": 1,
		  "deliveryChargesApplied": 0
	*/}
}

const updateCart = (cartState, store, item, itemOption, count) => {
	let newCartState = {
		...cartState,
		count: 0,
		subTotal: 0, 
		amount: 0, 
		totalDeliveryCharges: 0
	};
	if (!newCartState.items) {
		newCartState.items = {};
	}
	newCartState.items[store.id] = updateCartStore(newCartState.items[store.id], store, item, itemOption, count);	
	Object.keys(newCartState.items).forEach(storeId => {
        const store = newCartState.items[storeId];
        newCartState.count += store.count;
        newCartState.totalDeliveryCharges += store.deliveryChargesApplied;
		newCartState.subTotal += store.subTotal;
    });
	newCartState.amount = newCartState.subTotal + newCartState.totalDeliveryCharges;
	return newCartState;
}

const updateCartStore = (cartStoreState, store, item, itemOption, count) => {
	let newCartStoreState = {};
	if (!cartStoreState) {
		newCartStoreState = {
			storeDetails: {
				...store,
				count: 0,
				subTotal: 0,
				deliveryChargesApplied: 0
			}
		}
		newCartStoreState.products = {};
	} else {
		newCartStoreState = {
			...cartStoreState
		}
	}	
	newCartStoreState.products = updateStoreProducts(newCartStoreState.products, 
		item, itemOption, count);
	newCartStoreState.count = newCartStoreState.subTotal = 0;

	Object.keys(newCartStoreState.products).forEach(productId => {
		const product = newCartStoreState.products[productId];
		Object.keys(product.productOptions).forEach(productOptionId => {
			const productOption = product.productOptions[productOptionId];
			newCartStoreState.count += productOption.count;
			newCartStoreState.subTotal += productOption.subTotal;
		});
	});
	
	newCartStoreState.deliveryChargesApplied = 
		newCartStoreState.subTotal < newCartStoreState.storeDetails.deliveryCharges.freeDeliveryAmount ?
		(newCartStoreState.storeDetails.deliveryCharges.charge) : 0;
	return newCartStoreState;
};

const updateStoreProducts = (cartProductsState, item, itemOption, count) => {
	let newCartProductsState = {
		...cartProductsState
	}

	let newItem = updateItemInCart(cartProductsState[item.id], item, itemOption, count);
	if (Object.keys(newItem.productOptions).length <= 0) {
		delete (newCartProductsState[item.id]);
	} else {
		newCartProductsState[item.id] = {
			...newItem
		}
	}
	return newCartProductsState;
};

const updateItemInCart = (productState, item, itemOption, count) => {
	let newItem = {};
	if (!productState) {
		newItem = {
			...item,
			productOptions: {}
		}
	} else {
		newItem = {
			...productState,
			productOptions: {
				...productState.productOptions
			}
		}
	}
	let newCartItemOption = updateItemOptionInCart(newItem.productOptions[itemOption.id], item, itemOption, count);
	if (newCartItemOption.count <= 0) {
		delete(newItem.productOptions[itemOption.id]);
	} else {
		newItem.productOptions[itemOption.id] = newCartItemOption;
	}
	return newItem;
};

const updateItemOptionInCart = (productOptionState, item, itemOption, count) => {
	let newCartItemOption = {};
	if (!productOptionState) {
		newCartItemOption = {
			...itemOption,
			//...itemOption.productOptionStoreList[0]
		};
	} else {
		newCartItemOption = {
			...productOptionState
		};
	}
	newCartItemOption.count = newCartItemOption.count ? newCartItemOption.count + count : count;
    newCartItemOption.totalQty = newCartItemOption.totalQty ? (newCartItemOption.totalQty + count * itemOption.qty) : itemOption.qty;
	if (newCartItemOption.count > itemOption.stockQty) {
        newCartItemOption.count -= count;
        newCartItemOption.totalQty -= itemOption.qty;
	}	
	newCartItemOption.subTotal = itemOption.price * newCartItemOption.count;
	return newCartItemOption;
}

const cartData = (state = initialState, action) => {
    switch (action.type) {
		case 'UPDATE_CART_ITEM':
			const newCartState = updateCart(state, action.store, action.product, 
				action.productOption, action.count);
			return {
				...newCartState
			};
		case 'SAVE_CART_SUCCESS':
			const savedCart = action.payload;
			return {
				...savedCart
			};
		case 'CLEAR_CART':
			return initialState;
		default:
      		return state;
		}
};

export default cartData;
