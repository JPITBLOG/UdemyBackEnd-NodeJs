import baseService from './basicService';

export function getAllCourses() {
    return baseService.get('/course/getallcourse');
}