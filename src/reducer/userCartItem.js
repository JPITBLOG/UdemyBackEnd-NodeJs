const INITIAL_STATE = {
    cartItem: [],
    error_msg: ""
};

export const CART_ITEM_ADDED_SUCCESSFULLY = "CART_ITEM_ADDED_SUCCESSFULLY";
export const ERROR_WHILE_ADD_CART_ITEM = "ERROR_WHILE_ADD_CART_ITEM";

export default (state = INITIAL_STATE,action) => {
    switch(action.type){
        case CART_ITEM_ADDED_SUCCESSFULLY:{
            return Object.assign({},state,{cartItem: action.data});
        }
        case ERROR_WHILE_ADD_CART_ITEM:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        default:
            return state;
    }
}
