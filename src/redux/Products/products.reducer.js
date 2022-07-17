import { PRODUCTS_LOADED, REFRESH_SUCCESS, REFRESH_STARTED, REFRESH_FAILED } from './products.types';

// const INITIAL_STATE = [
//     {
//         "id": 6237117743294,
//         "title": "All Purpose Cleaner",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/2.png?v=1618415062",
//         "price": 0.2,
//         "unit": "oz."
//     },
//     {
//         "id": 6237188292798,
//         "title": "Baking Soda",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/PANTRY_refillmenuimages.png?v=1618001594",
//         "price": 0.2,
//         "unit": "oz."
//     },
//     {
//         "id": 6887969161406,
//         "title": "Bath Soak",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/8.png?v=1628867697",
//         "price": 1,
//         "unit": "oz."
//     },
//     {
//         "id": 6237179478206,
//         "title": "Body Wash",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/1_deb052c7-694a-40d4-8ba9-5683ca3b52b6.png?v=1618155624",
//         "price": 0.6,
//         "unit": "oz."
//     },
//     {
//         "id": 6237185867966,
//         "title": "Conditioner",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/PERSONAL_refillmenuimages_2.png?v=1618764037",
//         "price": 1.2,
//         "unit": "oz."
//     },
//     {
//         "id": 6237133635774,
//         "title": "Dish Soap",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/3.png?v=1618415081",
//         "price": 0.4,
//         "unit": "oz."
//     },
//     {
//         "id": 6237139959998,
//         "title": "Dishwasher Powder",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/1.png?v=1618415103",
//         "price": 0.45,
//         "unit": "oz."
//     },
//     {
//         "id": 6887965687998,
//         "title": "Eucalyptus + Mint Body Oil",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/PERSONAL_refillmenuimages_4.png?v=1628877143",
//         "price": 2,
//         "unit": "oz."
//     },
//     {
//         "id": 6237181771966,
//         "title": "Face Mask Powder",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/4_431b16d6-5c80-4980-9108-9ba3cf7a367e.png?v=1618155726",
//         "price": 6,
//         "unit": "oz."
//     },
//     {
//         "id": 6237176955070,
//         "title": "Hand Soap",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/2_12e42862-08ff-48a5-8eca-b6b8d006e1fc.png?v=1618155693",
//         "price": 0.6,
//         "unit": "oz."
//     },
//     {
//         "id": 6237142220990,
//         "title": "Laundry Powder",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/4.png?v=1618415130",
//         "price": 0.35,
//         "unit": "oz."
//     },
//     {
//         "id": 6237147234494,
//         "title": "Lavender Face Toner",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/PERSONAL_refillmenuimages_1.png?v=1618683440",
//         "price": 1.5,
//         "unit": "oz."
//     },
//     {
//         "id": 6237144449214,
//         "title": "Lavender Laundry Soap",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/5.png?v=1618415180",
//         "price": 0.15,
//         "unit": "oz."
//     },
//     {
//         "id": 6237191864510,
//         "title": "Organic Black Beans",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/PANTRY_refillmenuimages_2.png?v=1618764404",
//         "price": 0.25,
//         "unit": "oz."
//     },
//     {
//         "id": 6901617262782,
//         "title": "Organic Dry Shampoo Powder Dark",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/10.png?v=1628868370",
//         "price": 7,
//         "unit": "oz."
//     },
//     {
//         "id": 6887959920830,
//         "title": "Organic Dry Shampoo Powder Light",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/9.png?v=1628868315",
//         "price": 7,
//         "unit": "oz."
//     },
//     {
//         "id": 6237193633982,
//         "title": "Organic Garbanzo Beans",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/PANTRY_refillmenuimages_1.png?v=1618764307",
//         "price": 0.25,
//         "unit": "oz."
//     },
//     {
//         "id": 6237195665598,
//         "title": "Organic Quinoa",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/3_354d804b-7f67-40b4-bb2c-e1a5c7be46be.png?v=1617829114",
//         "price": 0.35,
//         "unit": "oz."
//     },
//     {
//         "id": 6237189374142,
//         "title": "Organic White Rice",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/PANTRY_refillmenuimages_3.png?v=1618841658",
//         "price": 0.21,
//         "unit": "oz."
//     },
//     {
//         "id": 6237184098494,
//         "title": "Shampoo",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/PERSONAL_refillmenuimages.png?v=1618415257",
//         "price": 1.2,
//         "unit": "oz."
//     },
//     {
//         "id": 6997822800062,
//         "title": "Toilet Cleaning Tabs",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0526/9861/1902/products/CLEANING_refillmenuimages_1.png?v=1633288507",
//         "price": 1,
//         "unit": "each"
//     }
// ];

import { getLocalStorageItem, setLocalStorageItem } from '../../utilities/localStorage';
import { getShopifyProducts } from '../../utilities/apiRequests'

let INITIAL_STATE = []

export function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REFRESH_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case REFRESH_STARTED:
            return {
                ...state,
                loading: true
            }
        case REFRESH_FAILED:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case PRODUCTS_LOADED:
            return {
                products: action.payload,
                loading: false
            }
        default: return state;
    }
};

export async function fetchProducts(dispatch) {
    let response = getLocalStorageItem('products')
    if (!response) {
        response = await getShopifyProducts()
        setLocalStorageItem('products', response)
    }
    dispatch({ type: PRODUCTS_LOADED, payload: response })
}