import styled from 'styled-components';
import assets from '@/components/widget/HomePage/HowToWorks/Assets';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import titleBgImg from "@/assets/images/title_bg.png";

export default function GetNft_RewardsSection() {
    const [selectIndex, setSelectIndex] = useState(-1);
    const navigate = useNavigate();

    // const onMouseEnter = (index) => {
    //     setSelectIndex(index)
    // }
    // const onMouseLeave = (index) => {
    //     setSelectIndex(-1)
    // }
    const arr = [
        {
            src: assets.walletImg,
            title: 'Set up your wallet',
            content: 'Connect your preferred crypto wallet by clicking on the wallet icon at the top right of your screen.',
            className: 'flex flex-col'
        },
        {
            src: assets.nftImg,
            title: 'Mint or Buy NFTs',
            content: 'Mint an NFT directly from the Omnihorse platform or buy one on a secondary marketplace.',
            className: 'flex flex-col',
        },
        {
            src: assets.peizesImg,
            title: 'Horsepower Mining',
            content: 'Club members can stake their NFTs to mine $OMH tokens. The longer you stake, the more you earn. ',
            className: 'flex flex-col',
            goStake: true
        },
        {
            src: assets.miningImg,
            title: 'Real Wins = Power Up',
            content: 'Horse’s rating, racing winning prize and other performances accelerate the mining power',
            className: 'flex flex-col'
        },
        {
            src: assets.omhImg,
            title: 'Invest Your $OMH',
            content: 'Invest $OMH in your club’s future, buy new NFTs, breed Metaverse horses, and more.  ',
            className: 'flex flex-col'
        }

    ];
    return (
        <Styled className={'flex flex-col items-center mt-[6.25rem]'}>
            {/*<img src={assets.titleImg} className={'w-[23.26rem] h-[5.84rem]'} alt={''}/>*/}
            <div className="flex text-[3.03rem] leading-[3.54rem] font-gtwalbpo text-white">
                <span className={''}>How it </span>
                <span className={'ml-2 bg-gradient-title-2'}>works</span>
            </div>
            <img src={titleBgImg} className={'w-[23rem] bg-cover bg-center'}/>
            <div className={'flex px-[6rem] mt-[6.25rem] space-x-16 w-full justify-around'}>
                {arr.map((item, index) => {
                    return (
                        <div key={index}
                             className={`flex justify-center card`}
                            // onMouseEnter={() => {
                            //     onMouseEnter(index)
                            // }}
                            // onMouseLeave={() => {
                            //     onMouseLeave(index)
                            // }}
                        >
                            <div className={'flex flex-col items-start'}>
                                <div className={'flex flex-col items-start'}>
                                    <img src={item.src} className={'w-[3.77rem] h-[3.77rem] object-cover'} alt={''}/>
                                    <div className={'text-[1.25rem] text-white mt-4 font-gtwalm whitespace-nowrap'}>{item.title}</div>
                                    <div
                                        className={'mt-[0.87rem] font-normal text-[1rem] text-white text-opacity-60 font-gtwalp'}>{item.content}</div>

                                </div>
                                {
                                    item?.goStake &&
                                    <button
                                        onClick={() => {
                                            navigate('/stake')
                                        }}
                                        className={'text-white text-base font-msrb w-[9.42rem] h-[2.76rem] btn-border rounded-lg mt-[1.81rem]'}>
                                        Go to Stake
                                    </button>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .card {
    width: 12.19rem;
  }

  .btn-border {
    border: 0.06rem solid rgba(255, 255, 255, 0.15);
  }

  .card-active {
    background: #272730;
    opacity: 1;
    border: 0.03rem solid #3C3C4D;
  }
`;
