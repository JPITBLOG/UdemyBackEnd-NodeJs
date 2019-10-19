const INITIAL_STATE = {
    success: '',
    error_msg: ''
};

export const INSTRUCTOR_ADDED_SUCCESSFUL = 'INSTRUCTOR_ADDED_SUCCESSFUL';
export const ERROR_WHILE_ADD_INSTRUCTOR = 'ERROR_WHILE_ADD_INSTRUCTOR';

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case INSTRUCTOR_ADDED_SUCCESSFUL:{
            return Object.assign({},state,{success: action.data});
        }
        case ERROR_WHILE_ADD_INSTRUCTOR:{
            return Object.assign({},state,{error_msg: action.data.error_msg});
        }
        default:
            return state;
    }
}
