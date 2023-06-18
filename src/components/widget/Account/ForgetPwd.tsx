
import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { Form, Input, Col, Row, message } from 'antd';
import 'antd/lib/form/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/button/style/index.css'
import { useRequest } from "ahooks";
import { sendVCodeToEmailForgotpwd, retrievePwdToEmail, checkAccountEmail } from "@/services/v1/account";

export default function ForgetPwd({ handleModalType }) {
    const [form] = Form.useForm<{ email: string; pwd: string, vcode: string }>();

    const [countDown, setCountDown] = useState(0)
    const [intervalObj, setIntervalObj] = useState(null)
    useEffect(() => {
        if (countDown === 0 && intervalObj) {
            clearInterval(intervalObj)
            setCountDown(0)
        }
    }, [countDown])
    const { run: runSendVCode } = useRequest(sendVCodeToEmailForgotpwd,
        {
            defaultParams: [''],
            manual: true,
            debounceWait: 800,
            onSuccess: (data: any) => {
                console.log('sendVCodeToEmailForgotpwd data:', data)
                if (data.code === 200) {
                    message.success({ content: 'The Email code was sent successfully. Please check the email!', duration: 2 });
                } else {
                    message.warning({ content: 'Email code Failed. Please try again !', duration: 2 });
                    setCountDown(0)
                }
            }
        });
    const { run: runRetToEmail, loading: loadingrb } = useRequest(retrievePwdToEmail,
        {
            defaultParams: [''],
            manual: true,
            debounceWait: 800,
            onSuccess: (data: any) => {
                console.log('retrievePwdToEmail data:', data)
                if (data.code === 200) {
                    let emailVal = form.getFieldValue('email');
                    message.success({ content: 'Submit success, Please check your email [' + emailVal + '] !', duration: 2 });
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 2000);
                } else
                    message.warning({ content: 'Submit Failed, please try again !', duration: 2 });
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
    const onFinish = (values: any) => {
        console.log('Success:', values);
        let forgotpwdHost = window.location.protocol + '//' + window.location.host + '/account/reset_password';
        runRetToEmail(values.vcode, values.email, forgotpwdHost)
    };

    const sendVCode = () => {
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
    const handleCountDown = (count) => {
        let inteObj = setInterval(() => {
            count = count - 1;
            setCountDown(count);
        }, 1000);
        setIntervalObj(inteObj);
    }

    return (
        <Styped className=' px-10 '>
            <Form {...formItemLayout} name="user-forgetpwd" form={form} onFinish={onFinish} validateMessages={validateMessages} className='mg-form' requiredMark={false} size="large">
                <Form.Item name={['email']} label="Email" colon={false} hasFeedback rules={[{ required: true }, { type: 'email' }]}>
                    <Input placeholder='Enter email' autoComplete='off' />
                </Form.Item>
                <Form.Item name={['vcode']} label="Email code" colon={false} hasFeedback rules={[{ required: true }]}>
                    <Row gutter={8}>
                        <Col span={15}> <Input placeholder='Enter email code' className='mg-ant-input' autoComplete='off' /></Col>
                        <Col span={9}>
                            <button className={`${countDown>0? 'bg-[#7000FFB2]':'bg-[#7000FF]'} text-center w-full h-[2.13rem] text-sm text-white rounded-md `} onClick={sendVCode} disabled={countDown !== 0}>
                                {countDown > 0 ? countDown + 's' : 'Get code'}
                            </button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item label={<>&nbsp;</>} colon={false}>
                    <button type="submit" className=' w-full  h-[2.13rem] text-sm text-white rounded-md bg-[#7000FF] text-center '>
                        Submit
                    </button>
                </Form.Item>
                <Form.Item label={<>&nbsp;</>} colon={false}>
                    <div className=' text-white text-center text-xs text-opacity-60'>
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
    }
    .ant-form-item-feedback-icon{
        display: flex;
    }
    .mg-ant-input{
        border-radius: 0.375rem;
    }
}
`;




