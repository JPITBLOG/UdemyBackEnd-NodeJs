import * as AddCourseVideo from '../service/addCourseVideo';
export const addcourseVideo = (passvideoObject) => dispatch => {
    return AddCourseVideo.addcourseVideo(passvideoObject)
        .then((response) => {
            if(response.status === 200){
                return true;
            }
        }).catch((error)=> {
            if(error.response){
                return false;
            }
        });
};
