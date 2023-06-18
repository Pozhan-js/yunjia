import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper";
import {useSelector} from "react-redux";
import 'swiper/scss'
import 'swiper/scss/autoplay';
import styled from 'styled-components';
import {getPool, getScrollNews} from "@/services/v1/mint";
import {useRequest} from "ahooks";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import suonaImg from '@/assets/images/suona.png';

// 402170 80% 模糊20
export default function NoticeBar({className = '', block = true, bgColor = '#1F1F20'}) {
    const header_height: number = useSelector((state: StoreState) => state.HEADER_HEIGHT) as number;
    const {data} = useRequest(getScrollNews)
    const navigate = useNavigate();

    if (!data) {
        return (<>
            {block && <div style={{height: `${header_height}rem`}}></div>}
        </>)
    }
    if (data?.data?.length === 0) {
        return (<>
            {block && <div style={{height: `${header_height}rem`}}></div>}
        </>)
    }
    return (<div>
        {block && <div style={{height: `${header_height + 2.35}rem`}}></div>}
        <Styled
            className={`fixed w-full mx-auto px-9 sm:px-6 md:px-32  flex items-center justify-start z-50 ${className}`}
            style={{top: `${header_height}rem`, backgroundColor: bgColor}}>
            <img src={suonaImg} className={'w-[1.25rem] h-[1.25rem]'} alt={''}/>
            <Swiper
                className={'h-full flex-1'}
                loop={true}
                autoplay={{
                    delay: 1000 * 5,
                }}
                setWrapperSize={true}
                noSwiping={true}
                direction={'vertical'}
                modules={[Autoplay]}
            >
                {data?.data.map((item: any, index: number) => {
                    return (<SwiperSlide className={'swiper-no-swiping'} key={index}>
                        <div
                            onClick={() => {
                                if (item.external_href != null) {
                                    window.open(item.external_href)
                                }
                                if (item.router_href != null) {
                                    navigate(item.router_href)
                                }
                            }}
                            className={`text-white flex items-center h-full ${item.external_href || item.router_href ? 'cursor-pointer' : ''}`}>
                            <div
                                className={'msg ml-2 truncate h-[2.38rem] flex items-center'}>{item.title}</div>
                        </div>
                    </SwiperSlide>)
                })}

            </Swiper>
            {/*{pool?.lastpool && <div className={'flex items-center pool-text'}>*/}
            {/*    <img src={lastpoolImg} className={'w-6 h-6 object-cover'}/>*/}
            {/*    <div className={'ml-1'}>Last Pool: {$T.formatThousand(pool?.lastpool.toString())}</div>*/}
            {/*    <img src={poolImg} className={'w-6 h-6 object-cover ml-[3.31rem]'}/>*/}
            {/*    <div className={'ml-1'}>Pool: {$T.formatThousand(pool?.lastpool.toString())}</div>*/}
            {/*</div>}*/}
        </Styled>
    </div>)
}
const Styled = styled.div`
  height: 2.38rem;
  border-radius: 0;
  opacity: 1;

  .msg {
    font-size: 0.88rem;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 1.03rem;
    -webkit-background-clip: text;
  }

  .pool-text {
    font-size: 0.88rem;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 1.03rem;
    -webkit-background-clip: text;
  }
`;
