import styled from 'styled-components';
import bgImg from '@/assets/images/HomePage/BestHorses/mobile/bg.png';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper";
import NftCard from "@/components/widget/HomePage/HotSales/mobile/NftCard";
import 'swiper/scss'
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import titleBgImg from "@/assets/images/title_bg.png";

export default function BestHorses(props) {

    return (<Styled
        style={{backgroundImage: `url(${bgImg})`}}
        className={'bg-cover bg-no-repeat w-full flex flex-col items-center box-border pt-[6.25rem]'}>
        <div className="flex flex-col items-center text-[1.75rem] font-gtwalbpo text-white">
            <span>The Biggest Stable of</span>
            <div>
                <span>the</span>
                <span className={'ml-2 bg-gradient-title-2'}>Best Horses</span>
            </div>

        </div>
        <img src={titleBgImg} className={'w-[13.62rem] bg-cover bg-center'}/>
        {/*<img src={titleImg} className={'w-[18.06rem] h-[5.56rem] object-cover mb-4'} alt={''}/>*/}

        {props.list && <Swiper
            className={'mb-8 w-[100vw] mt-4'}
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
            {props.list?.map((item, index) => {
                return (
                    <SwiperSlide key={index} className={'p-[5vw]'}>
                        <NftCard item={item}/>
                    </SwiperSlide>
                )
            })}
        </Swiper>}

    </Styled>)
}

const Styled = styled.div`
  background-position: 50%;
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
`;

