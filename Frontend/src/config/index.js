let key = {};
let env='dem' //production or local
if (env === "demo") {
    const API_URL = 'https://api.tossvtoss.com/';
    key = {
        fronturl : "https://krinosp2p.maticz.in/",
        secretOrKey: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
        CRYPTO_SECRET_KEY: "1234567812345678",
        RECAPTCHA_SITE_KEY: "6Lfa3NYqAAAAAOPNURwGG_sO4YqgDX5iwJZmj7T1", //local
        API_URL: ' https://krinosp2p-backend.maticz.in/',
        FRONT_URL: "https://krinosp2p.maticz.in/",
        ADMIN_URL: 'https://contorls.tossvtoss.com',
        SOCKET_URL: 'https://api.tossvtoss.com/',
        getGeoInfo: "https://ipapi.co/json/",
        AUTHENTICATOR_URL: {
            PLAY_STORE: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
            APP_STORE: "https://apps.apple.com/us/app/google-authenticator/id388497605",
        },
    };
}
 else {
    const API_URL ='http://localhost'
    key = {
        fronturl : "https://krinosp2p.maticz.in/",
        secretOrKey: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
        CRYPTO_SECRET_KEY: "1234567812345678",
        RECAPTCHA_SITE_KEY: "6Lfa3NYqAAAAAOPNURwGG_sO4YqgDX5iwJZmj7T1",    //"6Lfa3NYqAAAAAOPNURwGG_sO4YqgDX5iwJZmj7T1", 
        API_URL: `${API_URL}:2053`,
        FRONT_URL: 'http://localhost', //'http://localhost:3000',
        ADMIN_URL: 'http://localhost:3001/admin',
        SOCKET_URL: `${API_URL}:2053`,
        getGeoInfo:  "https://ipapi.co/json/",
        AUTHENTICATOR_URL: {
            PLAY_STORE: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
            APP_STORE: "https://apps.apple.com/us/app/google-authenticator/id388497605",
        }
    };
}


export default {
    ...key,
    ...{ SITE_DETAIL: require('./siteConfig').default }
};