import baseService from './basicService';

export function addcourseVideo(passvideoObject) {
    return baseService.post('/course/addcourseimg',passvideoObject);
}

