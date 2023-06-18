import { Action, legacy_createStore as createStore } from 'redux';
import reducer from './reducers';
import { __VERSION__ } from "@/config";

const KEY = 'omnihorse';

// initial state
const initialState: StoreState = {
    __VERSION__,
    WALLET_ADDRESS: '',
    WALLET_TYPE: 0,  // 1 metamask 2 coinbase 3 wallet_connect
    HEADER_HEIGHT: 0,
    MENU_DATA: [],
    BANNER_DATA: {},
    HEADER_TOP: false,
    LOGIN_EVENT: false,
    AVATAR_URL: '',
    LOGIN_INFO: {},
    ACCOUNT_REG: undefined,
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(KEY);
        if (serializedState === null) {
            return initialState;
        } else {
            let state = JSON.parse(serializedState);
            // 判断本地存储的state版本，如果落后于代码的版本，则清空state
            if (state.__VERSION__ < __VERSION__) {
                return initialState;
            } else {
                return state;
            }
        }
    } catch (err) {
        // ...err handle
        return undefined;
    }
};
export const saveState = (state: StoreState) => {
    try {
        //ACCOUNT_REG 对象不存储到localStorage
        const tmpState = JSON.parse(JSON.stringify(state));
        tmpState.ACCOUNT_REG && delete tmpState.ACCOUNT_REG;

        const serializedState: any = JSON.stringify(tmpState);
        localStorage.setItem(KEY, serializedState);
    } catch (err) {
        // ...err handle
    }
};
export const store = createStore(reducer as any, loadState())



