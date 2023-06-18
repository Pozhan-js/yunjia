import styled from "styled-components";
// import NoticeBar from "@/components/widget/NoticeBar";
import themeSetting from "@/config/themeSetting";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import 'swiper/scss'
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import BannerLeft from "@/components/widget/ClubsPage/mobile/BannerLeft";
import BannerRight from "@/components/widget/ClubsPage/mobile/BannerRight";
import React, { useState } from "react";
import Footer from "@/components/mobile/widget/Footer";
import Clubs from "@/components/widget/ClubsPage/mobile/TabsComponents/Clubs";
import BounsPoolRank from "@/components/widget/ClubsPage/mobile/TabsComponents/BounsPoolRank";
import PowerRank from "@/components/widget/ClubsPage/mobile/TabsComponents/PowerRank";
import RacingMatch from "@/components/widget/ClubsPage/mobile/TabsComponents/RacingMatch";
import { useRequest, useMount } from "ahooks";
import { useLocation } from "react-router-dom";
import { getClubsTop } from "@/services/v1/clubs";
import tab1Img from '@/assets/images/ClubsPage/tab1.png';
import tab2Img from '@/assets/images/ClubsPage/tab2.png';
import tab3Img from '@/assets/images/ClubsPage/tab3.png';
import tab4Img from '@/assets/images/ClubsPage/tab4.png';
import { CircularProgress } from "@mui/material";

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
    /* {
       label: 'Power Rank',
       img: tab4Img
   }*/
]

export default function Index() {
    const [tabIndex, setTabIndex] = useState(0);
    const [topData, setTopData] = useState<any>({});
    const { state } = useLocation();
    const { data, loading } = useRequest(getClubsTop, {
        onSuccess: (data) => {
            setTopData(data.data)
            // console.log('topData', data.data)
        }
    })
    useMount(() => {
        if (state?.tabIndex) {
            setTabIndex(state?.tabIndex);
        }
    })
    return (<Styled style={{ backgroundColor: themeSetting.bgColor }} className={'font-gtwalp  pt-[4.5rem]'}>
        {/* <NoticeBar /> */}
        {loading ? <div className=" w-1/1 h-[10rem]  flex justify-center items-center ">
            <CircularProgress />
        </div> :
            <div className={'w-full  px-3'}>
                <div className={'w-full'}>
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 1000 * 4,
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
                                <SwiperSlide key={index} className="px-2">
                                    <BannerLeft item={item} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className={"w-full"}>
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 1000 * 6,
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
                                <SwiperSlide key={index} className="px-2">
                                    <BannerRight item={item} total={topData?.racing?.length} />
                                </SwiperSlide>
                            )
                        }) : <>
                            <SwiperSlide className="px-2">
                                <BannerRight item={null} total={1} />
                            </SwiperSlide>
                        </>}
                    </Swiper>
                </div>
            </div>
        }
        <div className={'mg-tab mt-12 space-x-[1.5rem] flex px-5 overflow-x-auto'}>
            {tabs.map((item, index) => {
                return (
                    <div className={`flex flex-col cursor-pointer  whitespace-nowrap ${tabs.length === (index + 1) ? ' pr-5' : ''}`} key={index} onClick={() => {
                        setTabIndex(index)
                    }}>
                        <div className={'flex items-center'}>
                            {/* <img src={item.img}
                                className={`w-5 h-5 object-center ${tabIndex !== index ? 'opacity-40' : ''}`} /> */}
                            <span className={' text-white text-base font-gtwalm ' + (tabIndex !== index ? ' text-opacity-60' : '')}>{item.label}</span>
                        </div>
                        <div className={'mt-[0.69rem] line-b'} hidden={tabIndex !== index} />
                    </div>
                )
            })}
        </div>
        <div className={'mt-[0.95rem]'}>
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

        <div className=" h-8"></div>
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
      border-radius: 0.13rem;

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

  .mg-tab{
    &::-webkit-scrollbar {
    display: none;
    }
    border-bottom: 0.06rem solid #FFFFFF1A;
  }

`;
