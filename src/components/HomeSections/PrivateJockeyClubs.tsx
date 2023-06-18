import styled from "styled-components";
import assets from "@/components/widget/HomePage/PricateJockeyClub/Assets";
import economicImg from "@/assets/images/HomePage/PrivateJockeyClubs/ES.png";
import { useMount, useRequest } from "ahooks";
import { clubsInfo, getBonusRank, getTreasury } from "@/services/v1/home";
import $T from '@/utils/utils';
import titleBgImg from "@/assets/images/title_bg.png";

import cardBg1 from '@/assets/images/HomePage/PrivateJockeyClubs/card_bg1.png';
import cardBg2 from '@/assets/images/HomePage/PrivateJockeyClubs/card_bg2.png';
import CircleImg from '@/assets/images/HomePage/PrivateJockeyClubs/circle.png';
import PyramidImg from '@/assets/images/HomePage/PrivateJockeyClubs/pyramid.png';
import themeSetting from "@/config/themeSetting";
import { Box, Tooltip } from "@mui/material";
import theme from "@/config/themeSetting";
import AssetsImgs from "@/components/widget/StakePage/AssetsImgs";
import React, { useState } from "react";
import rightArrowImg from "@/assets/images/HorseHubPage/right_arrow.png";
import { useNavigate } from "react-router-dom";
import Table from "@/components/widget/Table";
import { config } from "@/config";
import { useSelector } from "react-redux";

const headers = [
    {
        title: 'Ranking',
        key: '',
        style: {
            width: '5rem',
        },
        render: (text, record, index) => {
            const [color, setColor] = useState('#FFFFFF');
            useMount(() => {
                switch (index) {
                    case 0:
                        setColor('#FFBA38')
                        break;
                    case 1:
                        setColor('#7363EC')
                        break;
                    case 2:
                        setColor('#65C3D8')
                        break;

                }
            })
            return (
                <p style={{ color: color }} className={'text-base font-gtwalb ml-4'}>{index + 1}</p>
            )
        }
    },
    {
        title: 'Club',
        key: 'name',
        render: (text, record) => {
            const navigate = useNavigate();
            return (
                <div className={'flex items-center cursor-pointer'} onClick={() => {
                    // console.log(record)
                    navigate(`/clubs/${record?.club_id}`)
                }}>
                    <img src={record?.img_url} className={'w-[3.2rem] h-[3.2rem]'} />
                    <p className={'text-white text-base font-gtwalp ml-[1.87rem]'}>{text}</p>
                </div>
            )

        }
    },

    {
        title: 'Prize Pool',
        key: 'tcoin',
        render: (text) => {
            return (
                <div className={'flex items-center'}>
                    {/*<img src={omhImg} className={'h-4 w-4'}/>*/}
                    <p className={'text-base  text-white font-gtwalp'}>${$T.formatThousand(text)}</p>
                </div>
            )
        }
    },
    {
        title: 'State',
        key: 'club_status',
        render: (text, record, index) => {
            const [status, setStatus] = useState({ text: 'Minting', color: '#4CAD6D' });
            // console.log(text);
            useMount(() => {
                switch (text) {
                    case 1:
                        setStatus({ color: '#FC35A7', text: 'Minting' });
                        break;
                    case 2:
                        setStatus({ color: '#9E9E9E', text: 'Training' });
                        break;

                    case 3:
                        setStatus({ color: '#FFA033', text: 'Racing' });
                        break;

                    case 4:
                        setStatus({ color: '#4CAD6D', text: 'Breading' });
                        break;
                    // case 5:
                    //     setStatus({color:'#4CAD6D',text:'Breading'});
                    //     break;


                }
            })
            return (
                <p className={'text-base text-white font-gtwalp'}>
                    {status.text}
                </p>
            )
        }
    },
    {
        title: '',
        key: '',
        render: () => {
            const navigate = useNavigate();
            return <button onClick={() => {
                navigate(`/stake`)
            }
            }
                className={`btn whitespace-nowrap text-white text-base font-gtwalp font-normal`}>Claim</button>

        }
    }
]

export default function PrivateClubSection({ totalPrizeShow }) {
    const { data, loading } = useRequest(clubsInfo);
    const { data: data_treasury } = useRequest(getTreasury);
    const WALLET_ADDRESS = useSelector((state: StoreState) => state?.WALLET_ADDRESS)
    const navigate = useNavigate();
    const [bonusRankData, setBonusRankData] = useState([]);
    useRequest(getBonusRank, {
        onSuccess: (tdata) => {
            setBonusRankData(tdata?.data);
        }
    })
    const arr = [
        {
            src: assets.usersImg,
            field: 'mining',
            des: 'Total Mining Users',

        },
        {
            src: assets.totalClubsImg,
            field: 'totalclub',
            des: 'Total Clubs',

        },
        {
            src: assets.nftsImg,
            field: 'totalnft',
            des: 'Total Released NFTs',

        },

        {
            src: assets.powerImg,
            field: 'totalpower',
            des: 'Total Power',

        },
    ];
    // console.log(data?.data ?.[arr[0].field])
    return (
        <Styled
            style={{ backgroundColor: themeSetting.homePage.PrivateJockeyClubs.bgColor }}
            className={"flex flex-col items-center pt-32 pb-[6.25rem] w-full mx-auto px-9 sm:px-6 md:px-32 "}
            id={'jockeyclub'}>
            {/*<img src={clubImg} className={"w-[30.69rem] h-[5.81rem]"}/>*/}
            <div className="flex text-[3.03rem] leading-[3.54rem] font-gtwalbpo text-white">
                <span className={''}>Private Jockey </span>
                <span className={'ml-2 bg-gradient-title-2'}>Clubs</span>
            </div>
            <img src={titleBgImg} className={'w-[23rem] bg-cover bg-center'} />
            <div
                className={"mt-[1.44rem] text-white text-base text-opacity-60 content text-center mb-[3.75rem] font-gtwalp"}>
                The Omnihorse ecosystem is simple: each of our Private Jockey Clubs are backed by a real-life elite
                thoroughbred. To join, all you need to do is purchase an NFT membership. Club members can then
                participate in horsepower mining and access to metaverse gaming.
            </div>
            <div className={"flex justify-between w-full"}>
                {!loading && arr.map((item, index) => {
                    return (
                        <div key={index}
                            style={{ backgroundColor: themeSetting.homePage.PrivateJockeyClubs.cardBg }}
                            className={"box flex items-center justify-between pl-[2.25rem] relative overflow-hidden"}>
                            <img src={item.src} className={'object-cover w-[3.75rem] h-[3.75rem] relative z-10'} />
                            {index % 2 === 0 ?
                                <img src={cardBg1} className={'absolute w-[14.13rem] h-[14.13rem] bottom-0 left-0'}
                                    alt={''} /> :
                                <img src={cardBg2} className={'absolute w-[14.13rem] h-[14.13rem] right-0 bottom-0'}
                                    alt={''} />}
                            <div className={'flex flex-col flex-1 items-center relative z-10'}>
                                <div
                                    className={'font-medium text-white text-[2rem] leading-[2.34rem] font-gtwalm'}>{$T.formatThousand(data?.data?.[item.field])}</div>
                                <div
                                    className={'text-white text-opacity-60 font-gtwalp font-normal text-base mt-[0.3rem] leading-[1.17rem] truncate clamp-line-1'}>{item.des}</div>
                            </div>

                        </div>
                    )
                })}
            </div>
            {totalPrizeShow &&
                <div className={'mt-[1.5rem] box-2 w-full flex items-center relative'}>
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
                        The total bonus amount is the number of bonuses obtained, and the remaining bonus amount of the
                        treasury is the amount of bonuses that can be used for distribution. This bonus is used for users to
                        obtain OMH acceptance by staking NFT mining
                    </Box>} placement="bottom" arrow={true}>
                        <img src={AssetsImgs.questionImg} className={'w-6 h-6 absolute right-4  top-4'} />
                    </Tooltip>
                    <div style={{ background: `url(${CircleImg})`, backgroundSize: 'contain' }}
                        className={'w-[8.75rem] h-[8.75rem] ml-[8.44rem] flex justify-center items-center flex-shrink-0'}>
                        <div>
                            <img src={PyramidImg} className={'w-[3.19rem] h-[2.69rem]'} />
                            <p className={'text-sm text-[#C7BBF6]'}>Treasury</p>
                        </div>
                    </div>
                    <div className={'mx-[8.75rem] flex justify-between w-full'}>
                        <div className={'flex flex-col items-center'}>
                            <p className={'text-white text-[2rem] font-semibold max-w-[16rem] text-ellipsis overflow-hidden whitespace-nowrap'} title={'$' + $T.formatThousand(data_treasury?.data?.totalbonus)}>$ {$T.formatThousand(data_treasury?.data?.totalbonus)}</p>
                            <p className={'text-white text-opacity-60 text-base'}>Total Prize</p>
                        </div>
                        <div className={'flex flex-col items-center'}>
                            <p className={'text-white text-[2rem] font-semibold max-w-[16rem] text-ellipsis overflow-hidden whitespace-nowrap'} title={$T.formatThousand(data_treasury?.data?.exchangedbonus) + 'Usdt'}>{$T.formatThousand(data_treasury?.data?.exchangedbonus)}<span className="text-sm"> Usdt</span></p>
                            <p className={'text-white text-opacity-60 text-base'}>Treasury exchanged bonus</p>
                        </div>
                        <div className={'flex flex-col items-center'}>
                            <div className={'flex items-center'}>
                                <p className={'text-white text-[2rem] font-semibold max-w-[14rem] text-ellipsis overflow-hidden whitespace-nowrap'} title={$T.formatThousand(data_treasury?.data?.remainingbonus) + 'Usdt'}>{$T.formatThousand(data_treasury?.data?.remainingbonus)}<span className="text-sm"> Usdt</span></p>
                                <img src={rightArrowImg} onClick={() => {
                                    window.open(config.ETHERSCAN_URL + `/address/${WALLET_ADDRESS}`);
                                }}
                                    className={'w-4 h-4 ml-4 cursor-pointer'}
                                    alt={''} />
                            </div>
                            <p className={'text-white text-opacity-60 text-base'}>Treasury remaining bonus</p>
                        </div>
                    </div>
                </div>
            }
            <div className={'flex justify-between items-end w-full mt-[1.88rem]'}>
                <p className={'bg-clip-text text-opacity-70 text-white text text-[2.25rem] font-gtwalmpo font-normal'}>Prize
                    Rank</p>
                <span className={'text-white text-base font-gtwalmp flex items-center cursor-pointer'}
                    onClick={() => {
                        navigate('/clubs', {
                            state: {
                                tabIndex: 2
                            }
                        });
                    }}>more<img src={rightArrowImg}
                        className={'w-4 h-4 ml-[0.19rem]'}
                        alt={''} /></span>
            </div>
            {bonusRankData.length > 0 &&
                <Table className={'mt-[1.13rem] rounded w-full'} tableClassName={'rounded'} headers={headers}
                    data={bonusRankData} />}

            {/*Economic Structure*/}
            <div className={'text-white text-opacity-70 text-[2.25rem] font-normal mb-[3rem] mt-[6rem] font-gtwalmpo'}>
                The Omnihorse Horsepower Mining Model
            </div>
            <img src={economicImg} className={'object-cover w-[69.43rem] mt-[1.2rem]'} />
        </Styled>
    );
}

const Styled = styled.div`
  .content {
    width: 63.44rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25rem;
    -webkit-background-clip: text;
  }

  .btn {
    width: 6.73rem;
    height: 2.13rem;
    background: #B902FD;
    border-radius: 0.67rem 0.67rem 0.67rem 0.67rem;
    opacity: 1;
  }

  .btn-disable {
    width: 6.73rem;
    height: 2.13rem;
    background: #7B3C93;
    border-radius: 0.67rem 0.67rem 0.67rem 0.67rem;
    opacity: 1;
  }

  .box {
    width: 18.31rem;
    height: 9.75rem;
    border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
    opacity: 1;
    //border: 0.06rem solid rgba(255, 255, 255, 0.14);
    //filter: blur(undefinedpx);
  }

  .box-2 {
    height: 12.5rem;
    background: #35256E;
    border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
    opacity: 1;
  }
`;
