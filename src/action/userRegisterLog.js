import * as userdetail from '../service/userRegisterLog';
import {USER_REGISTER_SUCCESSFULLY,USER_LOGIN_SUCCESSFULLY,ERROR_WHILE_USER_REGISTER,ERROR_WHILE_USER_LOGIN,
    USER_LOGOUT_SUCCESSFULLY,ERROR_WHILE_USER_LOGOUT} from '../reducer/userRegisterLog';
export const getUserRegister = (pssParams) => dispatch => {
    return userdetail.getUserRegister(pssParams)
        .then((response) => {
            if(response.status === 200){
                localStorage.setItem("LoginUser",JSON.stringify(response.data));
                dispatch({
                    type:USER_REGISTER_SUCCESSFULLY,
                    data: response.data
                });
                return response.data
            }

        }).catch((error) => {
        if(error){
            dispatch({
                type:ERROR_WHILE_USER_REGISTER,
                data: {error_msg: error.response? error.response.data.message : "there is an error while calling API"}
            });
            return false;
        }
    })
}

export const getUserLogin = (eml,pswd) => dispatch => {
    return userdetail.getUserLogin(eml,pswd)
        .then((response) => {
            if(response.status === 200){
                localStorage.setItem("LoginUser",JSON.stringify(response.data));
                dispatch({
                    type:USER_LOGIN_SUCCESSFULLY,
                    data: response.data
                });
                return response.data
            }
        }).catch((error) => {
            if(error){
                dispatch({
                    type:ERROR_WHILE_USER_LOGIN,
                    data: {error_msg: error.response? error.response.data.message : "there is an error while calling API"}
                });
                return false
            }
        })
}

export const getUserLogout = () => dispatch => {
                dispatch({
                    type:USER_LOGOUT_SUCCESSFULLY
                });
                localStorage.removeItem("LoginUser");
}

