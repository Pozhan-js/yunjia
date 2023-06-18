import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Input, Col, Row, message } from 'antd';
import 'antd/lib/form/style/index.css'
import 'antd/lib/input/style/index.css'
import { useRequest } from "ahooks";
import { sendVCodeToEmail, registerBind } from "@/services/v1/account";
import { getCookieValue, setCookieValue, removeCookieValue } from '@/utils/utils'
import { useWeb3React } from '@web3-react/core'
import { setToken } from '@/utils/auth';
import { store } from "@/store";
import { updateLoginInfo } from "@/store/actions";


export default function SignUp({ handleModalType, handleGotoGame }) {
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [form] = Form.useForm<{ nickname: string, email: string, pwd: string, vcode: string }>();

    const [countDown, setCountDown] = useState(0)
    const [intervalObj, setIntervalObj] = useState(null)
    useEffect(() => {
        if (countDown === 0 && intervalObj) {
            clearInterval(intervalObj)
            setCountDown(0)
        }
    }, [countDown])
    //const loginInfo = useSelector((state: StoreState) => state.LOGIN_INFO);
    const { run: runSendVCode, loading } = useRequest(sendVCodeToEmail,
        {
            defaultParams: [''],
            manual: true,
            debounceWait: 800,
            onSuccess: (data: any) => {
                console.log('sendVCodeToEmail data:', data)
                if (data.code === 200) {
                    message.success({ content: 'The Email code was sent successfully. Please check the email!', duration: 2 });
                } else {
                    message.warning({ content: 'Email code Failed. Please try again !', duration: 2 });
                    setCountDown(0);
                }
            }
        });
    const { run: runRegisterBind, loading: loadingrb } = useRequest(registerBind,
        {
            defaultParams: [''],
            manual: true,
            debounceWait: 800,
            onSuccess: (data: any) => {
                //console.log('registerBind data:', data)
                if (data.code === 200 && data.data && data.data.token) {
                    message.success({ content: 'Register Success !', duration: 2 });
                    setToken(data.data.token)
                    store.dispatch(updateLoginInfo(data.data));
                    handleGotoGame(true)
                } else if (data.code == 500) {
                    message.warning({ content: 'The Email code was sent Failed, please try again !', duration: 3 });
                } else if (data.code == 501) {
                    message.warning({ content: 'The Email has binded other address!', duration: 3 });
                } else
                    message.warning({ content: 'Register Failed, please try again !', duration: 3 });
            }
        });
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };
    const onFinish = async (values: any) => {
        runRegisterBind(values.nickname, values.email, values.pwd, '', values.vcode, '')
    };

    const sendVCode = async () => {
        if (countDown === 0) {
            let emailVal = form.getFieldValue('email');
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if (regEmail.test(emailVal)) {
                //console.log('sendVCode emailValue:', emailVal)
                runSendVCode(emailVal)
                handleCountDown(60)

            } else {
                form.validateFields()
            }
        }
    }

    const handleCountDown = (count) => {
        let inteObj = setInterval(() => {
            count = count - 1;
            setCountDown(count);
        }, 1000);
        setIntervalObj(inteObj);
    }


    return (
        <Styped className=' px-10 '>
            <Form {...formItemLayout} layout="vertical" name="user-signup" form={form} onFinish={onFinish} validateMessages={validateMessages} className='mg-form' requiredMark={false} size="large" >
                <Form.Item name={['nickname']} label="Nickname" colon={false} hasFeedback rules={[{ required: true }]}>
                    <Input placeholder='Enter nickname' autoComplete='off' />
                </Form.Item>
                <Form.Item name={['pwd']} label="Password" colon={false} hasFeedback rules={[{ required: true },
                () => ({
                    validator(_, value) {
                        const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,18}$/;
                        if (reg.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The password must be 6-18 letters, numbers and special symbols'));
                    },
                })]}>
                    <Input.Password placeholder='Enter Password' />
                </Form.Item>
                <Form.Item
                    label="RePassword"
                    colon={false}
                    hasFeedback
                    name={['pwd2']}
                    dependencies={['password']}
                    rules={[{ required: true, },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('pwd') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password placeholder='Enter Confirm Password' />
                </Form.Item>
                <Form.Item name={['email']} label="Email" colon={false} hasFeedback rules={[{ required: true }, { type: 'email' }]}>
                    <Input placeholder='Enter email' autoComplete='off' />
                </Form.Item>
                <Form.Item name={['vcode']} label="Email Code" colon={false} rules={[{ required: true }]}>
                    <Row gutter={8}>
                        <Col span={15}> <Input placeholder='Enter email code' className='mg-ant-input' autoComplete='off' /></Col>
                        <Col span={9}>
                            <div className=' bg-[#7000FF] text-center w-full h-[2rem] text-sm text-white rounded-md flex justify-center items-center cursor-pointer ' onClick={sendVCode}>
                                {countDown > 0 ? countDown + 's' : 'Get code'}
                            </div>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item label={<>&nbsp;</>} colon={false}>
                    <button type="submit" className=' w-full  h-[2.13rem] text-sm text-white rounded-md bg-[#7000FF] text-center '>
                        Register
                    </button>
                </Form.Item>
                <Form.Item label={null} colon={false}>
                    <div className=' text-white text-center text-xs text-opacity-60' >
                        have account <span className=' underline text-white cursor-pointer' onClick={() => {
                            handleModalType(2)
                        }} >login</span>
                    </div>
                </Form.Item>
            </Form>
        </Styped>
    )
}

const Styped = styled.div`
.mg-form{
    .ant-form-item{
        margin-bottom: 0.5rem;
    }
    .ant-form-item-label > label{
        color: white;
        height: 20px;
    }
    .ant-input-password-icon.anticon{
        color: #fff;
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
    }
    .ant-form-item-feedback-icon{
        display: flex;
    }
    .mg-ant-input{
        border-radius: 0.375rem;
    }
}
@media (max-width: 575px){
    .mg-form{
        .ant-form-item  .ant-form-item-label{
            padding-bottom: 0;
        }
    }
    }
`;


