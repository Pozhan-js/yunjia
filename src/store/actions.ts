import {
    LOGIN_OUT,
    LOGIN,
    UPDATE_MENU,
    UPDATE_BANNER,
    UPDATE_HEADER_HEIGHT,
    UPDATE_HEADER_TOP, EMIT_LOGIN, UPDATE_AVATAR
} from "@/store/action.types";


/*
 * action 创建函数
 */

export function login(address: string, wallet_type: number) {
    //console.log('actions login', { type: LOGIN, address, wallet_type })
    return { type: LOGIN, address, wallet_type }
}

export function loginOut() {
    return { type: LOGIN_OUT }
}

// export function updateVersion(payload) {
//     return {type: UPDATE_VERSION, payload}
// }

export function updateMenu(payload: any) {
    return { type: UPDATE_MENU, payload }
}

export function updateBanner(payload: any) {
    return { type: UPDATE_BANNER, payload }
}

export function updateHeaderHeight(payload: any) {
    return { type: UPDATE_HEADER_HEIGHT, payload }
}

export function updateHeaderTop(payload: any) {
    return { type: UPDATE_HEADER_TOP, payload }
}

export function emitLogin(payload: any) {
    return { type: EMIT_LOGIN, payload }
}

export function updateAvatar(payload: any) {
    return { type: UPDATE_AVATAR, payload }
}

export function updateLoginInfo(payload: any) {
    return { type: 'LOGIN_INFO', payload }
}
export function loginInfoOut() {
    return { type: 'LOGIN_INFO_OUT' }
}

export function updateAccountReg(payload: any) {
    return { type: 'ACCOUNT_REG', payload }
}

