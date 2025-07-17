import config from '../config/index';



export const NumberOnly = (data) => {
    return data.toString().replace(config.NumOnly,'')
}

export const NumberChange = (data) => {
    try{
      return (isNaN(Number(data)) ? 0 : Number(data))
    }
    catch(err){
      console.error('NumberChange_error',err)
      return 0;
    }
  }
