import React, { useState } from 'react'
import styled from "styled-components";
import AssetsImgs from "./AssetsImgs";
import { Spin, Tabs, } from 'antd';
import { useRequest } from 'ahooks'
import { getClubDetailBenefits } from "@/services/v1/clubsDetail"
import utils from '@/utils/utils'

export default function ClubBenefits({ clubId }) {

  const [social, setSocial] = useState([]);
  const [earn, setEarn] = useState([]);
  const [mtvs, setMtvs] = useState([]);
  const { data, loading } = useRequest(() => getClubDetailBenefits(clubId), {
    onSuccess: (cdata) => {
      if (cdata?.data?.Social) {
        setSocial(cdata.data.Social)
      }
      if (cdata?.data?.Earn) {
        setEarn(cdata.data.Earn)
      }
      if (cdata?.data?.Web3) {
        setMtvs(cdata.data.Web3)
      }
    }
  });
  if (loading) {
    return (<div className=" w-1/1 h-36 flex justify-center items-center ">
      <Spin />
    </div>)
  }
  const tabsItems = [{
    label: <TabLabSocial />, key: 'social', children: <TabChildrenSocial social={social} tabKey='social' />
  }, {
    label: <TabLabEarn />, key: 'earn', children: <TabChildrenSocial social={earn} tabKey='earn' />
  }, { label: <TabLabMetaverse />, key: 'metaverse', children: <TabChildrenSocial social={mtvs} tabKey='metaverse' /> },];

  return (
    <ClubBenStyled>
      {
        earn && earn.length > 0 && social && social.length > 0 ? <>
          <div className=" text-white text-base mt-5 mb-[0.75rem] font-gtwalb">
            Member Benefits
          </div>
          <Tabs defaultActiveKey="social" items={tabsItems} className="mg-bene-tabs" />

        </> : ''
      }
    </ClubBenStyled>
  )
}

const ClubBenStyled = styled.div`
.mg-bene-tabs{
    color: rgba(255, 255, 255, 0.6);
    .ant-tabs-nav {
      ::before {
        border: none;
      }
      .ant-tabs-nav-list{
        width: 100%;
        justify-content: center;
      }
    }
    .ant-tabs-tab + .ant-tabs-tab {
        margin: 0 0 0 1.06rem;
    }
    .ant-tabs-ink-bar {
      display: none;
      width: 0;
    }
    .ant-tabs-tab-active{
      .mg-bene-social {
        background: linear-gradient(146deg, #290E54 0%, #7420F9 100%);
        .circle1 {
            background: linear-gradient(145deg, #8FB1F5FF 0%,#4B559CFF 30%,#70A4FFFF 60%, #495AA1FF 100%);
        }
        .circle2 {
            /* background: linear-gradient(180deg, #2A184E 0%, #0F0823 100%); */
            background: linear-gradient(180deg, #2A1D56 0%, #53229E 100%);
        }
      }
      .mg-bene-earn {
        background: linear-gradient(146deg, #3A0D36 0%, #A42198 100%);
        .circle1 {
            background: linear-gradient(145deg, #B14592FF 0%,#A45071FF 30%,#F7A971FF 60%, #A95669FF 100%);
        }
        .circle2 {
            /* background: linear-gradient(180deg, #5F1659 0%, #150213 100%); */
            background: linear-gradient(0deg, #5F1659 -2.7%, #280523 125.91%);
        }
      }
      .mg-bene-metaverse {
        background: linear-gradient(146deg, #2C1140 0%, #A82ABC 100%);
        .circle1 {
            background: linear-gradient(145deg, #9B63E8FF 0%,#9664BFFF 30%,#F5919CFF 60%, #7B49A8FF 100%);
        }
        .circle2 {
            /* background:linear-gradient(180deg, #643877 0%, #200934 100%); */
            background: linear-gradient(0deg, #643877 0.44%, #200934 113.99%);
        }
      }
    }
  .mg-bene-center {
    /* width: 5.75rem;
    height: 5.75rem; */
    /* background: linear-gradient(146deg, #232327 0%, #2E2E32 100%); */
    background: linear-gradient(146.49deg, #3F2F75 7.79%, #403174 90.19%);
      .circle1 {
        width: 4.48rem;
        height: 4.48rem;
        /* background: linear-gradient(356deg, rgba(46, 46, 52, 1), rgba(123, 123, 123, 1)) ; */
        background: linear-gradient(343.29deg, #5A3DBC 6.96%, #4A3A80 105.82%);
      }
      .circle2 {
        width: 4.42rem;
        height: 4.42rem;
        /* background: linear-gradient(180deg, #1B1B1E 0%, #111112 100%); */
        background: linear-gradient(0deg, #2A1D56, #2A1D56),
linear-gradient(343.29deg, #5A3DBC 6.96%, #4A3A80 105.82%);

      }
    }

  @media screen and (max-width:360px) {
    .mg-bene-box.mg-bene-box-earn{
    ::before,::after{ left: 9.3rem !important;}
    }
    .mg-bene-box.mg-bene-box-metaverse{
      ::before,::after{ left: 16.1rem !important;;}
    }
  }
  @media screen and (min-width:390px) {
    .mg-bene-box.mg-bene-box-earn{
    ::before,::after{ left: 10.2rem  !important;}
    }
    .mg-bene-box.mg-bene-box-metaverse{
      ::before,::after{ left: 17.5rem  !important;}
    }
  }
  @media screen and (min-width:410px) {
    .mg-bene-box{
      ::before,::after{ left: 3.5rem  !important;}
    }
    .mg-bene-box.mg-bene-box-earn{
    ::before,::after{ left: 10.75rem  !important;}
    }
    .mg-bene-box.mg-bene-box-metaverse{
      ::before,::after{ left: 18.25rem  !important;}
    }
  }

  .mg-bene-box.mg-bene-box-earn{
    background: rgba(114, 31, 91, 0.24);
    border: 1px solid #6C3867;
    ::before,::after{ left: 9.75rem;}
    ::before{
      border-bottom-color: #6C3867;
    }
    ::after {
      border-bottom-color: rgb(56, 26, 78);
    }
  }
  .mg-bene-box.mg-bene-box-metaverse{
    background: rgba(107, 21, 126, 0.24);
    border: 1px solid #603178;
    ::before,::after{ left: 17.25rem;}
    ::before{
      border-bottom-color: #603178;
    }
    ::after {
      border-bottom-color: rgb(55, 24, 86);
    }
  }
  .mg-bene-box{
    background: #5C1CC23D;
    border: 1px solid #7837A7;
    border-radius: 0.625rem;
    position: relative;
    ::before,::after{
     position: absolute;
      content: '';
      display: block;
      left: 2.5rem;
      border-color: transparent;
      border-style: solid;
      border-width: 0.625rem;
    }
    ::before{
      top: -1.25rem;
      border-bottom-color: #7837A7;
    }
    ::after {
      top: -1.1875rem;
      border-bottom-color: rgb(52,25,102);
    }
    .mg-bene-item {
      position: relative;
      ::before{
        content:'';
        position: absolute;
        right: 1rem;
        left: 1rem;
        bottom: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);;
      }
        .mg-bene-text-gradient {
          font-size: 0.88rem;
          font-weight: 900;
          line-height: 0.81rem;
          background-image: linear-gradient(63deg, #BE58FF 0%, #6122E8 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
      }
      .mg-bene-text-earn {background-image:linear-gradient(63deg, #D78277 0%, #9B1E91 100%);}
      .mg-bene-text-metaverse {background-image:linear-gradient(63deg, #D06898 0%, #7920A8 100%);}

      .mg-bene-min-h {
        height: 2.1rem;
      }
    }
  }

}
`;

function TabLabSocial() {
  return (
    <div className='mg-bene-center w-[5.75rem] h-[5.75rem] mob-sm:w-[6.25rem] mob-sm:h-[6.25rem] mg-bene-social rounded-full flex justify-center items-center '>
      <div className='circle1 rounded-full flex justify-center items-center'>
        <div className='circle2 rounded-full flex justify-center items-center'>
          <div className='circle3 rounded-full  flex flex-col justify-center items-center '>
            <img className=' w-10 h-10 ' src={AssetsImgs.ic_bene_social} />
            <div className=' text-white text-sm  '>Social</div>
          </div>
        </div>
      </div>
    </div>)
}
function TabLabEarn() {
  return (
    <div className='mg-bene-center w-[5.75rem] h-[5.75rem] mob-sm:w-[6.25rem] mob-sm:h-[6.25rem] mg-bene-earn rounded-full flex justify-center items-center '>
      <div className='circle1 rounded-full flex justify-center items-center'>
        <div className='circle2 rounded-full flex justify-center items-center'>
          <div className='circle3 rounded-full  flex flex-col justify-center items-center '>
            <img className=' w-10 h-10 ' src={AssetsImgs.ic_bene_earn} />
            <div className=' text-white text-sm  '>Earn</div>
          </div>
        </div>
      </div>
    </div>)
}
function TabLabMetaverse() {
  return (
    <div className='mg-bene-center w-[5.75rem] h-[5.75rem] mob-sm:w-[6.25rem] mob-sm:h-[6.25rem] mg-bene-metaverse rounded-full flex justify-center items-center '>
      <div className='circle1 rounded-full flex justify-center items-center'>
        <div className='circle2 rounded-full flex justify-center items-center'>
          <div className='circle3 rounded-full  flex flex-col justify-center items-center '>
            <img className=' w-10 h-10 ' src={AssetsImgs.ic_bene_metaverse} />
            <div className=' text-white text-sm  '>Omniland</div>
          </div>
        </div>
      </div>
    </div>)
}

function TabChildrenSocial({ social, tabKey }) {

  let getAssetsImg = (index_) => {
    let img = AssetsImgs.ic_socials[index_];
    switch (tabKey) {
      case 'earn':
        img = AssetsImgs.ic_earns[index_];
        break;
      case 'metaverse':
        img = AssetsImgs.ic_omnilands[index_];
        break;
      default:
        break;
    }
    return img;
  }
  let getBeneTextClass = () => {
    let cls = ''
    switch (tabKey) {
      case 'earn':
        cls = 'mg-bene-text-earn'
        break;
      case 'metaverse':
        cls = 'mg-bene-text-metaverse'
        break;
      default:
        break;
    }
    return cls;
  }
  let getArrowImg = () => {
    let img = AssetsImgs.ic_arrow
    switch (tabKey) {
      case 'earn':
        img = AssetsImgs.ic_earn_arrow
        break;
      case 'metaverse':
        img = AssetsImgs.ic_omniland_arrow
        break;
      default:
        break;
    }
    return img;
  }
  //    ic_omniland_arrow,
  //ic_earn_arrow,
  return (
    <div className={`mg-bene-box mg-bene-box-${tabKey}`}>  {social?.map((item, index_) => {
      return (
        <div className='mg-bene-item flex justify-start items-center py-[1.275rem]' key={index_}>
          <div className=' w-1/6 pl-2'>
            <img className='w-6 mx-auto ' src={getAssetsImg(index_)} />
          </div>
          <div className=' w-5/6 ml-1'>
            <div className=' flex items-center  '>
              <img className=' w-3 h-3 ' src={getArrowImg()} />
              <div className={` pl-1  text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient ${getBeneTextClass()} `} > {item.title}</div>
            </div>
            <div className=' text-xs w-8/12 pl-4 mt-2 text-ellipsis overflow-hidden  mg-bene-min-h' title={item.sub_title}>
              {utils.formatSubStr(item.sub_title, 80)}
            </div>
          </div>
        </div>)
    })}
    </div>
  )
}
function TabChildrenEarn() {
  return (
    <div>TabChildrenEarn</div>
  )
}

function TabChildrenMetaverse() {
  return (
    <div>tabChildrenMetaverse</div>
  )
}
