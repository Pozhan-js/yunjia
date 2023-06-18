import styled from 'styled-components';
// import roadmapBg from "@/assets/images/link/roadmap-bg.png";
import {useScroll, useRequest} from "ahooks";
import React, {useEffect, useRef, useState} from "react";
import assets from "@/components/widget/HomePage/RoadMap/Assets";
// import bgImg from '@/assets/images/demo/section2.png';
import seatImg from "@/assets/images/HomePage/RoadMap/seat@2x.png";
import marketImg from "@/assets/images/HomePage/RoadMap/Market@2x.png";
import omhImg from "@/assets/images/HomePage/RoadMap/OMH3@2x.png";
import {getRoadMap} from "@/services/v1/home";
import titleBgImg from "@/assets/images/title_bg.png";
import theme from '@/config/themeSetting';

export default function RoadMap() {
    const ref = useRef<any>();
    const [isActive, setActive] = useState(false);
    const scroll = useScroll(document);

    const {data} = useRequest(getRoadMap);

    useEffect(() => {
        let disH = (window.scrollY - (ref.current?.offsetTop - window.innerHeight)) / parseFloat(document.documentElement.style.fontSize);
        if (disH > 40) {
            setActive(true);
        }
    }, [scroll]);

    return (<RoadMapStyled ref={ref} id={'roadmap'} style={{backgroundColor: theme.bgColor}} className={'z-30 overflow-hidden h-[70vw]'}>
        <div className={'flex w-full justify-center'}>
            {/*<img src={assets.titleImg} className={'w-[23.16rem] h-[5.81rem] mt-[8.1rem]'}/>*/}
            <div className={'flex flex-col items-center mt-[8.1rem]'}>
                <div className="flex text-[3.03rem] leading-[3.54rem] font-gtwalbpo text-white">
                    <span className={''}>Road</span>
                    <span className={'bg-gradient-title-2'}>Map</span>
                </div>
                <img src={titleBgImg} className={'w-[23rem] bg-cover bg-center'}/>
            </div>
        </div>

        <section className="normal-section relative mt-[4.5rem]">
            <div
                className="roadmap-container"
            >
                <img className="roadmap-container-bg px-24" src={assets.roadmapBgImg} alt=""/>

                <div className="roadmap-content">
                    {/*one*/}
                    <div className="signpost signpost-1">
                        <div className="signpost-picture">
                            <img className="signpost-base" src={assets.seatImg} alt=""/>
                            <img
                                className={`signpost-castle ${isActive ? "castle-drop" : ""}`}
                                src={assets.soonImg}
                                alt=""
                            />
                        </div>
                        <div
                            className={`signpost-content ${isActive ? "fadeInDownward" : ""}`}
                        >
                            <div className="signpost-date mt-4 font-gtwalb">{data?.data[6].name}</div>
                            <div className={'text-white text-base font-gtwal mt-2'}>
                                {data?.data[6].eventInfo.map((item, index) => {
                                    return (
                                        <li className={'flex items-center'} key={index}>
                                            {item.isComplete ? <img src={assets.finishImg} className={'arrow mr-2'}/> :
                                                <div className={'circle flex-shrink-0 ml-1 mr-2'}></div>}

                                            {item.eventName}
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {/*two*/}
                    <div className="signpost signpost-2">
                        <div className="signpost-picture">
                            <img className="signpost-base" src={assets.seatImg} alt=""/>
                            <img
                                className={`signpost-castle ${isActive ? "castle-drop" : ""}`}
                                src={assets.gameImg}
                                alt=""
                            />
                        </div>

                        <div
                            className={`signpost-content ${isActive ? "fadeInDownward" : ""}`}
                        >

                            <div className="signpost-date mt-4 font-gtwalb">{data?.data[5].name}</div>
                            <div className={'text-white text-base font-gtwal mt-2'}>
                                {data?.data[5].eventInfo.map((item, index) => {
                                    return (
                                        <li className={'flex items-center'} key={index}>
                                            {item.isComplete ? <img src={assets.finishImg} className={'arrow mr-2'}/> :
                                                <div className={'circle flex-shrink-0 ml-1 mr-2'}></div>}

                                            {item.eventName}
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {/*three*/}
                    <div className="signpost signpost-3">
                        <div className="signpost-picture">
                            <img className="signpost-base" src={assets.seatImg} alt=""/>
                            <img
                                className={`signpost-castle ${isActive ? "castle-drop" : ""}`}
                                src={assets.marketImg}
                                alt=""
                            />
                        </div>

                        <div
                            className={`signpost-content ${isActive ? "fadeInDownward" : ""}`}
                        >
                            <div className="signpost-date mt-4 font-gtwalb">{data?.data[4].name}</div>
                            <div className={'text-white text-base font-gtwal mt-2'}>
                                {data?.data[4].eventInfo.map((item, index) => {
                                    return (
                                        <li className={'flex items-center'} key={index}>
                                            {item.isComplete ? <img src={assets.finishImg} className={'arrow mr-2'}/> :
                                                <div className={'circle flex-shrink-0 ml-1 mr-2'}></div>}

                                            {item.eventName}
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="signpost signpost-4">
                        <div className="signpost-picture">
                            <img className="signpost-base" src={assets.seatImg} alt=""/>
                            <img
                                className={`signpost-castle ${isActive ? "castle-drop" : ""}`}
                                src={assets.nftImg}
                                alt=""
                            />
                        </div>
                        <div
                            className={`signpost-content signpost-item-box-1 ${isActive ? "fadeInRight" : ""}`}
                        >
                            <div style={{backgroundImage: `url(${assets.bg_Q4Img})`}}
                                 className={'w-[18.75rem] h-[10.5rem] bg-no-repeat bg-contain overflow-hidden'}>
                                <div className={`flex flex-col justify-center h-full w-full py-auto py-4 px-4`}>
                                    <div
                                        className="signpost-date font-gtwalb">{data?.data[3].name}</div>
                                    <div className={'text-white text-base font-gtwal mt-2'}>
                                        {data?.data[3].eventInfo.map((item, index) => {
                                            return (
                                                <li className={'flex items-center whitespace-nowrap text-base'}
                                                    key={index}>
                                                    {item.isComplete ?
                                                        <img src={assets.finishImg} className={'arrow mr-2'}/> :
                                                        <div className={'circle flex-shrink-0 ml-1 mr-2'}></div>}
                                                    {item.eventName}
                                                </li>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="signpost signpost-5">
                        <div className="signpost-picture">
                            <img className="signpost-base" src={assets.seatImg} alt=""/>
                            {/*<img*/}
                            {/*    className={`object-cover signpost-beam ${isActive ? "castle-drop" : ""}`}*/}
                            {/*    src={assets.lightBeamImg}*/}
                            {/*    alt=""*/}
                            {/*/>*/}
                            <img
                                className={`signpost-castle ${isActive ? "castle-drop" : ""}`}
                                src={assets.omhImg}
                                alt=""
                            />
                        </div>
                        <div
                            className={`signpost-content signpost-item-box-2 ${isActive ? "fadeInLeft" : ""}`}
                        >
                            <div style={{backgroundImage: `url(${assets.bg_Q3Img})`}}
                                 className={'w-[21.56rem] h-[12rem] bg-no-repeat bg-cover'}>
                                <div className={`flex flex-col justify-center h-full w-full py-auto py-4 px-4`}>
                                    <div
                                        className="signpost-date font-gtwalb">{data?.data[2].name}</div>
                                    <div className={'text-white text-base font-gtwal mt-2'}>
                                        {data?.data[2].eventInfo.map((item, index) => {
                                            return (
                                                <li className={'flex items-center'} key={index}>
                                                    {item.isComplete ?
                                                        <img src={assets.finishImg} className={'arrow mr-2'}/> :
                                                        <div className={'circle flex-shrink-0 ml-1 mr-2'}></div>}

                                                    {item.eventName}
                                                </li>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="signpost signpost-6">
                        <div className="signpost-picture">
                            <img className="signpost-base" src={assets.seatImg} alt=""/>
                            <img
                                className={`signpost-base object-contain ${isActive ? "castle-drop" : ""}`}
                                src={assets.groupImg}
                                alt=""
                            />
                        </div>

                        <div
                            className={`signpost-content ${isActive ? "fadeInDownward" : ""}`}
                        >
                            <div className="signpost-date mt-4 font-gtwalb">{data?.data[1].name}</div>
                            <div className={'text-white text-base font-gtwal mt-2'}>
                                {data?.data[1].eventInfo.map((item, index) => {
                                    return (
                                        <li className={'flex items-center whitespace-nowrap'} key={index}>
                                            {item.isComplete ? <img src={assets.finishImg} className={'arrow mr-2'}/> :
                                                <div className={'circle flex-shrink-0 ml-1 mr-2'}></div>}

                                            {item.eventName}
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="signpost signpost-7">
                        <div className="signpost-picture">
                            <img className="signpost-base" src={assets.seatImg} alt=""/>
                            <img
                                className={`signpost-castle object-contain ${isActive ? "castle-drop" : ""}`}
                                src={assets.amoImg}
                                alt=""
                            />
                        </div>

                        <div
                            className={`signpost-content ${isActive ? "fadeInDownward" : ""}`}
                        >
                            <div className="signpost-date mt-4 font-gtwalb">{data?.data[0].name}</div>
                            <div className={'text-white text-base font-gtwal mt-2'}>
                                {data?.data[0].eventInfo.map((item, index) => {
                                    return (
                                        <li className={'flex items-center whitespace-nowrap'} key={index}>
                                            {item.isComplete ? <img src={assets.finishImg} className={'arrow mr-2'}/> :
                                                <div className={'circle flex-shrink-0 ml-1 mr-2'}></div>}

                                            {item.eventName}
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </RoadMapStyled>);
}

const RoadMapStyled = styled.div`
  .circle {
    width: 0.63rem;
    height: 0.63rem;
    opacity: 1;
    border: 0.13rem solid rgba(255, 255, 255, 0.6);
    border-radius: 50%;
  }

  .arrow {
    width: 1.13rem;
    height: 1.13rem;
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    //overflow: hidden;
  }

  .normal-section {
    /* background: linear-gradient(to bottom, #18212c, #121f2b); */
    //background: linear-gradient(to top, #18212c, #121f2b);
    height: 39.42vw;
  }

  .roadmap-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .roadmap-container-bg {
    position: absolute;
    z-index: 0;
    //width: 83.5416%;
    //height: 46.39%;
    height: 29.48vw;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .roadmap-content {
    position: relative;
    height: 52.3%;
    width: 100%;
    z-index: 1;
  }

  .signpost {
    position: absolute;
    /* width: 170px;
    height: 100px; */
    width: 5vw;
    height: 8vh;
  }

  .signpost-picture {
    position: relative;
  }

  .signpost-picture img {
    position: absolute;
  }

  .signpost-base {
    /* width: 170px; */
    height: 7vh;
    transform: translate(-50%, -50%);
  }

  .signpost-castle {
    //width: auto;
    //height: 9vh;
    width: 3.77rem;
    height: 3.77rem;
    visibility: hidden;
  }

  .signpost-beam {
    width: 7.34rem;
    height: 4.84rem;
  }

  .signpost-1 {
    top: -20%;
    right: 10%;
  }

  .signpost-2 {
    top: -20%;
    right: 30%;
  }

  .signpost-3 {
    top: -20%;
    right: 50%;
  }

  .signpost-4 {
    top: 15%;
    /* left: 40%; */
    left: 30.5%;
  }

  .signpost-5 {
    top: 80%;
    /* right: 32%; */
    right: 42%;
  }

  .signpost-6 {
    top: 115%;
    left: 40%;
  }

  .signpost-7 {
    top: 115%;
    left: 20%;
  }

  //.signpost-8 {
  //  top: 95%;
  //  left: 18%;
  //}

  .signpost-content {
    position: absolute;
    left: -50%;
    top: 50%;
    width: 15vw;
    visibility: hidden;
  }

  .signpost-date {
    /* font-size: 1.25em; */
    padding-left: 0.2vw;
    font-size: 1.13rem;
    font-weight: bold;
    color: #8F38FF;
    line-height: 1.32rem;
    -webkit-background-clip: text;
  }

  .signpost-content-item {
    color: #fff;
    margin-top: 0.75em;
    //padding-left: 0.2vw;
    /* padding-left: 20px; */
  }

  .signpost-content.signpost-item-box-1 {
    width: 17.75rem;
    left: -480% !important;
    //background: #2b323b;
    //padding: 10%;
    position: relative;
  }

  .signpost-content.signpost-item-box-2 {
    /* width: 260px; */
    width: 15vw;
    /* left: -220% !important; */
    //background: #2b323b;
    padding: 10%;
    position: relative;
  }

  .signpost-item-box-img-1 {
    width: 1vw;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate(-50%, 50%);
  }

  .signpost-item-box-img-2 {
    width: 1vw;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }

  .signpost-4 .signpost-content {
    top: -100%;
    left: -160%;
  }

  .signpost-5 .signpost-content {
    top: -100%;
    left: 80%;
  }

  .signpost-content-item li {
    font-weight: normal;
    /* font-size: 1.125rem; */
    font-size: 1vw;
    line-height: 1.25;
    padding-left: 5px;
  }

  /* .signpost-content-item .checked {
    list-style-image: url(../images/roadmap/check.png);
  } */

  .fadeInDownward {
    visibility: visible;
    animation: fadeInDownward 3s linear;
    animation-duration: 0.6s;
    animation-fill-mode: both;
  }

  .fadeInUpward {
    visibility: visible;
    animation: fadeInUpward 3s linear;
    animation-duration: 0.6s;
    animation-fill-mode: both;
  }

  .fadeInLeft {
    visibility: visible;
    animation: fadeInLeft 3s linear;
    animation-duration: 0.6s;
    animation-fill-mode: both;
  }

  .fadeInRight {
    visibility: visible;
    animation: fadeInRight 3s linear;
    animation-duration: 0.6s;
    animation-fill-mode: both;
  }

  .signpost-8 .fadeInDownward {
    animation-delay: 0.3s;
  }

  .signpost-7 .fadeInDownward {
    animation-delay: 0.5s;
  }

  .signpost-6 .fadeInDownward {
    animation-delay: 0.7s;
  }

  .signpost-5 .fadeInLeft {
    animation-delay: 0.9s;
  }

  .signpost-4 .fadeInRight {
    animation-delay: 1.1s;
  }

  .signpost-3 .fadeInDownward {
    animation-delay: 1.3s;
  }

  .signpost-2 .fadeInDownward {
    animation-delay: 1.5s;
  }

  .signpost-1 .fadeInDownward {
    animation-delay: 1.7s;
  }

  .castle-drop {
    visibility: visible;
    animation: castle-drop-down 5s;
    animation-duration: 0.6s;
    animation-fill-mode: both;
  }

  .signpost-8 .castle-drop {
    animation-delay: 0s;
  }

  .signpost-7 .castle-drop {
    animation-delay: 0.2s;
  }

  .signpost-6 .castle-drop {
    animation-delay: 0.4s;
  }

  .signpost-5 .castle-drop {
    animation-delay: 0.6s;
  }

  .signpost-4 .castle-drop {
    animation-delay: 0.8s;
  }

  .signpost-3 .castle-drop {
    animation-delay: 1s;
  }

  .signpost-2 .castle-drop {
    animation-delay: 1.2s;
  }

  .signpost-1 .castle-drop {
    animation-delay: 1.4s;
  }

  @keyframes fadeInUpward {
    0% {
      opacity: 0;
      transform: translate3d(0, 50%, 0);
    }

    100% {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fadeInDownward {
    0% {
      opacity: 0;
      transform: translate3d(0, -50%, 0);
    }

    100% {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translate3d(-50%, 0, 0);
    }

    100% {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fadeInRight {
    0% {
      opacity: 0;
      transform: translate3d(50%, 0, 0);
    }

    100% {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes castle-drop-down {
    0% {
      transform: translate3d(-57%, -130%, 0) rotate(-3deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    35% {
      transform: translate3d(-55%, -100%, 0) rotate(-10deg);
      animation-timing-function: ease-out;
      opacity: 1;
    }
    45% {
      transform: translate3d(-50%, -105%, 0) rotate(3deg);
      animation-timing-function: ease-in;
    }
    55% {
      transform: translate3d(-46%, -100%, 0) rotate(10deg);
      animation-timing-function: ease-in;
    }
    62% {
      transform: translate3d(-50%, -103%, 0) rotate(-1deg);
      animation-timing-function: ease-out;
    }
    69% {
      transform: translate3d(-53%, -100%, 0) rotate(-5deg);
      animation-timing-function: ease-in;
    }
    75% {
      transform: translate3d(-49%, -101%, 0) rotate(1deg);
      animation-timing-function: ease-in;
    }
    81% {
      transform: translate3d(-47%, -100%, 0) rotate(5deg);
      animation-timing-function: ease-in;
    }
    100% {
      transform: translate3d(-50%, -100%, 0);
      animation-timing-function: ease-out;
    }
  }
`;
