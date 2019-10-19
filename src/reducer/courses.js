const INITIAL_STATE = {
    AllCourses: {}
};

export const COURSES_FETCHED_SUCCESSFUL = "COURSES_FETCHED_SUCCESSFUL";
export const ERROR_IN_FETCHED_COURSES = "ERROR_IN_FETCHED_COURSES";

export default (state = INITIAL_STATE,action) => {
    switch (action.type){
        case COURSES_FETCHED_SUCCESSFUL:{
            return Object.assign({},state,{...state,AllCourses:action.data});
        }
        case ERROR_IN_FETCHED_COURSES:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        default:
            return state;
    }
}