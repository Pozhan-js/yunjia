import styled from "styled-components";
import CountDown from "@/components/widget/MintPage/MintDetail/CountDown";
import {message, Progress} from "antd";
import copy from "copy-to-clipboard";
import Input from "@/components/widget/NumberInput";
import ethImg from '@/assets/images/ETH@2x.png';
import CountDownS from "@/components/widget/MintPage/MintDetail/CountDownS";
import $T from '@/utils/utils';
import React, {useEffect, useRef, useState} from "react";
import {useMount} from "ahooks";
import useContractTool from "@/utils/useContractTool";
import BigNumber from "bignumber.js";
import web3 from "web3";
import copyImg from "@/assets/images/HomePage/Banner/ic_copy@2x.png";
import Discount from "@/components/widget/Discount";
import {useNavigate} from "react-router-dom";
import PowerBg from "@/components/widget/PowerBg";
import {getBatchMintSign} from "@/services/v1/mint";
import {useDispatch, useSelector} from "react-redux";
import TransactionModal from "@/components/widget/TransactionModal";
import {emitLogin} from "@/store/actions";
import {config} from "@/config";
import useWeb3 from "@/utils/useWeb3";
import theme from '@/config/themeSetting';

export default function NftCard({className = '', item, self_discount}: any) {
    const [num, setNum] = useState(0);
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const {Mint, signedBatchMint} = useContractTool();
    const {checkNetwork} = useWeb3();
    const [status, setStatus] = useState('');
    const [btnName, setBtnName] = useState('');
    const [btnDisable, setDisable] = useState(true);
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(100);
    const [progressValue, setProgressValue] = useState('0.00');
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
                setDisable(false);
                setStatus("Mint end in");
                setBtnName('Mint Now');
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
        setProgressValue(((item.mintcount / item.curcount) * 100).toFixed(2));
    });
    const LinkTx = ({tx}: { tx: string }) => {
        return (
            <div className={'flex'}>
                TX:
                <a className={'w-[15rem] truncate'} href={`${config.ETHERSCAN_URL}/tx/${tx}`}
                   target={'_blank'}>{tx}</a>
            </div>
        )
    }
    const startMint = async () => {
        // 先判断是否打折mint
        if (self_discount?.discount > 0) {
            checkNetwork().then(() => {
                getBatchMintSign(item.id, account, num).then((res) => {
                    // console.log(res.data);
                    transactionModalRef.current.showModal({type: 0});
                    // console.log([num], web3.utils.toWei(BigNumber(price).multipliedBy(num).toString()));
                    signedBatchMint(item.contract, [num, parseInt(res.data.nonce), parseInt(res.data.expire), res.data.signmsg], web3.utils.toWei(BigNumber(price).multipliedBy(num).toString())).then((res: any) => {
                        console.log(res);
                        transactionModalRef.current.showModal({
                            type: 2,
                            text: <LinkTx tx={res.receipt.transactionHash}/>
                        });
                    }).catch((err) => {
                        console.error(err);
                        transactionModalRef.current.showModal({type: -1});
                    })
                })
            });
        } else {
            if (account) {
                transactionModalRef.current.showModal({type: 0});
                // console.log([num], web3.utils.toWei(BigNumber(price).multipliedBy(num).toString()));
                Mint(item.contract, [num], web3.utils.toWei(BigNumber(price).multipliedBy(num).toString())).then((res: any) => {
                    console.log(res);
                    transactionModalRef.current.showModal({type: 2, text: <LinkTx tx={res.receipt.transactionHash}/>});
                }).catch((err) => {
                    transactionModalRef.current.showModal({type: -1});
                })
            } else {
                dispatch(emitLogin(true));
            }
        }
    }
    const inputOnChange = (value: number) => {
        setNum(value)
    }
    const onEnd = () => {
        window.location.reload();
    }
    return (<Styled
        style={{backgroundColor: theme.mintDetailPage.NftCard.bgColor}}
        className={`${className} rounded-2xl backdrop-blur-[2rem] border-[0.03rem] border-white border-opacity-10 flex box-border overflow-hidden relative`}>
        {((item?.discount > 0 && !account) || self_discount?.discount > 0) && <Discount
            className={'absolute -rotate-45 top-[1rem] -left-[2rem]'}>{discount}</Discount>}
        <TransactionModal ref={transactionModalRef}/>
        <div className={'flex flex-col items-center ml-12'}>
            <img src={item.nftimg} onClick={() => {
                navigate('/clubs/' + item.clubid);
            }} className={'object-cover w-[11.75rem] h-[16.94rem] mt-20 cursor-pointer'}/>
            <PowerBg item={item} bgColor={theme.mintDetailPage.NftCard.powerBg}/>
        </div>
        <div className={'mx-[3.75rem] w-full'}>
            <div className={'flex flex-col mt-[3.13rem] w-full'}>

                <div className={'flex items-end text-white '}>
                    <div
                        className={'text-[1.88rem] font-medium leading-6 truncate max-w-[15rem]'}>{item.subtitle}</div>
                    <div className={'text-base font-normal leading-4 ml-1'}>/{item.startdate}</div>
                </div>

                <div className={'text-sm font-normal bg-clip-text text-white text-opacity-40 mt-2'}>
                    Total supply: {$T.formatThousand(item.curcount)}
                    <div className={'tex-sm text-white font-normal mt-6'}>
                        {status}
                    </div>
                    {item.runningstatus === 0 ?
                        <CountDownS className={'mt-2 ml-1'} onEnd={onEnd} countdown={item.countdown.cdsec}/> :
                        <CountDown className={'mt-2 ml-1'} onEnd={onEnd} countdown={item.countdown.cdsec}/>}
                    <div
                        className={`flex justify-between text-sm leading-4 bg-clip-text font-normal ${item.runningstatus !== 0 ? 'mt-[3.5rem]' : 'mt-7'}`}>
                        <div className={'text-white text-opacity-90'}>Minted
                            NFTS: {item.mintcount}/{item.curcount}</div>
                        <div className={'text-white text-opacity-100'}>Price: {$T.formatETHPrice(item.price)}</div>
                    </div>
                    {item.runningstatus !== 0 && <div className={'relative leading-4 mt-[0.13rem]'}>
                        <Progress className={'leading-4'} percent={parseFloat(progressValue)} showInfo={false}
                                  strokeColor={'#FFA03399'}
                            // @ts-ignore
                                  strokeWidth={'1rem'}/>
                        <div
                            className={`text-white font-bold text-[0.75rem] bg-clip-text absolute top-[0.16rem] left-[50%]`}>{progressValue}%
                        </div>
                    </div>}
                </div>

                <div
                    className={`flex justify-between ${item.runningstatus === 0 ? 'bg-[#FFFFFF1A] rounded-lg px-4 py-1 mt-2' : 'mt-4'}`}>
                    <div className={`${item.runningstatus !== 0 ? 'bg-[#FFFFFF1A] rounded-lg px-2' : ''}`}>
                        <Input onChange={inputOnChange}/>
                    </div>
                    <div className={'flex items-center'}>
                        <div className={'text-white text-sm leading-6'}>
                            Total Price:
                        </div>

                        <img src={ethImg} className={'w-4 h-4 object-cover ml-2'} alt={''}/>
                        <div
                            className={'text-white text-base font-gtwalb'}>{$T.formatETHPrice(BigNumber(price).multipliedBy(num).toNumber())}</div>
                        <div className={'text-[#4CAD6D] text-sm ml-1'}
                             hidden={self_discount?.discount === 0}>({self_discount?.discount}%Off)
                        </div>
                    </div>
                </div>

                <button
                    disabled={btnDisable}
                    onClick={startMint}
                    style={{backgroundColor: btnDisable ? theme.nftBigBtn.disableColor : theme.nftBigBtn.color}}
                    className={`w-[14.38rem] h-[2.75rem] font-bold text-white text-base rounded-lg mt-4 ${btnDisable ? 'text-opacity-25' : ''}`}>
                    {btnName}
                </button>
                <span className={'text-red-500 text-sm mt-4'}>{self_discount?.disname}</span>
                <div
                    className={`flex text-[0.75rem] text-[#999999] flex-shrink ${item.runningstatus === 0 ? 'mt-4' : 'mt-8'}`}>
                    <div className={"px-2 py-1 truncate cursor-pointer"} onClick={() => {
                        window.open(config.ETHERSCAN_URL + `/address/${item.contract}`);
                    }}>
                        Address:{item.contract}
                    </div>
                    <div
                        className={"cursor-pointer flex items-center"}
                        onClick={() => {
                            copy(item.contract);
                            message.success('Address copied successfully !');
                        }}
                    >
                        <img src={copyImg} className={'w-[1.13rem] h-[1.13rem]'} alt={''}/>
                    </div>
                </div>
            </div>
        </div>
    </Styled>)
}
const Styled = styled.div`
  width: 48.38rem;
  height: 29.75rem;


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

