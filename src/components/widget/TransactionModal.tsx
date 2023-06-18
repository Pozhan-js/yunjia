import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import loadingGif from '@/assets/images/loading.gif';
import rightImg from '@/assets/images/right@2x.png';
import errorImg from '@/assets/images/error@2x.png';
import {isFunction} from "lodash";
import {useUpdateEffect, useSetState} from "ahooks";
import styled from "styled-components";
import {Backdrop, Box, Modal} from "@mui/material";
//import closeImg from '@/assets/images/close@2x.png';
import closeImg from '@/assets/images/Header/ic_modal_close.png';
import {useNavigate} from "react-router-dom";

function TransactionModal(props, ref) {
    const [show, setShow] = useState(false);
    const [type, setType] = useState(0);  // 0 确认交易中 1 交易成功 2 购买NFT交易成功 -1交易失败  999 自定义类型
    const [content, setContent] = useState('');
    const [footer, setFooter] = useState('');
    const [options, setOptions] = useState<any>({});
    const navigate = useNavigate();
    const [BoxStyle, setBoxStyle] = useSetState({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '20rem',
        width: '25rem'
    });

    const handleClose = () => {
        setType(0);
        setShow(false);
    }

    const showModal = ({type: type_, text: content_ = '', footer: footer_, style: style_ = {}}) => {
        // console.log(style_)
        setBoxStyle(style_);
        setType(type_);
        setContent(content_);
        setFooter(footer_);
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
    }

    useUpdateEffect(() => {
        if (!show) {
            if (isFunction(props?.closeCallBack)) {
                props?.closeCallBack();
            }
        }
    }, [show]);

    useImperativeHandle(ref, () => ({
        showModal, hideModal, setOptions, setStyle: setBoxStyle
    }));

    useEffect(() => {
        switch (type) {
            case 0:
                setOptions({
                    title: 'Confirm transaction', content: (<div className='text-center'>
                        <img className=' w-14 h-14 mx-auto mt-10' src={loadingGif}/>
                        <div className=' mt-14 text-white text-base font-gtwal'>Waiting for confirmation</div>
                        <div className=' mt-3 text-white text-opacity-40 text-sm pb-10'>
                            Please confirm this transaction in your wallet
                        </div>
                    </div>),
                })
                break;
            case 1:
                setOptions({
                    title: 'Transaction',
                    content: (<div className='text-center'>
                        <img className=' w-[4.88rem] h-[4.88rem] mx-auto mt-10' src={rightImg}/>
                        <div className=' mt-5 text-white text-base font-gtwal pb-5'>
                            {content ? content : 'Confirmed'}
                        </div>
                    </div>),
                    footer: <>
                        {footer ? footer : (
                            <button className={'close-btn text-white text-base'} onClick={handleClose}>Close</button>)}
                    </>
                })
                break;
            case 2:
                setOptions({
                    title: 'Transaction',
                    content: (<div className='text-center'>
                        <img className=' w-[4.88rem] h-[4.88rem] mx-auto mt-10' src={rightImg}/>
                        <div className=' mt-5 text-white text-base font-gtwal pb-5'>
                            {content ? content : 'Confirmed'}
                        </div>
                    </div>),
                    footer: (
                        <button className={'close-btn text-white text-base'} onClick={() => navigate('/personal')}>Check
                            Now</button>)
                });
                break;
            case -1:
                setOptions({
                    title: 'Transaction',
                    content: (<div className='text-center'>
                        <img className=' w-[4.88rem] h-[4.88rem] mx-auto mt-10' src={errorImg}/>
                        <div className=' mt-5 text-white text-base font-gtwal pb-5'>
                            {content ? content : 'Failed'}
                        </div>
                    </div>),
                    footer: (<button className={'close-btn text-white text-base'} onClick={handleClose}>Close</button>)
                })
                break;

        }
    }, [type])

    return (<Modal
        className={'bg-transparent'}
        open={show}
        onClose={handleClose}
        components={{
            Backdrop: Backdrop,

        }}

        componentsProps={{
            // @ts-ignore
            backdrop: {timeout: 500}
        }}
    >
        <BoxE sx={BoxStyle} className={'backdrop-blur-[2rem] relative flex flex-col items-center'}>
            <div className={'text-white text-[1.13rem] px-5 mt-5 font-ggr font-bold'}>
                {options?.title}
            </div>
            <img src={closeImg} className={'w-6 h-6 object-center absolute right-0 m-5 cursor-pointer'}
                 onClick={handleClose} alt={''}/>
            {options?.content}
            {options?.footer}
        </BoxE>
    </Modal>)
}


const BoxE = styled(Box)`
  border-radius: 0.63rem;
  border: 0.06rem solid rgba(255, 255, 255, 0.1);

  .check-now-btn {
    width: 10rem;
    height: 2.5rem;
    background: #4CAD6D;
    border-radius: 1.38rem 1.38rem 1.38rem 1.38rem;
    opacity: 1;
  }

  .close-btn {
    width: 10rem;
    height: 2.5rem;
    background: #6F19F7;
    border-radius: 1.38rem 1.38rem 1.38rem 1.38rem;
    opacity: 1;
  }
`;
export default forwardRef(TransactionModal)
