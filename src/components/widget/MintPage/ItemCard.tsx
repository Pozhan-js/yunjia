import styled from 'styled-components';
import CountDown from "@/components/widget/MintPage/CountDown";
import ethImg from '@/assets/images/ETH@2x.png';
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useMount} from "ahooks";
import $T from "@/utils/utils";
import Discount from "@/components/widget/Discount";
import powerBgImg from "@/assets/images/power_bg.png";
import Power from "@/components/widget/Power";
import BigNumber from "bignumber.js";
import theme from '@/config/themeSetting';
import PowerBg from "@/components/widget/PowerBg";
import Image from "@/components/widget/Image";

export default function ItemCard({item}) {
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
            setDiscountPrice($T.formatETHPrice((BigNumber(1).minus(BigNumber(item.discount).div(100))).multipliedBy(item.price).toNumber()));
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
        <Styled
            style={{backgroundColor: theme.mintPage.mintListItem.bgColor}}
            className={'w-full flex items-center relative overflow-hidden'}>
            <Discount
                className={'absolute -rotate-45 top-[1rem] -left-[2rem]'}>{item?.discount}</Discount>

            <div className={'flex flex-col items-center ml-[2.75rem]'}>
                <Image
                    onClick={() => {
                        navigate('/clubs/' + item.clubid);
                    }} src={item?.nftimg} className={'w-[8.67rem] h-[12.5rem] object-cover cursor-pointer'}/>

                <PowerBg item={item}/>
            </div>

            <div className={'flex flex-col h-full ml-[2.19rem]'}>
                <div className={'title bg-clip-text mt-[3.13rem]'}>{item.title}</div>
                <div className={'content bg-clip-text mt-6 line-clamp-5'}>
                    {item.desc}
                </div>
            </div>
            <div className={'flex flex-col items-end ml-auto mr-[3.13rem]'}>
                <CountDown countdown={item.countdown.cdsec} setCount={setCount}
                           hidden={!((item.countdown.day < 7 || item?.runningstatus === 1))} className={''}/>
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
                        style={{backgroundColor: !btnDisable ? theme.nftBigBtn.color : theme.nftBigBtn.disableColor}}
                        className={`w-[14.38rem] h-[2.75rem] text-white rounded-lg mt-8 text-base font-gtwalb ${btnDisable && 'text-opacity-60'}`}>
                    {btnName}
                </button>
            </div>
            {/*<Footer/>*/}
        </Styled>
    )
}
const Styled = styled.div`
  height: 17.63rem;
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
