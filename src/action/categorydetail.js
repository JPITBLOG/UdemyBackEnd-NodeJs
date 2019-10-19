import * as Categorydetail from '../service/categorydetail';
import {CATEGORY_FETCHED_SUCCESSFUL,ERROR_IN_FETCHED_CATEGORY} from '../reducer/categorydetail';
export const getAllCategories = () => {
    return (dispatch) => {
        Categorydetail.getAllCategories()
            .then((response) => {
                if(response.status === 200){
                    localStorage.setItem("Category",JSON.stringify(response.data));
                    dispatch({
                        type:CATEGORY_FETCHED_SUCCESSFUL,
                        data: response.data
                    });
                }
            }).catch((error)=> {
            if(error.response){
                dispatch({
                    type: ERROR_IN_FETCHED_CATEGORY,
                    data: {error_msg: error.response? error.response.data.error : "there is an error while calling API"}
                });
            }
        });
    }
};
