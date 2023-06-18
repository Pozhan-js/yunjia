interface StoreState {
    __VERSION__: number,
    WALLET_ADDRESS: string,
    WALLET_TYPE: number,  // 1 metamask 2 coinbase 3 wallet_connect
    HEADER_HEIGHT: number | string,
    MENU_DATA: any,
    BANNER_DATA: object,
    HEADER_TOP: boolean,
    LOGIN_EVENT: boolean,
    AVATAR_URL: string,
    LOGIN_INFO:object,
    ACCOUNT_REG:object
}
