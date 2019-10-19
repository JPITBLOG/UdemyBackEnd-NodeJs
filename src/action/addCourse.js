import * as AddCourse from '../service/addCourse';
import {COURSE_ADDED_SUCCESSFUL,ERROR_IN_ADD_COURSE} from '../reducer/addCourse';
export const addcourse = (passDataObject) => dispatch => {
        return AddCourse.addcourse(passDataObject)
            .then((response) => {
                if(response.status === 200){
                    dispatch({
                        type:COURSE_ADDED_SUCCESSFUL,
                        data: response.data
                    });
                    return true;
                }
            }).catch((error)=> {
            if(error.response){
                dispatch({
                    type: ERROR_IN_ADD_COURSE,
                    data: {error_msg: error.response? error.response.data.error : "there is an error while calling API"}
                });
                return false;
            }
        });
};
