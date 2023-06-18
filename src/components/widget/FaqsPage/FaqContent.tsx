import styled from "styled-components";
import {useState} from 'react';
import {Collapse} from 'antd';

const {Panel} = Collapse;
import {useRequest} from 'ahooks'
import {CircularProgress} from "@mui/material";
import {getFaqList} from '@/services/v1/faqs'

import top_bgImg from '@/assets/images/FaqsPage/top_bg.png';
import ic_collapse_open from '@/assets/images/FaqsPage/ic_collapse_open.png'
import ic_collapse_close from '@/assets/images/FaqsPage/ic_collapse_close.png'
import theme from '@/config/themeSetting'

export default function FaqContent() {
    return (
        <FaqCStyled
            style={{backgroundColor: theme.faqsPage.bgColor}}
            className={'relative pb-10'}>
            <img src={top_bgImg} className={'object-cover'} alt={''}/>
            {/*<div className={'faqs-text font-gtwalbpo absolute px-9 sm:px-6 md:px-32 top-[10rem]'}>FAQs</div>*/}
            <div className=" mt-9 px-9 sm:px-6 md:px-32 mb-10">
                <FaqCollapse/>
            </div>
        </FaqCStyled>
    )
}

const FaqCStyled = styled.div`


  .faqs-text {
    height: 4.31rem;
    font-size: 3.75rem;
    //font-family: GT Walsheim Pro-Bold Oblique, GT Walsheim Pro;
    font-weight: normal;
    line-height: 4.39rem;
    text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
    background: linear-gradient(180deg, #BAAFFF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .mg-collapse {
    background-color: transparent;
    border: none;
    border-radius: 0;

    .ant-collapse-item {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      .ant-collapse-header {
        color: #fff;
        /* padding-left:0;
        padding-right: 0; */
        padding: 1.25rem 0;
        font-size: 1.31rem;
        line-height: 1.5rem;
      }

      .ant-collapse-content {
        background-color: transparent;
        color: #FFFFFF;
        border-top: none; //1px solid rgba(255,255,255,0.1);
        .ant-collapse-content-box {
          padding: 0 0 1rem 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          line-height: 1.125rem;
        }
      }
    }
  }

  .mg-collapse.ant-collapse-icon-position-end > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    right: 0;
  }
`;


function FaqCollapseIcon({isActive}) {
    return (<>
        <span role="img" aria-label="right" className="anticon anticon-right ant-collapse-arrow right-0">
            <img className=" w-[1.125rem] " src={isActive ? ic_collapse_close : ic_collapse_open}/>
        </span>
    </>)
}

function FaqCollapse() {
    const [faqData, setFaqData] = useState([])
    const {data, loading} = useRequest(() => getFaqList(), {
        onSuccess: (cdata) => {
            if (cdata?.data) {
                setFaqData(cdata.data)
            }
        }, onError: (err) => {
            console.log('FaqContent onError', err);
        }
    });
    if (loading) {
        return (<div className=" w-1/1 h-56 flex justify-center items-center ">
            <CircularProgress/>
        </div>)
    }

    return (
        <>
            {faqData ?
                <Collapse
                    className="mg-collapse"
                    defaultActiveKey={0}
                    expandIconPosition='end'
                    expandIcon={({isActive}) => <FaqCollapseIcon isActive={isActive}/>}>
                    {
                        faqData && faqData.map((item, index_) => {
                            return (
                                <Panel header={item.question} className={'font-gtwalbpo text-white text-[1.5rem]'}
                                       key={index_}>
                                    <div className={'font-gtwalp w-[65%]'}>{item.answer}</div>
                                </Panel>
                            )
                        })
                    }
                </Collapse> : null}
        </>
    )
}
