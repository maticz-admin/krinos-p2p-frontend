
import { decodedata } from 'config/secure';
import axios, { handleResp } from '../config/axios'
import { encodedata } from 'config/secure';


export const Getuserp2pcreateorderhooks = async (filterdata) => {
    try {
        // console.log('filterdata----', filterdata);
        // filterdata = encodedata(filterdata)
        let respData = await axios({
            'url': `/p2papi/get-userp2pcreate-orders`,
            'method': 'get',
            'params': { encode: encodedata(filterdata) }
        });
        const response = decodedata(respData.data)
        return { status: "success", loading: false, result: response.data, count: response.count };
    } catch (err) {
        handleResp(err, 'error')
        return { status: "failed" }
    }
}

export const Getuserp2pviewofferhooks = async (filterdata) => {
    try {
        // console.log('filterdata----', filterdata);
        filterdata = encodedata(filterdata)
        let respData = await axios({
            'url': `/p2papi/get-userp2pviewoffer`,
            'method': 'get',
            'params': { encode: filterdata }
        })
        const response = decodedata(respData.data)
        if (response.type == "success") {
            // console.log('respDatarespDatarespData-----', response.data);
            return { status: "success", loading: false, data: response.data, count: response.count };
        }
    } catch (err) {
        handleResp(err, 'error')
        return { status: "failed" }
    }
}