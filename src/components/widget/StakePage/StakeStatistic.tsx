import styled from "styled-components";
import AssetsImgs from './AssetsImgs'
import useContractTool from "@/utils/useContractTool";
import React, {useEffect, useRef, useState} from "react";
import TransactionModal from "@/components/widget/TransactionModal";
import {useDispatch, useSelector} from "react-redux";
import {claimOMH} from "@/services/v1/stake";
import $T from '@/utils/utils';
import {emitLogin} from "@/store/actions";
import {useCountDown, useMount} from "ahooks";
import {Box, Tooltip} from "@mui/material";
import theme from '@/config/themeSetting';

export default function StakeStatistic({statData}: { statData: any }) {
    const {receiveOMH} = useContractTool();
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const transactionModalRef = useRef<any>();
    const [power, setPower] = useState(0);
    const [canClaim, setCanClaim] = useState(false);
    const dispatch = useDispatch();
    const [countdown, formattedRes] = useCountDown({
        leftTime: statData.my_nextclaim * 1000,
    });
    useEffect(() => {
        setCanClaim(!((statData.my_nextclaim > 0 && countdown > 0) || statData.my_reward === 0));
    }, [countdown, statData.my_nextclaim, statData.my_reward]);
    useMount(() => {
        if (statData.total_power !== 0) {
            setPower(100 / statData.total_power * statData.total_dayreward);
        } else {
            setPower(0);
        }

    })
    const format = (t) => {
        if (t.toString().length < 2) {
            return "0" + t;
        }
        return t.toString();
    }
    const Claim = () => {
        if (!!account === false) {
            // login wallet
            return dispatch(emitLogin(true));
        }
        transactionModalRef.current.showModal({type: 0})
        claimOMH(account).then((res: any) => {
            const {claimcoin, nonce, expire, signmsg}: any = res.data;
            // console.log(res.code);
            switch (res.code) {
                case 200:
                    // console.log([claimcoin.toString(), parseInt(nonce), expire, signmsg])
                    receiveOMH([claimcoin.toString(), parseInt(nonce), expire, signmsg]).then(() => {
                        transactionModalRef.current.showModal({type: 1});
                    }).catch((err) => {
                        console.log(err);
                        transactionModalRef.current.showModal({type: -1});
                    })
                    break;
                case 501:
                    // 页面刷新
                    window.location.reload();
                    break;
                case 502:
                    transactionModalRef.current.showModal({type: -1, text: res.msg})
            }

        })

    }

    return (<StatisStyled>
        <TransactionModal ref={transactionModalRef}/>
        <div className={'grid grid-cols-3 gap-x-[1.56rem]'}>
            <div>
                <div className='mg-card-first bg-center bg-cover rounded-[0.63rem]  p-7 h-[13.38rem] relative'>
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
                        Withdraw once every 24 hours.<br/>
                        Eg. If withdraw at 9:00AM 10/11, you will need to wait until 9:00AM 10/12 to withdraw again
                    </Box>} placement="bottom" arrow={true}>
                        <img src={AssetsImgs.questionImg} className={'w-6 h-6 absolute right-4  top-4'}/>
                    </Tooltip>

                    <div className='flex'>
                        <div className=' w-1/2 text-left pb-3 -ml-2'><img
                            className=' w-[3.75rem] h-[3.75rem] object-cover'
                            src={AssetsImgs.mining} alt={''}/>
                        </div>
                        <div className=' w-1/2 '></div>
                    </div>
                    <div className='flex justify-center'>
                        <div className=' w-2/3 text-left pt-4'>
                            <div className=" text-stone-400 text-base">Reward</div>
                            <div className=' text-white tracking-wider mt-2 text-xl font-ggm '><span
                                className=' font-medium text-2xl'>{statData.my_reward.toFixed(2)} OMH</span>
                            </div>
                        </div>
                        <div className=' w-1/3 mt-auto'>
                            <button
                                disabled={!canClaim}
                                onClick={() => {
                                    Claim();
                                }}
                                className={`text-white w-[7.75rem] ml-auto text-base h-[2.38rem] flex justify-center items-center ${!canClaim ? 'nft-btn-disable rounded-[1.19rem] text-opacity-80' : 'mg-btn'}`}>
                                {statData.my_nextclaim > 0 ? <div
                                    className={'w-[5rem] flex justify-start whitespace-nowrap'}>{format(formattedRes.hours) + ' : ' + format(formattedRes.minutes) + ' : ' + format(formattedRes.seconds)}</div> : 'Claim'}

                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div
                    style={{backgroundColor:theme.stakePage.topCard.bgColor}}
                    className='bg-center bg-cover rounded-[0.63rem]  2xl:p-4 md:p-3 sm:p-2 h-[13.38rem] relative'>
                    <Tooltip
                        componentsProps={{
                            arrow: {
                                sx: {
                                    color: theme.stakePage.tooltip.bgColor,
                                }
                            }, tooltip: {
                                sx: {
                                    background: theme.stakePage.tooltip.bgColor,
                                    padding: '0.88rem',
                                    paddingLeft: '1rem',
                                    boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0,0,0,0.36)',
                                    borderRadius: '0.63rem',
                                    maxWidth: '60rem'
                                }
                            }
                        }}
                        title={<Box className={'text-white text-opacity-60 text-sm flex flex-col'}
                                    sx={{width: '18rem'}}>
                            <div>
                                <span className={'font-bold'}>OMH Emission: </span>
                                <span> The quantity of $OMH to be mined every day.</span>
                            </div>
                            <div className={'mt-1'}>
                                <span className={'font-bold'}>Total Power: </span>
                                <span>Total horsepower value of all the staked NFT in the staking pool.</span>
                            </div>

                            <div className={'mt-1'}>
                                <span className={'font-bold'}>My Power: </span>
                                <span>The sum of NFTs’ horsepower the user staked.</span>
                            </div>

                        </Box>}
                        placement="bottom" arrow={true}>
                        <img src={AssetsImgs.questionImg} className={'w-6 h-6 absolute right-4  top-4'}/>
                    </Tooltip>
                    <div className='flex justify-center mb-3 sm:justify-start'>
                        <div className=' xl:w-3/12  text-left '><img className=' w-20 h-20'
                                                                     src={AssetsImgs.ic_omh} alt={''}/></div>
                        <div className=' 2xl:w-10/12 xl:w-9/12  pt-2'>
                            <div className=" text-stone-400 text-base">OMH Emission</div>
                            <div className=' text-white tracking-wider mt-2  font-medium text-2xl font-ggm '><span
                                className=' text-[#FFA033FF]'>{$T.formatThousand(statData.total_dayreward)}</span>/<span
                                className={'text-base text-white'}>day</span>
                            </div>
                        </div>
                    </div>
                    <hr className=' w-1/1 mx-auto line-1'></hr>
                    <div className='flex justify-center  pt-5 sm:justify-start'>
                        <div className=' xl:w-3/12   text-left -mt-2'>
                            <img className=' w-20 h-20' src={AssetsImgs.power}/>
                        </div>
                        <div className=' 2xl:w-10/12 xl:w-9/12 flex justify-center'>
                            <div className=' w-1/2  '>
                                <div className=" text-stone-400 text-base">Total Power</div>
                                <div
                                    className=' text-white tracking-wider mt-2 text-xl font-ggm'>{statData.total_power}</div>
                            </div>
                            <div className=' w-1/2  '>
                                <div className=" text-stone-400 text-base">My Power</div>
                                <div
                                    className=' text-white tracking-wider mt-2 text-xl font-ggm'>{statData.my_power}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div
                    style={{backgroundColor:theme.stakePage.topCard.bgColor}}
                    className='bg-center bg-cover rounded-[0.63rem] 2xl:p-4 md:p-3 sm:p-2 h-[13.38rem] relative'>
                    <Tooltip
                        componentsProps={{
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
                                    borderRadius: '0.63rem',
                                    maxWidth: '60rem'
                                }
                            }
                        }}
                        title={<Box className={'text-white text-opacity-60 text-sm flex flex-col'}
                                    sx={{width: '17rem'}}>
                            <div>
                                <span className={'font-bold'}>100 Power: </span>
                                <span>
                                   The estimated number of $OMH to be mined per 100 horsepower per day.
                                </span>
                            </div>
                            <div>
                                <span className={'font-bold'}>My OMH: </span>
                                <span>
                                    The estimated number of $OMH per day user can mine.
                                </span>
                            </div>


                        </Box>}
                        placement="bottom" arrow={true}>
                        <img src={AssetsImgs.questionImg} className={'w-6 h-6 absolute right-4  top-4'}/>
                    </Tooltip>
                    <div className='flex justify-center mb-5 ml-4'>
                        <div className=' w-1/1 pt-2'>
                            <div className=" text-stone-400 text-base">100 Power</div>
                            <div className=' text-white tracking-wider mt-2 text-xl font-ggm '><span
                                className=' font-medium text-2xl'>≈{power.toFixed(2)}</span> /<span
                                className={'text-base text-white'}>day</span>
                            </div>
                        </div>
                    </div>
                    <hr className=' w-1/1 mx-auto line-1'></hr>
                    <div className='flex justify-center pt-5 ml-4'>
                        <div className=' w-1/1'>
                            <div className=" text-stone-400 text-base">My Power Mining(Per 24h)</div>
                            <div className=' text-white tracking-wider mt-2 text-xl font-ggm '>
                                <span className=' font-medium text-2xl'>≈{statData.my_dayreward.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StatisStyled>)
}

const StatisStyled = styled.div`

  .popper {
    max-width: 10rem;
  }
  .mg-border {
    border: 0.06rem solid #33333C;
  }

  .line-1 {
    height: 0;
    opacity: 0.1;
    background: #FFFFFF;
  }

  .mg-card-first {
    background-image: url(${AssetsImgs.stat_first_bg});
  }

  .mg-btn {
    background: linear-gradient(180deg, #FAC233 0%, #FF6433 100%);
    border: none;
    border-radius: 1.19rem;

    :hover {
      background: linear-gradient(180deg, #FAa000 0%, #FF3000 100%);
    }
  }

  .nft-btn-disable {
    background: linear-gradient(180deg, #6F6D68 0%, #4F4643 100%);
  }
`;
