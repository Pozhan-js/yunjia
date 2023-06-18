import Cookies from 'js-cookie'
const TokenKey = 'x-access-token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(authToken) {
    let tokenAgeDay = 5;//单位天
    window.tokenExpired = new Date();
    //console.log('setToken 11', window.tokenExpired.getTime());
    window.tokenExpired = new Date(new Date().getTime() + tokenAgeDay * 24 * 60 * 60 * 1000);
    //console.log('setToken 22', window.tokenExpired.getTime());

    return Cookies.set(TokenKey, authToken, { expires: window.tokenExpired });
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
