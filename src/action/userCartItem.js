import {CART_ITEM_ADDED_SUCCESSFULLY,ERROR_WHILE_ADD_CART_ITEM} from '../reducer/userCartItem';

export const getCartItem = (cartItem) =>{
    let cartStorage = [];
    return (dispatch) => {
        try {
            dispatch({
                type:CART_ITEM_ADDED_SUCCESSFULLY,
                data:cartItem
            })
        }
        catch (e) {
            dispatch({
                type:ERROR_WHILE_ADD_CART_ITEM,
                data:{error_msg:e.toString()}
            })
        }
    }
};
