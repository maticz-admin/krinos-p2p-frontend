// import config
import { decodedata } from 'config/secure';
import axios,{  handleResp} from '../config/axios';
import { encodedata } from 'config/secure';

export const subscribe = async (reqData) => {
    try {
        const respData = await axios({
            'url': `/api/newsLetter/subscribe`,
            'method': 'post',
            'data': {encode: encodedata(reqData)}
        })
        const response = decodedata(respData.data)
        return {
            status: "success",
            loading: false,
            message:response.message
        }
    } catch (err) {
        handleResp(err, 'error')
        const response = decodedata(err.response.data)

        return {
            status: 'failed',
            loading: false,
            message: response.message,
            error: response.errors,
        }
    }
}