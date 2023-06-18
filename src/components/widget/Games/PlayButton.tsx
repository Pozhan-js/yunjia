import React, { useState, useEffect } from 'react'
import ic_game from '@/assets/images/Game/ic_game.png';
import SignHome from '@/components/widget/Account/SignHome';
import { Modal, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getToken, setToken } from '@/utils/auth';
import ic_wallet from '@/assets/images/PersonalPage/wallet@2x.png';
import userImg from "@/assets/images/Header/user@2x.png";
import { Backdrop, Box, Modal as MuiModal } from "@mui/material";
import coinbaseImg from '@/assets/images/Header/wallect_connect.png';
import metamaskImg from '@/assets/images/Header/metamask.png';
import wallet_connectImg from '@/assets/images/Header/coinbase.png';
import closeImg from "@/assets/images/Header/ic_modal_close.png";

import useWallet from "@/utils/useWallet";
import styled from 'styled-components';


export default function PlayButton({ }) {
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const ACCOUNT_REG: any = useSelector((state: StoreState) => state.ACCOUNT_REG);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(1)

    const [openMuiModal, setOpenMuiModal] = useState(false);
    const { connect, resetApp } = useWallet();


    const handleGotoGame = (isBind = false) => {
        setModalOpen(false);
        if (isBind) {
            setOpenModal(true);
        } else {
            let token = getToken();
            if (token) {
                window.open("http://omh-game-mlgm.v2.omnihorse.io/mlgm/index?token=" + token)
            } else {
                handleModalType(2)
            }
        }
    }
    const handleModalType = (type) => {
        setModalOpen(false)
        setTimeout(() => {
            setModalType(type)
            setModalOpen(true)
        }, 100);
    }
    const [openModal, setOpenModal] = useState(false);

    const handleOkModal = () => {
        setOpenModal(false)
        setOpenMuiModal(true)

    };
    const handleCancelModal = () => {
        setOpenModal(false)
        handleGotoGame();
    }

    const handleConnected = () => {
        setOpenMuiModal(false)
        if (WALLET_ADDRESS && WALLET_ADDRESS.length > 0) {
            message.warning({
                content: 'Currently, you have logged in to the wallet. Please refresh the page or switch to another wallet to bind the mailbox !',
                duration: 3
            });
        }
    }
    useEffect(() => {
        //console.log('Playbutton ACCOUNT_REG:', ACCOUNT_REG);
        //type: 'reg', modalType: 1 
        if (ACCOUNT_REG && ACCOUNT_REG.type && ACCOUNT_REG.type === 'reg') {
            handleModalType(ACCOUNT_REG.modalType);
        }
    }, [ACCOUNT_REG])

    const BoxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '25.5rem',
        height: '22.88rem',
        borderRadius: '0.63rem 0.63rem 0.63rem 0.63rem',
        border: '0.06rem solid rgba(255,255,255,0.1)'
    };
    return (
        <div>
            {
                modalOpen ? <SignHome modalType={modalType} handleModalType={handleModalType}
                    handleGotoGame={handleGotoGame} /> : null
            }
            <div>
                <button className=' flex justify-center items-center px-8 py-4 text-base text-white' onClick={() => {
                    handleGotoGame()
                }}><img className=' w-6 h-[1.125rem] mr-2' src={ic_game} /> Play Games
                </button>
            </div>
            <Modal
                title="Tips"
                wrapClassName='mg-account-modal'
                zIndex={1310}
                maskClosable={false}
                open={openModal}
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                okText="Connect Wallet"
            >
                <div className='  text-center font-gtwalpm '>
                    <img src={ic_wallet} className='w-16 h-16 mx-auto' />
                    <p className='text-base text-white'>Games account is complete, you can bind with wallet after the
                        wallet is connected. Whether to link the wallet now ?</p>
                </div>
            </Modal>

            <MuiModal
                open={openMuiModal}
                onClose={() => {
                    setOpenMuiModal(false)
                }}
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

                            <img src={closeImg}
                                className={'w-6 h-6 object-center absolute top-0 right-0 m-5 cursor-pointer'}
                                onClick={() => {
                                    setOpenMuiModal(false)
                                }}
                                alt={''} />
                        </div>
                        <div className={'flex flex-col space-y-3'}>
                            <LineBox className={'hover:bg-[#AC77FF99] flex items-center bg-opacity-60 cursor-pointer'}
                                onClick={() => {
                                    connect(1).then(() => {
                                        handleConnected()
                                    })
                                }}>
                                <img src={metamaskImg} className={'w-7 h-7 object-cover ml-6'} />
                                <span className={'ml-4 text-white text-base font-msrb'}>MetaMask</span>
                            </LineBox>
                            <LineBox className={'hover:bg-[#AC77FF99] flex items-center bg-opacity-60 cursor-pointer'}
                                onClick={() => {
                                    connect(2).then(() => {
                                        handleConnected()
                                    })
                                }}>
                                <img src={wallet_connectImg} className={'w-7 h-7 object-cover ml-6'} />
                                <span className={'ml-4 text-white text-base font-msrb'}>Coinbase Wallet</span>
                            </LineBox>
                            <LineBox className={'hover:bg-[#AC77FF99] flex items-center bg-opacity-60 cursor-pointer'}
                                onClick={() => {
                                    connect(3).then(() => {
                                        handleConnected()
                                    })
                                }}>
                                <img src={coinbaseImg} className={'w-7 h-7 object-cover ml-6'} />
                                <span className={'ml-4 text-white text-base font-msrb'}>WalletConnect</span>
                            </LineBox>
                        </div>
                        <div className={'text-[#A5A3A8] text-sm font-gtwal text-center w-[21.44rem] pt-7'}>Connect with
                            your
                            available wallet or create new wallet to join our omnihorse club
                        </div>
                    </div>
                </Box>
            </MuiModal>
        </div>
    )
}
const LineBox = styled.div`
  width: 22.5rem;
  height: 3.63rem;
  background: rgba(211, 183, 255, 0.15);
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
`;
