import { ADD_CART, REMOVE_CART, ADD_VESSEL, REMOVE_VESSEL, CHANGE_CART_DETAILS, CHANGE_VESSEL_DETAILS } from './cart.types';

export const addCart = (cart) => {
    return {
        type: ADD_CART,
        cart: cart
    };
};

export const removeCart = (id) => {
    return {
       type: REMOVE_CART,
       cartID: id
    };
};

export const addVessel = (data) => {
    return {
       type: ADD_VESSEL,
       cartID: data.cartID,
       vessel: data.vessel
    };
};

export const removeVessel = (data) => {
    return {
       type: REMOVE_VESSEL,
       cartID: data.cartID,
       vesselID: data.vesselID
    };
};

export const changeCartDetails = (data) => {
    return {
       type: CHANGE_CART_DETAILS,
       cartID: data.cartID,
       cartDetails: data.details
    };
};

export const changeVesselDetails = (data) => {
    return {
       type: CHANGE_VESSEL_DETAILS,
       cartID: data.cartID,
       vesselID: data.vesselID,
       vessel: data.vessel
    };
};