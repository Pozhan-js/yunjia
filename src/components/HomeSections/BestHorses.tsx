import styled from 'styled-components';
import assets from '@/components/widget/HomePage/BestHorses/Assets';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper";
import NftCard from "@/components/widget/HomePage/BestHorses/NftCard";
import 'swiper/scss'
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import titleBgImg from "@/assets/images/title_bg.png";

export default function BestHorses(props: any) {
    const [top, setTop] = useState(0);
    const ref = useRef<any>(null);

    useLayoutEffect(() => {
        const scrollHandler = () => {
            let disH = (window.scrollY - (ref.current?.offsetTop - window.innerHeight)) / parseFloat(document.documentElement.style.fontSize);
            // console.log(disH)
            if (disH > 20) {
                props.setFixed(true)
            } else if (disH <= 20) {
                props.setFixed(false)
            }
            setTop(window.scrollY);
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (<Styled ref={ref} style={{backgroundImage: `url(${assets.bgImg})`}}
                    className={'bg-cover bg-center bg-no-repeat w-full z-40 flex flex-col items-center h-[70rem]'}>
        {/*data-aos={'fade-up-right'}*/}
        <div id={'NFTs'} className={'pt-[2rem] pb-[18rem]'}></div>
        <div className={'flex flex-col items-center'}>
            {/*<img src={assets.titleImg} className={'w-[53.56rem] h-[5.84rem]'} alt={''}/>*/}
            <div className="flex text-[3.03rem] leading-[3.54rem] font-gtwalbpo text-white">
                <span className={''}>The Biggest Stable of the</span>
                <span className={'ml-2 bg-gradient-title-2'}>Best Horses</span>
            </div>
            <img src={titleBgImg} className={'w-[23rem] bg-cover bg-center'}/>
        </div>
        {props.list && <Swiper
            className={'mb-24 w-[100vw]'}
            loop={true}
            autoplay={{
                delay: 1000 * 10,
            }}
            enabled={props.list?.length > 1}
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
            {props.list?.map((item: any, index: number) => {
                return (
                    <SwiperSlide key={index}>
                        <NftCard item={item}/>
                    </SwiperSlide>
                )
            })}
        </Swiper>}

    </Styled>)
}

const Styled = styled.div`
  //background-position: 50%;
  position: relative;
  //bottom: -12vw;

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

