import styled from 'styled-components';
// import asset from '@/components/widget/HomePage/MorePicks/Assets.js';
import $T from '@/utils/utils';
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useMount} from "ahooks";
import Discount from "@/components/widget/Discount";
import Power from "@/components/widget/Power";
import BigNumber from "bignumber.js";
import nftBgImg from '@/assets/images/PersonalPage/mobile/nft_card_bg.png';
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
    return (<div className={'flex flex-col items-center'}>
            <Styled style={{backgroundImage: `url(${nftBgImg})`}}
                    className={'flex flex-col items-center w-[40vw] h-[60.65vw] overflow-hidden bg-contain bg-no-repeat bg-center box-border'}>
                <div
                    className={'font-gtwalm w-full flex flex-col items-center relative h-full'}>
                    <Image src={item?.nftimg}
                         className={'w-[6.13rem] h-[8.87rem] object-cover object-center cursor-pointer mt-3'}
                         onClick={() => {
                             navigate(`/clubs/${item?.clubid}`)
                         }}
                    />
                    {item.discount < 100 &&
                        <Discount
                            className={'-rotate-45 absolute scale-[70%] -left-[2.5rem] top-[0.5rem]'}>{item.discount}</Discount>}

                    <Power item={item} className={'scale-[80%]'}/>

                    <div className={'flex flex-row items-center justify-between text-[0.75rem] mt-auto w-full px-4'}>
                        <div className={'text-white font-gtwalp'}>Total</div>
                        <div className={'flex items-center font-medium text-[#26C356]'}>
                            {item.mintcount}
                            /
                            <div className={'text-white'}>{item.totalnft}</div>
                        </div>
                    </div>
                    <div className={'flex items-center justify-between text-[0.75rem] w-full py-1 px-4 box-border'}>
                        <div className={'text-white font-gtwalp'}>Price</div>
                        <div className={'flex items-center'}>
                            {item.discount > 0 ? <>
                                <div
                                    className={'text-white font-gtwal line-through text-opacity-40 whitespace-nowrap'}>{$T.formatETHPrice(item?.price)}</div>
                                <div
                                    className={'text-[#B902FD] font-gtwalb ml-1 whitespace-nowrap'}>{discountPrice}</div>
                            </> : <div className={'text-[#B902FD] font-gtwalb'}>{$T.formatETHPrice(item?.price)}</div>}
                        </div>
                    </div>
                </div>
            </Styled>
            <button
                disabled={item.runningstatus !== 1}
                onClick={() => {
                    navigate(`/mint_detail/${item?.id}`)
                }}
                className={`w-[95%] text-white text-base font-gtwalm mt-[0.88rem] mb-4 rounded ${item.runningstatus === 1 ? 'nft-btn' : 'bg-opacity-60 bg-[#6F19F7] text-opacity-60 h-[2.13rem]'}`}>{btnName}
            </button>
        </div>

    )
}
const Styled = styled.div`
  position: relative;
  .nft-btn {
    height: 2.13rem;
    background: #6F19F7;
    opacity: 1;
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
