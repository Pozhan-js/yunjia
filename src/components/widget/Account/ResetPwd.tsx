import React, { useState } from 'react';
import styled from "styled-components";

import { Form, Input, message } from 'antd';
import 'antd/lib/form/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/button/style/index.css'
import { useRequest } from "ahooks";
import { resetPassword } from "@/services/v1/account";

export default function ResetPwd({ resetCode }) {
    const [form] = Form.useForm<{ pwd: string }>();

    const { run: runResetpwd } = useRequest(resetPassword,
        {
            defaultParams: [''],
            manual: true,
            debounceWait: 800,
            onSuccess: (data: any) => {
                console.log('resetPassword data:', data)
                if (data.code === 200) {
                    message.success({ content: 'Reset success !', duration: 2 });
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 2000);
                } else
                    message.warning({ content: 'Reset Failed, please try again !', duration: 2 });
            }
        });
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };
    const onFinish = (values: any) => {
        console.log('Success:', values, "resetCode:", resetCode);
        runResetpwd(resetCode, values.pwd)
        //window.location.href = '/';
    };

    return (
        <Styped className=' w-2/6 mx-auto'>
            <div className=' text-white text-center my-5 text-lg'>Set new password</div>
            <Form {...formItemLayout} name="user-resetpwd" form={form} onFinish={onFinish} validateMessages={validateMessages} className='mg-form' requiredMark={false} size="large">
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
                    <Input.Password placeholder='Enter  Password' />
                </Form.Item>
                <Form.Item
                    label="RePassword"
                    name={['pwd2']}
                    dependencies={['password']} colon={false} hasFeedback
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
                <Form.Item label={<>&nbsp;</>} colon={false}>
                    <button type="submit" className=' w-full  h-[2.13rem] text-sm text-white rounded-md bg-[#7000FF] text-center '>
                        Reset
                    </button>
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
