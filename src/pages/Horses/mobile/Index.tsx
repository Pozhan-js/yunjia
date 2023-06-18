import styled from 'styled-components';
// import tab1Img from "@/assets/images/ClubsPage/tab1.png";
// import tab2Img from "@/assets/images/ClubsPage/tab2.png";
import React, { useState } from "react";
import themeSetting from "@/config/themeSetting";

import HorseHub from "@/components/widget/HorsesPage/mobile/TabsComPonents/HorseHub/HorseHub";
import topImg from "@/assets/images/HorsesPage/mobile/top_bg.png";
import Footer from "@/components/mobile/widget/Footer";
//import HorsePedia from '@/components/widget/HorsesPage/mobile/TabsComPonents/HorsePedia/HorsePedia';


// const tabs = [
//     {
//         label: 'Horse Hub',
//         img: tab1Img
//     },
//     {
//         label: 'Horsepedia',
//         img: tab2Img
//     },
// ]

export default function Index() {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <Styled style={{ backgroundColor: themeSetting.bgColor }} className={'min-h-screen w-screen font-gtwalp'}>
            <div className=' w-full h-[19.63rem] bg-cover px-5 pt-[4.88rem] '
                style={{ backgroundImage: `url(${topImg})` }}>
                <h2 className=' mg-text-gradient text-[2rem] font-gtwalbpo '>Horse Hub</h2>
                <div className=' mt-1 text-base text-[#ffffffe0] font-gtwal'>Omnihorse is Web 3.0’s premiere
                    asset-backed
                    horse racing ecosystem. Cross the bridge between IRL.
                </div>
            </div>
            <div className={'max-w-full px-5 items-start'}>
                <HorseHub />
            </div>
            {/* <div className={'max-w-full px-5 items-start pt-5'}>
                <div className={'space-x-[3.75rem] flex select-none'}>
                    {tabs.map((item, index) => {
                        return (
                            <div className={'flex flex-col cursor-pointer'} key={index} onClick={() => {
                                setTabIndex(index)
                            }}>
                                <div className={'flex items-center'}>
                                    <img src={item.img}
                                        className={`w-5 h-5 object-center ${tabIndex !== index ? 'opacity-40' : ''}`} />
                                    <span
                                        className={`ml-2 text-white text-base font-gtwalm ${tabIndex !== index ? 'text-opacity-40' : ''}`}>{item.label}</span>
                                </div>
                                <div className={'mt-[0.69rem] line-b'} hidden={tabIndex !== index} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={'line-full-b'}></div>
            <div className={'max-w-full px-5 items-start'}>
                <div className={'mt-3'}>
                    <div hidden={tabIndex !== 0}>
                        <HorseHub />
                    </div>
                    <div hidden={tabIndex !== 1}>
                        <HorsePedia />
                    </div>
                </div>
            </div> */}
            <Footer absolute={false} />
        </Styled>
    )
}
const Styled = styled.div`
  .mg-text-gradient {
    background: linear-gradient(180deg, #BAAFFF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .line-b {
    height: 0.13rem;
    background: #FFFFFF;
    opacity: 1;
  }

  .line-full-b {
    height: 0.06rem;
    background: #FFFFFF;
    opacity: 0.1;
  }
`;
