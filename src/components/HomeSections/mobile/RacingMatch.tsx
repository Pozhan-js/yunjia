import styled from "styled-components";
import rightArrowImg from "@/assets/images/HorseHubPage/right_arrow.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import NftCard from "@/components/widget/HomePage/BestHorses/NftCard";
import 'swiper/scss'
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import { useRequest } from "ahooks";
import { getRacing } from "@/services/v1/home";
import _ from "lodash";
import RacingResult from "@/components/widget/HomePage/RacingMatch/mobile/RacingResult";
import RacingMatch_ from "@/components/widget/HomePage/RacingMatch/mobile/RacingMatch_";

export default function RacingMatch() {
  const navigate = useNavigate();
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);
  useRequest(getRacing, {
    onSuccess: (tdata) => {
      // console.log(tdata?.data);
      // console.log(_.chunk(tdata?.data?.coming, 3))
      setLeftList(tdata?.data?.coming);
      setRightList(tdata?.data?.ended);
    }
  })
  return (
    <Styled className={'w-full px-5 mt-[2.5rem]'}>
      <div className={'flex justify-between items-center'}>
        <p className={'bg-clip-text text-opacity-70 text-white text text-[1.75rem] font-gtwalmpo font-normal'}>Racing
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
            alt={''} /></span>
      </div>
      <div className={'mt-5'}>
        <RacingMatch_ list={leftList} />
        <RacingResult list={rightList} />
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
