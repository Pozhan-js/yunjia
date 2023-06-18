import React, {useState} from 'react'
import styled from "styled-components";
import AssetsImgs from "./AssetsImgs";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination} from "swiper";
import {useRequest} from 'ahooks'
import {getClubDetailBenefits} from "@/services/v1/clubsDetail"
import {CircularProgress} from "@mui/material";

export default function ClubBenefits({clubId}:{clubId:string|number}) {

    const [social, setSocial] = useState([]);
    const [earn, setEarn] = useState([]);
    const [mtvs, setMtvs] = useState([]);
    const {data, loading} = useRequest(() => getClubDetailBenefits(clubId), {
        onSuccess: (cdata) => {
            if (cdata?.data?.Social) {
                setSocial(cdata.data.Social)
            }
            if (cdata?.data?.Earn) {
                setEarn(cdata.data.Earn)
            }
            if (cdata?.data?.Web3) {
                setMtvs(cdata.data.Web3)
            }
        }
    });
    if (loading) {
        return (<div className=" w-1/1 h-36 flex justify-center items-center ">
            <CircularProgress />
        </div>)
    }

    return (
        <ClubBenStyled>
            {
                social && social.length > 0 ? <>
                    <div className=" text-white text-base mt-5 mb-[0.75rem] font-gtwalb">
                        Member Benefits
                    </div>
                    <Swiper
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mg-swiper"
                    >
                        <SwiperSlide>
                            <img src={AssetsImgs.swiper1} className={'h-[16.88rem] object-cover scale-105'}/>
                            {/*<div className=' w-1/1 flex justify-center items-center mg-bene-social'>*/}
                            {/*    <div className=' w-1/2 text-right flex flex-col justify-end '>*/}
                            {/*        <div className='mg-bene-item left1'>*/}
                            {/*            <div className=' flex justify-end items-center w-1/2  ml-auto '>*/}
                            {/*                <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{social[0]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={social[0]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(social[0]?.sub_title, 80)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className={'mg-bene-item left2  mt-2 ' + (social[1] ? '' : ' opacity-0')} >*/}
                            {/*            <div className=' flex justify-end items-center w-1/2  ml-auto '>*/}
                            {/*                <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{social[1]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={social[1]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(social[1]?.sub_title, 80)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className={'mg-bene-item left3  mt-2 ' + (social[2] ? '' : ' opacity-0')} >*/}
                            {/*            <div className=' flex justify-end items-center w-1/2  ml-auto '>*/}
                            {/*                <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{social[2]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={social[2]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(social[2]?.sub_title, 80)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className=' flex justify-center items-center  '>*/}
                            {/*        <div className='mg-bene-center  rounded-full flex justify-center items-center '>*/}
                            {/*            <div className='circle1 rounded-full flex justify-center items-center'>*/}
                            {/*                <div className='circle2 rounded-full flex justify-center items-center'>*/}
                            {/*                    <div className='circle3 rounded-full  flex flex-col justify-center items-center '>*/}
                            {/*                        <img className=' w-10 h-10 ' src={AssetsImgs.ic_bene_social} />*/}
                            {/*                        <div className=' text-white text-sm  '>Social</div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className=' w-1/2 text-left  flex flex-col justify-start pl-4 '>*/}
                            {/*        <div className={'mg-bene-item right1' + (social[3] ? '' : ' opacity-0')}>*/}
                            {/*            <div className=' flex justify-end items-center w-4/6  mr-auto  '>*/}
                            {/*                <img className=' w-3 h-3  mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' w-1/2 mr-auto  text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{social[3]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-6/12 pl-3 mr-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={social[3]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(social[3]?.sub_title, 70)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className={'mg-bene-item right2 mt-5' + (social[4] ? '' : ' opacity-0')}>*/}
                            {/*            <div className=' flex justify-end items-center w-4/6  mr-auto'>*/}
                            {/*                <img className=' w-3 h-3 mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' w-1/2 mr-auto  text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{social[4]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-6/12 pl-3 mr-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={social[4]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(social[4]?.sub_title, 70)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={AssetsImgs.swiper2} className={'h-[16.88rem] scale-105 object-cover'}/>
                            {/*<div className=' w-1/1 flex justify-center items-center mg-bene-earn'>*/}
                            {/*    <div className=' w-1/2 text-right flex flex-col justify-end '>*/}
                            {/*        <div className={'mg-bene-item left1' + (earn[0] ? '' : ' opacity-0')}>*/}
                            {/*            <div className=' flex justify-end items-center w-1/2  ml-auto '>*/}
                            {/*                <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{earn[0]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={earn[0]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(earn[0]?.sub_title, 80)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className={'mg-bene-item left2 mt-5 ' + (earn[1] ? '' : ' opacity-0')}>*/}
                            {/*            <div className=' flex justify-end items-center w-1/2  ml-auto '>*/}
                            {/*                <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{earn[1]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={earn[1]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(earn[1]?.sub_title, 80)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className=' flex justify-center items-center pl-4 '>*/}
                            {/*        <div className='mg-bene-center  rounded-full flex justify-center items-center '>*/}
                            {/*            <div className='circle1 rounded-full flex justify-center items-center'>*/}
                            {/*                <div className='circle2 rounded-full flex justify-center items-center'>*/}
                            {/*                    <div className='circle3 rounded-full  flex flex-col justify-center items-center '>*/}
                            {/*                        <img className=' w-10 h-10 ' src={AssetsImgs.ic_bene_earn} />*/}
                            {/*                        <div className=' text-white text-sm  '>Earn</div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className=' w-1/2 text-left  flex flex-col justify-start   '>*/}
                            {/*        <div className={'mg-bene-item right1' + (earn[2] ? '' : ' opacity-0')}>*/}
                            {/*            <div className=' flex justify-end items-center w-4/6  mr-auto  '>*/}
                            {/*                <img className=' w-3 h-3  mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' w-1/2 mr-auto  text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{earn[2]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-6/12 pl-3 mr-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={earn[2]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(earn[2]?.sub_title, 70)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={AssetsImgs.swiper3} className={'h-[16.88rem] scale-105 object-cover'}/>
                            {/*<div className=' w-1/1 flex justify-center items-center mg-bene-metaverse'>*/}
                            {/*    <div className=' w-1/2 text-right flex flex-col justify-end '>*/}
                            {/*        <div className={'mg-bene-item left1' + (mtvs[0] ? '' : ' opacity-0')}>*/}
                            {/*            <div className=' flex justify-end items-center w-1/2  ml-auto '>*/}
                            {/*                <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{mtvs[0]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden mg-bene-min-h' title={mtvs[0]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(mtvs[0]?.sub_title, 80)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className={'mg-bene-item left2 mt-5 ' + (mtvs[1] ? '' : ' opacity-0')}>*/}
                            {/*            <div className=' flex justify-end items-center w-1/2  ml-auto '>*/}
                            {/*                <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{mtvs[1]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden mg-bene-min-h' title={mtvs[1]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(mtvs[1]?.sub_title, 80)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}

                            {/*    </div>*/}
                            {/*    <div className=' flex justify-center items-center pl-4 '>*/}
                            {/*        <div className='mg-bene-center  rounded-full flex justify-center items-center '>*/}
                            {/*            <div className='circle1 rounded-full flex justify-center items-center'>*/}
                            {/*                <div className='circle2 rounded-full flex justify-center items-center'>*/}
                            {/*                    <div className='circle3 rounded-full  flex flex-col justify-center items-center '>*/}
                            {/*                        <img className=' w-10 h-10 ' src={AssetsImgs.ic_bene_metaverse} />*/}
                            {/*                        <div className=' text-white text-sm  '>Metaverse</div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className=' w-1/2  text-left  flex flex-col justify-start   '>*/}
                            {/*        <div className={'mg-bene-item right1' + (mtvs[2] ? '' : ' opacity-0')}>*/}
                            {/*            <div className=' flex justify-end items-center w-4/6  mr-auto  '>*/}
                            {/*                <img className=' w-3 h-3  mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' w-1/2 mr-auto  text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{mtvs[2]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-8/12 pl-3 mr-auto text-ellipsis overflow-hidden mg-bene-min-h' title={mtvs[2]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(mtvs[2]?.sub_title, 80)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className={'mg-bene-item right2 mt-5' + (mtvs[3] ? '' : ' opacity-0')}>*/}
                            {/*            <div className=' flex justify-end items-center w-4/6  mr-auto'>*/}
                            {/*                <img className=' w-3 h-3 mr-1' src={AssetsImgs.ic_arrow} />*/}
                            {/*                <div className=' w-1/2 mr-auto  text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{mtvs[3]?.title}</div>*/}
                            {/*            </div>*/}
                            {/*            <div className=' text-xs w-8/12 pl-3 mr-auto text-ellipsis overflow-hidden mg-bene-min-h' title={mtvs[3]?.sub_title}>*/}
                            {/*                {utils.formatSubStr(mtvs[3]?.sub_title, 80)}*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </SwiperSlide>
                    </Swiper>
                </> : ''
            }
        </ClubBenStyled>
    )
}

const ClubBenStyled = styled.div`

  .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 1.5rem;
    left: 0;
    width: 100%;
  }

  .mg-swiper {
    width: 100%;
    border-radius: 0.63rem;
    border: 0.06rem solid #33333C;
    padding: 1.2rem 1rem;

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      color: #fff;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }

    .swiper-pagination-bullet {
      width: 0.5rem;
      height: 0.5rem;
      background-color: #fff;
    }

    .mg-bene-social {
      .mg-bene-item {
        background-size: contain;
        background-repeat: no-repeat;

        &.left1, &.left2, &.left3 {
          background-position: right;
          padding: 0.6rem 4rem 0.6rem 0;
        }

        &.right1, &.right2 {
          background-position: left;
          padding: 0.6rem 0 0.6rem 2.6rem;
        }

        &.left1 {
          background-image: url(${AssetsImgs.ic_bene_soc_left1});
        }

        &.left2 {
          background-image: url(${AssetsImgs.ic_bene_soc_left2});
          margin-right: 2.3rem;;
          padding-right: 3rem;
        }

        &.left3 {
          background-image: url(${AssetsImgs.ic_bene_soc_left3});
        }

        &.right1 {
          background-image: url(${AssetsImgs.ic_bene_soc_right1});
        }

        &.right2 {
          background-image: url(${AssetsImgs.ic_bene_soc_right2});
        }
      }
    }

    .mg-bene-earn {
      .mg-bene-item {
        background-size: contain;
        background-repeat: no-repeat;

        &.left1, &.left2 {
          background-position: right;
          padding: 0.6rem 4.6rem 0.6rem 0;
        }

        &.left1 {
          background-image: url(${AssetsImgs.ic_bene_earn_left1});
        }

        &.left2 {
          background-image: url(${AssetsImgs.ic_bene_earn_left2});
          padding-right: 4rem;
        }

        &.right1 {
          background-image: url(${AssetsImgs.ic_bene_earn_right1});
          background-position: left;
          padding: 0.6rem 0 0.6rem 4rem;
        }
      }
    }

    .mg-bene-metaverse {
      .mg-bene-item {
        background-size: contain;
        background-repeat: no-repeat;

        &.left1, &.left2 {
          background-position: right;
          padding: 0.6rem 4rem 0.6rem 0;
        }

        &.right1, &.right2 {
          background-position: left;
          padding: 0.6rem 0 0.6rem 4rem;
        }

        &.left1 {
          background-image: url(${AssetsImgs.ic_bene_mtv_left1});
        }

        &.left2 {
          background-image: url(${AssetsImgs.ic_bene_mtv_left2});
        }

        &.right1 {
          background-image: url(${AssetsImgs.ic_bene_mtv_right1});
        }

        &.right2 {
          background-image: url(${AssetsImgs.ic_bene_mtv_right2});
        }
      }
    }

    .mg-bene-text-gradient {
      font-size: 0.75rem;
      font-weight: 900;
      line-height: 0.81rem;
      background-image: linear-gradient(63deg, #BE58FF 0%, #6122E8 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }

    .mg-bene-min-h {
      height: 2.1rem;
    }

    .mg-bene-item {
      min-width: 18rem;
    }

    .mg-bene-center {
      width: 10.81rem;
      height: 10.81rem;
      border: 0.05rem solid #6F19F788;

      .circle1 {
        width: 8.81rem;
        height: 8.81rem;
        border: 0.05rem solid #6F19F7;
      }

      .circle2 {
        width: 6.29rem;
        height: 6.29rem;
        background: linear-gradient(146deg, #290E54 0%, #7420F9 100%);
      }

      .circle3 {
        width: 4.98rem;
        height: 4.98rem;
        background: #8D45FF;
      }
    }
  }

  /* .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
  
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  } */
`;

/*

<SwiperSlide>
                            <div className=' w-1/1 flex justify-center items-center mg-bene-social'>
                                <div className=' 2xl:w-4/12 text-right flex flex-col justify-end '>
                                    <div className='mg-bene-item left1'>
                                        <div className=' flex justify-end items-center w-1/2  ml-auto '>
                                            <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{social[0]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={social[0]?.sub_title}>
                                            {utils.formatSubStr(social[0]?.sub_title, 80)}
                                        </div>
                                    </div>
                                    <div className={'mg-bene-item left2  mt-2 ' + (social[1] ? '' : ' hidden')} >
                                        <div className=' flex justify-end items-center w-1/2  ml-auto '>
                                            <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{social[1]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={social[1]?.sub_title}>
                                            {utils.formatSubStr(social[1]?.sub_title, 80)}
                                        </div>
                                    </div>
                                    <div className={'mg-bene-item left3  mt-2 ' + (social[2] ? '' : ' hidden')} >
                                        <div className=' flex justify-end items-center w-1/2  ml-auto '>
                                            <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{social[2]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={social[2]?.sub_title}>
                                            {utils.formatSubStr(social[2]?.sub_title, 80)}
                                        </div>
                                    </div>
                                </div>
                                <div className=' flex justify-center items-center  '>
                                    <div className='mg-bene-center  rounded-full flex justify-center items-center '>
                                        <div className='circle1 rounded-full flex justify-center items-center'>
                                            <div className='circle2 rounded-full flex justify-center items-center'>
                                                <div className='circle3 rounded-full  flex flex-col justify-center items-center '>
                                                    <img className=' w-10 h-10 ' src={AssetsImgs.ic_bene_social} />
                                                    <div className=' text-white text-sm  '>Social</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=' 2xl:w-4/12 text-left  flex flex-col justify-start pl-4 '>
                                    <div className={'mg-bene-item right1' + (social[3] ? '' : ' hidden')}>
                                        <div className=' flex justify-end items-center w-4/6  mr-auto  '>
                                            <img className=' w-3 h-3  mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' w-1/2 mr-auto  text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{social[3]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-6/12 pl-3 mr-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={social[3]?.sub_title}>
                                            {utils.formatSubStr(social[3]?.sub_title, 70)}
                                        </div>
                                    </div>
                                    <div className={'mg-bene-item right2 mt-5' + (social[4] ? '' : ' hidden')}>
                                        <div className=' flex justify-end items-center w-4/6  mr-auto'>
                                            <img className=' w-3 h-3 mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' w-1/2 mr-auto  text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{social[4]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-6/12 pl-3 mr-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={social[4]?.sub_title}>
                                            {utils.formatSubStr(social[4]?.sub_title, 70)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className=' w-1/1 flex justify-center items-center mg-bene-earn'>
                                <div className=' 2xl:w-4/12 text-right flex flex-col justify-end '>
                                    <div className={'mg-bene-item left1' + (earn[0] ? '' : ' hidden')}>
                                        <div className=' flex justify-end items-center w-1/2  ml-auto '>
                                            <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{earn[0]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={earn[0]?.sub_title}>
                                            {utils.formatSubStr(earn[0]?.sub_title, 80)}
                                        </div>
                                    </div>
                                    <div className={'mg-bene-item left2 mt-5 ' + (earn[1] ? '' : ' hidden')}>
                                        <div className=' flex justify-end items-center w-1/2  ml-auto '>
                                            <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{earn[1]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={earn[1]?.sub_title}>
                                            {utils.formatSubStr(earn[1]?.sub_title, 80)}
                                        </div>
                                    </div>
                                </div>
                                <div className=' flex justify-center items-center pl-4 '>
                                    <div className='mg-bene-center  rounded-full flex justify-center items-center '>
                                        <div className='circle1 rounded-full flex justify-center items-center'>
                                            <div className='circle2 rounded-full flex justify-center items-center'>
                                                <div className='circle3 rounded-full  flex flex-col justify-center items-center '>
                                                    <img className=' w-10 h-10 ' src={AssetsImgs.ic_bene_earn} />
                                                    <div className=' text-white text-sm  '>Earn</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=' 2xl:w-4/12 text-left  flex flex-col justify-start   '>
                                    <div className={'mg-bene-item right1' + (earn[2] ? '' : ' hidden')}>
                                        <div className=' flex justify-end items-center w-4/6  mr-auto  '>
                                            <img className=' w-3 h-3  mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' w-1/2 mr-auto  text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{earn[2]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-6/12 pl-3 mr-auto text-ellipsis overflow-hidden  mg-bene-min-h' title={earn[2]?.sub_title}>
                                            {utils.formatSubStr(earn[2]?.sub_title, 70)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className=' w-1/1 flex justify-center items-center mg-bene-metaverse'>
                                <div className=' 2xl:w-4/12 text-right flex flex-col justify-end '>
                                    <div className={'mg-bene-item left1' + (mtvs[0] ? '' : ' hidden')}>
                                        <div className=' flex justify-end items-center w-1/2  ml-auto '>
                                            <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{mtvs[0]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden mg-bene-min-h' title={mtvs[0]?.sub_title}>
                                            {utils.formatSubStr(mtvs[0]?.sub_title, 80)}
                                        </div>
                                    </div>
                                    <div className={'mg-bene-item left2 mt-5 ' + (mtvs[1] ? '' : ' hidden')}>
                                        <div className=' flex justify-end items-center w-1/2  ml-auto '>
                                            <img className=' w-3 h-3 ml-auto  mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{mtvs[1]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-8/12 ml-auto text-ellipsis overflow-hidden mg-bene-min-h' title={mtvs[1]?.sub_title}>
                                            {utils.formatSubStr(mtvs[1]?.sub_title, 80)}
                                        </div>
                                    </div>

                                </div>
                                <div className=' flex justify-center items-center pl-4 '>
                                    <div className='mg-bene-center  rounded-full flex justify-center items-center '>
                                        <div className='circle1 rounded-full flex justify-center items-center'>
                                            <div className='circle2 rounded-full flex justify-center items-center'>
                                                <div className='circle3 rounded-full  flex flex-col justify-center items-center '>
                                                    <img className=' w-10 h-10 ' src={AssetsImgs.ic_bene_metaverse} />
                                                    <div className=' text-white text-sm  '>Metaverse</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=' 2xl:w-4/12 text-left  flex flex-col justify-start   '>
                                    <div className={'mg-bene-item right1' + (mtvs[2] ? '' : ' hidden')}>
                                        <div className=' flex justify-end items-center w-4/6  mr-auto  '>
                                            <img className=' w-3 h-3  mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' w-1/2 mr-auto  text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{mtvs[2]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-8/12 pl-3 mr-auto text-ellipsis overflow-hidden mg-bene-min-h' title={mtvs[2]?.sub_title}>
                                            {utils.formatSubStr(mtvs[2]?.sub_title, 80)}
                                        </div>
                                    </div>
                                    <div className={'mg-bene-item right2 mt-5' + (mtvs[3] ? '' : ' hidden')}>
                                        <div className=' flex justify-end items-center w-4/6  mr-auto'>
                                            <img className=' w-3 h-3 mr-1' src={AssetsImgs.ic_arrow} />
                                            <div className=' w-1/2 mr-auto  text-xs text-ellipsis overflow-hidden whitespace-pre mg-bene-text-gradient '>{mtvs[3]?.title}</div>
                                        </div>
                                        <div className=' text-xs w-8/12 pl-3 mr-auto text-ellipsis overflow-hidden mg-bene-min-h' title={mtvs[3]?.sub_title}>
                                            {utils.formatSubStr(mtvs[3]?.sub_title, 80)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

*/
