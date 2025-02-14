// import { ApiConstants } from "../api/ApiConstants";
import config from "../config/index";
// import { AddSessionIdkyc } from "./axios";
// import { GetDiditToken, SetDiditToken } from "./usestorage";

const DidItUrl = "https://apx.didit.me";
const clientID = "gFiNlIkjnkiDw9jnYBVgRw";
const clientSecret = "Ijdlky0S-wEgDQcMSUkw-asOGzGpulyT0h7TBFQH-oI";

const SetDiditToken = (tkn) => {
    localStorage.setItem("didittoken" , tkn)
}

const GetDiditToken = () => {
    return localStorage.getItem("didittoken")
}

export const fetchClientToken = async () => {
    const url = DidItUrl + '/auth/v2/token';
    const encodedCredentials = Buffer.from(
        `${clientID}:${clientSecret}`,
    ).toString('base64');
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    console.log("encodedCredentials", `Basic ${encodedCredentials}`, url);

    try {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${encodedCredentials}`,
            },
            body: JSON.stringify({ "grant_type": "client_credentials" })
        }).then(response => response.json())
            .then((data) => {
                console.log("Data", data);
                SetDiditToken(data?.access_token);
                return data;
            })

        //   const response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //       Authorization: `Basic ${encodedCredentials}`,
        //       'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body : {"grant_type": "client_credentials"}
        //   });

        //   const data = await response.json();

        //   if (response.ok) {
        //     // Return the entire data object if you need to use other properties
        //     return data;
        //   } else {
        //     console.error('Error fetching client token:', data);
        //     return null;
        //   }
    } catch (error) {
        console.error('Network error:', error);
        return null;
    }
};


  export const createSession = async (
    features,
    callback = config?.fronturl , // ApiConstants.BASE_URL,
    vendor_data 
  ) => {
    const BASE_URL = "https://verification.didit.me"
    const url = `${BASE_URL}/v1/session/`;
    const token = GetDiditToken();
   
    if (!token) {
      console.error('Error fetching client token');
    } else {
      const body = {
        vendor_data: vendor_data,
        callback: callback,
        // features: features,
      };
   
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };
   
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();console.log("data" , data);
        
        if (response.status === 201 && data) {
        //   let result = await AddSessionIdkyc({sessionid : data?.session_id});
        //   console.log("resultresult" , result);
        //   if(result?.status){
        //     return data;
        //   }
        //   else{
        //     return false;
        //   }
        } else {
          console.error('Error creating session:', data);
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
        throw error;
      }
    }
  };

  export const getSessionDecision = async (sessionId) => {
    const BASE_URL = "https://verification.didit.me"
    const endpoint = `${BASE_URL}/v1/session/${sessionId}/decision/`;
    const token =  GetDiditToken();
    if (!token) {
      console.error('Error fetching client token');
    } else {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers,
        });
   
        const data = await response.json();
   
        if (response.ok) {
          console.log("result in retrinve" , data?.status);
          // if(data?.status == "Declined"){

          // }
          // else{
            return data;
          // }
        } else {
          console.error('Error fetching session decision:', data);
          throw new Error(data.message);
        }
      } catch (err) {
        console.error('Network error:', err);
        throw err;
      }
    }
  };


  