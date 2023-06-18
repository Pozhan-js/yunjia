import styled from "styled-components";
import theme from "@/config/themeSetting";
import AssetsImgs from "@/components/widget/StakePage/AssetsImgs";
import {useLocation, useNavigate} from "react-router-dom";
import upgradeMaskImg from '@/assets/images/ComposePage/upgrade_mask.png'
import LvIcon from "@/components/widget/ComposePage/LvIcon";
import rightArrowImg from '@/assets/images/ComposePage/right_arrow.png';
import powerImg from "@/assets/images/HomePage/HotSales/Frame@2x.png";
import composeBg1Img from '@/assets/images/ComposePage/compose_bg1.png';
import composeBg2Img from '@/assets/images/ComposePage/compose_bg2.png';
import React, {useRef, useState} from "react";
import {getComposeNftSign} from "@/services/v1/compose";
import {useSelector} from "react-redux";
import useContractTool from "@/utils/useContractTool";
import TransactionModal from "@/components/widget/TransactionModal";
import {config} from '@/config';

export default function UpgradeView() {
    const navigation = useNavigate();
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [composeType, setComposeType] = useState(0);
    const {state: {nft_item, selectedList}} = useLocation();
    const {composeNft} = useContractTool();
    const transactionModalRef = useRef<any>();

    const Selected = (isLv1 = false) => {
        navigation('', {state: {view_id: 3, nft_item, lv: isLv1 ? 1 : nft_item.level}});
    }

    if (!nft_item) return null;
    const LinkTx = ({tx}: { tx: string }) => {
        return (
            <div className={'flex'}>
                TX:
                <a className={'w-[15rem] truncate'} href={`${config.ETHERSCAN_URL}/tx/${tx}`}
                   target={'_blank'}>{tx}</a>
            </div>
        )
    }
    const upGrade = () => {
        if (selectedList && selectedList.size > 0) {
            const cids = Array.from(selectedList).map((e: any) => {
                return e?.id;
            })
            const token_ids = Array.from(selectedList).map((e: any) => {
                return e?.token_id;
            })
            getComposeNftSign(account, nft_item.id, cids.join(",")).then((res) => {
                console.log([[nft_item.id, ...cids], res.data.signmsg])
                transactionModalRef.current.showModal({type: 0});
                composeNft(nft_item.token_contract, [[nft_item.token_id, ...token_ids].sort(), res.data.signmsg]).then((res: any) => {
                    transactionModalRef.current.showModal({
                        type: 2,
                        text: <LinkTx tx={res.receipt.transactionHash}/>
                    });
                }).catch(() => {
                    transactionModalRef.current.showModal({type: -1});
                })
            })
        }

    }
    return (
        <Styled className={'h-full relative font-gtwalp z-10'}>
            <TransactionModal ref={transactionModalRef}/>
            <div
                style={{backgroundColor: theme.stakePage.topCard.bgColor}}
                className='rounded flex justify-center items-center cursor-pointer w-[3.75rem] h-[3.75rem] absolute left-0 top-0'
                onClick={() => navigation('', {state: {view_id: 1}})}>
                <img className=' w-8 h-8' src={AssetsImgs.btn_back}/>
            </div>

            <div className={'flex flex-grow w-full justify-center items-center mt-[7.2rem]'}>
                <img src={nft_item.img_url}
                     className={'w-[12rem] h-[17.29rem] object-center object-cover'}/>
                <div className={'flex flex-col ml-[8.88rem] text-[1.63rem]'}>
                    <div className={'font-gtwalbpo'}>
                        <span className={'text-white'}>OmniQueen </span>
                        <span className={'bg-gradient-title-2'}>OmniQueen</span>
                    </div>
                    <div className={'mt-[1.56rem] flex'}>
                        <div className={'box-1 pt-6 flex flex-col items-center'}>
                            <div className={'flex justify-center items-center'}>
                                <LvIcon lv={nft_item.level} className={''}/>
                                <img src={rightArrowImg} className={'w-[0.6rem] h-[0.6rem] mx-[1.38rem] box-border'}/>
                                <LvIcon lv={nft_item.level + 1} className={''}/>
                            </div>
                            <div className={'w-[90%] h-[0.04rem] bg-white bg-opacity-20 mt-[1.31rem]'}/>
                            <div className={'h-full flex items-center justify-center'}>
                                <p className={'text-white text-sm font-gtwalp'}>Current level</p>
                            </div>
                        </div>
                        <div className={'box-1 ml-6 pt-6 flex flex-col items-center'}>
                            <div className={'flex justify-center items-center'}>
                                <img src={powerImg} className={'object-cover w-[1.16rem] h-[1.25rem] mt-[0.15rem]'}/>
                                <p className={'text-white font-ktp text-[0.9rem] ml-[0.19rem]'}>{nft_item.power}</p>
                                <img src={rightArrowImg} className={'w-[0.6rem] h-[0.6rem] mx-3 box-border'}/>
                                <p className={'bg-gradient-title-1 font-ktp text-[0.9rem]'}>{Math.floor(nft_item.power * 2 * 1.2)}</p>
                            </div>
                            <div className={'w-[90%] h-[0.04rem] bg-white bg-opacity-20 mt-[1.31rem]'}/>
                            <div className={'h-full flex items-center justify-center'}>
                                <p className={'text-white text-sm font-gtwalp'}>Current Power</p>
                            </div>
                        </div>
                    </div>

                    <div className={'mt-3 relative flex items-center justify-center'}>
                        <div hidden={nft_item?.level === 1}
                             className={'circle absolute font-gtwalbpo text-sm text-white flex items-center justify-center'}>
                            OR
                        </div>
                        {nft_item?.level === 1 ?
                            <div className={'box-2 flex flex-col items-center'}>
                                <div
                                    onClick={() => {
                                        // lv1 合成
                                        Selected(true)
                                    }}
                                    style={{backgroundImage: `url(${composeBg1Img})`}}
                                    className={'flex-shrink-0 w-[3.75rem] h-[3.75rem] bg-cover bg-center my-[1.13rem] flex flex-col items-center justify-center cursor-pointer'}>
                                    <p className={'text-white text-[1.13rem] font-ktp'}>L{nft_item?.level}</p>
                                    <p className={'font-gtwalmp text-sm text-white'}>{selectedList ? selectedList.size : 0}/1</p>
                                </div>
                                <div className={'w-[90%] h-[0.04rem] bg-white bg-opacity-20'}/>
                                <div className={'h-full flex items-center justify-center'}>
                                    <p className={'text-white text-sm font-gtwalp'}>Upgrade fuel</p>
                                </div>

                            </div> :
                            <div className={'flex'}>
                                <div
                                    onClick={() => {
                                        setComposeType(0)
                                    }}
                                    className={`${composeType === 0 ? 'box-3-active' : 'box-3'} box-border flex flex-col items-center cursor-pointer`}>
                                    <div
                                        onClick={() => {
                                            // 同NFT lv 合成
                                            Selected()
                                        }}
                                        style={{backgroundImage: `url(${composeBg1Img})`}}
                                        className={'flex-shrink-0 w-[3.75rem] h-[3.75rem] bg-cover bg-center my-[1.13rem] flex flex-col items-center justify-center'}>
                                        <p className={'text-white text-[1.13rem] font-ktp'}>L{nft_item?.level}</p>
                                        <p className={'font-gtwalmp text-sm text-white'}>{selectedList ? selectedList.size : 0}/1</p>
                                    </div>
                                    <div className={'w-[90%] h-[0.04rem] bg-white bg-opacity-20'}/>
                                    <div className={'h-full flex items-center justify-center'}>
                                        <p className={'text-white text-sm font-gtwalp'}>Upgrade fuel</p>
                                    </div>
                                </div>
                                <div
                                    onClick={() => {
                                        setComposeType(1)
                                    }}
                                    className={`${composeType === 1 ? 'box-3-active' : 'box-3'} box-border ml-6 flex flex-col items-center cursor-pointer`}>
                                    <div
                                        onClick={() => {
                                            // lv1 合成
                                            Selected(true)
                                        }}
                                        style={{backgroundImage: `url(${composeBg2Img})`}}
                                        className={'flex-shrink-0 w-[3.75rem] h-[3.75rem] bg-cover bg-center my-[1.13rem] flex flex-col items-center justify-center'}>
                                        <p className={'text-white text-[1.13rem] font-ktp'}>L1</p>
                                        <p className={'font-gtwalmp text-sm text-white'}>{selectedList ? selectedList.size : 0}/1</p>
                                    </div>
                                    <div className={'w-[90%] h-[0.04rem] bg-white bg-opacity-20'}/>
                                    <div className={'h-full flex items-center justify-center'}>
                                        <p className={'text-white text-sm font-gtwalp'}>Upgrade fuel</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <button className={'w-full btn text-white mt-3 font-gtwalb text-[1.13rem]'} onClick={upGrade}>
                        Upgrade
                    </button>
                </div>

            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .box-1 {
    width: 11.56rem;
    height: 7.06rem;
    background: #1F163D;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .box-2 {
    width: 24.63rem;
    height: 8.38rem;
    background: rgba(31, 22, 61, 0.8);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .box-3 {
    width: 11.56rem;
    height: 8.38rem;
    background: rgba(31, 22, 61, 0.8);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    border: 0.13rem solid rgba(185, 2, 253, 0);
    opacity: 1;
  }

  .box-3-active {
    width: 11.56rem;
    height: 8.38rem;
    background: rgba(31, 22, 61, 0.8);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
    border: 0.13rem solid #B902FD;
  }

  .btn {
    height: 2.75rem;
    background: linear-gradient(180deg, #FAC233 0%, #FF6433 100%);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .circle {
    width: 2.25rem;
    height: 2.25rem;
    background: linear-gradient(180deg, #C824E2 0%, #5C29EE 100%);
    opacity: 1;
    border: 0.06rem solid #FFFFFF;
    border-radius: 50%;
  }
`;
