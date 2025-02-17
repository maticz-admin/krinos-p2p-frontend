import { decodedata } from "config/secure";
import axios, { handleResp } from "../config/axios";
import { encodedata } from "config/secure";


export const Createp2porderhooks = async (datas, dispatch) => {
    try {
        // console.log('datasdatasdatas---datas-', datas);
        // return false
        let respData = await axios({
            'url': `p2papi/create-p2p-orders`,
            'method': 'post',
            data: { encode: encodedata(datas) },
        });
        const response = decodedata(respData.data);
        return { data: response };
    }
    catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const Getcoinlisthooks = async (datas, dispatch) => {
    try {
        // console.log("Get coinlist hooks");
        let respData = await axios({
            'url': `p2papi/get-coinlist`,
            'method': 'get',
        });

        // console.log('Get coinlist hooks------', respData);
        respData = decodedata(respData.data);
        // console.log("Get coinlist hooks in coinlisyt" , respData);
        return respData;
    }
    catch (err) {
        console.log("Get coinlist hooks", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}


export const Filterp2porderhooks = async (datas, dispatch) => {
    try {
        console.log('datasdatasdatas------', datas);
        // datas = encodedata(datas);
        let respData = await axios({
            'url': `p2papi/filter-p2p-orders`,
            'method': 'post',
            data: { encode: encodedata(datas) },
        });
        const response = decodedata(respData.data);
        // console.log('respDatarespData----',   response);
        return { data: response };
    }
    catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const Getalloffertaghook = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/get-offettag`,
            'method': 'get',
            'data': datas
        });
        // console.log('respData-----', respData);
        const response = decodedata(respData.data)
        return { data: response };
    }
    catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const Getpreferedcurrency = async (datas, dispatch) => {

    try {

        let respData = await axios({
            'url': `p2papi/get-preferedcurrency`,
            'method': 'get',
            // 'data' : datas
        });

        respData = decodedata(respData.data);
        // console.log('datas, dispatch----', respData);

        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const Getsingleuserhook = async (datas, dispatch) => {
    try {
        console.log("wallet payload", datas);
        // let value;
        // if (!datas) {
        //     value =  encodedata(datas);
        // } else {
        //     value = encodedata('');
        // }
        let respData = await axios({
            'url': `p2papi/getsingleuser`,
            'method': 'get',
            'params': { encode: encodedata(datas) }
        });
        const response = decodedata(respData.data)
        return { data: response };
    }
    catch (err) {
        console.log("error", err.response);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const Getorderchathook = async (datas, dispatch) => {
    try {
        datas = encodedata(datas);
        let respData = await axios({
            'url': `p2papi/getsingletradechat`,
            'method': 'get',
            'params': {encode: datas}
        });
        const response = decodedata(respData.data);
        return { data: response };
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const canceltradehook = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/cancel-trade`,
            'method': 'post',
            'data': datas
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const createroom = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/createroom`,
            'method': 'post',
            'data': datas
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const getuserofferhooks = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/user-offer`,
            'method': 'get',
            'params': datas
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const getsingletradehooks = async (datas, dispatch) => {
    try {
        // datas = encodedata(datas)
        // console.log('datas-----', datas)
        let respData = await axios({
            'url': `p2papi/get-singlesaledetail`,
            'method': 'get',
            'params': { encode: encodedata(datas) }
            // data: {encode: datas}
        });
        const response = decodedata(respData.data)
        // console.log('datas-----', response)
        return { data: response };
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const Adduserreviewhooks = async (datas, dispatch) => {
    try {

        let respData = await axios({
            'url': `p2papi/adduser-review`,
            'method': 'post',
            'data': {encode: encodedata(datas)}
        });
        const response = decodedata(respData.data)
        return {data: response};
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const updateorderstatushooks = async (datas, dispatch) => {
    try {
        console.log('datas------', datas)
        let respData = await axios({
            'url': `p2papi/update-order-status`,
            'method': 'post',
            'data': {encode: encodedata(datas)}
        });
        const response = decodedata(respData.data)
        return {data: response};
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const updateAssethooks = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/assetupdate`,
            'method': 'post',
            'data': datas
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const getcurrencydatahooks = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/get-currency-data`,
            'method': 'get',
            'params': datas
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}



export const updateuserstatushooks = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/update-user-status`,
            'method': 'post',
            'data': datas
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}


export const Getcmshooks = async (datas, dispatch) => {
    try {
        // console.log("wallet payload" , datas);
        let respData = await axios({
            'url': `p2papi/get-cms`,
            'method': 'get',
            'params': {encode: encodedata(datas)}
        });
        const response = decodedata(respData.data)
        return {data: response};
    }
    catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const Getfaqhooks = async (datas, dispatch) => {
    try {
        // console.log("wallet payload" , datas);
        let respData = await axios({
            'url': `p2papi/get-faq`,
            'method': 'get',
            // 'params' : datas
        });
        respData = decodedata(respData.data);
        // console.log("respdata in get faq" , respData);
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const getsitesettingshook = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/get-sitesettings`,
            'method': 'get',
            // 'params' : datas
        });
        respData = decodedata(respData.data);

        // console.log("wallet payload" , respData);
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const gettradehistoryhook = async (datas, dispatch) => {
    try {
        // console.log("wallet payload" , datas);
        let respData = await axios({
            'url': `p2papi/get-tradehistory`,
            'method': 'get',
            'params': {encode: encodedata(datas)}
        });
        const response = decodedata(respData.data)
        // console.log('response------', response)
        return {data: response};
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const getyourrequesthook = async (datas, dispatch) => {
    try {
        // console.log("wallet payload" , datas);
        
        let respData = await axios({
            'url': `p2papi/get-your-request`,
            'method': 'get',
            'params': {encode: encodedata(datas)}
        });
        const response = decodedata(respData.data);
        // console.log('response-----', response)
        return {data: response};
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const getuserbalancehook = async (datas, dispatch) => {
    try {
        // console.log("wallet payload" , datas);
        let respData = await axios({
            'url': `p2papi/get-user-balance`,
            'method': 'get',
            'params': {encode: encodedata(datas)}
        });
        const response = decodedata(respData.data)
        return {data: response};
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const gettradespeedhook = async (datas, dispatch) => {
    try {
        console.log("wallet payload" , datas);
        let respData = await axios({
            'url': `p2papi/get-trade-speed`,
            'method': 'get',
            'params': {encode: encodedata(datas)}
        });
        const response = decodedata(respData.data)
        return {data: response};
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error');
        const response = decodedata(err.response.data)

        return {
            status: "failed",
            message: response.message
        }
    }
}


export const updateuserprofilepichooks = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/update-profile-pic`,
            'method': 'post',
            'data': datas,
            'headers': {
                'Content-Type': 'multipart/form-data',
            }
        });

        const response = decodedata(respData.data)
        // console.log(response , "axios data");

        return response;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        const response = decodedata(err.response.data)
        return {
            status: "failed",
            message: response.message
        }
    }
}

export const cancelofferhooks = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/cancel-offer`,
            'method': 'post',
            'data': datas,
            'headers': {
                'Content-Type': 'application/json',
            }
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const getpaymenttypeshook = async (datas, dispatch) => {
    try {
        // console.log("wallet payload" , datas);
        let respData = await axios({
            'url': `p2papi/get-paymenttypes`,
            'method': 'get',
            // 'params' : datas
        });
        // return false;
        const response = decodedata(respData.data);

        return  response;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const createcryptoaddressshook = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/create-addresss`,
            'method': 'post',
            'data': datas,
            'headers': {
                'Content-Type': 'application/json',
            }
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const Getmessagenotificationhooks = async (datas, dispatch) => {
    try {
        // console.log('datas----', datas)
        let respData = await axios({
            'url': `p2papi/get-message-notification`,
            'method': 'get',
            'params': datas
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const markasreadonehooks = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/markus_readone`,
            'method': 'post',
            'data': datas,
            'headers': {
                'Content-Type': 'application/json',
            }
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const markasreadallhooks = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/markas-readall`,
            'method': 'post',
            'data': datas,
            'headers': {
                'Content-Type': 'application/json',
            }
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const Getunreadmessagenotificationhooks = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/getunreadmessagenotification`,
            'method': 'get',
            'params': datas
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}

export const Checkdeposithooks = async (datas, dispatch) => {
    try {
        let respData = await axios({
            'url': `p2papi/check-deposit`,
            'method': 'post',
            'data': datas,
            'headers': {
                'Content-Type': 'application/json',
            }
        });
        return respData;
    }
    catch (err) {
        console.log("error", err);
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
}


export const AddSessionId = async (datas, dispatch) => {
    try {
        // console.log('datasdatasdatas---datas-', datas);
        // return false
        let respData = await axios({
            'url': `p2papi/add-session-id`,
            'method': 'post',
            data: { encode: encodedata(datas) },
        });
        const response = decodedata(respData.data);
        return { data: response };
    }
    catch (err) {
        handleResp(err, 'error')
        return {
            status: "failed",
        }
    }
} 
