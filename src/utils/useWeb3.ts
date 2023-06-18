import Web3 from "web3";
import {config} from '@/config';
import {emitLogin} from "@/store/actions";
import {useDispatch, useSelector} from "react-redux";
import {useWeb3React} from "@web3-react/core";
import {getAddChainParameters} from "@/utils/chains";
import {WalletConnect} from '@web3-react/walletconnect'
import {AbiItem} from "web3-utils";
import {useEffect, useState} from "react";

export default function useWeb3() {
    const [instance, setInstance] = useState(null);
    const dispatch = useDispatch();
    const {
        provider,
        chainId,
        connector,
        isActive
    }: { provider: any, chainId: any, connector: any, isActive: any } = useWeb3React();
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    useEffect(() => {
        if (provider != null) {
            setInstance(new Web3(provider.provider))
        }
    }, [provider])
    // metamask检查网络并切换
    const checkNetwork = () => {
        return new Promise((resolve, reject) => {
            if (!account) {
                // login wallet
                console.log("login wallet");
                return reject(dispatch(emitLogin(true)));
            }
            // console.log(22222,account)
            if (chainId !== config.chain_id || !isActive) {
                if (connector instanceof WalletConnect) {
                    return resolve(connector.activate(config.chain_id === -1 ? undefined : config.chain_id))
                } else {
                    return resolve(connector.activate(config.chain_id === -1 ? undefined : getAddChainParameters(config.chain_id)))
                }
            }
            return resolve('');
        })
    }
    // 添加自定义ERC20加资产
    const AddAsset = (address: string, symbol = 'OMH', image = '') => {
        // console.log("add asset")
        return checkNetwork().then(() => {
            // console.log("add")
            return provider.provider.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: address,
                        symbol: symbol,
                        decimals: 18,
                        image: image,
                    },
                },
            }).then((success: boolean) => {
                if (success) {
                    console.log('FOO successfully added to wallet!')
                } else {
                    throw new Error('Something went wrong.')
                }
            }).catch(console.error)
        })
    }
    // 调用合约方法call
    const ContractCall = async (jsonInterface: AbiItem | AbiItem[], contractAddress: string | undefined, method: string | number, params: any) => {
        let web3: Web3 = await getWeb3() as Web3;
        let contract = new web3.eth.Contract(jsonInterface, contractAddress, {from: account});
        return contract.methods[method](...params).call();
    }
    // 调用合约方法send
    const ContractSend = async (jsonInterface: AbiItem | AbiItem[], contractAddress: string | undefined, method: string | number, params: any, value: any) => {
        let web3: Web3 = await getWeb3() as Web3;
        let contract = new web3.eth.Contract(jsonInterface, contractAddress, {from: account});
        return new Promise((res, rej) => {
            contract.methods[method](...params).send({
                value: value
            }).on('receipt', function (receipt: object) {
                res({type: 'receipt', receipt})
            }).on('error', function (error: any, receipt: any) {
                rej({error, receipt})
            });
            // .on('transactionHash', function (hash) {
            //         res({type: 'transactionHash', hash})
            //     }).on('confirmation', function (confirmationNumber, receipt) {
            //         res({type: 'confirmation', confirmationNumber, receipt})
            //     })
        })
    }
    // 部署合约
    const deployContract = async (jsonInterface: any, bytecode: any, args: any) => {
        let web3: Web3 = await getWeb3() as Web3;
        let contract = new web3.eth.Contract(jsonInterface);
        return contract.deploy({
            arguments: args, data: bytecode
        }).send({
            from: account
        });
    }
    // return the transaction receipt
    const getTransactionReceipt = async (trade_hash: string) => {
        let web3 = await getWeb3();
        return web3?.eth.getTransactionReceipt(trade_hash)
    }
    // get eth balanceOf
    const getEthBalanceOf = async (address: string) => {
        let web3 = await getWeb3();
        return web3?.eth.getBalance(address);
    }

    // Get the web3 object
    const getWeb3 = () => {

        // if (provider == null) {
        //     return null;
        // }
        // if (instance === null) {
        //     setTimeout(() => {
        //
        //         console.log(instance)
        //     }, 0)
        //     return instance;
        // }

        return instance;
    }

    return {
        instance,
        checkNetwork,
        getTransactionReceipt,
        ContractCall,
        deployContract,
        ContractSend,
        getWeb3,
        getEthBalanceOf,
        AddAsset
    }
}
