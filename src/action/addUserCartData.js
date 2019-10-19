import * as addCartDataService from '../service/addCartData';
import {USER_CART_ADDED_SUCCESSFULLY,THERE_IS_AN_ERROR_TO_ADD_CART} from '../reducer/userRegisterLog';

export const addCartData = (passDataObject) => dispatch => {
    return addCartDataService.addCartData(passDataObject)
        .then((response) => {
            if(response.status === 200){
                dispatch({
                    type:USER_CART_ADDED_SUCCESSFULLY,
                    data:response.data
                })
                return true;
            }
        }).catch((error) => {
            if(error.response){
                dispatch({
                    type:THERE_IS_AN_ERROR_TO_ADD_CART,
                    data:error.response.data
                })
                return false;
            }
        });
};
