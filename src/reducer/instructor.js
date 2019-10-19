const INITIAL_STATE = {
    AllInstructor: {}
};

export const Instructor_FETCHED_SUCCESSFUL = "Instructor_FETCHED_SUCCESSFUL";
export const ERROR_IN_FETCHED_Instructor = "ERROR_IN_FETCHED_Instructor";

export default (state = INITIAL_STATE,action) => {
    switch (action.type){
        case Instructor_FETCHED_SUCCESSFUL:{
            return Object.assign({},state,{...state,AllInstructor:action.data});
        }
        case ERROR_IN_FETCHED_Instructor:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        default:
            return state;
    }
}
