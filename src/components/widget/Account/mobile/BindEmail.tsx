import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Form, Input, message, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/lib/form/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/button/style/index.css'
import { useRequest } from "ahooks";
import { login, loginbind } from "@/services/v1/account";
import { useWeb3React } from '@web3-react/core'
import { walletSign, useDebounce } from '@/utils/utils'
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/store";
import { updateAccountReg } from "@/store/actions";

export default function BindEmail({ handleModalClose }) {
    const [form] = Form.useForm<{ email: string; pwd: string }>();
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [isMatch, setIsMatch] = useState(true);
    const [matchMsg, setMatchMsg] = useState('Your email and password does not match');
    const { provider } = useWeb3React();
    const { run, loading } = useRequest(loginbind,
        {
            defaultParams: [''],
            manual: true,
            debounceWait: 800,
            onSuccess: (data: any) => {
                console.log('loginbind data:', data)
                if (data.code === 200) {
                    setIsMatch(true)
                    handleModalClose();
                    message.info({
                        content: 'Bind Success !', duration: 2, onClose: () => {
                            window.location.reload()
                        }
                    });
                } else if (data.code === 500 || data.code === 501) {
                    setMatchMsg('Your email and password does not match !');
                    setIsMatch(false)
                }
                else if (data.code === 502) {
                    setMatchMsg('Email binded and not match current address !');
                    setIsMatch(false)
                } else if (data.code === 400) {
                    setMatchMsg('Wrong signature of wallet address !');
                    setIsMatch(false)
                } else {
                    setMatchMsg('Binding failed, please try again !');
                    setIsMatch(false)
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
        if (WALLET_ADDRESS && WALLET_ADDRESS.length > 0 && provider) {
            walletSign(provider, WALLET_ADDRESS, (sign) => {
                run(WALLET_ADDRESS, sign, values.email, values.pwd);
            })
        } else {
            message.warning({
                content: 'Binding failed. Please check the web3 wallet !',
                duration: 2
            });
        }
    };

    const UserPreFix = () => {
        return (
            <div className={'flex items-center'}>
                <UserOutlined className="site-form-item-icon" />
                <div className={'line-v mx-2'} />
            </div>
        )
    }
    const PasswordPreFix = () => {
        return (
            <div className={'flex items-center'}>
                <LockOutlined className="site-form-item-icon" />
                <div className={'line-v mx-2'} />
            </div>
        )
    }


    return (
        <Styped className=' px-14 '>
            <Form name="user-signin" form={form} onFinish={onFinish} validateMessages={validateMessages}
                className='mg-form' requiredMark={false} size="large">
                <Form.Item name={['email']} colon={false} hasFeedback
                    rules={[{ required: true }, { type: 'email' }, () => ({
                        validator(_, value) {
                            setIsMatch(true)
                            return Promise.resolve();
                        },
                    })]}>
                    <Input autoComplete='off' placeholder='Enter email' prefix={<UserPreFix />} />
                </Form.Item>
                <Form.Item name={['pwd']} colon={false} hasFeedback rules={[{ required: true }, () => ({
                    validator(_, value) {
                        setIsMatch(true)
                        return Promise.resolve();
                    },
                })]}>
                    <Input.Password placeholder='Enter Password'
                        prefix={<PasswordPreFix />} />
                </Form.Item>
                <Form.Item>
                    <div className=' h-4 mb-2 -mt-2'>
                        <div hidden={isMatch} className='text-[#ff4d4f]' >{matchMsg}</div>
                    </div>
                    <button type="submit"
                        className=' w-full  h-[2.13rem] text-sm text-white rounded-md bg-[#7000FF] text-center '>
                        Bind
                    </button>
                </Form.Item>
                <Form.Item >
                    <div className=' text-white text-center text-xs flex justify-between items-center -mt-6 '>
                        <div className=' text-white cursor-pointer' onClick={() => {
                            store.dispatch(updateAccountReg({ type: 'reg', modalType: 1 }));
                            handleModalClose();
                        }} >Register</div>
                    </div>
                </Form.Item>
            </Form>

        </Styped>
    )
}

const Styped = styled.div`
  .line-v {
    width: 0.03rem;
    height: 1.13rem;
    opacity: 0.4;
    background-color: #FFF;
  }

  .mg-form {
    .ant-form-item-label > label {
      color: white;
    }

    .ant-input-suffix {
      svg {
        fill: #FFF;
      }
    }

    .ant-input, .ant-input-status-error {
      background-color: #3A2A6AFF !important;
      border: transparent !important;
      font-size: 0.875rem;
      color: #fff;
    }

    .ant-input-affix-wrapper, .ant-input-affix-wrapper-status-error {
      background-color: #3A2A6AFF !important;
      border: transparent !important;
      font-size: 0.875rem;
      border-radius: 0.375rem;
      color: #fff;
    }

    .ant-form-item-feedback-icon {
      display: flex;
    }

    .mg-ant-input {
      border-radius: 0.375rem;
    }
  }
`;
