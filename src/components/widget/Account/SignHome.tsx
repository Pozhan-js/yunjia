import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, Box, Modal } from "@mui/material";
import SignIn from './SignIn';
import SignUp from './SignUp';
import closeImg from '@/assets/images/Header/ic_modal_close.png';
import ForgetPwd from './ForgetPwd';
import BindEmail from './BindEmail';
import { useMount } from "ahooks";

export default function SignHome({ modalType = 1, handleModalType, handleGotoGame }) {
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    let modalTitle = 'Login Games';
    const BoxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '510px',
        //height: '530px',
        borderRadius: '0.63rem',
        border: '0.06rem solid rgba(255,255,255,0.1)'
    };
    // modalType 1 注册； 2 登录；3 找回密码；4 绑定邮箱
    switch (modalType) {
        case 1:
            //BoxStyle.height = '550px';
            modalTitle = 'Register Games';
            break;
        case 2:
            //BoxStyle.height = '355px';
            modalTitle = 'Login Games';
            break;
        case 3:
            //BoxStyle.height = '350px';
            modalTitle = 'Forget Password';
            break;
        case 4:
            //BoxStyle.height = '350px';
            modalTitle = "Bind Email"
            break;
        default:
            break;
    }
    const [modalOpen, setModalOpen] = useState(true);
    const handleModalClose = () => setModalOpen(false);
    const [modalComponent, setModalComponent] = useState(<></>);
    useMount(() => {
        let comp = <></>;
        switch (modalType) {
            case 1:
                comp = <SignUp handleModalType={handleModalType} handleGotoGame={handleGotoGame} />;
                break;
            case 2:
                comp = <SignIn handleModalType={handleModalType} handleGotoGame={handleGotoGame} />;
                break;
            case 3:
                comp = <ForgetPwd handleModalType={handleModalType} />;
                break;
            case 4:
                comp = <BindEmail handleModalClose={handleModalClose} />;
                break;
            default:
                break;
        }
        setModalComponent(comp);
    })
    return (
        <div>
            <Modal
                open={modalOpen}
                // onClose={handleModalClose}
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
                <Box sx={BoxStyle} className={'bg-[#342266]'}>
                    <div className='flex justify-center items-center py-5'>
                        <div className={'text-white text-[1.13rem] px-5  font-ggr font-bold'}>
                            {modalTitle}
                        </div>
                        <img src={closeImg} className={'w-6 h-6 object-center absolute right-0 m-5 cursor-pointer'}
                            onClick={handleModalClose} alt={''} />
                    </div>
                    {modalComponent}
                </Box>
            </Modal>
        </div>
    )
}


