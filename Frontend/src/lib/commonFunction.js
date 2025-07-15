import config from '../config/index';



export const NumberOnly = (data) => {
    return data.toString().replace(config.NumOnly,'')
}