import styled from 'styled-components';
import assets from "@/components/widget/HomePage/HorsePedia/Assets";
import { useRequest } from "ahooks";
import { getDailyHorsePedia } from "@/services/v1/home";
import titleBgImg from "@/assets/images/title_bg.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import theme from '@/config/themeSetting';

export default function HorsePedia() {
  const navigate = useNavigate();
  const { data } = useRequest(getDailyHorsePedia);
  return (
    <Styled style={{ backgroundImage: `url(${assets.bgImg})`, backgroundColor: theme.bgColor }} id={'horsepedia'} className={'bg-contain z-30 flex flex-col items-center w-full px-6 pb-[3.31rem] shadow-2xl rounded-md'}>
      {/*<img src={assets.titleImg} className={'w-[31.63rem] h-[5.81rem] mt-[8.75rem] object-cover'}/>*/}
      <div className="flex text-[3.03rem] leading-[3.54rem] font-gtwalbpo text-white mt-[8.75rem]">
        <span className={''}>The Daily</span>
        <span className={'ml-2 bg-gradient-title-2'}>Horse Pedia</span>
      </div>
      <img src={titleBgImg} className={'w-[23rem] bg-cover bg-center'} />
      <div className={'mt-[4.38rem] flex'}>
        <img src={data?.data.res_url} className={'w-[28.94rem] h-[20rem] object-cover object-center'} />
        <div className={'flex flex-col items-start'}>
          <p className={'title'}>{data?.data.title?.split(':')[0]}<br /> {data?.data.title?.split(':')[1]}</p>
          <p className={'desc mt-[1.75rem]'}>
            {data?.data.content}
          </p>
          <button
            className={'go-btn  text-white border-white text-base mt-[2.25rem] font-gtwalp'} onClick={() => {
              navigate(`/pedia`)
            }}>
            See More
          </button>
        </div>
      </div>
    </Styled>
  )
}
const Styled = styled.div`
  height: 46.06rem;

  .go-btn {
    width: 14rem;
    height: 2.6rem;
    border-radius: 0.63rem;
    opacity: 1;
    border: 0.06rem solid rgba(185, 185, 185, 0.33);
    //border-image: radial-gradient(circle, rgba(248, 171, 255, 1), rgba(247, 152, 255, 1), rgba(242, 89, 255, 1), rgba(178, 54, 255, 1), rgba(95, 38, 255, 1)) 0.06 0.06;
  }

  .title {
    font-size: 2rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 2.88rem;
    -webkit-background-clip: text;
  }

  .desc {
    width: 37.56rem;
    height: 7.5rem;
    font-size: 1rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5rem;
    -webkit-background-clip: text;
  }
`;
