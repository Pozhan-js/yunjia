import styled from 'styled-components';
import asset from '@/components/widget/HomePage/MorePicks/Assets';
import $T from '@/utils/utils';
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useMount} from "ahooks";
import Discount from "@/components/widget/Discount";
import Power from "@/components/widget/Power";
import BigNumber from "bignumber.js";
import theme from '@/config/themeSetting';
import Image from "@/components/widget/Image";

export default function NftCard({item}) {
    const navigate = useNavigate();
    const [btnName, setBtnName] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    useMount(() => {
        if (item.discount > 0) {
            setDiscountPrice($T.formatETHPrice((BigNumber(1).minus(BigNumber(item.discount).div(100))).multipliedBy(item.price).toNumber()));
        }
        switch (item.runningstatus) {
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
    })
    // @ts-ignore
    return (<Styled {...theme.nftSmallBtn} runningstatus={item.runningstatus} className={'flex flex-col'}>
        <div style={{
                backgroundImage: `url(${asset.nftBgImg})`
            }}
            className={'font-gtwalm flex flex-col items-center w-[13.75rem] h-[20.88rem] bg-cover relative overflow-hidden'}>
            <Image src={item?.nftimg}
                   className={'w-[8.2rem] object-cover h-[13rem] absolute left-1/2 -translate-x-1/2 top-[5%] cursor-pointer mt-1'}
                   onClick={() => {
                       navigate(`/clubs/${item?.clubid}`)
                   }}
            />
            {item.discount < 100 &&
                <Discount className={'-rotate-45 absolute -left-[2.2rem] top-[0.8rem]'}>{item.discount}</Discount>}
            <div className={'flex flex-col w-full absolute px-5 bottom-4'}>

                <div className={'flex justify-center items-center h-[2.25rem] bg-cover'}>
                    <Power item={item}/>
                </div>

                <div className={'flex flex-1 flex-row items-center justify-between text-sm mt-5'}>
                    <div className={'text-white font-gtwal'}>Total</div>
                    <div className={'flex items-center font-medium text-[#26C356]'}>
                        {item.mintcount}
                        /
                        <div className={'text-white'}>{item.totalnft}</div>
                    </div>
                </div>

                <div className={'flex flex-row items-center justify-between mt-1 text-sm'}>
                    <div className={'text-white font-gtwal'}>Price</div>
                    <div className={'flex items-center'}>
                        {item.discount > 0 ? <>
                            <div
                                className={'text-[0.75rem] text-white font-gtwal line-through text-opacity-40'}>{$T.formatETHPrice(item?.price)}</div>
                            <div className={'text-2 font-gtwalb ml-2'}>{discountPrice}</div>
                        </> : <div className={'text-2 font-gtwalb'}>{$T.formatETHPrice(item?.price)}</div>}

                    </div>
                </div>

            </div>
        </div>

        <button
            disabled={item.runningstatus !== 1}
            onClick={() => {
                navigate(`/mint_detail/${item?.id}`)
            }}
            className={`text-white text-base font-gtwalmp mt-6 mb-4 rounded-lg mx-auto nft-btn ${item.runningstatus !== 1 && 'bg-opacity-60 text-opacity-60'}`}>{btnName}
        </button>

    </Styled>)
}
const Styled = styled.div`
  position: relative;

  .nft-btn {
    width: 6.88rem;
    height: 2rem;

    background: ${(props: any) => {
      if (props.runningstatus === 1) {
        return props.color
      } else {
        return props.disableColor
      }

    }};
    //background: linear-gradient(180deg, #B902FD 0%, #6F19F7 100%);
    opacity: 1;
  }


  .text-2 {
    font-weight: 500;
    color: #B902FD;
  }

  .bottom-icon {
    width: 8rem;
    height: 2rem;
    background: linear-gradient(270deg, #0C0C0D 0%, #E11552 50%, #0C0C0D 100%);
    opacity: 1;

    .text-tip {
      font-size: 0.94rem;
      font-weight: 500;
      color: #FFFFFF;
      -webkit-background-clip: text;
    }
  }


`;
