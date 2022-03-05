import {ActionType} from '../actionTypes'

export const addToCart = (payload) => {
    return {
        type: ActionType.ADD_TO_CART,
        payload
    }
}

export const removeFromCart = (payload) => {
    return {
        type: ActionType.REMOVE_FROM_CART,
        payload
    }
}

export const clearCart = () => {
    return {
        type: ActionType.CLEAR_CART,
        payload: ""
    }
}
