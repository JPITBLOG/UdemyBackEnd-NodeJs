import * as Subcategorydetail from '../service/subCategory';
import {SUBCATEGORY_FETCHED_SUCCESSFUL,ERROR_IN_FETCHED_SUBCATEGORY} from '../reducer/subCategory';
export const getAllSubcategories = () => dispatch => {
        return Subcategorydetail.getAllSubcategories()
            .then((response) => {
                if(response.status === 200){
                    dispatch({
                        type:SUBCATEGORY_FETCHED_SUCCESSFUL,
                        data: response.data
                    });

                }
            }).catch((error)=> {
            if(error.response){
                dispatch({
                    type: ERROR_IN_FETCHED_SUBCATEGORY,
                    data: {error_msg: error.response? error.response.data.error : "there is an error while calling API"}
                });
            }
        });
};
