import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect'
import type { Connector } from '@web3-react/types'
import Cookies from 'js-cookie'

export default {
    // 千分位格式化
    formatThousand: (money: string | number, splitDesc = ',') => {
        if (!!money) {
            // if (money > 9999) {//大于9999显示x.xx万
            //     return (money / 1000).toFixed(2) + 'k';
            // }
            money = money.toString();
            const reg = money.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
            return money.replace(reg, '$1' + splitDesc)
        }
        return money;
    },
    // ETH 价格格式化
    formatETHPrice: (price: string | number, suf = ' ETH') => {
        if (price < 0) {
            return ("?? ETH");
        } else if (price === 0) {
            return ("Free Mint");
        } else if (price === undefined) {
            return '';
        } else {
            return (price + suf);
        }
    },
    formatSubAddress: (address: string, preLen = 5, sufLen = 5) => {
        if (address && address.length > preLen) {
            let str = address.substring(0, preLen) + "...";
            if (address.length > (preLen + sufLen)) {
                // console.log(address.length - sufLen, address.length);
                // console.log(address.substring(address.length - sufLen, address.length));
                str += address.substring(address.length - sufLen, address.length);
            }
            return str;
        }
        return address;
    },
    formatSubStr: (string: string, preLen: number) => {
        if (string && preLen && string.length > preLen) {
            return string.substring(0, preLen) + "...";
        }
        return string;
    },
    // 不足两位前 补0
    formatNumberFillZero: (t: string | number) => {
        if (t.toString().length < 2) {
            return "0" + t;
        }
        return t.toString();
    },
    getWalletName(connector: Connector) {
        if (connector instanceof MetaMask) return 'MetaMask'
        if (connector instanceof WalletConnect) return 'WalletConnect'
        if (connector instanceof CoinbaseWallet) return 'Coinbase Wallet'
        return 'Unknown'
    },
    checkNftStatus(item: any) {
        if (item?.stakestatus === 2) {
            // 质押过程中
            return false;
        } else if (item?.nftstatus === 2) {
            // nft购买过程中
            return false;
        }
        return true;
    },
    formatNumberToThousand(num: number) {
        if (num > 1000) {
            return (num / 1000).toFixed(2) + "K";
        }
        return num || 0;

    },

}


export const isPc = function () {
    // console.log(window.navigator.userAgent)
    return !window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

export function getCookieValue(key) {
    return Cookies.get(key)
}

export function setCookieValue(key, val, times) {
    let keyAge = times;//单位分钟
    let now = new Date();
    // console.log(`setCookieValue key=${key},val=${val} begin:`, now.getTime());
    now = new Date(new Date().getTime() + keyAge * 1000 * 60);
    // console.log(`setCookieValue key=${key},val=${val} end:`, now.getTime());

    return Cookies.set(key, val, { expires: now });
}

export function removeCookieValue(key) {
    return Cookies.remove(key)
}


export function walletSign(walletProvider, walletAddress, callbackFun) {
    if (!walletProvider) {
        console.log(' walletSign walletProvider:', walletProvider)
        return null;
    }
    let singKey = walletAddress + "_sign";
    let osign = getCookieValue(singKey);
    if (!osign) {
        let msg = 'Hello Omnihorse';
        walletProvider.provider.request({
            method: "personal_sign",
            params: [msg, walletAddress],
        }).then((sign: string) => {
            setCookieValue(singKey, sign, 60 * 24 * 7); //签名本地存7天
            callbackFun && callbackFun(sign)
        }).catch((err) => {
            console.warn('walletSign err:', err);
        });
    } else
        callbackFun && callbackFun(osign)
}


import { useEffect, useState } from 'react';
export const useDebounce = (value, delay) => {
    const [deouncedValue, setDebuouncedValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => setDebuouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])
    return deouncedValue
}