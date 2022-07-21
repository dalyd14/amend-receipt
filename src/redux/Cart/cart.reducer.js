import { ADD_CART, REMOVE_CART, ADD_VESSEL, REMOVE_VESSEL, CHANGE_CART_DETAILS, CHANGE_VESSEL_DETAILS } from './cart.types';

import { getLocalStorageItem, setLocalStorageItem } from '../../utilities/localStorage';

const INITIAL_STATE = {
  carts: getLocalStorageItem('carts')?.carts || []
};

const reducer = (state = INITIAL_STATE, action) => {
    let newItem
    switch (action.type) {
        case ADD_CART:
          const newAddCarts = state.carts
          newAddCarts.push(action.cart)
          newItem = {
            ...state, carts: newAddCarts
          }
          setLocalStorageItem('carts', newItem)
          return newItem;
        case REMOVE_CART:
          const newRemoveCarts = state.carts.filter(cart => {
            return (cart.cartID !== action.cartID)
          })
          newItem = {
            ...state, carts: newRemoveCarts
          }
          setLocalStorageItem('carts', newItem)
          return newItem;
        case ADD_VESSEL:
            const newAddVesselCarts = state.carts
            const newAddVessels = newAddVesselCarts.find(cart => cart.cartID == action.cartID).vessels
            newAddVessels.push(action.vessel)
            newAddVesselCarts.find(cart => cart.cartID == action.cartID).vessels = newAddVessels
            newItem = {
              ...state, carts: newAddVesselCarts
            }
            setLocalStorageItem('carts', newItem)
            return newItem;
        case REMOVE_VESSEL:
          const newRemoveVesselCarts = state.carts
          const newRemoveVessels = newRemoveVesselCarts.find(cart => cart.cartID == action.cartID).vessels.filter(vessel => {
            return (vessel.vesselID !== action.vesselID)
          })
          newRemoveVesselCarts.find(cart => cart.cartID == action.cartID).vessels = newRemoveVessels
          newItem = {
            ...state, carts: newRemoveVesselCarts
          }
          setLocalStorageItem('carts', newItem)
          return newItem;
        case CHANGE_CART_DETAILS:
          const newCartDetailsCarts = state.carts
          let cartIndex = newCartDetailsCarts.findIndex(cart => {
            return (cart.cartID == action.cartID)
          })
          newCartDetailsCarts[cartIndex] = {
            ...newCartDetailsCarts[cartIndex],
            ...action.cartDetails
          }
          newItem = {
            ...state, carts: newCartDetailsCarts
          }
          setLocalStorageItem('carts', newItem)
          return newItem;
        case CHANGE_VESSEL_DETAILS:
          const newVesselDetailsCarts = state.carts
          let vesselIndex
          let newDetailsVessels = newVesselDetailsCarts.find(cart => cart.cartID == action.cartID).vessels.find((vessel, index) => {
            if (vessel.vesselID == action.vesselID) {
              vesselIndex = index
              return true
            }
          })
          newDetailsVessels = action.vessel
          const oldDetailsVessels = newVesselDetailsCarts.find(cart => cart.cartID == action.cartID).vessels[vesselIndex] 
          console.log(oldDetailsVessels, newDetailsVessels)
          newVesselDetailsCarts.find(cart => cart.cartID == action.cartID).vessels[vesselIndex] = {
            ...oldDetailsVessels,
            ...newDetailsVessels
          }
          newItem = {
            ...state, carts: newVesselDetailsCarts
          }
          setLocalStorageItem('carts', newItem)
          return newItem;
        default: return state;
    }
};

export default reducer