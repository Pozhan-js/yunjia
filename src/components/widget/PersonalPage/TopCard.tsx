import ethImg from "@/assets/images/ETH@2x.png";
import walletImg from "@/assets/images/PersonalPage/wallet@2x.png";
import nftImg from "@/assets/images/PersonalPage/NFT@2x.png";
import omhImg from "@/assets/images/PersonalPage/OMH@2x.png";
import { useSelector } from "react-redux";
import useContractTool from "@/utils/useContractTool";
import React, { useEffect, useRef, useState } from "react";
import $T from '@/utils/utils';
import web3 from "web3";
import { updateProfile } from "@/services/v1/personal";
import { useRequest, useSetState, useMount } from "ahooks";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import useWeb3 from "@/utils/useWeb3";
import ic_email from '@/assets/images/PersonalPage/ic_email.png';
import SignHome from '@/components/widget/Account/SignHome';

export default function TopCard({ info, theme }: any) {
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const LOGIN_INFO: any = useSelector((state: StoreState) => state.LOGIN_INFO);
    const [alert, setAlert] = useSetState({ show: false, tip: '' });
    const { readOMHBalance, readETHBalance } = useContractTool();
    const { instance } = useWeb3();
    const [OMHBalance, setOMHBalance] = useState('0');
    const [ETHBalance, setETHBalance] = useState('0');
    const [modifyName, setModifyName] = useState(false);
    const [loginInfo, setLoginInfo] = useState({ email: 'email' });
    const [modalSignHomeOpen, setModalSignHomeOpen] = useState(false);
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
    return (<>
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
        <div className={'mt-[1.4rem]  ml-4 flex flex-col items-start'}>
            <div>
                <div className={'font-ggm text-[1.75rem] bg-clip-text text-white'}
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
                    className={'bg-transparent outline-none caret-[#B902FD] font-ggm text-[1.75rem] text-white bg-clip-text border-none'}
                    onBlur={() => {
                        updateName(name)
                        setModifyName(false)
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            inputRef.current.blur();
                        }
                    }}
                    hidden={modifyName === false} />
            </div>

            <div className={'flex items-center mt-1'}>
                <img src={ethImg} className={'object-cover w-[1.13rem] h-[1.13rem]'} />
                <div className={'text-base font-ggr font-normal text-white text-opacity-60 m-2 w-32 truncate'}>
                    {$T.formatSubAddress(WALLET_ADDRESS, 6, 6)}
                </div>
                <div className={'ml-5 text-base font-ggr font-normal text-white text-opacity-40'}>
                    Joined {info?.addressinfo?.createdt}
                </div>
                {
                    loginInfo.email && loginInfo.email.length > 0 ? <></> :
                        <div className={'ml-5 text-base font-ggr  text-opacity-40 flex justify-center items-center cursor-pointer '} onClick={() => {
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
        </div>
        <div className={'flex flex-row space-x-[1.5rem] mt-10'}>
            <div
                style={{ backgroundColor: theme.bgColor }}
                className={'box w-[25%] flex items-center px-[1.63rem]'}>
                <img src={walletImg} className={'w-[3rem] h-[3rem] ml-2'} />
                <div className={'flex flex-col ml-[1.5rem]'}>
                    <div className={'text-white text-opacity-60 bg-clip-text font-normal text-sm'}>
                        OMH
                    </div>
                    <div className={'text-white font-ggm text-[1.5rem] bg-clip-text mt-2'}>
                        {$T.formatThousand(OMHBalance)}
                    </div>
                </div>
                <div className={'flex flex-col ml-[3.5rem]'}>
                    <div className={'text-white text-opacity-60 bg-clip-text font-normal text-sm'}>
                        ETH
                    </div>
                    <div className={'text-white font-ggm text-[1.5rem] bg-clip-text mt-2'}>
                        {ETHBalance}
                    </div>
                </div>
            </div>

            <div
                style={{ backgroundColor: theme.bgColor }}
                className={'box w-[37.5%] flex items-center'}>
                <img src={nftImg} className={'w-[5.25rem] h-[5.25rem] ml-[1rem]'} />
                <div className={'flex flex-col ml-[0.7rem]'}>
                    <div className={'text-white text-opacity-60 bg-clip-text font-normal text-sm'}>
                        My Clubs
                    </div>
                    <div className={'text-white font-ggm text-[1.5rem] bg-clip-text mt-2'}>
                        {info?.nftinfo.clubnum ? info?.nftinfo.clubnum : 0}
                    </div>
                </div>
                <div className={'flex flex-col ml-[2.5rem]'}>
                    <div className={'text-white text-opacity-60 bg-clip-text font-normal text-sm'}>
                        My NFTs
                    </div>
                    <div className={'text-white font-ggm text-[1.5rem] bg-clip-text mt-2'}>
                        {info?.nftinfo.nftnum ? info?.nftinfo.nftnum : 0}
                    </div>
                </div>
                <div className={'flex flex-col ml-[2.5rem]'}>
                    <div className={'text-white text-opacity-60 bg-clip-text font-normal text-sm'}>
                        My Mining NFTs
                    </div>
                    <div className={'text-white font-ggm text-[1.5rem] bg-clip-text mt-2'}>
                        {info?.nftinfo.miningnum ? info?.nftinfo.miningnum : 0}
                    </div>
                </div>
            </div>

            <div
                style={{ backgroundColor: theme.bgColor }}
                className={'box w-[37.5%] flex items-center'}>
                <img src={omhImg} className={'w-[5.25rem] h-[5.25rem] ml-4'} />
                <div className={'flex flex-col ml-[0.69rem]'}>
                    <div className={'text-white text-opacity-60 bg-clip-text font-normal text-sm'}>
                        My Power
                    </div>
                    <div className={'text-white font-ggm text-[1.5rem] bg-clip-text mt-2'}>
                        {info?.my_power}
                    </div>
                </div>
                <div className={'flex flex-col ml-[3.5rem]'}>
                    <div className={'text-white text-opacity-60 bg-clip-text font-normal text-sm'}>
                        My Not Claimed Reward
                    </div>
                    <div className={'text-white font-ggm text-[1.5rem] bg-clip-text mt-2'}>
                        {info?.my_reward.toFixed(2)} OMH
                    </div>
                </div>
            </div>
        </div>
    </>)
}
