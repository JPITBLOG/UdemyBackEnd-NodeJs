import * as AddInstructor from '../service/addInstructor';
import {INSTRUCTOR_ADDED_SUCCESSFUL,ERROR_WHILE_ADD_INSTRUCTOR} from '../reducer/addInstructor';
export const addInstructor = (instructorData) => dispatch => {
    return AddInstructor.addInstructor(instructorData)
        .then((response) => {
            if(response.status == 200){
                dispatch({
                   type:INSTRUCTOR_ADDED_SUCCESSFUL,
                   data:response.data
                });
                return true;
            }
        }).catch((error) => {
            if(error.response){
                dispatch({
                    type:ERROR_WHILE_ADD_INSTRUCTOR,
                    data: {error_msg:error.response? error.response.data.error : 'there is an error while calling API'}
                })
                return false;
            }
        })
}
