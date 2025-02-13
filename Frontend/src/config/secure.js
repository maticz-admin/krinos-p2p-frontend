import CryptoJS from "crypto-js";
import config from "./index";



export const encodedata = (data) => {
    let encrpteddata = CryptoJS.AES.encrypt(JSON.stringify(data), ENDTOENDSECRET).toString()
    return encrpteddata;
  
}
  
  export const decodedata = (data) => {
    let dataaaa = CryptoJS.AES.decrypt(data, ENDTOENDSECRET);
    return JSON.parse(dataaaa.toString(CryptoJS.enc.Utf8))
  };
