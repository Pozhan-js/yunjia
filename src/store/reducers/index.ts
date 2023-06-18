import _ from 'lodash';
import {
    EMIT_LOGIN,
    LOGIN,
    LOGIN_OUT, UPDATE_AVATAR,
    UPDATE_BANNER,
    UPDATE_HEADER_HEIGHT,
    UPDATE_HEADER_TOP,
    UPDATE_MENU,
    UPDATE_VERSION
} from "@/store/action.types";
import { removeToken } from '@/utils/auth';



export default (state: StoreState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return _.assign({}, state, {
                WALLET_ADDRESS: action.address,
                WALLET_TYPE: action.wallet_type
            })
        case LOGIN_OUT:
            return _.assign({}, state, {
                WALLET_ADDRESS: '',
                AVATAR_URL: '',
                WALLET_TYPE: 0
            })
        case UPDATE_VERSION:
            return _.assign({}, state, {
                __VERSION__: action.payload
            })
        case UPDATE_MENU:
            return _.assign({}, state, {
                MENU_DATA: action.payload
            })
        case UPDATE_BANNER:
            return _.assign({}, state, {
                BANNER_DATA: action.payload
            })
        case UPDATE_HEADER_HEIGHT:
            return _.assign({}, state, {
                HEADER_HEIGHT: action.payload
            })
        case UPDATE_HEADER_TOP:
            return _.assign({}, state, {
                HEADER_TOP: action.payload
            })
        case EMIT_LOGIN:
            return _.assign({}, state, {
                LOGIN_EVENT: action.payload
            })
        case UPDATE_AVATAR:
            return _.assign({}, state, {
                AVATAR_URL: action.payload
            })
        case 'LOGIN_INFO':
            return _.assign({}, state, {
                LOGIN_INFO: action.payload
            })
        case 'LOGIN_INFO_OUT':
            removeToken();
            return _.assign({}, state, {
                LOGIN_INFO: {}
            })
        case 'ACCOUNT_REG':
            return _.assign({}, state, {
                ACCOUNT_REG: action.payload
            })
        default:
            return state
    }
}
