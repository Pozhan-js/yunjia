import React, { useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import "@/assets/styles/css/style.css";
import '@/assets/styles/css/footer.scss';
import "@/config/http.interceptor";
import { saveState, store } from "./store";
import { Provider, useSelector } from "react-redux";
import "@/utils/rem";
import { useRequest } from "ahooks";
import { getHeaderBanner } from "@/services/v1/home";
import Header from "@/components/widget/Header";
import MobileHeader from "@/components/mobile/widget/Header";
import { updateBanner } from "@/store/actions";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { isPc } from "@/utils/utils";
import { coinbaseWallet, hooks as coinbaseWalletHooks } from '@/connectors/coinbaseWallet';
import { hooks as metaMaskHooks, metaMask } from '@/connectors/metaMask';
import { hooks as walletConnectHooks, walletConnect } from '@/connectors/walletConnect';
import { MetaMask } from '@web3-react/metamask'
import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { WalletConnect } from '@web3-react/walletconnect'

function App() {
    useEffect(() => {
        // cancel chrome scroll the previous position
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        // subscribe store
        store.subscribe(() => {
            const state = store.getState();
            //console.log("state", state);
            saveState(state as StoreState);
        })
    }, []);


    const { data } = useRequest(getHeaderBanner, {
        refreshOnWindowFocus: true,  // 重新聚焦刷新
        onSuccess: (data: any) => {
            store.dispatch(updateBanner({ banner: data.data?.banner[0] }));
        }
    });
    const connectors: [MetaMask | WalletConnect | CoinbaseWallet, Web3ReactHooks][] = [
        [metaMask, metaMaskHooks],
        [walletConnect, walletConnectHooks],
        [coinbaseWallet, coinbaseWalletHooks],
    ]
    return (
        <Provider store={store}>
            <Web3ReactProvider connectors={connectors}>
                {isPc() ? <Header menu={data?.data?.menu}></Header> :
                    <MobileHeader menu={data?.data?.menu}></MobileHeader>}
                    <Outlet></Outlet>
            </Web3ReactProvider>
        </Provider>);
}

export default App;
