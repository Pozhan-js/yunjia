import styled from 'styled-components'
import topicBg from "@/assets/images/MintPage/topicBg.jpg";
import Button from "@/components/widget/Button";
import CountDownS from "@/components/widget/MintPage/CountDownS";
import $T from "@/utils/utils";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Discount from "@/components/widget/Discount";
import ethImg from '@/assets/images/ETH@2x.png';
import powerBgImg from '@/assets/images/power_bg.png';
import Power from "@/components/widget/Power";
import {useMount} from "ahooks";
import BigNumber from "bignumber.js";
import theme from '@/config/themeSetting';
import PowerBg from "@/components/widget/PowerBg";

export default function Topic({data}) {
    const [status, setStatus] = useState('');
    const [btnName, setBtnName] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const navigate = useNavigate();
    useMount(() => {
        if (data.discount > 0) {
            setDiscountPrice($T.formatETHPrice((BigNumber(1).minus(BigNumber(data.discount).div(100))).multipliedBy(data.price).toNumber()));
        }
        switch (data?.runningstatus) {
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
        <Styled
            style={{background: theme.mintPage.topic.bgColor}}
            className={'h-[25rem] bg-cover bg-center bg-no-repeat overflow-hidden outline-none mb-6 rounded-lg'}>
            {/*<img src={topicBg} className={'h-[32.15vw]'}/>*/}
            <div className={'h-full relative overflow-hidden flex py-[2.75rem]'}>
                <Discount
                    className={'absolute -rotate-45 top-[1rem] -left-[2rem]'}>{data?.discount}</Discount>
                <div>
                    <div className={'flex flex-col relative pl-[5rem]'}>
                        <p className={'topic-title m-0 truncate font-msrb'}>{data?.title}</p>
                        <p className={'mt-1 content text-white text-opacity-60'}>
                            {data?.desc}
                        </p>
                        <div className={'flex justify-between'}>
                            <div className={'flex flex-col mt-[1.25rem]'}>
                                <div className={'text-white font-normal text-sm leading-6 h-6'}>{data?.curcount} Total
                                </div>
                                <div className={'flex items-center font-bold h-6 text-base text-white mt-2'}>
                                    <img src={ethImg} className={'bg-cover w-[1.13rem] h-[1.13rem]'}/>
                                    {data.discount > 0 ?
                                        <>
                                            <div
                                                className={'ml-2 font-gtwalb text-white text-base'}>{discountPrice}</div>
                                            <div
                                                className={'ml-2 font-gtwalb text-white line-through text-opacity-40 text-sm'}>{$T.formatETHPrice(data?.price)}</div>
                                        </> :
                                        <div
                                            className={'ml-2 font-gtwalb text-white text-base'}>{$T.formatETHPrice(data?.price)}</div>
                                    }

                                </div>

                                <button disabled={!(data?.runningstatus === 1)} onClick={() => {
                                    navigate(`/mint_detail/${data?.id}`)
                                }}
                                        style={{backgroundColor: data?.runningstatus === 1 ? theme.nftBigBtn.color : theme.nftBigBtn.disableColor}}
                                        className={` w-[14.38rem] h-[2.75rem] text-white rounded-lg mt-8 text-base font-gtwalb ${data?.runningstatus !== 1 && 'text-opacity-60'}`}>
                                    {btnName}
                                </button>
                            </div>

                            <div className={'flex flex-col mt-5 ml-32'}>
                                <p className={'countdown-title'}>
                                    {status}
                                </p>
                                <p className={'countdown-time mt-1'}>{data?.startdate}</p>
                                <CountDownS countdown={data?.countdown.cdsec}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'mx-auto flex flex-col items-center'}>
                    <img onClick={() => {
                        navigate('/clubs/' + data?.clubid)
                    }} src={data?.nftimg} className={'w-[12.75rem] h-[18.31rem] object-cover cursor-pointer'} alt={''}/>
                    {/*<div className={'flex justify-center items-center w-[10.94rem] h-[2.25rem] bg-cover'}*/}
                    {/*     style={{backgroundImage: `url(${powerBgImg})`}}>*/}
                    {/*    <Power item={data}/>*/}
                    {/*</div>*/}
                    <PowerBg item={data}/>
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .countdown-title {
    height: 1.13rem;
    font-size: 0.88rem;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 1.03rem;
    -webkit-background-clip: text;
  }

  .countdown-time {
    height: 1.13rem;
    font-size: 0.88rem;
    font-weight: 400;
    color: #4CAD6D;
    line-height: 1.03rem;
    -webkit-background-clip: text;
  }

  .topic-title {
    font-size: 3rem;
    font-weight: 800;
    color: #FFFFFF;
    -webkit-background-clip: text;
  }

  .content {
    width: 40.81rem;
    height: 4.63rem;
    font-size: 0.81rem;
    font-weight: 400;
    line-height: 1.13rem;
  }

  .btn-border {
    width: 14.38rem;
    height: 2.75rem;
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
    opacity: 1;
    border: 0.13rem solid #FFFFFF;
  }
`;
