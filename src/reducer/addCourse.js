const INITIAL_STATE = {
    success: "",
    error_msg: ""
};

export const COURSE_ADDED_SUCCESSFUL = "COURSE_ADDED_SUCCESSFUL";
export const ERROR_IN_ADD_COURSE = "ERROR_IN_ADD_COURSE";

export default (state = INITIAL_STATE,action) => {
    switch (action.type){
        case COURSE_ADDED_SUCCESSFUL:{
            return Object.assign({},state,{success:action.data});
        }
        case ERROR_IN_ADD_COURSE:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        default:
            return state;
    }
}

