import baseService from './basicService';

export function getAllCategories() {
    return baseService.get('/categories/getallcategory');
}

