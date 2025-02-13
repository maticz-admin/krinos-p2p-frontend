import {
    SET_EMPTY,
} from '../constant';

const initialValue = {}

const apikey = (state = initialValue, action) => {
    switch (action.type) {
        
        case SET_EMPTY:
            return {
                ...state,
                ...action.data
            }
                
        default:
            return state;
    }
}

export default apikey;