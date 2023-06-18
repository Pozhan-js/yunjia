import styled from "styled-components";
import rightArrowImg from "@/assets/images/HorseHubPage/right_arrow.png";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Autoplay, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import NftCard from "@/components/widget/HomePage/BestHorses/NftCard";
import 'swiper/scss'
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import LeftCard from "@/components/widget/HomePage/RacingMatch/LeftCard";
import RightCard from "@/components/widget/HomePage/RacingMatch/RightCard";
import {useRequest} from "ahooks";
import {getRacing} from "@/services/v1/home";
import _ from "lodash";

export default function RacingMatch() {
    const navigate = useNavigate();
    const [leftList, setLeftList] = useState([]);
    const [rightList, setRightList] = useState([]);
    useRequest(getRacing, {
        onSuccess: (tdata) => {
            // console.log(tdata?.data);
            // console.log(_.chunk(tdata?.data?.coming, 3))
            setLeftList(_.chunk(tdata?.data?.coming, 3));
            setRightList(_.chunk(tdata?.data?.ended, 3));
        }
    })
    return (
        <Styled className={'w-full mx-auto px-9 sm:px-6 md:px-32 pb-[5.81rem]'}>
            <div className={'flex justify-between items-end'}>
                <p className={'bg-clip-text text-opacity-70 text-white text text-[2.25rem] font-gtwalmpo font-normal'}>Racing
                    Match</p>
                <span className={'text-white text-base font-gtwalmp flex items-center cursor-pointer'}
                      onClick={() => {
                          navigate('/clubs', {
                              state: {
                                  tabIndex: 1
                              }
                          });
                      }}>more<img src={rightArrowImg}
                                  className={'w-4 h-4 ml-[0.19rem]'}
                                  alt={''}/></span>
            </div>
            <div className={'mt-3 flex justify-between'}>
                <div className={'w-[42rem]'}>
                    <Swiper
                        className={''}
                        loop={true}
                        autoplay={{
                            delay: 1000 * 10,
                        }}
                        enabled={leftList.length > 1}
                        setWrapperSize={true}
                        // direction={'vertical'}
                        autoHeight={true}
                        modules={[Pagination, Autoplay]}
                        pagination={{
                            bulletClass: 'swiper-pagination-bullet zlz',
                            bulletActiveClass: 'swiper-pagination-bullet-active zlz-active',
                            clickable: true,
                        }}
                    >
                        {leftList.map((item: any, index: number) => {
                            return (
                                <SwiperSlide key={index}>
                                    <LeftCard list={item}/>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className={'w-[42rem]'}>
                    <Swiper
                        className={''}
                        loop={true}
                        autoplay={{
                            delay: 1000 * 10,
                        }}
                        enabled={rightList.length > 1}
                        setWrapperSize={true}
                        // direction={'vertical'}
                        autoHeight={true}
                        modules={[Pagination, Autoplay]}
                        pagination={{
                            bulletClass: 'swiper-pagination-bullet zlz',
                            bulletActiveClass: 'swiper-pagination-bullet-active zlz-active',
                            clickable: true,
                        }}
                    >
                        {rightList.map((item: any, index: number) => {
                            return (
                                <SwiperSlide key={index}>
                                    <RightCard list={item}/>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>

            </div>
        </Styled>
    )
}
const Styled = styled.div`
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
      width: 2.82rem;
      height: 0.25rem;
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
