import NoticeBar from "@/components/widget/NoticeBar";
import themeSetting from "@/config/themeSetting";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import 'swiper/scss'
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import React, { useEffect, useState } from "react";
import Card from "@/components/widget/HorsePediaDetailPage/Card";
import { useMount, useRequest } from "ahooks";
import { getHorsePediaDetail } from "@/services/v1/horses";
import LeftArrowImg from '@/assets/images/HorsePediaDetailPage/left_arrow.png';
import RightArrowImg from '@/assets/images/HorsePediaDetailPage/right_arrow.png'
import Footer from "@/components/widget/Footer/Footer";
import { useSelector } from "react-redux";

const Type = ({ type }) => {
    const [name, setName] = useState('Others');

    useMount(() => {
        switch (type) {
            case 0:
                setName('Others');
                break;
            case 1:
                setName('Buy');
                break;
            case 2:
                setName('Skil');
                break;
            case 3:
                setName('Racing');
                break;
            case 4:
                setName('Breading');
                break;
        }
    })
    return (
        <div className={'box flex items-center justify-center px-2 text-white text-[0.75rem] font-gtwalmp'}>
            {name}
        </div>
    )
}
export default function Index() {
    const { id } = useParams();
    const [data, setData] = useState<any>({ detail: {}, list: [] });
    const header_top = useSelector((state: any) => state.HEADER_TOP);
    const { run } = useRequest(getHorsePediaDetail, {
        defaultParams: [id],
        onSuccess: (tdata) => {
            setData(tdata?.data);
        }
    })
    useEffect(() => {
        run(id);
    }, [id]);
    return (
        <>
            <Styled style={{ backgroundColor: themeSetting.bgColor }} className={'min-h-screen font-gtwalp pb-[8rem]'}>
                <NoticeBar block={true} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                    bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`} />
                {/* <NoticeBar /> */}
                <div className={'w-full px-9 sm:px-6 md:px-32 flex flex-col items-center justify-center'}>
                    <div className="content p-6 flex flex-col items-center ">
                        <img src={data?.detail?.img_url} className={'w-[40.38rem] rounded'} />
                        <p className={'text-white pt-[1.13rem] text-[2.75rem] font-gtwalb leading-[3.38rem]'}>{data?.detail?.title}</p>
                        <div className={'flex mt-3 mb-2 space-x-[0.75rem] self-start'}>
                            <Type type={data?.detail?.pedia_type} />
                            <div className={'box flex items-center justify-center px-2 text-[0.75rem]'}>
                                <span className={'text-white text-opacity-60'}>Visits: <span
                                    className={'text-white'}>{data?.detail?.page_views}</span></span>

                            </div>
                            <div className={'box flex items-center justify-center px-2 text-[0.75rem]'}>
                                <span className={'text-white text-opacity-60'}>Source: <span
                                    className={'text-white'}>{data?.detail?.source}</span></span>
                            </div>
                            <div className={'text-[0.75rem] text-white text-opacity-60'}>
                                {data?.detail?.create_time}
                            </div>
                        </div>
                        <div className={'divider-b my-[1.88rem]'} />
                        <div className={'ql-editor text-white'} dangerouslySetInnerHTML={{ __html: data?.detail?.content }}>

                        </div>
                    </div>
                    <div className={'w-[43rem] h-[17.13rem]  mt-[8rem]  relative'} hidden={data?.list.length === 0}>
                        <Swiper
                            autoplay={{
                                delay: 1000 * 10,
                            }}
                            slidesPerView={2.3}
                            spaceBetween={20}
                            setWrapperSize={true}
                            navigation={{
                                nextEl: '.swiper-button-next-',
                                prevEl: '.swiper-button-prev-'
                            }}
                            modules={[Autoplay, Navigation]}
                        >
                            {data?.list?.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Card item={item} />
                                    </SwiperSlide>
                                )
                            })}

                        </Swiper>
                        <div
                            className="swiper-button-prev- flex items-center justify-center absolute top-1/2 z-10 -translate-y-1/2 -translate-x-1/2  cursor-pointer circle-box rounded-full">
                            <img src={LeftArrowImg} className="w-[3.13rem] h-[3.13]" />
                        </div>
                        <div
                            className="swiper-button-next- flex items-center justify-center absolute top-1/2 z-10 -translate-y-1/2 translate-x-1/2 right-0  cursor-pointer circle-box rounded-full">
                            <img src={RightArrowImg} className="w-[3.13rem] h-[3.13]" />
                        </div>
                    </div>
                </div>
            </Styled>
            <Footer absolute={false} />
        </>

    )
}
const Styled = styled.div`
  .circle-box {
    width: 3.13rem;
    height: 3.13rem;
    background: rgba(255, 255, 255, 0.28);
  }

  .divider-b {
    width: 40.38rem;
    height: 0.06rem;
    opacity: 0.1;
    background-color: #FFF;
  }

  .content {
    width: 43.38rem;
    min-height: 40.81rem;
    background: #372770;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .box {
    height: 1.25rem;
    background: #5641A5;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    opacity: 1;
  }
`;
