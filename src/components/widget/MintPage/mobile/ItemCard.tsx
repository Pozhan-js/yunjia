import styled from 'styled-components';
import CountDown from "@/components/widget/MintPage/mobile/CountDown";
import ethImg from '@/assets/images/ETH@2x.png';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useMount } from "ahooks";
import $T from "@/utils/utils";
import Discount from "@/components/mobile/widget/Discount";
import powerBgImg from "@/assets/images/power_bg.png";
import Power from "@/components/mobile/widget/Power";
import BigNumber from "bignumber.js";
import Image from "@/components/widget/Image";

export default function ItemCard({ item }) {
    const [btnName, setBtnName] = useState('');
    const navigate = useNavigate();
    const [count, setCount] = useState(-1);
    const [btnDisable, setBtnDisable] = useState(false);
    const [discountPrice, setDiscountPrice] = useState('');
    useEffect(() => {
        if (item?.runningstatus !== 1 && count > 0) {
            setBtnDisable(true);
        }
    }, [count])
    useMount(() => {
        if (item.discount > 0) {
            setDiscountPrice($T.formatETHPrice((BigNumber(1).minus(BigNumber(item.discount).div(100))).multipliedBy(item.price).toNumber(), ''));
        }
        switch (item?.runningstatus) {
            case 0:
                setBtnName('Coming Soon')
                break;
            case 1:
                setBtnName('Mint Now')
                break;
            case 2:
                setBtnName('Mint End')
                break;

        }
    });

    return (
        <Styled className={'w-full  overflow-hidden mt-[3.75rem]'}>
            <div className={' text-2xl uppercase font-extrabold leading-[1.76rem] font-msrb '}>{item.title}</div>
            <div className={' mt-3 text-sm text-white opacity-60 text-[0.88rem] font-gtwalp leading-[1.13rem]'}>
                {item.desc}
            </div>
            {item.countdown.day > 7 && item?.runningstatus !== 1 ?
                <div
                    className={'font-normal text-sm text-[#4CAD6D] leading-[1.03rem] bg-clip-text mt-5 flex  items-start justify-start '}>
                    <div>{item.startdate.split('(')[1].replace(')', '')}</div>
                    <div>{item.startdate.split('(')[0]}</div>
                </div>
                : <div className={'font-normal text-sm text-[#4CAD6D] leading-[1.03rem] bg-clip-text mt-5'}>
                    {item.startdate}
                </div>
            }
            <CountDown className='' countdown={item.countdown.cdsec} setCount={setCount}
                hidden={!((item.countdown.day < 7 || item?.runningstatus === 1))} />

            <div className=' relative  mg-card  p-5 overflow-hidden mt-4 '>
                <Discount
                    className={'absolute -rotate-45 top-[1rem] -left-[2.8rem]'}>{item?.discount}</Discount>
                <div className=' flex flex-col justify-center items-center'>
                    <Image onClick={() => {
                        navigate('/clubs/' + item.clubid);
                    }} src={item?.nftimg} className={' h-[14.375rem] object-cover cursor-pointer'} />
                    <div className={'flex justify-center items-center w-[10.94rem] h-[2.25rem] bg-cover mt-[0.375rem]'}
                        style={{ backgroundImage: `url(${powerBgImg})` }}>
                        <Power item={item} />
                    </div>
                </div>
                <div className={' text-xl text-center font-gtwalmp  mt-4 '}>{item.title}</div>
                <div className='flex justify-center items-center mg-supply mx-auto  mt-3'>
                    <div className=' w-1/2 text-center text-xs'>
                        <div className='text-xl text-white font-ggm  h-7'> {item.curcount} </div>
                        <div className=' text-white text-opacity-40'>Supply</div>
                    </div>
                    <div className='mg-supply-sep'></div>
                    <div className=' w-1/2'>
                        <div className=' flex justify-center items-center text-xl text-white font-ggm  h-7'>
                            {item.discount > 0 ? <>
                                <img src={ethImg} className={'w-4 h-4 object-cover'} />
                                <div className={'ml-1  leading-6 bg-clip-text'}>
                                    {discountPrice}
                                </div>
                                <div
                                    className={'ml-2  text-base  text-white font-gtwalp leading-6 bg-clip-text text-opacity-40 line-through'}>
                                    {$T.formatETHPrice(item.price, '')}
                                </div>
                            </> :
                                <>
                                    <img src={ethImg} className={'w-4 h-4 object-cover'} />
                                    <div
                                        className={'ml-1 leading-6 bg-clip-text'}>
                                        {$T.formatETHPrice(item.price, '')}
                                    </div>
                                </>
                            }
                        </div>
                        <div className=' text-center text-xs text-white text-opacity-40'>Price</div>
                    </div>
                </div>
                <div className=' flex justify-center items-center mt-3 '>
                    <button disabled={btnDisable} onClick={() => {
                        navigate(`/mint_detail/${item.id}`)
                    }}
                        className={`w-full h-[2.75rem] bg-[#B902FD] text-white disabled:bg-[#7B3C93] rounded-lg text-base font-gtwalb ${btnDisable && 'text-opacity-60'}`}>
                        {btnName}
                    </button>
                </div>

            </div>
        </Styled>
    )
}
const Styled = styled.div`

.mg-card{
    /* background: #17171A; */
    background: rgba(69, 51, 139, 0.45);
    border-radius: 0.625rem;
    border: 0.06rem solid #33333C;
   .mg-supply {width:100%;
    height: 4rem;
    background: rgba(255,255,255,0.04);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    .mg-supply-sep{
        height: 1.25rem;
        width: 0;
        border-left: 0.03rem solid rgba(255,255,255,0.16);
    }

  }
}
`;


/*

   return (
        <Styled className={'w-full flex items-center relative overflow-hidden'}>
            <Discount
                className={'absolute -rotate-45 top-[1rem] -left-[2rem]'}>{item?.discount}</Discount>

            <div className={'flex flex-col items-center ml-[2.75rem]'}>
                <img onClick={() => {
                    navigate('/clubs/' + item.clubid);
                }} src={item?.nftimg} className={'w-[8.67rem] h-[12.5rem] object-cover cursor-pointer'}/>
                <div className={'flex justify-center items-center w-[10.94rem] h-[2.25rem] bg-cover'}
                     style={{backgroundImage: `url(${powerBgImg})`}}>
                    <Power item={item}/>
                </div>
            </div>

            <div className={'flex flex-col h-full ml-[2.19rem]'}>
                <div className={'title bg-clip-text mt-[3.13rem]'}>{item.title}</div>
                <div className={'content bg-clip-text mt-6 line-clamp-5'}>
                    {item.desc}
                </div>
            </div>
            <div className={'flex flex-col items-end ml-auto mr-[3.13rem]'}>
                <CountDown countdown={item.countdown.cdsec} setCount={setCount}
                           hidden={!((item.countdown.day < 7 || item?.runningstatus === 1))}/>
                {item.countdown.day > 7 && item?.runningstatus !== 1 ?
                    <div
                        className={'font-normal text-sm text-[#4CAD6D] leading-6 bg-clip-text mt-2 flex flex-col items-end'}>
                        <div>{item.startdate.split('(')[1].replace(')', '')}</div>
                        <div>{item.startdate.split('(')[0]}</div>
                    </div>
                    : <div className={'font-normal text-sm text-[#4CAD6D] leading-6 bg-clip-text mt-2'}>
                        {item.startdate}
                    </div>
                }

                <div className={'font-normal text-sm leading-6 text-white bg-clip-text mt-2'}>
                    {item.curcount} Total
                </div>
                <div className={'flex items-center mt-2'}>
                    {item.discount > 0 ? <>
                            <div
                                className={'mr-2 text-white font-gtwalb leading-6 bg-clip-text text-opacity-40 text-sm line-through'}>
                                {$T.formatETHPrice(item.price)}
                            </div>

                            <img src={ethImg} className={'w-4 h-4 object-cover'}/>
                            <div className={'ml-1 text-base text-white font-gtwalb leading-6 bg-clip-text'}>
                                {discountPrice}
                            </div>
                        </> :
                        <>
                            <img src={ethImg} className={'w-4 h-4 object-cover'}/>
                            <div
                                className={'ml-1 text-white text-base font-gtwalb leading-6 bg-clip-text'}>
                                {$T.formatETHPrice(item.price)}
                            </div>
                        </>
                    }
                </div>
                <button disabled={btnDisable} onClick={() => {
                    navigate(`/mint_detail/${item.id}`)
                }}
                        className={`w-[14.38rem] h-[2.75rem] bg-[#6F19F7] text-white disabled:bg-[#3A2161] rounded-lg mt-8 text-base font-gtwalb ${btnDisable && 'text-opacity-60'}`}>
                    {btnName}
                </button>
            </div>
            </Styled>
            )
        }
        const Styled = styled.div`
          height: 17.63rem;
          background: #17171A;
          border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
          opacity: 1;
          border: 0.06rem solid #33333C;

          .title {
            height: 1.5rem;
            font-size: 1.56rem;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 1.5rem;
          }

          .content {
            width: 33rem;
            height: 6.25rem;
            font-size: 1rem;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 1.25rem;
            opacity: .6;
          }
        `;
        */
