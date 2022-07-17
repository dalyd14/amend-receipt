import { getShopifyProducts } from '../../utilities/apiRequests';
import { REFRESH_SUCCESS, REFRESH_STARTED, REFRESH_FAILED } from './products.types';
import { setLocalStorageItem } from '../../utilities/localStorage'

export function refreshProducts() {
    return dispatch => {
        dispatch(refreshStarted());
        
        getShopifyProducts()
            .then(response => {
                setLocalStorageItem('products', response)
                dispatch(refreshSuccess(response))
            })
            .catch(e => {
                dispatch(refreshFailed(e))
            })   
    }
}

const refreshSuccess = data => ({
    type: REFRESH_SUCCESS,
    payload: data
})

const refreshStarted = () => ({
    type: REFRESH_STARTED
})

const refreshFailed = error => ({
    type: REFRESH_FAILED,
    payload: {
        error
    }
})