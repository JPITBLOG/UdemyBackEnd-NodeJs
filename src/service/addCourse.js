import baseService from './basicService';

export function addcourse(passDataObject) {
    return baseService.post('/course/addcourse',passDataObject);
}

