import styled from 'styled-components';
import assets from './Assets';
import React, {useState} from "react";
import {useMount} from "ahooks";
import $T from '@/utils/utils';
import {useNavigate} from "react-router-dom";
import Discount from "@/components/widget/Discount";
// import cardImg from "@/assets/images/HotSales/card1.png";

import BigNumber from "bignumber.js";
import {Tooltip} from "@mui/material";
import PowerBg from "@/components/widget/PowerBg";
import theme from '@/config/themeSetting';
import Image from "@/components/widget/Image";

export default function NftCard({item}) {
    const [price, setPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [btnName, setBtnName] = useState('Mint Now');
    const navigate = useNavigate();

    useMount(() => {
        setPrice($T.formatETHPrice(item.price))
        if (item.discount > 0) {
            setDiscountPrice($T.formatETHPrice((BigNumber(1).minus(BigNumber(item.discount).div(100))).multipliedBy(item.price).toNumber()));
        }

        switch (item.mintstatus) {
            case 0:
                setBtnName('Mint Soon');
                break;
            case 1:
                setBtnName('Mint Now');
                break;
            case 2:
                setBtnName('Mint End');
                break;
            // default:
            //     setBtnName('Mint Now');
            //     break;
        }
    })

    return (
        // @ts-ignore
        <NftCardStyled {...theme.nftBigBtn} mintstatus={item.mintstatus}
                       className={'font-gtwal overflow-hidden relative backdrop-blur-[5rem] bg-contain border-[0.03rem] border-white border-opacity-10 rounded-[1.25rem]'}>
            {/*<img src={assets.rightIconImg} className={'absolute w-25 h-25'}/>*/}
            <Discount className={'absolute -rotate-45 translate-y-1/2 -translate-x-1/4'}>{item.discount}</Discount>
            <div className={'flex flex-row'}>
                <div className={'flex flex-col items-center'}>
                    <Image src={item.nftimg}
                           className={'horse_img mt-16 ml-[3rem] mr-8 object-cover object-center cursor-pointer h-[18rem] w-[13rem]'}
                           onClick={() => {
                               navigate(`/clubs/${item.clubid}`)
                           }}/>
                    <PowerBg item={item}/>
                </div>

                <div className={'flex flex-col mt-8'}>

                    <div className={'flex items-center mt-6 font-gtwalmp'}>
                        <Tooltip title={item.title} arrow={true}>
                            <p className={'text-2 truncate max-w-[22rem] mr-3'}>{item.title}</p>
                        </Tooltip>
                        <div
                            className={'bg-gradient-to-r self-start leading-4 text-white text-sm from-[#0040F8] to-[#F14BCD] py-1 px-2 h-[1.13rem] flex items-center justify-center rounded-[0.25rem]'}>
                            {item.subtitle}
                        </div>
                    </div>

                    <div
                        className={'mt-[1rem] mb-6 text-white text-opacity-50 font-gtwalp text-sm w-[28.3rem] leading-5 line-clamp-2'}>
                        {item.desc}
                    </div>

                    <div className={'rounded-none box py-4 px-6 border-box font-gtwalp'}>
                        <p className={'text-sm font-normal text-white mt-2'}>
                            Profile
                        </p>
                        <div className={'flex mt-[0.63rem]'}>
                            <div className={'flex flex-1 flex-col space-y-3.5  mr-[1.44rem]'}>
                                <div className="flex flex-1 justify-between">
                                    <div className={'text-white text-opacity-40 font-normal text-sm'}>Age (DOB)</div>
                                    <div className={'font-normal text-sm text-white'}>{item.age}</div>
                                </div>
                                <div className="flex flex-1 justify-between">
                                    <div className={'text-white text-opacity-40 font-normal text-sm'}>Sex</div>
                                    <div className={'font-normal text-sm text-white'}>{item.sex}</div>
                                </div>
                                <div className="flex flex-1 justify-between">
                                    <div className={'text-white text-opacity-40 font-normal text-sm'}>Color</div>
                                    <div className={'font-normal text-sm text-white'}>{item.color}</div>
                                </div>
                            </div>
                            <div className={'divider'}></div>
                            <div className={'flex flex-1 flex-col space-y-3.5  ml-[1.44rem]'}>
                                <div className="flex flex-1 justify-between">
                                    <div className={'text-white text-opacity-40 font-normal text-sm'}>Sire</div>
                                    <div className={'font-normal text-sm text-white'}>{item.sire}</div>
                                </div>
                                <div className="flex flex-1 justify-between">
                                    <div className={'text-white text-opacity-40 font-normal text-sm'}>Dam</div>
                                    <div className={'font-normal text-sm text-white'}>{item.dam}</div>
                                </div>
                                <div className="flex flex-1 justify-between">
                                    <div className={'text-white text-opacity-40 font-normal text-sm'}>Dam’s Sire</div>
                                    <div className={'font-normal text-sm text-white'}>{item.damsire}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'mt-4 flex justify-between'}>
                        <div className={'flex flex-col flex-1'}>
                            <div className={'flex items-center'}>
                                <div
                                    className={'flex text-sm text-white text-opacity-40 font-normal font-gtwalp w-[2.75rem]'}>Supply
                                </div>
                                <div
                                    className={'ml-2 text-white font-gtwalm text-base'}>{item?.curcount}</div>
                            </div>
                            <div className={'flex items-center'}>
                                <div
                                    className={'flex text-sm text-white text-opacity-40 font-normal font-gtwalp w-[2.75rem]'}>Price
                                </div>
                                <div className={'flex flex-row items-center ml-2'}>
                                    {item.symbol.toUpperCase() === 'ETH' ?
                                        <img src={assets.ethImg} className={'w-4 h-4'}/> :
                                        <img src={assets.omhImg} className={'w-4 h-4'}/>}
                                    {item.discount > 0 ?
                                        (<>
                                            <div
                                                className={'ml-1 text-white font-gtwalm text-base'}>{discountPrice}</div>
                                            <div
                                                className={'ml-2 text-white font-gtwalm text-base text-opacity-40 line-through '}>{price}</div>
                                        </>) :
                                        <div className={'ml-1 text-white font-gtwalm text-base'}>{price}</div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className={'flex-1 ml-4'}>
                            <button onClick={() => {
                                navigate(`/mint_detail/${item?.id}`)
                            }}
                                    className={`${item.mintstatus === 1 ? 'nft-btn' : 'nft-btn text-opacity-60'} text-white mb-2 outline-none rounded-[0.63rem] font-msrb font-extrabold text-[1.25rem] font-msrb`}
                                    disabled={item.mintstatus !== 1}>{btnName}</button>
                        </div>
                    </div>
                </div>
            </div>
        </NftCardStyled>
    )

}

const NftCardStyled = styled.div`
  width: 51.31rem;
  height: 29.81rem;
  //background: #252327;
  .nft-btn {
    width: 16.63rem;
    height: 3rem;
    background: ${(props: any) => {
      if (props.mintstatus) {
        return props.color
      } else {
        return props.disableColor
      }
    }};
    //opacity: 1;
  }

  .nft-btn-disable {
    width: 16.63rem;
    height: 3rem;
    background: linear-gradient(180deg, #857045 0%, #5E3523 100%);
    opacity: 1;
  }

  .text-1 {
    height: 1.5rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    background: linear-gradient(90deg, #A7CFFF 0%, #FFFFFF 51%, #B49AFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text-2 {
    font-size: 1.88rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1.5rem;
    -webkit-background-clip: text;
  }

  .text-gray {
    color: rgba(255, 255, 255, 0.4);
  }

  .box {
    width: 30.88rem;
    height: 10.38rem;
    background: rgba(255, 255, 255, 0.04);
    opacity: 1;
    border-radius: 0.375rem;
  }

  .divider {
    width: 0;
    opacity: 0.1;
    border: 0.03rem solid rgba(255, 255, 255, 0.4);
  }


`
