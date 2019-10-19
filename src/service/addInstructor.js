import baseService from './basicService';

export function addInstructor(instructorData) {
    return baseService.post('/instructor/addinstructor',instructorData);
}
