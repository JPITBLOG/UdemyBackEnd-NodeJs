const INITIAL_STATE = {
    Allcategory: {},
    error_msg: ""
};

export const CATEGORY_FETCHED_SUCCESSFUL = "CATEGORY_FETCHED_SUCCESSFUL";
export const ERROR_IN_FETCHED_CATEGORY = "ERROR_IN_FETCHED_CATEGORY";

export default (state = INITIAL_STATE,action) => {
    switch (action.type){
        case CATEGORY_FETCHED_SUCCESSFUL:{
            return Object.assign({},state,{...state,Allcategory:action.data});
        }
        case ERROR_IN_FETCHED_CATEGORY:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        default:
            return state;
    }
}

