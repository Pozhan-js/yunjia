import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import idleImg from '@/assets/images/PersonalPage/idle@2x.png';
import miningImg from '@/assets/images/PersonalPage/Mining1@2x.png';
import nftBgImg from '@/assets/images/PersonalPage/nft_bg.png';
import Power from "@/components/widget/Power";
import useContractTool from "@/utils/useContractTool";
import TransactionModal from "@/components/widget/TransactionModal";
import React, {useRef} from "react";
import Image from "@/components/widget/Image";
import BonusMarkImg from '@/assets/images/StakePage/BonusMark.png';
import {Box, Tooltip} from "@mui/material";
import theme from "@/config/themeSetting";
import AssetsImgs from "@/components/widget/StakePage/AssetsImgs";

const Status = ({stakestatus, nftstatus}) => {
    return (<>
        {(stakestatus === 0 && nftstatus !== 2) && <img src={idleImg} className={'w-6 h-6'} alt={''}/>}
        {(stakestatus === 1 && nftstatus !== 2) && <img src={miningImg} className={'w-6 h-6'} alt={''}/>}
        {(stakestatus !== 2 && nftstatus !== 2) && <div
            className={'text-white font-ggm text-[0.81rem] font-medium flex items-center'}>{stakestatus === 0 ? 'Idle' : 'Mining'}</div>}

        {/*质押过程中动画*/}
        {(stakestatus === 2 || nftstatus === 2) &&
            <p className={'text-[#FFA033] font-gtwal font-[0.81rem] leading-4 animation-text text-center -mb-1'}>Waiting
                for blockchain confimation
            </p>}
    </>)
}
export default function NftCard({item, canClick = true}) {
    const navigate = useNavigate();
    const {updateNft} = useContractTool();
    const transactionModalRef = useRef<any>();
    const upgradeNft = () => {
        transactionModalRef.current.showModal({type: 0});
        updateNft(item?.token_contract, item?.token_id).then(() => {
            // 提交到服务端
            transactionModalRef.current.showModal({type: 1});
        }).catch((err) => {
            // console.error(err);
            // 失败
            transactionModalRef.current.showModal({type: -1});
        })
    }
    return (<Styled
        className={`bg-contain bg-no-repeat w-[13.75rem] h-[19.63rem] box-border relative`}
        style={{backgroundImage: `url(${nftBgImg})`}}>

        <TransactionModal ref={transactionModalRef}/>
        <div
            className={`p-5 flex flex-col relative items-center h-full ${(item?.stakestatus === 2 || item?.nftstatus === 2) ? 'animation-border' : ''}`}>
            <Image src={item.img_url}
                   className={`object-cover w-[8.42rem] h-[12.21rem] ${canClick ? 'cursor-pointer' : ''}`}
                   onClick={() => {
                       if (canClick) navigate(`/clubs/${item?.clubid}`);
                   }}/>
            <Power item={item} className={'mt-2'}/>
            <div className={'flex item-center justify-center pt-[0.67rem] bottom-[1rem] absolute'}>
                {item.mint_type === 2 ? <button
                    onClick={upgradeNft}
                    className={'bg-[#B902FD] w-[6.13rem] h-[2rem] rounded-[1rem] text-white text-sm font-gtwalm -mb-2'}>Upgrade
                </button> : <Status stakestatus={item?.stakestatus} nftstatus={item?.nftstatus}/>}
            </div>
        </div>
        {/*/!*链上确认和需要升级 增加蒙版*!/*/}
        {/*{*/}
        {/*    item.mint_type === 2 && <div className={'h-full w-full bg-[#111111B3] absolute top-0 left-0'}>*/}
        {/*    </div>*/}
        {/*}*/}
        <Tooltip componentsProps={{
            arrow: {
                sx: {
                    color: theme.stakePage.tooltip.bgColor
                }
            }, tooltip: {
                sx: {
                    background: theme.stakePage.tooltip.bgColor,
                    padding: '0.88rem',
                    paddingLeft: '1rem',
                    boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0,0,0,0.36)',
                    borderRadius: '0.63rem'
                }
            }
        }} title={<Box className={'text-white text-opacity-60 text-sm flex flex-col'}>
            {item?.bonusdesc}
        </Box>} placement="bottom" arrow={true}>
            <img src={BonusMarkImg} className={'w-[1.13rem] h-[1.13rem] object-cover absolute right-3 top-3 cursor-pointer'}
                 hidden={item?.bonusdesc === ''}/>
        </Tooltip>
    </Styled>)
}

const Styled = styled.div`
  @keyframes flicker-border {
    100% {
      border: 0.13rem solid #FFA033;
    }
    0% {
      border: 0.13rem solid rgba(255, 160, 51, 0);
    }
  }
  @keyframes flicker-text {
    100% {
      opacity: 1;
    }
    0% {
      opacity: 0;
    }
  }

  .animation-border {
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    animation: flicker-border 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate;
  }

  .animation-text {
    animation: flicker-text 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate;
  }
`;
