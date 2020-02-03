const initialState = {
        id: 1,
        name: 'Lotus stem - Kamal Kandi',
        seoName: 'lotus-stem-kamal-kandi',
        uom: 'Kg',
        isQtyList: true,
        imgSrc: '../../../images/prod_img_1.jpg',
        images: [],
        qtyList: [
            {id: 1, value: '1/2 KG', qty: 0.5}, 
            {id: 2, value: '1 KG', qty: 1},
            {id: 3, value: '2 KG', qty: 2},
            {id: 4, value: '3 KG', qty: 3},
            {id: 5, value: '4 KG', qty: 4}
        ],
        promoOffer: {
            text: 'Buy >=2 KG get Rs. 10 discount',
            type: 'onProductQty_fixedAmount',
            qty: '2',
            discountPercent: null,
            discountFixed: 10
        }, 
        pricePerUnit: 30,
        oldPricePerUnit: 35,
        unitQty: {id: 1, value: '1/2 KG', qty: 0.5},
        inventory: 100,
        categorySeoName: 'vegetables',
        subcategorySeoName: 'daily-vegetables',
        description: 'Relished raw, Kiran Watermelon is juicy, crispy and irresistibly sweet. Mixed with thinly sliced onion, salt and black pepper, it makes for a great summer salad. A versatile fruit, it can also be used to make juice, jam, sorbet, iced tea, etc.',
        features: [
            {
                title: 'Nutrient Value & Benefits',
                value: 'Kiran watermelon is made up of nearly 90 percent water. Rich in iron, potassium and fibre, it helps to prevent sore muscles and dehydration related cramping.'
            },
            {
                title: 'Shelf Life',
                value: 'Recommended to be consumed within 3-4 days.'
            },
            {
                title: 'Storage Tips',
                value: 'It can be stored at room temperature but should be refrigerated after cutting.'
            },
            {
                title: 'Storage Temperature (degC)',
                value: '10-15'
            },
            {
                title: 'Disclaimer',
                value: 'Image shown is a representation and may slightly vary from the actual product. Every effort is made to maintain accuracy of all information displayed.'
            },
        ]
}

const updateProductSelectedQty = (productDetailState, productId, selectedQty) => {
    productDetailState.selectedQty = selectedQty;
    return {
        ...productDetailState
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_PRODUCT_DETAIL_SELECTED_QTY':
            const newProductDetailState = updateProductSelectedQty(state, action.productId, action.selectedQty);
            return {
                ...newProductDetailState
            }
        case 'SELECT_PRODUCT_SUB_CATEGORY': 
            return {
                ...state,
                selectedProductSubCat: action.selectedSubCategory
            }
        default:
            return state;
    }
};

export default reducer;