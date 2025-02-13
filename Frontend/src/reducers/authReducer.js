import {
    SET_AUTHENTICATION,
    REMOVE_AUTHENTICATION
} from "../constant";

const initialState = {
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATION:
            return {
                ...state,
                ...action.authData
            };
        case REMOVE_AUTHENTICATION:
            return {
                ...state,
                ...action.authData
            };
        default:
            return state;
    }
}

export default authReducer;