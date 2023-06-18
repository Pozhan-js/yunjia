import styled from 'styled-components';
import assets from '../Assets';
import { useEffect, useState } from "react";
import { useMount, useUpdateEffect } from "ahooks";
import { useNavigate } from "react-router-dom";
import Discount from "@/components/mobile/widget/Discount2";
import BigNumber from "bignumber.js";
import PowerBg from "@/components/widget/PowerBg";
import _ from 'lodash';
import Image from "@/components/widget/Image";
import theme from "@/config/themeSetting";

export default function NftCard({ item }) {
    const [price, setPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState(0);
    const [status, setStatus] = useState(-1);
    const [btnName, setBtnName] = useState('Mint Now');
    const navigate = useNavigate();

    useMount(() => {
        setPrice(item.price)
        if (item.discount > 0) {
            setDiscountPrice((BigNumber(1).minus(BigNumber(item.discount).div(100))).multipliedBy(item.price).toNumber());
        }
        if (_.has(item, 'mintstatus')) {
            setStatus(item.mintstatus);
        }
        if (_.has(item, 'runningstatus')) {
            setStatus(item.runningstatus);
        }

    })
    useUpdateEffect(() => {
        switch (status) {
            case 0:
                setBtnName('Mint Soon');
                break;
            case 1:
                setBtnName('Mint Now');
                break;
            case 2:
                setBtnName('Mint End');
                break;
        }
    }, [status])

    return (
        <div className={'flex flex-col items-center w-full mb-12'}>
            <div className={'line-clamp-2 text-white text-sm text-center text-opacity-80'}>{item.desc}</div>
            <NftCardStyled {...theme.nftBigBtn} mintstatus={status}
                className={'font-gtwal w-full mt-6 overflow-hidden relative backdrop-blur-[5rem]  rounded'}>
                <Discount className={'absolute scale-[90%] -rotate-45 translate-y-1/2 -translate-x-1/4 -left-2 -top-2'}>{item.discount}</Discount>
                <div className={'flex flex-col items-center'}>
                    <div className={'flex flex-col items-center'}>
                        <Image src={item.nftimg}
                            className={'mt-6 object-cover cursor-pointer w-[8.88rem] h-[12.94rem]'}
                            onClick={() => {
                                navigate(`/clubs/${item.clubid}`)
                            }} />
                        <PowerBg item={item} />
                    </div>

                    <div className={'flex flex-col mt-5 w-full items-center'}>
                        {/*<div className={'flex items-center'}>*/}
                        {/*    <img src={assets.icAuthenticationImg} className={'h-4 w-4'}/>*/}
                        {/*    <p className={'ml-1 text-1'}>Jockey Club</p>*/}
                        {/*</div>*/}
                        <div className={'flex items-center'}>
                            <p className={'text-[1.56rem] leading-8 text-white truncate max-w-[12rem] font-gtwalm mr-4'}>{item.title}</p>
                            {/*<img src={assets._2ndImg} className={'ml-[1.38rem] w-[1.94rem] h-[1.13rem] object-cover'}/>*/}
                            <div
                                className={'bg-gradient-to-r text-white text-sm from-[#0040F8] to-[#F14BCD] px-2 h-[1.13rem] flex items-center justify-center rounded-[0.25rem]'}>
                                {item.subtitle}
                            </div>
                        </div>
                        <div className={'box flex items-center mt-3 justify-center'}>
                            <div className={'flex flex-1 flex-col items-center'}>
                                <div className={'text-white font-gtwalmp text-[1.25rem] leading-[1.6rem]'}>{item.curcount}</div>
                                <div
                                    className={'text-white text-[0.75rem] font-gtwalp font-normal text-opacity-40'}>Supply
                                </div>
                            </div>
                            <div className={'divider'}></div>
                            <div className={'flex flex-1 flex-col items-center'}>
                                <div className={'flex flex-row items-center leading-[1.75rem]'}>
                                    {item.symbol.toUpperCase() === 'ETH' ?
                                        <img src={assets.ethImg} className={'w-4 h-4'} /> :
                                        <img src={assets.omhImg} className={'w-4 h-4'} />}
                                    {item.discount > 0 ?
                                        (<>
                                            <div
                                                className={'ml-1 text-white font-gtwalmp text-[1.25rem] whitespace-nowrap'}>{discountPrice}</div>
                                            <div
                                                className={'ml-2 text-white font-gtwalp text-base text-opacity-40 line-through whitespace-nowrap'}>{price}</div>
                                        </>) :
                                        <div className={'ml-1 text-white font-gtwalm text-base'}>{price}</div>
                                    }
                                </div>
                                <div
                                    className={'text-white text-[0.75rem] font-gtwalp font-normal text-opacity-40'}>Price
                                </div>
                            </div>
                        </div>

                        <button onClick={() => {
                            navigate(`/mint_detail/${item?.id}`)
                        }}
                            className={`${status === 1 ? 'nft-btn' : 'nft-btn text-opacity-60'} text-white mt-3 outline-none rounded text-[1.25rem] font-msrb`}
                            disabled={status !== 1}>{btnName}</button>
                    </div>
                </div>
            </NftCardStyled>
        </div>

    )

}
const NftCardStyled = styled.div<any>`
  height: 30rem;
  /* background: rgba(37, 35, 39, 0.38);
  border: 0.03rem solid rgba(255, 255, 255, 0.24); */
  background: rgba(129, 81, 232, 0.26);
  box-shadow: 0px 0.25rem 2.5rem rgba(17, 9, 48, 0.55);

  .nft-btn {
    width: 18.75rem;
    height: 3rem;
    /* background: linear-gradient(180deg, #FFD357 0%, #FF7E15 51%, #EB3900 100%); */
    opacity: 1;
    background: ${(props: any) => {
      if (props.mintstatus) {
        return props.color
      } else {
        return props.disableColor
      }
    }};
  }

  .nft-btn-disable {
    width: 18.75rem;
    height: 3rem;
    opacity: 1;
  }


  .box {
    width: 18.44rem;
    height: 4rem;
    background: rgba(57, 44, 79, 0.38);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .divider {
    width: 0rem;
    height: 1.38rem;
    opacity: 1;
    border: 0.03rem solid rgba(255, 255, 255, 0.16);
  }


`
