import styled from "styled-components";
import { Backdrop, Box, Modal } from "@mui/material";
import closeImg from "@/assets/images/Header/ic_modal_close.png";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useRequest, useSetState } from "ahooks";
import { getRacingNotice } from "@/services/v1/home";
import LeftCard from "@/components/widget/HomePage/RacingMatch/LeftCard";
import RightCard from "@/components/widget/HomePage/RacingMatch/RightCard";
import { getCookieValue, setCookieValue, removeCookieValue } from '@/utils/utils'
import { useMount } from "ahooks";

const TypeContent = ({ data, type }) => {
    if (type == 1) {
        return (
            <>
                <LeftCard list={data?.coming} height={''} />
                <RightCard list={data?.ended} height={''} />
            </>
        )
    } else if (type == 2) {
        return (
            <LeftCard list={data?.coming} height={''} showTitle={false} />
        )
    } else if (type == 3) {
        return (
            <RightCard list={data?.ended} height={''} showTitle={false} />
        )
    }
}

function NoticeModal() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({ coming: [], ended: {} });
    const [state, setState] = useState({ type: 0, title: '', show: false });
    const [BoxStyle, setBoxStyle] = useSetState({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '38.31rem',
        minWidth: '32.5rem'
    });
    // useRequest(getRacingNotice, {
    //     onSuccess: (tdata) => {
    //         setData(tdata?.data);
    //         if (tdata?.data.coming.length > 0 && tdata?.data.ended.length > 0) {
    //             // setShow(true);
    //             setState({ type: 1, title: 'Notice', show: true });
    //         } else if (tdata?.data.coming.length > 0) {
    //             setState({ type: 2, title: 'Racing Match', show: true });
    //         } else if (tdata?.data.ended.length > 0) {
    //             setState({ type: 3, title: 'Racing Result', show: true });
    //         }
    //     }
    // })
    const { run, loading } = useRequest(getRacingNotice,
        {
            defaultParams: [''],
            manual: true,
            onSuccess: (tdata) => {
                setData(tdata?.data);
                handleNoticeHidden(tdata);
                if (tdata?.data.coming.length > 0 && tdata?.data.ended.length > 0) {
                    // setShow(true);
                    setState({ type: 1, title: 'Notice', show: true });
                } else if (tdata?.data.coming.length > 0) {
                    setState({ type: 2, title: 'Racing Match', show: true });
                } else if (tdata?.data.ended.length > 0) {
                    setState({ type: 3, title: 'Racing Result', show: true });
                }
            }
        });

    let noticeHiddenKey = '_racing_notice_hidden';
    useMount(() => {
        let noticeHidden = getCookieValue(noticeHiddenKey);
        if (!noticeHidden || noticeHidden != '1') {
            run()
        }
    });
    const handleNoticeHidden = (tdata) => {
        let endDate = new Date();
        if (tdata?.data.coming.length > 0) {
            endDate = new Date(tdata?.data.coming[0].enddate);
        } else if (tdata?.data.ended.length > 0) {
            endDate = new Date(tdata?.data.ended[0].enddate);
        }
        let now = new Date();
        if (endDate.getTime() > now.getTime()) {
            let times = (endDate.getTime() - now.getTime()) / (1000 * 60)
            setCookieValue(noticeHiddenKey, '1', times);
        }
    }
    const handleClose = () => {
        // setShow(false);
        setState({ type: 0, title: '', show: false });
    }
    return (
        <Modal
            className={''}
            open={state?.show}
            onClose={handleClose}
            components={{
                Backdrop: Backdrop,

            }}
            componentsProps={{
                // @ts-ignore
                backdrop: { timeout: 500 }
            }}
        >
            <BoxE sx={BoxStyle} className={'bg-[#35246F] relative flex flex-col items-center'}>
                <div className={'text-white text-[1.13rem] px-5 mt-5 font-ggr font-bold'}>
                    {state?.title}
                </div>
                <img src={closeImg} className={'w-6 h-6 object-center absolute right-0 m-5 cursor-pointer'}
                    onClick={handleClose} alt={''} />
                <div className={'overflow-y-auto w-full gray-scroll mb-4'}>
                    <TypeContent data={data} type={state?.type} />
                </div>
            </BoxE>
        </Modal>
    )
}

const BoxE = styled(Box)`
  border-radius: 0.63rem;
  border: 0.06rem solid rgba(255, 255, 255, 0.1);

  .gray-scroll {
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0.25rem; /*高宽分别对应横竖滚动条的尺寸*/
      height: 0.25rem;
    }

    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #57468F;
    }

    ::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      //box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      //background: #ededed;
    }
  }

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
export default NoticeModal;
