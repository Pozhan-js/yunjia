import styled from 'styled-components';
import tab1Img from "@/assets/images/ClubsPage/tab1.png";
import tab2Img from "@/assets/images/ClubsPage/tab2.png";
import React, { useState } from "react";
import themeSetting from "@/config/themeSetting";
import topImg from "@/assets/images/HorsesPage/top_bg.png";
import HorseHub from "@/components/widget/HorsesPage/TabsComponents/HorseHub/HorseHub";
import HorsePedia from "@/components/widget/HorsesPage/TabsComponents/HorsePedia/HorsePedia";
import Footer from "@/components/widget/Footer/Footer";
import NoticeBar from "@/components/widget/NoticeBar";
import {useSelector} from "react-redux";

const tabs = [
    {
        label: 'Horse Hub',
        img: tab1Img
    },
    {
        label: 'Horsepedia',
        img: tab2Img
    },
]

export default function Index() {
    const [tabIndex, setTabIndex] = useState(0);
    const header_top = useSelector((state: any) => state.HEADER_TOP);
    return (
        <Styled style={{ backgroundColor: themeSetting.bgColor }} className={'min-h-screen font-gtwalp'}>
            <NoticeBar block={false} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                       bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`}/>
            <img src={topImg} className={'w-full min-h-[24rem]'} />
            <div className={'max-w-full px-9 sm:px-6 md:px-32 items-start pt-10'}>
                <HorseHub />
                {/*tabs*/}
                {/* <div className={'space-x-[3.75rem] flex select-none'}>
                    {tabs.map((item, index) => {
                        return (
                            <div className={'flex flex-col cursor-pointer'} key={index} onClick={() => {
                                setTabIndex(index)
                            }}>
                                <div className={'flex items-center'}>
                                    <img src={item.img}
                                        className={`w-5 h-5 object-center ${tabIndex !== index ? 'opacity-40' : ''}`} />
                                    <span className={`ml-2 text-white text-base font-gtwalm ${tabIndex !== index ? 'text-opacity-40' : ''}`}>{item.label}</span>
                                </div>
                                <div className={'mt-[0.69rem] line-b'} hidden={tabIndex !== index} />
                            </div>
                        )
                    })}
                </div>
                <div className={'line-full-b'}></div>
                <div className={'mt-[1.19rem]'}>
                    <div hidden={tabIndex !== 0}>
                        <HorseHub />
                    </div>
                    <div hidden={tabIndex !== 1}>
                        <HorsePedia />
                    </div>
                </div> */}
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
