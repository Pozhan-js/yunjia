import styled from "styled-components";
import CountDown from "@/components/widget/MintPage/mobile/MintDetail/CountDown";
import { message, Progress } from "antd";
import copy from "copy-to-clipboard";
import Input from "@/components/widget/NumberInput";
import CountDownS from "@/components/widget/MintPage/mobile/MintDetail/CountDownS";
import $T from '@/utils/utils';
import React, { useEffect, useRef, useState } from "react";
import { useMount } from "ahooks";
import useContractTool from "@/utils/useContractTool";
import BigNumber from "bignumber.js";
import web3 from "web3";
import Discount from "@/components/mobile/widget/Discount";
import { useNavigate } from "react-router-dom";
import PowerBg from "@/components/widget/PowerBg";
import { getBatchMintSign } from "@/services/v1/mint";
import { useDispatch, useSelector } from "react-redux";
import TransactionModal from "@/components/widget/TransactionModal";
import { emitLogin } from "@/store/actions";
import copyImg from "@/assets/images/HomePage/Banner/ic_copy@2x.png";
import ethImg from '@/assets/images/ETH@2x.png';
import useWeb3 from "@/utils/useWeb3";
import {config} from "@/config";


export default function NftCard({ className, item, self_discount }) {
    // console.log('NftCard,', {className, item, self_discount})
    const [num, setNum] = useState();
    const account = useSelector((state:StoreState) => state.WALLET_ADDRESS);
    const { Mint, signedBatchMint, getTransactionReceipt } = useContractTool();
    const { checkNetwork } = useWeb3();
    const [status, setStatus] = useState('');
    const [btnName, setBtnName] = useState('');
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(100);
    const [progressValue, setProgressValue] = useState(0);
    const transactionModalRef = useRef<any>();
    const dispatch = useDispatch();
    useEffect(() => {
        setPrice((BigNumber(1).minus(BigNumber(self_discount?.discount).div(100))).multipliedBy(item.price).toNumber());
    }, [self_discount])
    useMount(() => {
        switch (item.runningstatus) {
            case 0:
                setStatus("Mint count down")
                setBtnName('Coming Soon')
                break;
            case 1:
                setStatus("Mint end in")
                setBtnName('Mint Now')
                break;
            case 2:
                setStatus("Mint end")
                setBtnName('Mint End')
                break;
        }
        // 打折
        if (self_discount?.discount > 0) {
            setDiscount(self_discount?.discount);
        } else if (item.discount > 0) {
            setDiscount(item.discount);
        }
        // 进度
        setProgressValue(((item.mintcount / item.curcount) * 100).toFixed(2) as unknown as number);
    });
    const LinkTx = ({ tx }) => {
        return (
            <div className={'flex'}>
                TX:
                <a className={'w-[15rem] truncate'} href={`${config.ETHERSCAN_URL}/tx/${tx}`}
                    target={'_blank'}>{tx}</a>
            </div>
        )
    }
    const startMint = async () => {
        transactionModalRef.current.setStyle({ width: '85vw' })
        // 先判断是否打折mint
        if (self_discount?.discount > 0) {
            checkNetwork().then(() => {
                getBatchMintSign(item.id, account, num).then((res) => {
                    // console.log(res.data);
                    transactionModalRef.current.showModal({ type: 0 });
                    signedBatchMint(item.contract, [num, parseInt(res.data.nonce), parseInt(res.data.expire), res.data.signmsg], web3.utils.toWei(BigNumber(price).multipliedBy(num).toString())).then((res:any) => {
                        console.log(res);
                        transactionModalRef.current.showModal({
                            type: 2,
                            text: <LinkTx tx={res.receipt.transactionHash} />
                        });
                    }).catch((err) => {
                        console.error(err);
                        transactionModalRef.current.showModal({ type: -1 });
                    })
                })
            });
        } else {
            if (account) {
                transactionModalRef.current.showModal({ type: 0 });
                Mint(item.contract, [num], web3.utils.toWei(BigNumber(price).multipliedBy(num).toString())).then((res:any) => {
                    console.log(res);
                    transactionModalRef.current.showModal({ type: 2, text: <LinkTx tx={res.receipt.transactionHash} /> });
                }).catch((err) => {
                    transactionModalRef.current.showModal({ type: -1 });
                })
            } else {
                dispatch(emitLogin(true));
            }
        }
    }
    const inputOnChange = (value) => {
        setNum(value)
    }
    const handleCopy = (address) => {
        copy(address);
        message.success('Address copied successfully !');
    }


    return (
        <Styled>
            <div>
                <div className={'text-[0.88rem] text-white opacity-60  font-gtwal mt-6'}>
                    {status}
                </div>
                {item.runningstatus === 0 ? <CountDownS className={'mt-2 ml-1'} countdown={item.countdown.cdsec} /> :
                    <CountDown className={'mt-2 ml-1'} countdown={item.countdown.cdsec} />}
                <TransactionModal ref={transactionModalRef} />
                <div className="relative mt-4 mg-card text-center py-6 px-4 overflow-hidden">
                    <Discount
                        className={'absolute -rotate-45  top-[1rem] -left-[2.8rem]'}>{item?.discount}</Discount>
                    <div className={'flex flex-col items-center '}>
                        <img src={item.nftimg} onClick={() => {
                            navigate('/clubs/' + item.clubid);
                        }} className={'object-cover  h-[14.375rem]  cursor-pointer'} />
                        <PowerBg item={item} />
                    </div>
                    <div className={'flex justify-center items-center text-white mt-4 '}>
                        <div
                            className={'text-[1.56rem] font-medium font-gtwalmp leading-6 truncate max-w-[15rem]'}>{item.subtitle}</div>
                        {/* <div className={'text-base font-normal leading-4 ml-1'}>/{item.startdate}</div> */}
                    </div>
                    <div className=" mt-2 text-[0.88rem] text-white opacity-60 font-gtwalp">
                        Total supply: {$T.formatThousand(item.curcount)}
                    </div>
                    {item.runningstatus !== 0 && <div className={'relative leading-4 mt-4  '}>
                        <Progress className={'leading-4'} percent={progressValue} showInfo={false}
                            strokeColor={'#FFA03399'}
                            // @ts-ignore
                            strokeWidth={'1rem'} />
                        <div
                            className={`text-white font-bold font-ggm text-[0.75rem] w-[2.3rem] text-center bg-clip-text absolute top-[0.16rem] left-[50%] -ml-[1.15rem]`}>{progressValue}%
                        </div>
                    </div>}
                    <div
                        className={`flex justify-between text-[#999999]  text-sm leading-4 bg-clip-text font-normal  font-gtwalp ${item.runningstatus !== 0 ? 'mt-2' : 'mt-4'}`}>
                        <div className={' text-xs '}>Remaining NFTS: <span
                            className=" text-white ">{item.mintcount}/{item.curcount}</span></div>
                        <div className={' text-xs '}>Price: <span
                            className=" text-white ">{$T.formatETHPrice(item.price)}</span></div>
                    </div>
                </div>
                <div className="mt-3 mg-card text-center py-2 px-4 flex justify-between items-center">
                    <div className={` py-2 `}>
                        <Input onChange={inputOnChange} className={''} />
                    </div>
                    <div className={'flex items-center'}>
                        <div className={'text-white opacity-80 text-[0.88rem] leading-6  font-gtwalp'}>
                            Total Price:
                        </div>
                        <div className=" flex flex-col  ml-2">
                            <div className=" flex justify-start items-center">
                                <img src={ethImg} className={'w-4 h-4 object-cover '} alt={''} />
                                <div
                                    className={'text-white text-base font-gtwalb'}>{$T.formatETHPrice(BigNumber(price).multipliedBy(num).toNumber())}</div>
                            </div>
                            <div className={'text-[#4CAD6D] text-xs  font-gtwalp'}
                                hidden={self_discount?.discount === 0}>({self_discount?.discount}%Off)
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` w-full text-left mt-2 text-xs leading-[0.875rem] text-[#F01E5C] ${self_discount?.disname ? '' : ' hidden'}`}>
                    {self_discount?.disname}
                </div>
                <div className=" flex justify-center items-center mt-4">
                    <div className={'text-xs font-gtwalp text-white '}>
                        Address: {$T.formatSubAddress(item.contract, 6, 6)}
                    </div>
                    <div className=" ml-2" onClick={() => {
                        handleCopy(item.contract)
                    }}><img src={copyImg} className={'w-[1.13rem] h-[1.13rem]'} /></div>
                </div>
                <div className=" flex justify-center items-center mb-5">
                    <button
                        disabled={item.runningstatus !== 1}
                        onClick={startMint}
                        className={` w-full h-[3.125rem] rounded-[0.625rem] font-bold text-white  bg-[#B902FD] disabled:bg-[#7B3C93] text-base  mt-4 ${item.runningstatus !== 1 ? 'text-opacity-25' : ''}`}>
                        {btnName}
                    </button>
                </div>
            </div>
        </Styled>

    )
}
const Styled = styled.div`
  .mg-card {
    //background: rgba(37, 35, 39, 0.38);
    /* background-color: #17171A; */
    background: rgba(69, 51, 139, 0.45);
    border-radius: 0.625rem;
    border: 0.03rem solid rgba(255, 255, 255, 0.24);
    position: relative;
  }

  .ant-progress-inner {
    position: relative;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    vertical-align: middle;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 100rem;
  }
`;

