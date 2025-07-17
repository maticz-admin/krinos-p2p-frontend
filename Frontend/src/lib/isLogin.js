import { tokenVerify } from '../actions/jsonWebToken';
import config from '../config/index';

export const allowedForAdmin = () => {
    return (config.adminViewUrl.some((check)=>check.every((innerVal)=>String(window.location.href).includes(innerVal))))
}

const isLogin = () => {
    if (tokenVerify(localStorage.getItem('user_token'))||allowedForAdmin()) {
        return true;
    }
    return false;
}

export default isLogin;