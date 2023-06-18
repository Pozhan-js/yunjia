import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import React, {useState, useRef} from "react";
import closeImg from '@/assets/images/ClubsDetailPage/close.png';
import downImg from '@/assets/images/ClubsDetailPage/down.png';
import playImg from '@/assets/images/ClubsDetailPage/play.png';
import nextImg from '@/assets/images/ClubsDetailPage/next.png';
import preImg from '@/assets/images/ClubsDetailPage/pre.png';
import {Swiper, SwiperSlide, SwiperRef} from "swiper/react";
import {Navigation} from "swiper";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import {useMount} from "ahooks";
import _ from "lodash";

const boxStyle = {
    position: 'absolute',
    backgroundColor: '#24222B5A',
    height: '100%',
    width: '100%',
};

const View = ({initialSlide, srcList = [], close, thumbs,viewClass}) => {
    // const header_height: number = useSelector((state: StoreState) => state.HEADER_HEIGHT) as number;
    // const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const ref = useRef<SwiperRef>();
    const [imgIndex, setImgIndex] = useState(0);
    const [videoRef, setVideoRef] = useState(null);
    return (
        <ViewStyled className={'w-full h-full relative flex flex-col justify-center'}>
            <Swiper
                ref={ref}
                initialSlide={initialSlide}
                className={viewClass}
                slidesPerView={1}
                spaceBetween={20}
                setWrapperSize={true}
                onSnapIndexChange={(swiper) => {
                    if (videoRef !== null) {
                        videoRef.pause();
                    }
                    setImgIndex(swiper.realIndex)
                }
                }
                navigation={{
                    nextEl: '.swiper-button-next-',
                    prevEl: '.swiper-button-prev-'
                }}
                modules={[Navigation]}
            >
                {srcList.map((item, index) => {
                    return (
                        <SwiperSlide className={'flex items-center'} key={index}>
                            {item.type === 1 ? <img src={item.res_url} className={'w-full h-full object-contain'}/> :
                                <video className={'w-full h-full object-contain'} controls={true} onPlay={(e) => {
                                    setVideoRef(e.currentTarget);
                                }
                                } src={item.res_url}/>}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className={'bg-black h-[5.25rem] w-full absolute bottom-0 flex items-center justify-center space-x-3 overflow-x-auto'}>
                {thumbs.map((item, index) => {
                    return (
                        <img key={index} src={item.img_url}
                             className={`w-[2.88rem] h-[2.88rem] object-cover box-content ${imgIndex === index ? 'img-activate' : ''}`}
                             onClick={
                                 () => {
                                     ref.current.swiper.slideTo(index);
                                 }
                             }/>
                    )
                })}
            </div>
            <img src={preImg}
                 className={'swiper-button-prev- w-[2.5rem] h-[2.5rem] object-cover absolute top-1/2 left-10 -translate-y-1/2 cursor-pointer z-10'}/>
            <img src={nextImg}
                 className={'swiper-button-next- w-[2.5rem] h-[2.5rem] object-cover absolute top-1/2 right-10 -translate-y-1/2 cursor-pointer z-10'}/>
            <div className={'absolute top-10 right-10 flex space-x-10 z-10'}>
                <img src={closeImg} onClick={close} className={'w-[2.5rem] h-[2.5rem] object-cover cursor-pointer'}/>
            </div>
        </ViewStyled>
    )
}
const ViewStyled = styled.div`
  .img-activate {
    border: 0.25rem solid #6F19F7;
  }
`;
const PreView = ({item, index, setIndex, setOpen, className}) => {
    const [enter, setEnter] = useState(false);
    return (
        <Styled
            className={`overflow-hidden cursor-pointer rounded-lg relative ${className}`}
            onMouseEnter={() => {
                setEnter(true);
            }}
            onMouseLeave={() => {
                setEnter(false);
            }}
        >
            <img src={item.img_url}
                 onClick={() => {
                     setIndex(index);
                     setOpen(true);
                     setEnter(false);
                 }}
                 className={`object-center object-contain w-full h-full transition duration-[350ms] ${enter ? 'scale-105' : ''}`}
                 alt={''}
            />

            {item.res_type === 2 && <img src={playImg}
                                         className={'w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto z-10 pointer-events-none'}
                                         alt={''}/>}
        </Styled>
    )
}
// type 1: image type 2: video
export default function PreviewModal({list = [], preViewClass = 'w-[13.06rem] h-[8.13rem]',viewClass='w-[70vw] h-[70vh]'}) {
    const [open, setOpen] = useState(false);
    const [srcList, setSrcList] = useState([]);
    const [thumbs, setThumbs] = useState([]);
    const [index, setIndex] = useState(0);
    useMount(() => {
        // console.log(list)
        setSrcList(_.map(list, (e) => {
            return {
                res_url: e.res_url,
                type: e.res_type
            };
        }));
        setThumbs(_.map(list, (e) => {
            return {
                img_url: e.img_url,
                type: e.res_type
            };
        }))
    })
    return (
        <>
            {list.map((item, index_) => {
                // console.log(item)
                return (
                    <PreView key={index_} item={item} setOpen={setOpen} setIndex={setIndex} index={index_}
                             className={preViewClass}/>
                )
            })}


            <Modal open={open} onClose={() => {
                setOpen(false)
            }}>
                <Box sx={boxStyle}>
                    <View initialSlide={index} srcList={srcList} thumbs={thumbs} viewClass={viewClass} close={() => {
                        setOpen(false)
                    }}/>
                </Box>
            </Modal>

        </>

    )
}

const Styled = styled.div`
  .mask {
    background: rgba(0, 0, 0, 0.5);
  }
`;
