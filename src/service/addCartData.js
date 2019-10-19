import baseService from './basicService';

export function addCartData(passDataObject) {
    return baseService.post('/user/addusercart',passDataObject);
}
