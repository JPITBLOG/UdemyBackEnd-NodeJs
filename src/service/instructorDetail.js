import baseService from './basicService';

export function getAllInstructor() {
    return baseService.get('/instructor/getallInstructor');
}
