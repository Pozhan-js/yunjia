
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Form, Input, message, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/lib/form/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/button/style/index.css'
import { useRequest } from "ahooks";
import { login } from "@/services/v1/account";
import { setToken } from '@/utils/auth';
import { store } from "@/store";
import { useSelector } from "react-redux";
import { updateLoginInfo } from "@/store/actions";
import useWallet from "@/utils/useWallet";


export default function SignIn({ handleModalType, handleGotoGame }) {
    const [form] = Form.useForm<{ email: string; pwd: string }>();
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [isMatch, setIsMatch] = useState(true);
    const { outWallet } = useWallet();

    const { run, loading } = useRequest(login,
        {
            defaultParams: [''],
            manual: true,
            debounceWait: 800,
            onSuccess: (data: any) => {
                //console.log('login data:', data)
                if (data.code === 200 && data.data && data.data.token) {
                    setToken(data.data.token)
                    store.dispatch(updateLoginInfo(data.data));
                    let loginAddress = data.data.address || '';
                    let wallet_addr = WALLET_ADDRESS || '';
                    if (loginAddress.length <= 0) {
                        handleGotoGame(true)
                        // if (wallet_addr.length <= 0) {
                        //     handleGotoGame(true)
                        // } else {
                        //     console.log('outWallet 111 data:', data, 'WALLET_ADDRESS:', WALLET_ADDRESS)
                        //     message.warning({
                        //         content: 'The currently logged in wallet is not bound to the game account and will exit the current wallet !',
                        //         duration: 3, onClose: () => {
                        //             handleGotoGame()
                        //             outWallet();
                        //         }
                        //     });
                        // }
                    } else {
                        if (wallet_addr.length > 0 && loginAddress != wallet_addr) {
                            console.log('outWallet 222 data:', data, 'WALLET_ADDRESS:', WALLET_ADDRESS)
                            message.warning({
                                content: 'The currently logged in wallet is not bound to the game account and will exit the current wallet !',
                                duration: 3, onClose: () => {
                                    handleGotoGame()
                                    outWallet();
                                }
                            });
                        } else
                            handleGotoGame()
                    }
                } else {
                    setIsMatch(false)
                    message.warning({
                        content: 'Your email and password does not match. Please try again !',
                        duration: 2
                    });
                }
            }
        });

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };
    const onFinish = (values: any) => {
        run(values.email, values.pwd);
    };


    const [openModal, setOpenmodal] = useState(false);

    const handleShowModal = () => {
        setOpenmodal(true);
    };

    const handleHideModal = () => {
        setOpenmodal(false);
    };

    return (
        <Styped className=' px-14 '>
            <Form name="user-signin" form={form} onFinish={onFinish} validateMessages={validateMessages} className='mg-form' requiredMark={false} size="large">
                <Form.Item name={['email']} colon={false} hasFeedback rules={[{ required: true }, { type: 'email' }, () => ({
                    validator(_, value) {
                        setIsMatch(true)
                        return Promise.resolve();
                    },
                })]}>
                    <Input autoComplete='off' placeholder='Enter email' prefix={<UserOutlined className="site-form-item-icon" />} />
                </Form.Item>
                <Form.Item name={['pwd']} colon={false} hasFeedback rules={[{ required: true }, () => ({
                    validator(_, value) {
                        setIsMatch(true)
                        return Promise.resolve();
                    },
                })]}>
                    <Input.Password placeholder='Enter Password' prefix={<LockOutlined className="site-form-item-icon" />} />
                </Form.Item>
                <Form.Item  >
                    <div className=' h-4 mb-2 -mt-2'>
                        <div className='text-[#ff4d4f]' hidden={isMatch} >Your email and password does not match</div>
                    </div>
                    <button type="submit" className=' w-full  h-[2.13rem] text-sm text-white rounded-md bg-[#7000FF] text-center '>
                        Login
                    </button>
                </Form.Item>
                <Form.Item >
                    <div className=' text-white text-center text-xs flex justify-between items-center '>
                        <div className=' text-white cursor-pointer' onClick={() => {
                            handleModalType(1)
                        }} >Register</div> <div className=' text-white cursor-pointer' onClick={() => {
                            handleModalType(3)
                        }} >Forget password?</div>
                    </div>
                </Form.Item>
            </Form>

            <Modal
                title="Modal"
                open={openModal}
                onOk={handleHideModal}
                onCancel={handleHideModal}
                okText="Confirm"
                cancelText="Cancel"
            >
                <p>Whether to bind this mailbox to the current wallet?</p>
            </Modal>
        </Styped>
    )
}

const Styped = styled.div`
.mg-form{
    .ant-form-item{
        margin-bottom: 0.6rem;
    }
    .ant-form-item-label > label{
        color: white;
    }
    .ant-input,.ant-input-status-error{
        background-color: #3A2A6AFF !important;
        border: transparent  !important;
        font-size: 0.875rem;
        color: #fff;
    }
    .ant-input-affix-wrapper,.ant-input-affix-wrapper-status-error{
        background-color: #3A2A6AFF  !important;
        border: transparent  !important;
        font-size: 0.875rem;
        border-radius: 0.375rem;
        color: #fff;
    }
    .ant-form-item-feedback-icon{
        display: flex;
    }
    .mg-ant-input{
        border-radius: 0.375rem;
    }
}
`;