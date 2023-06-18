import styled from "styled-components";
import NoticeBar from "@/components/widget/NoticeBar";
import themeSetting from "@/config/themeSetting";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/scss'
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import BannerLeft from "@/components/widget/ClubsPage/BannerLeft";
import BannerRight from "@/components/widget/ClubsPage/BannerRight";
import React, { useState } from "react";
import Footer from "@/components/widget/Footer/Footer";
import Clubs from "@/components/widget/ClubsPage/TabsComponents/Clubs";
import BounsPoolRank from "@/components/widget/ClubsPage/TabsComponents/BounsPoolRank";
import PowerRank from "@/components/widget/ClubsPage/TabsComponents/PowerRank";
import RacingMatch from "@/components/widget/ClubsPage/TabsComponents/RacingMatch";
import { useMount, useRequest } from "ahooks";
import { getClubsTop } from "@/services/v1/clubs";
import tab1Img from '@/assets/images/ClubsPage/tab1.png';
import tab2Img from '@/assets/images/ClubsPage/tab2.png';
import tab3Img from '@/assets/images/ClubsPage/tab3.png';
import tab4Img from '@/assets/images/ClubsPage/tab4.png';
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const tabs = [
    {
        label: 'Clubs',
        img: tab1Img
    },
    {
        label: 'Racing Match',
        img: tab2Img
    },
    {
        label: 'Prize Rank',
        img: tab3Img
    },
    /*  {
         label: 'Power Rank',
         img: tab4Img
     }*/
]

export default function Index() {
    const [tabIndex, setTabIndex] = useState(0);
    const [topData, setTopData] = useState<any>({});
    const header_top = useSelector((state: any) => state.HEADER_TOP);
    const { state } = useLocation();
    const { loading } = useRequest(getClubsTop, {
        onSuccess: (data) => {
            setTopData(data.data)
        }
    })
    useMount(() => {
        if (state?.tabIndex) {
            setTabIndex(state?.tabIndex);
        }
    })
    return (<Styled style={{ backgroundColor: themeSetting.bgColor }} className={'min-h-screen font-gtwalp'}>
        <NoticeBar block={true} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
            bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`} />
        <div className={'w-full mx-auto px-9 sm:px-6 md:px-32 pt-6 flex flex-col mb-8'}>
            {loading ? <div className=" w-1/1 h-[20rem] flex justify-center items-center ">
                <CircularProgress />
            </div> : <div className={'flex'}>
                <div className={'w-[58.33rem]'}>
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 1000 * 10,
                        }}
                        setWrapperSize={true}
                        // direction={'vertical'}
                        enabled={topData?.banner?.length > 1}
                        modules={[Pagination, Autoplay]}
                        pagination={{
                            bulletClass: 'swiper-pagination-bullet zlz',
                            bulletActiveClass: 'swiper-pagination-bullet-active zlz-active',
                            clickable: true,
                        }}
                    >
                        {topData?.banner?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <BannerLeft item={item} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className={"ml-auto w-[25rem]"}>
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 1000 * 10,
                        }}
                        setWrapperSize={true}
                        // direction={'vertical'}
                        enabled={topData?.racing?.length > 1}
                        modules={[Pagination, Autoplay]}
                        pagination={{
                            bulletClass: 'swiper-pagination-bullet zlz',
                            bulletActiveClass: 'swiper-pagination-bullet-active zlz-active',
                            clickable: true,
                        }}
                    >
                        {topData?.racing?.length > 0 ? topData?.racing?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <BannerRight item={item} total={topData?.racing?.length} />
                                </SwiperSlide>
                            )
                        }) : <>
                            <SwiperSlide>
                                <BannerRight item={null} total={1} />
                            </SwiperSlide>
                        </>}
                    </Swiper>
                </div>
            </div>
            }

            {/*tabs*/}
            <div className={'mt-12 space-x-[3.75rem] flex select-none'}>
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

            <div className={'mt-[1.2rem]'}>
                <div hidden={tabIndex !== 0}>
                    <Clubs />
                </div>
                <div hidden={tabIndex !== 1}>
                    <RacingMatch />
                </div>
                <div hidden={tabIndex !== 2}>
                    <BounsPoolRank />
                </div>
                {/*<div hidden={tabIndex !== 3}>*/}
                {/*    <PowerRank />*/}
                {/*</div>*/}
            </div>
        </div>
        <Footer absolute={false} />
    </Styled>)

}
const Styled = styled.div`
  .line-b {
    height: 0.13rem;
    background: #FFFFFF;
    opacity: 1;
  }

  .swiper {
    height: 100%;
    flex: 1;

    .progress-item {
      width: 100%;
      height: 100%;

      .pic, .img {
        width: 100%;
        height: 100%;
      }
    }

    .white {
      color: #fff;
    }

    .zlz {
      width: 2.35rem;
      height: 0.19rem;
      border-radius: 0.13rem 0.13rem 0.13rem 0.13rem;

      &.swiper-pagination-bullet {
        background: rgba(255, 255, 255, 0.8);
      }

      &.swiper-pagination-bullet-active {
        background: rgba(255, 255, 255, 1);
      }
    }

    .swiper-button-prev, .swiper-button-next {
      position: absolute;
      top: 50%;
      width: 50px;
      height: 50px;
      background: red;

      &::after {
        display: none;
      }

      &.disable {
        background: royalblue;
      }
    }
  }

`;

