import styled from 'styled-components';
import React, { useState } from "react";
import themeSetting from "@/config/themeSetting";
import topImg from "@/assets/images/HorsePediaPage/top_bg.png";
import HorsePedia from "@/components/widget/HorsesPage/TabsComponents/HorsePedia/HorsePedia";
import Footer from "@/components/widget/Footer/Footer";
import NoticeBar from "@/components/widget/NoticeBar";
import {useSelector} from "react-redux";

export default function Index() {
    const header_top = useSelector((state: any) => state.HEADER_TOP);
    return (
        <Styled style={{ backgroundColor: themeSetting.bgColor }} className={'min-h-screen font-gtwalp'}>
            {/* <img src={topImg} className={'w-full min-h-[24rem]'} /> */}
            <NoticeBar block={false} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                       bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`}/>
            <div className=' w-full min-h-[24rem] bg-cover px-9 sm:px-6 md:px-32 pt-[6.88rem] '
                style={{ backgroundImage: `url(${topImg})` }}>
                <h2 className=' mg-text-gradient text-[3.75rem] font-gtwalbpo text-white '>Horsepedia</h2>
                <div className=' mt-1 text-base text-[#ffffffe0] font-gtwal max-w-xl'>The horse is a herbivorous domestic animal, a subspecies of the wild horse, widely distributed throughout the world. There are currently approximately 58 million horses in the world, representing a total of 905 breeds. More horse knowledge is in Horsepedia...
                </div>
            </div>
            <div className={'max-w-full px-9 sm:px-6 md:px-32 items-start pt-10'}>
                <HorsePedia />
            </div>
            <Footer absolute={false} />
        </Styled>
    )
}
const Styled = styled.div`
  .line-b {
    height: 0.13rem;
    background: #FFFFFF;
    opacity: 1;
  }
  .line-full-b{
    height: 0.06rem;
    background:#FFFFFF;
    opacity: 0.1;
  }
`;
