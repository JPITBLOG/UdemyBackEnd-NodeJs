import * as Coursedetail from '../service/coursedetail';
import {COURSES_FETCHED_SUCCESSFUL,ERROR_IN_FETCHED_COURSES} from '../reducer/courses';
export const getAllCourses = () => {
    return (dispatch) => {
        Coursedetail.getAllCourses()
            .then((response) => {
                if(response.status === 200){
                    localStorage.setItem("Courses",JSON.stringify(response.data));
                    dispatch({
                        type:COURSES_FETCHED_SUCCESSFUL,
                        data:response.data
                    });
                }
            }).catch((error) => {
                if(error){
                    dispatch({
                       type: ERROR_IN_FETCHED_COURSES,
                       data: {error_msg: error.response? error.response.data.error : "there is an error while calling API"}
                    });
                }
        })
    }
};