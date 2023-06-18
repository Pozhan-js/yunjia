import styled from 'styled-components';
import React, { useRef, useState } from "react";
import ic_wallet_link from '@/assets/images/Header/mobile/ic_wallet_link.png'
import { Backdrop, Box, Modal } from "@mui/material";
import { Popover } from "antd";
import coinbaseImg from '@/assets/images/Header/wallect_connect.png';
import metamaskImg from '@/assets/images/Header/metamask.png';
import wallet_connectImg from '@/assets/images/Header/coinbase.png';
import useWallet from "@/utils/useWallet";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "@/assets/images/Header/mobile/ic_avatar.png";
import { useNavigate } from "react-router-dom";
import { useUpdateEffect } from "ahooks";
import { emitLogin } from "@/store/actions";
import { getToken } from '@/utils/auth';
import outImg from "@/assets/images/PersonalPage/ic_out.png";
import $T from "@/utils/utils";

const BoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    height: '22.88rem',
    borderRadius: '0.63rem 0.63rem 0.63rem 0.63rem',
    border: '0.06rem solid rgba(255,255,255,0.1)'
};
const LineBox = styled.div`
  width: 75vw;
  height: 3.63rem;
  background: rgba(211, 183, 255, 0.15);
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
`;
// type 1 Metamask  type 2 coinbase type 3 wallect_connect
export default function ConnectWalletNew({ className }) {
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const LOGIN_EVENT = useSelector((state: StoreState) => state.LOGIN_EVENT);
    const AVATAR_URL = useSelector((state: StoreState) => state.AVATAR_URL);
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const userToken = getToken();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { connect, resetApp } = useWallet();
    const ref = useRef();
    // 显示登录窗
    useUpdateEffect(() => {
        if (LOGIN_EVENT) {
            handleOpen();
            dispatch(emitLogin(false));
        }
    }, [LOGIN_EVENT])


    return (<Styled>
        <Modal
            open={open}
            onClose={handleClose}
            components={{
                Backdrop: Backdrop,

            }}

            componentsProps={{
                backdrop: {
                    // @ts-ignore
                    timeout: 500
                }
            }}
        >
            <Box sx={BoxStyle} className={'backdrop-blur-[2rem]'}>
                <div className={'w-full h-full flex flex-col items-center'}>
                    <div className={'flex justify-center w-full  pt-[1.13rem] relative pb-[2.25rem]'}>
                        <div className={'text-white text-base font-gtwalb'}>
                            Connect Wallet
                        </div>
                        {/*<div className={'text-white text-base absolute top-0 right-0 pr-5 pt-4'}>x</div>*/}
                    </div>
                    <div className={'flex flex-col space-y-3'}>
                        <LineBox className={'hover:bg-[#AC77FF99] flex items-center bg-opacity-60 cursor-pointer'}
                            onClick={() => {
                                connect(1).then(() => {
                                    handleClose()
                                })
                            }}>
                            <img src={metamaskImg} className={'w-7 h-7 object-cover ml-6'} />
                            <span className={'ml-4 text-white text-base font-msrb'}>MetaMask</span>
                        </LineBox>
                        <LineBox className={'hover:bg-[#AC77FF99] flex items-center bg-opacity-60 cursor-pointer'}
                            onClick={() => {
                                connect(2).then(() => {
                                    handleClose()
                                })
                            }}>
                            <img src={wallet_connectImg} className={'w-7 h-7 object-cover ml-6'} />
                            <span className={'ml-4 text-white text-base font-msrb'}>Coinbase Wallet</span>
                        </LineBox>
                        <LineBox className={'hover:bg-[#AC77FF99] flex items-center bg-opacity-60 cursor-pointer'}
                            onClick={() => {

                                connect(3).then(() => {
                                    handleClose()
                                })
                            }}>
                            <img src={coinbaseImg} className={'w-7 h-7 object-cover ml-6'} />
                            <span className={'ml-4 text-white text-base font-msrb'}>WalletConnect</span>
                        </LineBox>
                    </div>
                    <div className={'text-[#A5A3A8] text-sm font-gtwal text-center px-2 pt-7'}>Connect with
                        your
                        available wallet or create new wallet to join our omnihorse club
                    </div>
                </div>
            </Box>
        </Modal>

        <div className={' ml-2'}>
            {WALLET_ADDRESS || userToken ? (
                <div className={'w-[2.25rem] h-[2.13rem] rounded-[0.63rem]  flex justify-center items-center border-[#FFFFFF21] border-[0.125rem]'}>
                    {/* {WALLET_ADDRESS && !userToken ? <>
                        <Popover content={<PopContentLogout />} overlayClassName='mg-popover' placement="bottomRight" >
                            <img src={AVATAR_URL ? AVATAR_URL : avatarImg}
                                className={'w-full h-full rounded-full object-cover'} />
                        </Popover>
                    </> : <></>} */}
                    {!WALLET_ADDRESS && userToken ? <>
                        <Popover content={<PopContentToken handleOpen={handleOpen} />} overlayClassName='mg-popover' placement="bottomRight">
                            <img src={AVATAR_URL ? AVATAR_URL : avatarImg}
                                className={'w-full h-full rounded-full object-cover'} />
                        </Popover>
                    </> : <>
                        <Popover content={PopContentAll} overlayClassName='mg-popover' placement="bottomRight">
                            <div className={'flex items-center cursor-pointer'} onClick={() => {
                                navigate('/personal');
                            }}>
                                <img src={AVATAR_URL ? AVATAR_URL : avatarImg}
                                    className={'w-full h-full rounded-full object-cover'} />
                            </div>
                        </Popover>
                    </>}

                </div>
            ) : (
                <button
                    onClick={handleOpen}
                    className={`${className} flex justify-center items-center text-white text-sm font-gtwalmp w-[2.25rem] h-[2.13rem] rounded-[0.63rem]`}
                >
                    <img src={ic_wallet_link} className={'w-full h-full'} alt={''} />
                </button>
            )}
        </div>
    </Styled>)
}

const Styled = styled.div`
`;


const PopContentToken = ({ handleOpen }) => {
    const loginInfo: any = useSelector((state: StoreState) => state.LOGIN_INFO);
    const { resetApp } = useWallet();
    return (
        <div className='mg-pop-content text-white'>
            <div className=' p-1 '>
                {loginInfo.email && loginInfo.email.length > 0 ? <>
                    <div className='flex justify-start items-center'>
                        <p className='text-base text-white'>{$T.formatSubStr(loginInfo.nickname, 15)}&nbsp;</p>
                        <div className='bg-[#FEC52EFF] w-[2rem] h-[1rem] ml-1 rounded-[0.19rem] mt-1 mb-2 flex justify-center items-center font-gtwalmpo'>Lv.{loginInfo.lv}</div>
                    </div>
                    <p className=' text-xs text-[#ffffff8f]'>{loginInfo.email}&nbsp;</p>
                </> : <></>}
                <button
                    onClick={handleOpen}
                    className={` flex justify-center items-center text-white text-sm font-gtwalm  w-40 h-8 mt-3 bg-[#6F19F7] hover:bg-[#6F19D7] transition duration-150 ease-in-out rounded-[0.3rem]`}
                >
                    Connect Wallet
                </button>
                <div className=' text-sm flex justify-center items-center mt-2 cursor-pointer w-40 h-8 border-[0.03rem] border-[#ffffff66] rounded-[0.3rem] ' onClick={resetApp}>
                    Logout
                </div>
            </div>
        </div>
    );

}

const PopContentAll = () => {
    const loginInfo: any = useSelector((state: StoreState) => state.LOGIN_INFO);
    const { resetApp } = useWallet();
    return (
        <div className='mg-pop-content text-white'>
            <div className=' p-1 '>
                {loginInfo.email && loginInfo.email.length > 0 ? <>
                    <div className='flex justify-start items-center'>
                        <p className='text-base text-white'>{$T.formatSubStr(loginInfo.nickname, 15)}&nbsp;</p>
                        <div className='bg-[#FEC52EFF] w-[2rem] h-[1rem] ml-1 rounded-[0.19rem] mt-1 mb-2 flex justify-center items-center font-gtwalmpo'>Lv.{loginInfo.lv}</div>
                    </div>
                    <p className=' text-xs text-[#ffffff8f]'>{loginInfo.email}&nbsp;</p>
                </> : <></>}
                <div className=' text-sm flex justify-center items-center mt-2 cursor-pointer w-40 h-8 border-[0.03rem] border-[#ffffff66] rounded-[0.3rem] ' onClick={resetApp}>
                    Logout
                </div>
            </div>
        </div>
    );
}

const PopContentLogout = () => {
    const { resetApp } = useWallet();
    return (
        <div className='mg-pop-content text-white'>
            <div className=' p-1  '>
                <div className=' text-sm flex justify-center items-center mt-2 cursor-pointer w-40 h-8 border-[0.03rem] border-[#ffffff66] rounded-[0.3rem] ' onClick={resetApp}>
                    Logout
                </div>
            </div>
        </div>
    );
}