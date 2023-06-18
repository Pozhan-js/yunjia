import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import Power from "@/components/mobile/widget/Power";
import useContractTool from "@/utils/useContractTool";
import TransactionModal from "@/components/widget/TransactionModal";
import { useRef, useState } from "react";
import idleImg from '@/assets/images/PersonalPage/idle@2x.png';
import miningImg from '@/assets/images/PersonalPage/Mining1@2x.png';
import nftBgImg from '@/assets/images/PersonalPage/mobile/nft_card_bg.png';
import Image from "@/components/widget/Image";

import BonusMarkImg from '@/assets/images/StakePage/BonusMark.png';
import { Box, Tooltip } from "@mui/material";
import theme from "@/config/themeSetting";

const Status = ({ stakestatus, nftstatus }) => {
    return (<>
        {(stakestatus === 0 && nftstatus !== 2) && <img src={idleImg} className={'w-6 h-6'} />}
        {(stakestatus === 1 && nftstatus !== 2) && <img src={miningImg} className={'w-6 h-6'} />}
        {(stakestatus !== 2 && nftstatus !== 2) && <div
            className={'text-white font-ggm text-[0.81rem] font-medium flex items-center'}>{stakestatus === 0 ? 'Idle' : 'Mining'}</div>}

        {/*质押过程中动画*/}
        {(stakestatus === 2 || nftstatus === 2) &&
            <p className={'text-[#FFA033] font-gtwal font-[0.81rem] leading-4 animation-text text-center -mb-1'}>Waiting
                for blockchain confimation
            </p>}
    </>)
}
export default function NftCard({ item, canClick = true }) {
    const [tooltipOpen1, setTooltipOpen1] = useState(false);
    const navigate = useNavigate();
    const { updateNft } = useContractTool();
    const transactionModalRef = useRef<any>();
    const upgradeNft = () => {
        transactionModalRef.current.showModal({ type: 0, style: { width: '85vw' } });
        updateNft(item?.token_contract, item?.token_id).then(() => {
            // 提交到服务端
            transactionModalRef.current.showModal({ type: 1 });
        }).catch(() => {
            // 失败
            transactionModalRef.current.showModal({ type: -1 });
        })
    }
    return (<Styled
        // 0.6596
        className={`w-[45vw] h-[68vw] bg-contain bg-no-repeat box-border relative`}
        style={{ backgroundImage: `url(${nftBgImg})` }}>
        <TransactionModal ref={transactionModalRef} />
        <div
            className={`py-2 px-4  flex flex-col relative items-center h-full ${(item?.stakestatus === 2 || item?.nftstatus === 2) ? 'animation-border' : ''}`}>
            <Image src={item.img_url}
                className={`object-cover w-[28.6vw] h-[41.8vw] ${canClick ? 'cursor-pointer' : ''}`}
                onClick={() => {
                    if (canClick) navigate(`/clubs/${item?.clubid}`);
                }} />
            <Power item={item} className={'mt-1'} />
            <div className={'flex item-center justify-center pt-1 bottom-[0.8rem] absolute'}>
                {item.mint_type === 2 ? <button
                    onClick={upgradeNft}
                    className={'bg-[#B902FD] w-[5.38rem] h-[1.75rem] rounded-[1rem] text-white text-sm font-gtwalm '}>Upgrade
                </button> : <Status stakestatus={item?.stakestatus} nftstatus={item?.nftstatus} />}
            </div>
        </div>
        <Tooltip leaveTouchDelay={3000} componentsProps={{
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
        </Box>} placement="bottom" arrow={true} onClose={() => { setTooltipOpen1(false) }} open={tooltipOpen1}>
            <img src={BonusMarkImg} className={'w-[1.13rem] h-[1.13rem] object-cover absolute right-3 top-3 cursor-pointer'} onClick={(e) => { e.stopPropagation(); setTooltipOpen1(true) }}
                hidden={item?.bonusdesc === ''} />
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
