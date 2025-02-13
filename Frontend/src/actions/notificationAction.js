// import lib
import { decodedata } from '../config/secure';
import axios,{  handleResp} from '../config/axios';

// import constant
import {
    SET_UNREAD_NOTICE,
    UPDATE_NOTICE_POPUP
} from '../constant';

export const getNotification = async (dispatch) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/get-notification`,
        })
        const response = decodedata(respData.data)
        console.log('responseresponse----', response)
        return {
            status: "success",
            loading: false,
            ReadMsg: response.result,
        }
    } catch (err) {
        handleResp(err, 'error')
        const response = decodedata(err.data)

        return {
            status: "failed",
            loading: false,
            message: response.message,
        }
    }
}


export const unReadNotice = async (dispatch) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/unread-notice`,
        })
        dispatch({
            'type': SET_UNREAD_NOTICE,
            'notice': respData.data.result
        })
        return {
            status: "success",
            loading: false,
            result: respData.data.result,
        }
    } catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
        }
    }
}


export const FetchunReadNotice = async (dispatch, data) => {
    try {
        dispatch({
            'type': SET_UNREAD_NOTICE,
            'notice': data
        })
    } catch (err) { 
        handleResp(err, 'error')
    }
}

export const noticePopup = async (dispatch, isOpen) => {
    try {
        dispatch({
            'type': UPDATE_NOTICE_POPUP,
            'isOpen': isOpen
        })
    } catch (err) {
        handleResp(err, 'error')
     }
}


export const readNotification = async () => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `/api/read-notification`,
        })
        return {
            status: "success",
            loading: false,
            ReadMsg: respData.data.result.all,
            unReadMsg: respData.data.result.unRead,
        }
    } catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
            loading: false,
            // message: err.response.data.message,
        }
    }
}

export const readsingelNotification = async (data) => {
    try {

        let respData = await axios({
            'method': 'put',
            'url': `/api/readsingel-notification`,
            // data: {encode: data}
            data
        });
        // console.log('readsingel-----', decodedata(respData.data));
        return {
            status: "success",
            loading: false,
            ReadMsg: respData.data.result.all,
            unReadMsg: respData.data.result.unRead,
        }
    } catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
            loading: false,
            // message: err.response.data.message,
        }
    }
}


export const createNotification = async (data)=>{
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/api/create-notification`,
            data
        })
        return {
            status: "success",
            loading: false,
            ReadMsg: respData.data.result.all,
            unReadMsg: respData.data.result.unRead,
        }
    } catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
            loading: false,
            // message: err.response.data.message,
        }
}
}
///readsingel-notification