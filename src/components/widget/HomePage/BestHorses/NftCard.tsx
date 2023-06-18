import styled from 'styled-components';
import assets from './Assets';
import React, {useState} from "react";
import CountDown from "@/components/widget/MintPage/CountDown";
import {useNavigate} from "react-router-dom";
import {useMount} from "ahooks";
import $T from "@/utils/utils";
import ethImg from "@/assets/images/ETH@2x.png";
import Discount from "@/components/widget/Discount";
import BigNumber from "bignumber.js";
import PowerBg from "@/components/widget/PowerBg";
import theme from '@/config/themeSetting'
import Image from "@/components/widget/Image";

export default function NftCard({item}) {
    // console.log(item);
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [btnName, setBtnName] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    useMount(() => {
        if (item.discount > 0) {
            setDiscountPrice($T.formatETHPrice((BigNumber(1).minus(BigNumber(item.discount).div(100))).multipliedBy(item.price).toNumber()));
        }
        switch (item.runningstatus) {
            case 0:
                setStatus("Mint count down")
                setBtnName('Coming Soon')
                break;
            case 1:
                setStatus("Mint end in")
                setBtnName('Mint Now')
                break;
            case 2:
                setStatus("Mint end in")
                setBtnName('Mint End')
                break;

        }
    })
    return (
        <Styled className={'flex flex-col items-center w-full'}>
            <p className={'text-[#999999] font-gtwalp leading-6 font-normal text-[1.13rem] bg-clip-text mt-[1.25rem] line-clamp-2 text-center px-[12rem]'}>
                {item.desc}
            </p>
            <div className={'flex flex-row px-4 py-4 mt-[3.5rem]'}>
                <div className={'flex flex-col mt-4'}>
                    <Image
                        src={item.nftimg}
                        className={'object-cover w-[16rem] h-[18.75rem] -mt-6 cursor-pointer'}
                        onClick={() => {
                            navigate('/clubs/' + item.clubid)
                        }}/>

                    <PowerBg item={item} bgColor={theme.homePage.BestHorses.powerBg}/>
                </div>
                <div className={'flex w-full flex-col ml-[4.56rem]'}>

                    <div className={'flex items-center h-[2rem] mt-4'}>
                        <div className={'flex flex-1 items-center mt-2'}>
                            <p className={'text-2 leading-8 leading-6 truncate max-w-[28rem] font-gtwal mr-3'}>{item.title}</p>
                            {/*<img src={assets._2ndImg}*/}
                            {/*     className={'ml-[1.38rem] w-[1.94rem] h-[1.13rem] object-cover'}/>*/}
                            <div
                                className={'bg-gradient-to-r self-start text-white text-sm from-[#0040F8] to-[#F14BCD] py-1 leading-4 px-2 h-[1.13rem] flex items-center justify-center rounded-[0.25rem]'}>
                                {item.subtitle}
                            </div>
                        </div>
                        <div className={'text-white flex flex-1 justify-end font-normal text-base'}>{item.startdate}
                        </div>
                    </div>
                    <div className={'flex flex-row justify-between font-gtwalp pt-[1.81rem]'}>
                        <div className={'flex flex-col'}>
                            <div
                                className={'box box-border flex flex-col px-[1.56rem] backdrop-blur-[5rem]'}>
                                <div className={'text-white text-sm leading-6 font-normal pt-[1.12rem]'}>Profile
                                </div>
                                {/*<div className={'flex flex-row pt-[1.12rem]'}>*/}
                                {/*    <div className={'flex-1 text-white text-sm leading-6 font-normal'}>Profile</div>*/}
                                {/*    <div*/}
                                {/*        className={'flex-1 text-white text-sm leading-6 font-normal ml-[2.88rem]'}>Blockchain*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className={'flex mt-2'}>
                                    <div className={'flex flex-1 flex-col mr-[1.44rem] space-y-4'}>
                                        <div className="flex flex-1 justify-between">
                                            <div className={'text-gray-450 font-normal text-sm'}>Age (DOB)</div>
                                            <div className={'font-normal text-sm text-white'}>{item.age}</div>
                                        </div>
                                        <div className="flex flex-1 justify-between">
                                            <div className={'text-gray-450 font-normal text-sm'}>Sex</div>
                                            <div className={'font-normal text-sm text-white'}>{item.sex}</div>
                                        </div>
                                        <div className="flex flex-1 justify-between">
                                            <div className={'text-gray-450 font-normal text-sm'}>Color</div>
                                            <div className={'font-normal text-sm text-white'}>{item.color}</div>
                                        </div>
                                    </div>
                                    <div className={'divider'}></div>
                                    <div className={'flex flex-1 flex-col ml-[1.44rem] space-y-4'}>
                                        <div className="flex flex-1 justify-between">
                                            <div className={'text-gray-450 font-normal text-sm'}>Sire</div>
                                            <div className={'font-normal text-sm text-white'}>{item.sire}</div>
                                        </div>
                                        <div className="flex flex-1 justify-between">
                                            <div className={'text-gray-450 font-normal text-sm'}>Dam</div>
                                            <div className={'font-normal text-sm text-white'}>{item.dam}</div>
                                        </div>
                                        <div className="flex flex-1 justify-between">
                                            <div className={'text-gray-450 font-normal text-sm whitespace-nowrap'}>Dam’s
                                                Sire
                                            </div>
                                            <div
                                                className={'font-normal text-sm text-white whitespace-nowrap'}>{item.damsire}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className={'flex items-center justify-end mt-[1.5rem]'}>
                                <div className={'flex text-sm font-gtwalp text-white text-opacity-40'}>
                                    Supply
                                </div>
                                <div
                                    className={'text-white text-[1.13rem] leading-6 font-gtwalm ml-[1rem]'}>{item.curcount}</div>

                                <div className={'flex text-sm font-gtwalp text-white text-opacity-40 ml-[2.75rem]'}>
                                    Price
                                </div>
                                <img src={ethImg} className={'object-cover w-4 h-4 ml-[1rem]'} alt={''}/>

                                {item.discount > 0 ?
                                    <>
                                        <div
                                            className={'text-white text-[1.13rem] leading-6 font-gtwalm ml-[0.44rem]'}>{discountPrice}</div>
                                        <div
                                            className={'text-white text-[1.13rem] leading-6 font-gtwalm ml-[0.44rem] line-through text-opacity-40'}>{$T.formatETHPrice(item.price)}</div>
                                    </> :
                                    <div
                                        className={'text-white text-[1.13rem] leading-6 font-gtwalm ml-[0.44rem]'}>{$T.formatETHPrice(item.price)}</div>
                                }

                            </div>

                        </div>

                        <div className={'flex flex-col justify-between'}>
                            <div className={'flex flex-col'}>
                                <div className={'text-gray-450 font-normal text-base flex justify-end'}>
                                    {status}
                                </div>
                                <CountDown className={'mt-[0.38rem]'} countdown={item.countdown.cdsec}
                                           setCount={''}></CountDown>
                            </div>
                            <div className={'flex flex-col mb-10'}>
                                <button disabled={item.runningstatus !== 1} onClick={() => {
                                    navigate(`/mint_detail/${item?.id}`)
                                }}
                                        style={{backgroundColor: item.runningstatus === 1 ? theme.nftBigBtn.color : theme.nftBigBtn.disableColor}}
                                        className={`ml-auto overflow-hidden relative text-white nft-btn ${item.runningstatus !== 1 && 'text-opacity-60'} mb-2 outline-none rounded-[0.63rem] font-gtwalp text-[1.25rem]`}>
                                    <Discount
                                        className={'-rotate-45 absolute scale-[60%] -left-[2.8rem] top-0'}>{item.discount}</Discount>
                                    {btnName}
                                </button>
                                {/*<Button className={'mt-3'}>Details</Button>*/}
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .nft-btn {
    width: 18.75rem;
    height: 3rem;
  }


  .divider {
    width: 0;
    height: 4.97rem;
    border: 0.03rem solid rgba(255, 255, 255, 0.4);
    opacity: 0.1;
  }

  .box {
    width: 32rem;
    height: 10.38rem;
    //background: rgba(37, 35, 39);
    opacity: 1;
    border: 0.03rem solid rgba(255, 255, 255, 0.24);

    border-radius: 0.38rem 0.38rem 0.38rem 0.38rem;
    filter: blur(undefinedpx);
  }

  .text-1 {
    font-size: 1.13rem;
    background: linear-gradient(90deg, #A7CFFF 0%, #FFFFFF 51%, #B49AFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text-2 {
    font-size: 1.88rem;
    font-weight: 500;
    color: #FFFFFF;
    -webkit-background-clip: text;
  }
`;
