let key = {};
let env='maticzdemo' //production or local
if (env === "demo") {
    const API_URL = "https://backp2p-stage.krinos.app/"    
    //const API_URL = 'https://krinosp2p-backend.maticz.in/';
    key = {
        fronturl : "https://uat-p2p.krinos.app", 
        //fronturl : "https://krinosp2p.maticz.in",
        secretOrKey: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
        CRYPTO_SECRET_KEY: "1234567812345678",
        RECAPTCHA_SITE_KEY: "6LcK8vEqAAAAAD06JyU22cbe42oqCgZRhjkDbP8L", //local
        API_URL: "https://backp2p-stage.krinos.app/", 
        // API_URL: 'https://krinosp2p-backend.maticz.in/',
        FRONT_URL: "https://uat-p2p.krinos.app/" , 
        //FRONT_URL: "https://krinosp2p.maticz.in/",
        ADMIN_URL: 'https://uatadmin-p2p.krinos.app/',
        SOCKET_URL: "https://backp2p-stage.krinos.app/", 
        //SOCKET_URL:'https://krinosp2p-backend.maticz.in/',
        getGeoInfo: "https://geolocation-db.com/json/",
        AUTHENTICATOR_URL : {
            PLAY_STORE: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
            APP_STORE: "https://apps.apple.com/us/app/google-authenticator/id388497605",
        },
    };
}else
if (env === "maticzdemo") {
    // const API_URL = "https://backp2p-stage.krinos.app/"    
    const API_URL = 'https://krinosp2p-backend.maticz.in/';
    key = {
        // fronturl : "https://uat-p2p.krinos.app", 
        fronturl : "https://krinosp2p.maticz.in",
        secretOrKey: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
        CRYPTO_SECRET_KEY: "1234567812345678",
        RECAPTCHA_SITE_KEY: "6LcNAH4rAAAAAMcji4ul5LhrLqALIWjglOhm-aEx", //local
        // API_URL: "https://backp2p-stage.krinos.app/", 
        API_URL: 'https://krinosp2p-backend.maticz.in/',
        // FRONT_URL: "https://uat-p2p.krinos.app/" , 
        FRONT_URL: "https://krinosp2p.maticz.in/",
        ADMIN_URL: 'https://uatadmin-p2p.krinos.app/',
        // SOCKET_URL: "https://backp2p-stage.krinos.app/", 
        SOCKET_URL:'https://krinosp2p-backend.maticz.in/',
        getGeoInfo: "https://geolocation-db.com/json/",
        AUTHENTICATOR_URL : {
            PLAY_STORE: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
            APP_STORE: "https://apps.apple.com/us/app/google-authenticator/id388497605",
        },
    };
}
 else {
    const API_URL = 'http://localhost'
    key = {
        fronturl : "https://krinosp2p.maticz.in",
        secretOrKey: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
        CRYPTO_SECRET_KEY: "1234567812345678",
        RECAPTCHA_SITE_KEY: "6LfUI_IqAAAAAI_l63qv0vh08os6U1qMmQRzgitA",    //"6Lfa3NYqAAAAAOPNURwGG_sO4YqgDX5iwJZmj7T1", 
        API_URL: `${API_URL}:2054`,
        FRONT_URL: 'http://localhost', //'http://localhost:3000',
        ADMIN_URL: 'http://localhost:3001/admin',
        SOCKET_URL: `${API_URL}:2054`,
        getGeoInfo:  "https://geolocation-db.com/json/",
        AUTHENTICATOR_URL: {
            PLAY_STORE: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
            APP_STORE: "https://apps.apple.com/us/app/google-authenticator/id388497605",
        }
    };
}


export default {
    ...key,
    ...{ SITE_DETAIL : require('./siteConfig').default }
};