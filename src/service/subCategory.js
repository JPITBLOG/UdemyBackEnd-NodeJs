import baseService from './basicService';

export function getAllSubcategories() {
    return baseService.get('/categories/getallsubcategory');
}
