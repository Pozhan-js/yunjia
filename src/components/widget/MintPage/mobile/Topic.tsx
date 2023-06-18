import styled from 'styled-components'
import Button from "@/components/widget/Button";
import CountDownS from "@/components/widget/MintPage/mobile/CountDownS";
import $T from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Discount from "@/components/mobile/widget/Discount";
import Power from "@/components/mobile/widget/Power";
import { useMount } from "ahooks";
import BigNumber from "bignumber.js";
import ethImg from '@/assets/images/ETH@2x.png';
import powerBgImg from '@/assets/images/power_bg.png';
import topicBg from "@/assets/images/MintPage/mobile/topic_bg.png";

export default function Topic({ item }) {
    const [status, setStatus] = useState('');
    const [btnName, setBtnName] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const navigate = useNavigate();
    useMount(() => {
        if (item.discount > 0) {
            setDiscountPrice($T.formatETHPrice((BigNumber(1).minus(BigNumber(item.discount).div(100))).multipliedBy(item.price).toNumber(), ''));
        }
        switch (item?.runningstatus) {
            case 0:
                setStatus("Mint Count Down")
                setBtnName('Coming Soon')
                break;
            case 1:
                setStatus("Mint End In")
                setBtnName('Mint Now')
                break;
            case 2:
                setStatus("Mint End")
                setBtnName('Mint End')
                break;

        }

    })
    return (
        <Styled className={'mt-6'}>
            <div className={'w-full  overflow-hidden'}>
                <div className={' text-2xl uppercase font-extrabold leading-[1.76rem] font-msrb'}>{item.title}</div>
                <div className={' mt-3 text-sm text-white opacity-60 text-[0.88rem] font-gtwalp leading-[1.13rem]'}>
                    {item.desc}
                </div>
                {item.countdown.day > 7 && item?.runningstatus !== 1 ?
                    <div
                        className={'font-normal text-sm text-[#4CAD6D] leading-[1.03rem] bg-clip-text mt-5 flex  items-start justify-start '}>
                        <div>{item.startdate.split('(')[1].replace(')', '')}</div>
                        <div>{item.startdate.split('(')[0]}</div>
                    </div>
                    : <div className={'font-normal text-sm text-[0.88rem] font-gtwal text-[#4CAD6D] leading-[1.03rem] bg-clip-text mt-5'}>
                        {item.startdate}
                    </div>
                }
                <CountDownS countdown={item.countdown.cdsec} />

                <div className=' relative  mg-card  p-5 overflow-hidden mt-4 '>
                    <Discount
                        className={'absolute -rotate-45 top-[1rem] -left-[2.8rem]'}>{item?.discount}</Discount>
                    <div className=' flex flex-col justify-center items-center'>
                        <img onClick={() => {
                            navigate('/clubs/' + item.clubid);
                        }} src={item?.nftimg} className={' h-[14.375rem] object-cover cursor-pointer'} />
                        <div className={'flex justify-center items-center w-[10.94rem] h-[2.25rem] bg-cover mt-[0.375rem]'}
                            style={{ backgroundImage: `url(${powerBgImg})` }}>
                            <Power item={item} />
                        </div>
                    </div>
                    <div className={' text-2xl text-center mt-4 font-gtwalmp '}>{item.title}</div>
                    <div className='flex justify-center items-center mg-supply mx-auto mt-3'>
                        <div className=' w-1/2 text-center text-xs'>
                            <div className=' font-ggm text-xl h-7'> {item.curcount} </div>
                            <div className='text-white text-opacity-40'>Supply</div>
                        </div>
                        <div className='mg-supply-sep'></div>
                        <div className=' w-1/2'>
                            <div className=' flex justify-center items-center text-xl text-white font-ggm  h-7'>
                                {item.discount > 0 ? <>
                                    <img src={ethImg} className={'w-4 h-4 object-cover'} />
                                    <div className={'ml-1 leading-6 bg-clip-text'}>
                                        {discountPrice}
                                    </div>
                                    <div
                                        className={'ml-2  bg-clip-text text-base text-white font-gtwalp  text-opacity-40  line-through'}>
                                        {$T.formatETHPrice(item.price, '')}
                                    </div>
                                </> :
                                    <>
                                        <img src={ethImg} className={'w-4 h-4 object-cover'} />
                                        <div
                                            className={'ml-1 text-white text-base leading-6 bg-clip-text'}>
                                            {$T.formatETHPrice(item.price, '')}
                                        </div>
                                    </>
                                }
                            </div>
                            <div className=' text-center  text-xs text-white text-opacity-40'>Price</div>
                        </div>
                    </div>
                    <div className=' flex justify-center items-center mt-3 '>
                        <button disabled={!(item?.runningstatus === 1)} onClick={() => {
                            navigate(`/mint_detail/${item.id}`)
                        }}
                            className={`w-full h-[2.75rem] bg-[#B902FD] text-white disabled:bg-[#7B3C93] rounded-lg text-base font-gtwalb ${!(item?.runningstatus === 1) && 'text-opacity-60'}`}>
                            {btnName}
                        </button>
                    </div>
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
.mg-card{
    background-image:url(${topicBg});
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 0.625rem;
   .mg-supply {
    width: 100%;
    height: 4rem;
    background: rgba(0,0,0,0.2);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    .mg-supply-sep{
        height: 1.25rem;
        width: 0;
        border-left: 0.03rem solid rgba(255,255,255,0.16);
    }
  }
}
`;
