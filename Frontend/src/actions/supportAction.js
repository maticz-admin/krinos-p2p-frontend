// import config
import { decodedata } from 'config/secure';
import axios, { handleResp } from '../config/axios';
import { encodedata } from 'config/secure';

/** 
 * Get Support Category
*/
export const getSptCat = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/getSptCat`,
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    }
    catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}

export const createNewTicket = async (data) => {
    try {
        // console.log('datadatadata----', data);

        // Encode the data before sending
        // data = encodedata(data);

        // Make the POST request to create the ticket
        let respData = await axios({
            method: 'post',
            url: `/api/ticket`,
            // data: { encode: data }
            data
        });

        // console.log('respData------', respData);

        // Decode the response data
        const response = decodedata(respData.data);

        // Return success response
        return {
            status: "success",
            loading: false,
            message: response.message,
        };
    } catch (err) {
        // Handle errors with response
        handleResp(err, 'error');
        const response = decodedata(err.response.data);
        return {
            status: "failed",
            loading: false,
            message: response?.message || "An error occurred.",
            error: response?.errors || err.message,
        };
    }
};


export const getTicketList = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/ticket`,
        });
        // console.log('respDatarespDatarespData-----', respData);
        const response = decodedata(respData.data)
        return {
            status: "success",
            loading: false,
            result: response.result
        }
    }
    catch (err) {
        handleResp(err, 'error');
        const response = decodedata(err.response.data);
        return {
            status: "failed",
            loading: false,
            message: response.message
        }
    }
}

export const replyMessage = async (data) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `/api/ticket`,
            data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    }
    catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const closeTicket = async (data) => {
    try {
        let respData = await axios({
            'method': 'patch',
            'url': `/api/ticket`,
            data
        });
        const response = decodedata(respData.data)
        // console.log('datadata-----', response)
        return {
            status: "success",
            loading: false,
            message: response.message,
            result: response.result
        }
    }
    catch (err) {

        handleResp(err, 'error');
        const response = decodedata(err.response.data);
        return {
            status: "failed",
            loading: false,
            message: response.message,
            error: response.errors
        }
    }
}

export const getMessageList = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/ticketMessage`,
            'params': data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    }
    catch (err) {
        handleResp(err, 'error');
        const response = decodedata(err.response.data);
        return {
            status: "failed",
            loading: false,
            error: response.errors
        }
    }
}