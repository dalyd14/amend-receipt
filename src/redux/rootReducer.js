import { combineReducers } from 'redux';
import cartReducer from './Cart/cart.reducer';
import { reducer } from './Products/products.reducer'

const rootReducer = combineReducers({
    cart: cartReducer,
    products: reducer
});

export default rootReducer;