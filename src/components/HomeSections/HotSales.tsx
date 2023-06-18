import styled from 'styled-components';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper";
import NftCard from "@/components/widget/HomePage/HotSales/NftCard";
import bg_hotImg from "@/assets/images/HomePage/HotSales/bg.png";
import 'swiper/scss'
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import HotSalesRight from "@/components/widget/HomePage/HotSales/HotSalesRight";
import titleBgImg from "@/assets/images/title_bg.png";

export default function HotSales({hotData, rightNews}) {

    return (
        // max-w-full mx-auto px-9 sm:px-6 md:px-32
        <HotSellNftSectionStyled
            className={'w-full flex h-full relative'}>
            <img src={bg_hotImg} className={'object-cover h-[49.63rem] w-full'}/>
            <div className={'absolute flex flex-col items-center w-full'}>
                {/*<img src={hot_saleImg} className={'mt-20 mb-[2.63rem] w-[23.16rem] h-[5.81rem]'}/>*/}
                <div className="mt-20 flex text-[3.03rem] leading-[3.54rem] font-gtwalbpo text-white">
                    <span className={'bg-gradient-title-1'}>Hot</span>
                    <span className={'ml-2'}>Sales</span>
                </div>
                <img src={titleBgImg} className={'w-[23rem] bg-cover bg-center'}/>
                <div className={'flex flex-row mt-[1.8rem]'}>
                    {hotData && <Swiper
                        className={'w-[53rem]'}
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
                                <SwiperSlide key={index}>
                                    <NftCard item={item}/>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>}

                    <div className={'ml-6'}>
                        <HotSalesRight list={rightNews}/>
                    </div>
                </div>

            </div>
        </HotSellNftSectionStyled>

    )
}
const HotSellNftSectionStyled = styled.div`
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
      width: 2.81rem;
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

`
