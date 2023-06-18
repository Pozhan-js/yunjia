import {useSelector} from "react-redux";
import useWeb3 from "@/utils/useWeb3";
import NftJsonInterface from '@/assets/contract/abi/NFT_ABI.json';
import StakeNftJsonInterface from '@/assets/contract/abi/STAKE_NFT_ABI.json';
import OmhErc20JsonInterface from '@/assets/contract/abi/OMH_ERC20_ABI.json';
import DividendPoolJsonInterface from '@/assets/contract/abi/DIVIDEND_POOL_ABI.json';
import OldNftJsonInterface from '@/assets/contract/abi/OLD_NFT_ABI.json';
import TransitionJsonInterface from '@/assets/contract/abi/TRANSITION_ABI.json';
import {config} from '@/config';
import {AbiItem} from "web3-utils";

export default function useContractTool() {
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const {
        ContractCall, ContractSend, getTransactionReceipt, checkNetwork, getEthBalanceOf
    } = useWeb3();
    // mint
    const Mint = (contract_address: string, params: [any], value: any) => {
        return checkNetwork().then(() => {
            return ContractSend(NftJsonInterface as AbiItem[], contract_address, 'batchMint', params, value);
        })
    }
    // signMint
    const signedBatchMint = (contract_address: string, params: [any, number, number, any], value: any) => {
        return checkNetwork().then(() => {
            return ContractSend(NftJsonInterface as AbiItem[], contract_address, 'signedBatchMint', params, value);
        })
    }
    // balanceOf
    const readOMHBalance = () => {
        return checkNetwork().then(() => {
            return ContractCall(OmhErc20JsonInterface as AbiItem[], config.OMH_ERC20_CONTRACT_ADDRESS, 'balanceOf', [account]);
        }).catch(err => {
            console.error(err);
        })
    }
    // get eth balanceOf
    const readETHBalance = () => {
        return checkNetwork().then(() => {
            return getEthBalanceOf(account);
        }).catch(err => {
            console.error(err);
        })
    }
    // receive omh
    /**
     * It calls the dividend function of the DividendPool contract.
     * @param params - [
     * @returns The return value is the transaction hash.
     */
    const receiveOMH = (params: any) => {
        // console.log(params)
        return checkNetwork().then(() => {
            return ContractSend(DividendPoolJsonInterface as AbiItem[], config.DIVIDEND_POOL_CONTRACT_ADDRESS, 'dividend', params, 0);
        })
    }
    /**
     * It creates a multi stake and withdraws the stake.
     * @param [params] - [
     * @returns The transaction hash of the transaction that was sent to the blockchain.
     */
    const createMultiStakeAndWithdraw = (params = []) => {
        return checkNetwork().then(() => {
            return ContractSend(StakeNftJsonInterface as AbiItem[], config.STAKE_CONTRACT_ADDRESS, 'createMultiStakeAndWithdraw', params, 0);
        })
    }

    /**
     * It creates a multi stake.
     * @param [params] - [
     * @returns The return value is the transaction hash.
     */
    const createMultiStake = (params = []) => {
        return checkNetwork().then(() => {
            return ContractSend(StakeNftJsonInterface as AbiItem[], config.STAKE_CONTRACT_ADDRESS, 'createMultiStake', params, 0);
        })
    }

    /**
     * It withdraws multiple stakes.
     * @param [params] - [
     * @returns The return value is the transaction hash.
     */
    const withdrawMultiStake = (params = []) => {
        return checkNetwork().then(() => {
            return ContractSend(StakeNftJsonInterface as AbiItem[], config.STAKE_CONTRACT_ADDRESS, 'withdrawMultiStake', params, 0)
        })
    }
    /**
     * *|CURSOR_MARCADOR|*
     * @param contract_address
     * @param token_id
     */
    const updateNft = (contract_address: string, token_id: number) => {
        // console.log(contract_address, token_id);
        return checkNetwork().then(() => {
            return ContractCall(OldNftJsonInterface as AbiItem[], contract_address, 'isApprovedForAll', [account, config.TRANSITION_CONTRACT_ADDRESS]).then((isApproved) => {
                // console.log(isApproved)
                if (isApproved) {
                    return ContractSend(TransitionJsonInterface as AbiItem[], config.TRANSITION_CONTRACT_ADDRESS, 'transition', [account, contract_address, [token_id]], 0)
                } else {
                    return ContractSend(OldNftJsonInterface as AbiItem[], contract_address, 'setApprovalForAll', [config.TRANSITION_CONTRACT_ADDRESS, true], 0).then(() => {
                        return ContractSend(TransitionJsonInterface as AbiItem[], config.TRANSITION_CONTRACT_ADDRESS, 'transition', [account, contract_address, [token_id]], 0);
                    })
                }
            })
        })
    }
    /**
     * A function that updates all NFTs.
     * @param {any[]} params - [
     * @returns The return value is a promise.
     */
    const updateAllNft = (params: any[]) => {
        return checkNetwork().then(async () => {
            for (let v of params[0]) {
                // console.log(v)
                await ContractCall(OldNftJsonInterface as AbiItem[], v, 'isApprovedForAll', [account, config.TRANSITION_CONTRACT_ADDRESS]).then(async (isApproved) => {
                    if (!isApproved) {
                        console.log("need Approve")
                        await ContractSend(OldNftJsonInterface as AbiItem[], v, 'setApprovalForAll', [config.TRANSITION_CONTRACT_ADDRESS, true], 0).catch(() => {
                            throw new Error('failed');
                        })
                    }
                })
            }
            // console.log([account, ...params]);
            // console.log("转换")
            return ContractSend(TransitionJsonInterface as AbiItem[], config.TRANSITION_CONTRACT_ADDRESS, 'multiTransition', [account, ...params], 0);
        })
    }
    const composeNft = (contract_address: string, params: any) => {
        return checkNetwork().then(() => {
            // console.log(contract_address, params)
            return ContractSend(NftJsonInterface as AbiItem[], contract_address, 'SyntheticMint', params, 0);
        })
    }

    return {
        Mint,
        signedBatchMint,
        getTransactionReceipt,

        readOMHBalance,
        readETHBalance,

        receiveOMH,

        createMultiStakeAndWithdraw,
        createMultiStake,
        withdrawMultiStake,

        updateNft,
        updateAllNft,
        composeNft
    }
}
