import * as instructordetail from '../service/instructorDetail';
import {Instructor_FETCHED_SUCCESSFUL,ERROR_IN_FETCHED_Instructor} from '../reducer/instructor';
export const getAllInstructor = () => {
    return (dispatch) => {
        instructordetail.getAllInstructor()
            .then((response) => {
                if(response.status === 200){
                    localStorage.setItem("Instructor",JSON.stringify(response.data));
                    dispatch({
                        type:Instructor_FETCHED_SUCCESSFUL,
                        data:response.data
                    });
                }
            }).catch((error) => {
                if(error){
                    dispatch({
                        type:ERROR_IN_FETCHED_Instructor,
                        data: {error_msg: error.response? error.response.data.error : "there is an error while calling API"}
                    });
                }
        })
    }
}
