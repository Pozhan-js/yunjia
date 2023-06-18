import { useSelector } from "react-redux";
import styled from 'styled-components';
import useContractTool from "@/utils/useContractTool";
import React, { useEffect, useRef, useState } from "react";
import $T from '@/utils/utils';
import web3 from "web3";
import { updateProfile } from "@/services/v1/personal";
import { useRequest, useSetState, useMount } from "ahooks";
import copy from "copy-to-clipboard";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import ethImg from "@/assets/images/ETH@2x.png";
//import walletImg from "@/assets/images/Personal/wallet@2x.png";
import walletImg from "@/assets/images/PersonalPage/mobile/ic_wallet.png";
import nftImg from "@/assets/images/PersonalPage/NFT@2x.png";
import omhImg from "@/assets/images/PersonalPage/OMH@2x.png";
import copyImg from "@/assets/images/HomePage/Banner/ic_copy@2x.png";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import useWeb3 from "@/utils/useWeb3";
import ic_email from '@/assets/images/PersonalPage/ic_email.png';
import SignHome from '@/components/widget/Account/mobile/SignHome';


export default function TopCard({ info }: { info: any }) {
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const LOGIN_INFO: any = useSelector((state: StoreState) => state.LOGIN_INFO);
    const [alert, setAlert] = useSetState({ show: false, tip: '' });
    const { readOMHBalance, readETHBalance } = useContractTool();
    const { instance } = useWeb3();
    const [OMHBalance, setOMHBalance] = useState('0');
    const [ETHBalance, setETHBalance] = useState('0');
    const [modifyName, setModifyName] = useState(false);
    const [modalSignHomeOpen, setModalSignHomeOpen] = useState(false);
    const [loginInfo, setLoginInfo] = useState({ email: 'email' });
    const [name, setName] = useState(info?.addressinfo?.nickname ? info?.addressinfo?.nickname : 'Unnamed');
    const inputRef = useRef<any>();
    const { runAsync } = useRequest(updateProfile, {
        debounceWait: 3000,
        debounceLeading: true,
        manual: true
    });
    const Alert: any = React.forwardRef(function Alert(props, ref: any) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    useMount(() => {
        setLoginInfo(LOGIN_INFO);
    })
    useEffect(() => {
        if (instance) {
            readOMHBalance().then((res) => {
                setOMHBalance(BigNumber(web3.utils.fromWei(res)).toFixed(0));
            });
            readETHBalance().then((res: any) => {
                setETHBalance(BigNumber(web3.utils.fromWei(res)).toNumber().toFixed(2));
            })
        }
    }, [instance])
    const onInputChange = (value: string) => {
        setName(value)
    }
    const updateName = (nickname: string) => {
        if (info?.addressinfo?.nickname === nickname) return; // nickname 不变 return;
        const formData = new FormData();
        formData.append('nickname', nickname);
        runAsync(WALLET_ADDRESS, formData).then(() => {
            setAlert({ show: true, tip: 'modify success!!' })
        })
    }
    const handleCopy = (address: string) => {
        copy(address);
        setAlert({ show: true, tip: 'Address copied successfully !' })
    }
    // @ts-ignore
    return (<Styled>
        <Snackbar open={alert.show} autoHideDuration={1000} onClose={() => {
            setAlert({ show: false })
        }}>
            <Alert onClose={() => {
                setAlert({ show: false })
            }} severity="success" sx={{ width: '100%' }}>
                {alert.tip}
            </Alert>
        </Snackbar>
        {
            modalSignHomeOpen ? <SignHome modalType={4} handleModalType={null} handleGotoGame={null} /> : null
        }
        <div className={' mt-3 flex flex-col items-center'}>
            <div className=" text-center">
                <div className={'font-ggm text-[1.31rem] bg-clip-text text-white'}
                    onClick={() => {
                        setModifyName(true);
                        setTimeout(() => {
                            inputRef.current.focus();
                        }, 100)

                    }} hidden={modifyName}>
                    {name}
                </div>
                <input
                    ref={inputRef}
                    value={name}
                    onChange={(e) => onInputChange(e.target.value)}
                    className={'bg-transparent outline-none caret-[#B902FD] font-ggm text-[1.31rem] text-center text-white bg-clip-text border-none'}
                    onBlur={() => {
                        updateName(name)
                        setModifyName(false)
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            inputRef.current.blur();
                        }
                    }}
                    hidden={!modifyName} />
            </div>

            <div className={'flex items-center'}>
                <img src={ethImg} className={'object-cover w-[1rem] h-[1rem]'} />
                <div className={'text-sm font-ggr font-normal text-white text-opacity-60 mx-2  truncate'}>
                    {$T.formatSubAddress(WALLET_ADDRESS, 6, 6)}
                </div>
                <div className="" onClick={() => {
                    handleCopy(WALLET_ADDRESS)
                }}><img src={copyImg} className={'w-[1.13rem] h-[1.13rem]'} /></div>
            </div>

            {
                loginInfo.email && loginInfo.email.length > 0 ? <></> :
                    <div className={'ml-5 text-sm font-ggr  text-opacity-40 flex justify-center items-center cursor-pointer '} onClick={() => {
                        setModalSignHomeOpen(false);
                        setTimeout(() => {
                            setModalSignHomeOpen(true);
                        }, 100);
                    }}>
                        <img src={ic_email} className=' w-6 h-6' />
                        <span className=" text-[#4478FFFF]">Bind Email</span>
                    </div>
            }

        </div>

        <div className={'mg-card flex items-center px-4  mt-4'}>
            <div className=" w-[3.8rem]">
                <img src={walletImg} className={'w-[2.5rem] h-[2.5rem] '} /></div>
            <div className={'flex flex-col  w-6/12'}>
                <div className={'text-white text-opacity-60 bg-clip-text font-normal text-xs'}>
                    OMH
                </div>
                <div className={'text-white font-ggm text-[1.3rem] bg-clip-text'}>
                    {$T.formatThousand(OMHBalance)}
                </div>
            </div>
            <div className={'flex flex-col  w-4/12'}>
                <div className={'text-white text-opacity-60 bg-clip-text font-normal text-xs'}>
                    ETH
                </div>
                <div className={'text-white font-ggm text-[1.3rem] bg-clip-text '}>
                    {ETHBalance}
                </div>
            </div>
        </div>

        <div className={'mg-card mg-card-bor flex items-center px-4 mt-3'}>
            <div className=" w-[3.8rem]">
                <img src={nftImg} className={' w-[3.8rem] h-[3.8rem] -ml-3'} /></div>
            <div className={'flex flex-col w-3/12'}>
                <div className={'text-white text-opacity-60 bg-clip-text font-normal text-xs'}>
                    My Clubs
                </div>
                <div className={'text-white font-ggm text-[1.3rem] bg-clip-text'}>
                    {info?.nftinfo.clubnum ? info?.nftinfo.clubnum : 0}
                </div>
            </div>
            <div className={'flex flex-col w-3/12'}>
                <div className={'text-white text-opacity-60 bg-clip-text font-normal text-xs'}>
                    My NFTs
                </div>
                <div className={'text-white font-ggm text-[1.3rem] bg-clip-text '}>
                    {info?.nftinfo.nftnum ? info?.nftinfo.nftnum : 0}
                </div>
            </div>
            <div className={'flex flex-col  w-4/12'}>
                <div className={'text-white text-opacity-60 bg-clip-text font-normal text-xs'}>
                    My Mining NFTs
                </div>
                <div className={'text-white font-ggm text-[1.3rem] bg-clip-text '}>
                    {info?.nftinfo.miningnum ? info?.nftinfo.miningnum : 0}
                </div>
            </div>
        </div>

        <div className={'mg-card mg-card-bor flex items-center px-4  mt-3'}>
            <div className=" w-[3.8rem]">
                <img src={omhImg} className={' w-[3.8rem] h-[3.8rem] -ml-3'} /></div>
            <div className={'flex flex-col w-4/12'}>
                <div className={'text-white text-opacity-60 bg-clip-text font-normal text-xs'}>
                    My Power
                </div>
                <div className={'text-white font-ggm text-[1.3rem] bg-clip-text'}>
                    {info?.my_power}
                </div>
            </div>
            <div className={'flex flex-col w-6/12 overflow-hidden'}>
                <div className={'text-white text-opacity-60 bg-clip-text font-normal text-xs'}>
                    My Not Claimed OMH
                </div>
                <div
                    className={'text-white font-ggm text-[1.3rem] bg-clip-text text-ellipsis break-words overflow-hidden'}>
                    {info?.my_reward.toFixed(2)}
                </div>
            </div>
        </div>
    </Styled>)
}

const Styled = styled.div`

  .mg-card {
    width: 100%;
    height: 5.63rem;
    background: #45338B73;
    border-radius: 0.63rem;
  }

  .mg-card-bor {
    background: transparent;
    border: 0.06rem solid #33333C;
  }
`;
