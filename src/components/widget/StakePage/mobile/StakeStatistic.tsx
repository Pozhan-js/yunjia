import styled from "styled-components";
import AssetsImgs from './AssetsImgs'
import useContractTool from "@/utils/useContractTool";
import React, { useEffect, useRef, useState } from "react";
import TransactionModal from "@/components/widget/TransactionModal";
import { useDispatch, useSelector } from "react-redux";
import { claimOMH } from "@/services/v1/stake";
import $T from '@/utils/utils';
import { emitLogin } from "@/store/actions";
import { useCountDown, useMount } from "ahooks";
import { Box, Tooltip } from "@mui/material";

export default function StakeStatistic({ statData }) {
    const { receiveOMH } = useContractTool();
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const transactionModalRef = useRef<any>();
    const [power, setPower] = useState(0);
    const [canClaim, setCanClaim] = useState(false);
    const [tooltipOpen1, setTooltipOpen1] = React.useState(false);
    const [tooltipOpen2, setTooltipOpen2] = React.useState(false);
    const [tooltipOpen3, setTooltipOpen3] = React.useState(false);
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
        transactionModalRef.current.showModal({
            type: 0,
            style: {
                width: '85vw'
            }
        })
        claimOMH(account).then((res: any) => {
            const { claimcoin, nonce, expire, signmsg }: any = res.data;
            // console.log(res.code);
            switch (res.code) {
                case 200:
                    receiveOMH([claimcoin.toString(), parseInt(nonce), expire, signmsg]).then(() => {
                        transactionModalRef.current.showModal({ type: 1 });
                    }).catch((err) => {
                        // console.log(err);
                        transactionModalRef.current.showModal({ type: -1 });
                    })
                    break;
                case 501:
                    // 页面刷新
                    window.location.reload();
                    break;
                case 502:
                    transactionModalRef.current.showModal({ type: -1, text: res.msg })
            }

        })

    }
    const handleTooltipClose1 = () => {
        setTooltipOpen1(false);
    };

    const handleTooltipOpen1 = () => {
        setTooltipOpen1(true);
    };

    const handleTooltipClose2 = () => {
        setTooltipOpen2(false);
    };

    const handleTooltipOpen2 = () => {
        setTooltipOpen2(true);
    };

    const handleTooltipClose3 = () => {
        setTooltipOpen3(false);
    };

    const handleTooltipOpen3 = () => {
        setTooltipOpen3(true);
    };

    return (<StatisStyled>
        <TransactionModal ref={transactionModalRef} />
        <div className={'flex flex-col'}>
            <div>
                <div
                    className='mg-card-first bg-center bg-cover rounded flex flex-col justify-between p-5 h-[11.25rem] relative'>
                    <Tooltip leaveTouchDelay={3000} componentsProps={{
                        arrow: {
                            sx: {
                                color: '#232325'
                            }
                        }, tooltip: {
                            sx: {
                                background: '#25194A',
                                padding: '0.88rem',
                                paddingLeft: '1rem',
                                boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0,0,0,0.36)',
                                borderRadius: '0.63rem',
                                maxWidth: '60rem'
                            }
                        }
                    }} title={<Box className={'text-white text-opacity-60 text-sm flex flex-col'} sx={{ width: '80vw' }}>
                        Withdraw once every 24 hours.<br />
                        Eg. If withdraw at 9:00AM 10/11, you will need to wait until 9:00AM 10/12 to withdraw again
                    </Box>} placement="bottom" arrow={true} onClose={handleTooltipClose1} open={tooltipOpen1}>
                        <img src={AssetsImgs.questionImg} onClick={handleTooltipOpen1}
                            className={'w-6 h-6 absolute right-4  top-4'} />
                    </Tooltip>

                    <div className='flex'>
                        <div className=' w-1/2 text-left pb-3 -ml-2'><img
                            className=' w-[2.5rem] h-[2.5rem] object-cover object-center'
                            src={AssetsImgs.mining} alt={''} />
                        </div>
                        <div className=' w-1/2 '></div>
                    </div>

                    <div className='flex'>
                        <div className=' w-2/3 text-left'>
                            <div className=" text-white text-opacity-60 text-sm">Reward</div>
                            <div className=' text-white tracking-wider mt-auto text-xl font-gtwalmp'><span
                                className='text-white font-medium text-[1.19rem] font-ggm'>{statData.my_reward.toFixed(2)} OMH</span>
                            </div>
                        </div>
                        <div className=' w-1/3 flex-grow mt-auto'>
                            <button
                                disabled={!canClaim}
                                onClick={() => {
                                    Claim();
                                }}
                                className={`text-white w-[6.25rem] ml-auto text-sm h-[2rem] flex justify-center items-center ${!canClaim ? 'nft-btn-disable rounded-[1.19rem] text-opacity-80' : 'mg-btn'}`}>
                                {statData.my_nextclaim > 0 ? <div
                                    className={'w-[5rem] flex justify-start whitespace-nowrap'}>{format(formattedRes.hours) + ' : ' + format(formattedRes.minutes) + ' : ' + format(formattedRes.seconds)}</div> : 'Claim'}

                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div
                    className='mt-3 bg-[#45338B73] mg-border flex flex-col rounded h-[10rem] px-2 relative'>
                    <Tooltip leaveTouchDelay={3000}
                        componentsProps={{
                            arrow: {
                                sx: {
                                    color: '#232325',
                                }
                            }, tooltip: {
                                sx: {
                                    background: '#25194A',
                                    padding: '0.88rem',
                                    paddingLeft: '1rem',
                                    boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0,0,0,0.36)',
                                    borderRadius: '0.63rem',
                                    maxWidth: '60rem'
                                }
                            }
                        }}
                        title={<Box className={'text-white text-opacity-60 text-sm flex flex-col'}
                            sx={{ width: '80vw' }}>
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
                        placement="bottom" arrow={true} onClose={handleTooltipClose2} open={tooltipOpen2}>
                        <img src={AssetsImgs.questionImg} onClick={handleTooltipOpen2}
                            className={'w-6 h-6 absolute right-4  top-4'} />
                    </Tooltip>
                    <div className='flex flex-1 items-center'>
                        <img className='w-[4rem] h-[4rem] object-cover object-center' src={AssetsImgs.ic_omh}
                            alt={''} />
                        <div className='flex flex-col justify-center ml-1'>
                            <div className="text-white text-opacity-60 text-base">OMH Emission</div>
                            <div className='text-white'>
                                <span
                                    className='text-[#FFA033] text-[1.19rem] font-ggm'>{$T.formatThousand(statData.total_dayreward)}</span>
                                /
                                <span className={'text-sm text-white'}>day</span>
                            </div>
                        </div>
                    </div>
                    <hr className=' w-1/1 mx-auto line-1'></hr>
                    <div className='flex flex-1 items-center'>
                        <img className='w-[4rem] h-[4rem] object-cover object-center' src={AssetsImgs.power} />
                        <div className='flex w-full items-center ml-1'>
                            <div className=' w-1/2'>
                                <div className="text-white text-opacity-60 text-base">Total Power</div>
                                <div
                                    className='text-white text-[1.19rem] font-ggm'>{$T.formatThousand(statData.total_power)}</div>
                            </div>
                            <div className=' w-1/2'>
                                <div className="text-white text-opacity-60 text-base">My Power</div>
                                <div
                                    className='text-white text-[1.19rem] font-ggm'>{statData.my_power}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div
                    className='mt-3 bg-[#45338B73] mg-border h-[5rem] relative rounded flex p-4'>
                    <Tooltip leaveTouchDelay={3000}
                        componentsProps={{
                            arrow: {
                                sx: {
                                    color: '#232325'
                                }
                            }, tooltip: {
                                sx: {
                                    background: '#25194A',
                                    padding: '0.88rem',
                                    paddingLeft: '1rem',
                                    boxShadow: '0rem 0.25rem 1.25rem 0rem rgba(0,0,0,0.36)',
                                    borderRadius: '0.63rem',
                                    maxWidth: '60rem'
                                }
                            }
                        }}
                        title={<Box className={'text-white text-opacity-60 text-sm flex flex-col'}
                            sx={{ width: '80vw' }}>
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
                        placement="bottom" arrow={true} onClose={handleTooltipClose3} open={tooltipOpen3}>
                        <img src={AssetsImgs.questionImg} onClick={handleTooltipOpen3}
                            className={'w-6 h-6 absolute right-4  top-4'} />
                    </Tooltip>
                    <div className='flex flex-col flex-1'>
                        <div className="text-white text-opacity-60 text-base">100 Power</div>
                        <div className='text-white'><span
                            className='text-white text-[1.19rem] font-ggm'>≈{power.toFixed(2)}</span> /<span
                                className={'text-sm text-white'}>day</span>
                        </div>
                    </div>

                    <div className='flex justify-center flex-1'>
                        <div className=' w-1/1'>
                            <div className="text-white text-opacity-60 text-base">My Power Mining</div>
                            <div>
                                <span
                                    className='text-white text-[1.19rem] font-ggm'>≈{statData.my_dayreward.toFixed(2)}</span>
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

  .mg-card {
    background-color: #25194A;
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
    border-radius: 1.19rem 1.19rem 1.19rem 1.19rem;
    opacity: 1;
  }

  .nft-btn-disable {
    background: linear-gradient(180deg, #6F6D68 0%, #4F4643 100%);
  }
`;
