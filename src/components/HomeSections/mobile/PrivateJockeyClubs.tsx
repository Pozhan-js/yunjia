import styled from "styled-components";
import { useRequest, useMount } from "ahooks";
import { clubsInfo, getTreasury, getBonusRank } from "@/services/v1/home";
import $T from '@/utils/utils';
import titleBgImg from "@/assets/images/title_bg.png";
import nftsImg from '@/assets/images/HomePage/PrivateJockeyClubs/mobile/NFT.png';
import powerImg from '@/assets/images/HomePage/PrivateJockeyClubs/mobile/Power.png';
import total_clubsImg from '@/assets/images/HomePage/PrivateJockeyClubs/mobile/TotalClubs.png';
import userImg from '@/assets/images/HomePage/PrivateJockeyClubs/mobile/User.png';
import privatejcBg1 from '@/assets/images/HomePage/PrivateJockeyClubs/mobile/privatejc_bg1.png';
import privatejcBg2 from '@/assets/images/HomePage/PrivateJockeyClubs/mobile/privatejc_bg2.png';

import { Box, Tooltip } from "@mui/material";
import theme from "@/config/themeSetting";
import AssetsImgs from "@/components/widget/StakePage/AssetsImgs";
import React, { useState } from "react";
import rightArrowImg from "@/assets/images/HorseHubPage/right_arrow.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@/components/mobile/widget/Table";
import PyramidImg from '@/assets/images/HomePage/PrivateJockeyClubs/pyramid.png';
import themeSetting from "@/config/themeSetting";
import CircleImg from '@/assets/images/HomePage/PrivateJockeyClubs/circle.png';
import economicImg from "@/assets/images/HomePage/PrivateJockeyClubs/ES.png";
import { config } from "@/config";
import { Select } from "antd";

const { Option } = Select;


export default function PrivateClubSection({totalPrizeShow}) {
    const [columnVal, setColumnVal] = useState('tcoin');
    const [tooltipOpen1, setTooltipOpen1] = useState(false);
    const { data, loading } = useRequest(clubsInfo)
    const { data: data_treasury } = useRequest(getTreasury);
    const navigate = useNavigate();
    const [bonusRankData, setBonusRankData] = useState([]);
    const WALLET_ADDRESS = useSelector((state: StoreState) => state?.WALLET_ADDRESS)
    useRequest(getBonusRank, {
        onSuccess: (tdata) => {
            setBonusRankData(tdata?.data);
        }
    })
    const arr = [
        {
            src: userImg,
            field: 'mining',
            des: 'Total Mining Users'
        },
        {
            src: total_clubsImg,
            field: 'totalclub',
            des: 'Total Clubs'
        },
        {
            src: nftsImg,
            field: 'totalnft',
            des: 'Total Released NFTs'
        },

        {
            src: powerImg,
            field: 'totalpower',
            des: 'Total Power'
        },
    ];

    const headers = [
        {
            title: '',
            key: '',
            width: 'min-w-[1.3rem]',
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
                    <p style={{ color: color }} className={'text-base font-gtwalb'}>{index + 1}</p>
                )
            }
        },
        {
            title: 'Club',
            key: 'name',
            render: (text, record) => {
                return (
                    <div className={'flex items-center cursor-pointer'} onClick={() => {
                        // console.log(record)
                        navigate(`/clubs/${record?.club_id}`)
                    }}>
                        <img src={record?.img_url} className={'w-[2.625rem] h-[2.625rem]'} />
                        <p className={'text-white text-sm font-gtwalp ml-[0.8rem] pr-1 max-w-[8.3rem] max-h-10 overflow-hidden'}>{text}</p>
                    </div>
                )

            }
        },
        {
            title: 'Prize Pool',
            key: 'tcoin',
            val: 'tcoin',
            width: 'min-w-[6rem] text-right',
            render: (text) => {
                return (
                    <div className={'flex items-center justify-end'}>
                        <p className={'text-sm  text-white font-gtwalp'}>${$T.formatThousand(text)}</p>
                    </div>
                )
            }
        },
        {
            title: 'State',
            key: 'club_status',
            val: 'clubstatus',
            width: 'min-w-[6rem] text-right',
            render: (text, record, index) => {
                let status = { text: 'Minting', color: '#4CAD6D' };
                switch (text) {
                    case 1:
                        status = { color: '#FC35A7', text: 'Minting' };
                        break;
                    case 2:
                        status = { color: '#9E9E9E', text: 'Training' };
                        break;
                    case 3:
                        status = { color: '#FFA033', text: 'Racing' };
                        break;
                    case 4:
                        status = { color: '#4CAD6D', text: 'Breading' };
                        break;
                }
                return (
                    <p className="text-sm  text-right">
                        {status.text}
                    </p>
                )
            }
        }
    ]
    // console.log(data?.data ?.[arr[0].field])
    return (
        <Styled className={"flex flex-col items-center mt-16"} id={'jockeyclub'}>
            <div className="flex text-[1.75rem] font-gtwalbpo text-white">
                <span className={''}>Private Jockey</span>
                <span className={'ml-2 bg-gradient-title-2'}>Clubs</span>
            </div>
            <img src={titleBgImg} className={'w-[13.62rem] bg-cover bg-center'} />
            <div
                className={"mt-[1.44rem] text-white text-sm text-opacity-80 content text-center mb-[1.5rem] font-gtwal px-[1.63rem]"}>
                The Omnihorse ecosystem is simple: each of our Private Jockey Clubs are backed by a real-life elite
                thoroughbred. To join, all you need to do is purchase an NFT membership. Club members can then
                participate in horsepower mining and access to metaverse gaming.
            </div>
            <div className={"grid grid-cols-2 gap-x-[0.625rem] gap-y-[0.625rem] grid-icon"}>
                {!loading && arr.map((item, index) => {
                    return (
                        <div key={index} className={` box flex flex-col items-center justify-center py-3 `}
                            style={{ backgroundImage: `url(${index % 3 === 0 ? privatejcBg2 : privatejcBg1})` }}>
                            <img src={item.src} className={'object-cover'} />
                            <div className={'flex flex-col items-center mt-2'}>
                                <div
                                    className={'font-[1.38rem] text-white text-[1.38rem] leading-[2.34rem] font-ggm'}>{$T.formatThousand(data?.data?.[item.field])}</div>
                                <div
                                    className={'text-white text-opacity-60 font-normal text-sm truncate clamp-line-1'}>{item.des}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {totalPrizeShow &&
                <div className="px-5 w-full">
                    <div className={'mt-[0.625rem] box-2 w-full relative '}>
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
                            The total bonus amount is the number of bonuses obtained, and the remaining bonus amount of the
                            treasury is the amount of bonuses that can be used for distribution. This bonus is used for
                            users to obtain OMH acceptance by staking NFT mining
                        </Box>} placement="bottom" arrow={true} onClose={() => {
                            setTooltipOpen1(false)
                        }} open={tooltipOpen1}>
                            <img src={AssetsImgs.questionImg} className={'w-6 h-6 absolute right-4  top-4'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTooltipOpen1(true)
                                }} />
                        </Tooltip>
                        <div style={{ background: `url(${CircleImg})`, backgroundSize: 'contain' }}
                            className={'w-[8.75rem] h-[8.75rem]  flex justify-center items-center mx-auto '}>
                            <div className=" text-center">
                                <img src={PyramidImg} className={'w-[3.1875rem] h-[2.6875rem] mx-auto'} />
                                <p className={'text-white  text-[1.375rem] font-semibold'}>${$T.formatThousand(data_treasury?.data?.totalbonus)}</p>
                                <p className={'text-[0.875rem] text-[#C7BBF6] -mt-2'}>Treasury</p>
                            </div>
                        </div>
                        <div className={'mt-6 flex justify-between w-full'}>
                            <div className={'flex flex-col items-center text-center w-[7.25rem]'}>
                                <p className={'text-white text-[1.375rem] font-semibold  max-w-[6.25rem] break-all'}>{$T.formatThousand(data_treasury?.data?.exchangedbonus)}<span className="text-base"> Usdt</span></p>
                                <p className={'text-white text-opacity-60 text-sm'}>Treasury<br /> exchanged bonus</p>
                            </div>
                            <div className=" pt-3 pb-2">
                                <div className="w-[0.0625rem] h-full mx-auto border-0 bg-[#ffffff1a] "></div>
                            </div>
                            <div className={'flex flex-col items-center text-center  w-[7.25rem]'}>
                                <div className={'flex items-center'}>
                                    <div className={'flex items-center'}>
                                        <p className={'text-white  text-[1.375rem] font-semibold  max-w-[6.25rem] break-all'}>{$T.formatThousand(data_treasury?.data?.remainingbonus)}<span className="text-base"> Usdt</span></p>
                                    </div>
                                    <img src={rightArrowImg} onClick={() => {
                                        window.open(config.ETHERSCAN_URL + `/address/${WALLET_ADDRESS}`);
                                    }}
                                        className={'w-4 h-4 ml-1 mt-[0.1rem]'} alt={''} />
                                </div>
                                <p className={'text-white text-opacity-60 text-sm'}>Treasury<br /> remaining bonus</p>
                            </div>
                        </div>
                    </div>
                </div>}
            <div className={'flex justify-between items-center w-full mt-[1.88rem] px-5'}>
                <p className={'bg-clip-text text-opacity-70 text-white text text-[1.75rem] font-gtwalmpo  font-normal'}>
                    Prize Rank</p>
                <span className={'text-white text-base flex items-center cursor-pointer'}
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
            <div className={'mg-select-mobile mt-1 w-full  px-5 '}>
                <Select
                    className={'w-full h-[2rem] border-[0.06rem] border-[#FFFFFF4D]'}
                    popupClassName="mg-select-pop-mobile"
                    placeholder="Select a item"
                    defaultValue={columnVal}
                    value={columnVal}
                    optionFilterProp="children"
                    onChange={setColumnVal}
                >
                    <Option value={'tcoin'} key={1}>Prize Pool</Option>
                    <Option value={'clubstatus'} key={2}>State</Option>
                </Select>
            </div>
            <div className=" w-full px-5  mt-3 ">
                {bonusRankData.length > 0 && <div className="bg-[#35256E] rounded py-5 px-4 ">
                    <Table className={' rounded w-full'} headers={headers}
                        data={bonusRankData} columnVal={columnVal} />
                </div>}
            </div>

            {/* <div className={'text-white text-opacity-70 text-[2.25rem] font-normal mb-[3rem] mt-[6rem] font-gtwalmpo'}>
                The Omnihorse Horsepower Mining Model
            </div>
            <img src={economicImg} className={'object-cover w-[69.43rem] mt-[1.2rem]'} /> */}

        </Styled>
    );
}

const Styled = styled.div`
  .grid-icon img {
    height: 3.63rem;
    width: 3.63rem;
  }

  .box {
    width: 44vw;
    height: 44vw;
    border-radius: 0.63rem;
    opacity: 1;
    /* border: 0.06rem solid rgba(255, 255, 255, 0.14); */
  }

  .box-2 {
    background: #35256E;
    border-radius: 0.625rem;
    padding: 1.875rem 1.6875rem;
  }
`;
