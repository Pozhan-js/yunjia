import { useWeb3React } from '@web3-react/core'
import Web3 from "web3";
import { login, loginOut, loginInfoOut } from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMount, useUpdateEffect } from "ahooks";
// import {useInactiveListener, useEagerConnect} from "@/utils/walletHooks";
import useWeb3 from "@/utils/useWeb3";
import { coinbaseWallet, hooks as coinbaseWalletHooks } from '@/connectors/coinbaseWallet';
import { hooks as metaMaskHooks, metaMask } from '@/connectors/metaMask';
import { hooks as walletConnectHooks, walletConnect } from '@/connectors/walletConnect';
import { getAddChainParameters } from "@/utils/chains";
import { config } from '@/config'
import { walletSign } from '@/utils/utils'


// type 1 Metamask  type 2 coinbase type 3 wallect_connect
export default function useWallet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { account, provider } = useWeb3React();
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const WALLET_TYPE = useSelector((state: StoreState) => state.WALLET_TYPE);
    //console.log('useWallet  WALLET_TYPE  WALLET_TYPE:', WALLET_TYPE, new Date())
    const [type, setType] = useState<number>(WALLET_TYPE);
    // const {checkNetwork} = useWeb3();
    useMount(() => {
        if (WALLET_ADDRESS) {
            //console.log("wallet useMount useMount", WALLET_ADDRESS, WALLET_TYPE)
            switch (WALLET_TYPE) {
                case 1:
                    metaMask
                        .connectEagerly()
                        .then(() => {
                            // console.log('metaMask', provider)
                        })
                        .catch(() => {
                            console.debug('Failed to connect eagerly to metamask')
                        })
                    break;
                case 2:
                    coinbaseWallet
                        .connectEagerly()
                        .then(() => {
                            // console.log('coinbaseWallet', provider)
                        })
                        .catch(() => {
                            console.debug('Failed to connect eagerly to coinbase wallet')
                        })
                    break;
                case 3:
                    walletConnect.connectEagerly().then(() => {
                        // console.log('walletConnect', provider)
                    }).catch(() => {
                        console.debug('Failed to connect eagerly to walletconnect')
                    })
                    break;
            }
        }
    })
    useUpdateEffect(() => {
        if (WALLET_ADDRESS) {
            console.log("wallet address change", WALLET_ADDRESS)
            walletSign(provider, WALLET_ADDRESS, () => {
                window.location.reload();
                //console.log("wallet address change  window.location.reload()", WALLET_ADDRESS)
            });
            //window.location.reload();
        }
    }, [WALLET_ADDRESS]);


    useUpdateEffect(() => {
        // console.log("type",type)
        if (account !== undefined && type > 0) { // type 会变成0 暂不知道原因
            dispatch(login(account, type));
            //console.log('dispatch(login) account:', account, type, new Date())
        }
    }, [account])



    const connect = (type_: number) => {
        // console.log('connect,type_:', type_)
        switch (type_) {
            case 1:
                console.log("Metamask", account, type_)
                setType(type_)
                return metaMask.activate(getAddChainParameters(config.chain_id))
            case 2:
                console.log("coinbase", account, type_)
                setType(type_)
                return coinbaseWallet.activate(getAddChainParameters(config.chain_id))
            case 3:
                console.log("WalletConnect", account, type_)
                setType(type_)
                return walletConnect.activate(config.chain_id)
            default:
                console.log("Metamask", account, type_)
                setType(type_)
                return metaMask.activate(getAddChainParameters(config.chain_id))
        }
    }
    const outWallet = () => {
        switch (WALLET_TYPE) {
            case 1:
                if (metaMask?.deactivate) {
                    void metaMask.deactivate()
                } else {
                    void metaMask.resetState()
                }
                break;
            case 2:

                if (coinbaseWallet?.deactivate) {
                    void coinbaseWallet.deactivate()
                } else {
                    void coinbaseWallet.resetState()
                }
                break;
            case 3:
                if (walletConnect?.deactivate) {
                    void walletConnect.deactivate()
                } else {
                    void walletConnect.resetState()
                }
                break;
        }
        //console.log('outWallet   dispatch(loginOut());')
        dispatch(loginOut());
        window.location.href = '/';
    };
    const resetApp = () => {
        dispatch(loginInfoOut())
        outWallet()

    };

    return {
        connect, resetApp, outWallet
    }
}
