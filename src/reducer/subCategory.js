const INITIAL_STATE = {
    Allsubcategory: {},
    error_msg: ""
};

export const SUBCATEGORY_FETCHED_SUCCESSFUL = "SUBCATEGORY_FETCHED_SUCCESSFUL";
export const ERROR_IN_FETCHED_SUBCATEGORY = "ERROR_IN_FETCHED_SUBCATEGORY";

export default (state = INITIAL_STATE,action) => {
    switch (action.type){
        case SUBCATEGORY_FETCHED_SUCCESSFUL:{
            return Object.assign({},state,{...state,Allsubcategory:action.data});
        }
        case ERROR_IN_FETCHED_SUBCATEGORY:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        default:
            return state;
    }
}

