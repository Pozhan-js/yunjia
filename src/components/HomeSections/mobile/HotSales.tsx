import styled from 'styled-components';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper";
import NftCard from "@/components/widget/HomePage/HotSales/mobile/NftCard";
import bgImg from "@/assets/images/HomePage/HotSales/mobile/bg.png";
import 'swiper/scss'
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import Advertisement from "@/components/widget/HomePage/HotSales/mobile/Advertisement";
import titleBgImg from "@/assets/images/title_bg.png";
import rightArrowImg from "@/assets/images/HomePage/HotSales/right_arrow.png";
import {useNavigate} from "react-router-dom";


export default function HotSales({hotData, rightNews}) {
    const navigate = useNavigate();
    return (
        <HotSalesStyled>
            <div
                style={{backgroundImage: `url(${bgImg})`}}
                className={'w-full flex relative bg-cover bg-center'}>
                <div className={'flex flex-col items-center w-full'}>
                    {/*<img src={hot_saleImg} className={'mt-[2.94rem] mb-[1.5rem] w-[13.62rem] h-[3.44rem]'}/>*/}
                    <div className="mt-[2.94rem] flex text-[1.75rem] font-gtwalbpo text-white">
                        <span className={'bg-gradient-title-1'}>Hot</span>
                        <span className={'ml-2'}>Sales</span>
                    </div>
                    <img src={titleBgImg} className={'w-[13.62rem] bg-cover bg-center'}/>
                    <div className={'flex flex-row mt-4'}>
                        {hotData && <Swiper
                            className={'w-[95vw]'}
                            loop={true}
                            autoplay={{
                                delay: 1000 * 10,
                            }}
                            setWrapperSize={true}
                            // direction={'vertical'}
                            enabled={hotData?.length > 1}
                            modules={[Pagination, Autoplay]}
                            pagination={{
                                bulletClass: 'swiper-pagination-bullet zlz',
                                bulletActiveClass: 'swiper-pagination-bullet-active zlz-active',
                                clickable: true,
                            }}
                        >
                            {hotData?.map((item, index) => {
                                return (
                                    <SwiperSlide key={index} className={'p-[5vw]'}>
                                        <NftCard item={item}/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>}
                    </div>
                </div>
            </div>
            <div
                className={'mt-[2.13rem] mb-[1.25rem] font-gtwalmpo text-[1.75rem] text-white text-opacity-70 px-5 flex justify-between'}>
                <p>News</p>
                <div className={'flex items-center cursor-pointer'} onClick={() => {
                    navigate('/advlist');
                }
                }>
                    <p className={'text-white text-base font-gtwalmp'}>more</p>
                    <img src={rightArrowImg} className={'w-4 h-4'}/>
                </div>
            </div>
            <div className={'pl-5'}>
                {rightNews && <Swiper
                    loop={true}
                    autoplay={{
                        delay: 1000 * 10,
                    }}
                    slidesPerView={1.3}
                    spaceBetween={20}
                    setWrapperSize={true}
                    // direction={'vertical'}
                    enabled={rightNews?.length > 1}
                    modules={[Pagination, Autoplay]}
                    pagination={{
                        bulletClass: 'swiper-pagination-bullet zlz',
                        bulletActiveClass: 'swiper-pagination-bullet-active zlz-active',
                        clickable: true,
                    }}
                >
                    {rightNews?.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Advertisement item={item}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>}
            </div>
        </HotSalesStyled>
    )
}
const HotSalesStyled = styled.div`
  //height: 50rem;
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
      width: 1.88rem;
      height: 0.13rem;
      border-radius: 0.06rem 0.06rem 0.06rem 0.06rem;

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

`
