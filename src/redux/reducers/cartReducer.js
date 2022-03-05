// import { CartAction } from '../actions/cartAction';
import { ActionType } from '../actionTypes';

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ActionType.ADD_TO_CART: {
            const { payload } = action;
            const existingData = state.find(data => data.id === payload.id);
            if (!existingData) {
                return [...state, { ...payload, quantity: 1 }];
            } else {
                const cart = state.filter(data => data.id !== existingData.id);
                return [...cart, { ...payload, quantity: existingData.quantity + 1 }];
            }
        }

        case ActionType.REMOVE_FROM_CART: {
            const newState = state.filter(item => item.id !== action.payload);
            return newState;
        }

        case ActionType.CLEAR_CART: {
            return [];
        }

        default:
            return state;
    }
}

export default cartReducer;