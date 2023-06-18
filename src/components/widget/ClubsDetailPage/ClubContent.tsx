import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { Tabs, Table, message } from 'antd';
import AssetsImgs from "./AssetsImgs";
import { useRequest } from 'ahooks'
import { getClubDetailIndex, getClubDetailMatch, getClubDetailMedia, getNFTSaleList } from "@/services/v1/clubsDetail"
import { getMediaList } from "@/services/v1/horseHub";
import utils from '@/utils/utils'
import copy from "copy-to-clipboard";
import ClubProfile from "./ClubProfile";
import ClubBenefits from "./ClubBenefits";
import copyImg from "@/assets/images/HomePage/Banner/ic_copy@2x.png";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import theme from '@/config/themeSetting';
import PreviewModal from "@/components/widget/ClubsDetailPage/PreviewModal";
import emptyImg from '@/assets/images/ClubsDetailPage/empty.png';
import rightArrowImg from "@/assets/images/HorseHubPage/right_arrow.png";
import MatchTime from "@/components/widget/ClubsDetailPage/MatchTime";

export default function ClubContent({ clubId, cardBg = '' }) {

    //const [clubId, setClubId] = useState(3);
    const [profile, setProfile] = useState(null);
    const [sire, setSire] = useState(null);
    const navigate = useNavigate();
    const [btnName, setBtnName] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);
    const { data, loading } = useRequest(() => getClubDetailIndex(clubId), {
        onSuccess: (cdata) => {
            setProfile(cdata?.data?.profile)
            setSire(cdata?.data?.sire)
        }
    });
    useEffect(() => {
        if (loading === false) {
            switch (data?.data?.mint?.runningstatus) {
                case 0:
                    setBtnName('Coming Soon')
                    break;
                case 1:
                    setBtnName('Mint Now')
                    setBtnDisable(false)
                    break;
                case 2:
                    setBtnName('Mint End')
                    break;
            }
        }
    }, [loading])
    if (loading) {
        return (<div className=" w-1/1 h-36 flex justify-center items-center ">
            <CircularProgress />
        </div>)
    }

    const handleCopy = (address) => {
        //console.log('handleCopy  address:', address)
        copy(address);
        message.success('Address copied successfully !');
    }
    // @ts-ignore
    return (<ClubContentStyled className={'mb-[5rem] w-[68.75rem] '} bgColor={cardBg}>
        {data?.data?.base ?
            <div className={''}>
                <div
                    className="mg-card h-[16.19rem] w-1/1 bg-center bg-cover rounded-[0.63rem] text-white box-border">
                    <div className="w-1/1  flex justify-center items-center pt-10 pb-5 px-8">
                        <div className=" w-32 mr-auto">
                            <img className=" w-24 h-24" src={data?.data?.base?.img_url} />
                        </div>
                        <div className=" 2xl:w-8/12  md:w-9/12 ">
                            <h3 className="text-white text-3xl font-gtwalb">{data?.data?.base?.name}</h3>
                            <div className=" flex justify-start items-center w-1/1 mt-2 text-xs opacity-60">
                                <div className=" ">Omnihorse</div>
                                <div className="w-0 h-2 border-r border-r-gray-400 mx-3 "></div>
                                <div className=" ">{data?.data?.base?.blockchain}</div>
                                <div className="w-0 h-2 border-r border-r-gray-400 mx-3 "></div>
                                <div className="">{data?.data?.base?.token_standard}</div>
                                <div className="w-0 h-2 border-r border-r-gray-400 mx-3 "></div>
                                <div className="">Member {data?.data?.base?.holder_total}</div>
                            </div>
                            <div
                                className=" flex justify-start cursor-pointer items-center w-1/1  mt-3  text-xs opacity-60">
                                <div>{utils.formatSubAddress(data?.data?.base?.token_contract)}</div>
                                <div className=" ml-2" onClick={() => {
                                    handleCopy(data?.data?.base?.token_contract)
                                }}><img src={copyImg} className={'w-[1.13rem] h-[1.13rem]'} /></div>
                            </div>
                        </div>
                        <div className=" 2xl:w-3/12 text-right ml-auto">
                            <button disabled={btnDisable} onClick={() => {
                                navigate(`/mint_detail/${data?.data?.mint?.mintid}`)
                            }}
                                style={{ backgroundColor: btnDisable ? theme.nftBigBtn.disableColor : theme.nftBigBtn.color }}
                                className={`btn-mint font-semibold text-base ${data?.data?.mint?.runningstatus !== 1 && 'text-opacity-60'}`}>
                                {btnName}
                            </button>
                            <button className={'btn-detail font-semibold text-base mt-3'} onClick={() => {
                                navigate('/horse_hub/' + data?.data?.base?.horseid);  // 马的id
                            }}>
                                Horse Details
                            </button>
                        </div>
                    </div>

                    <div className=" px-6 pb-4">
                        <p className=" text-sm opacity-60 px-3 w-5/6 h-16 text-ellipsis overflow-hidden whitespace-pre-wrap ">
                            {data?.data?.base?.club_content}
                        </p>
                    </div>
                </div>
                <div className=" w-1/1 text-white mt-2">
                    <ClubBenefits clubId={clubId} />
                </div>
                <div className=" w-1/1  mt-2">
                    {/*<ClubsTabs clubId={clubId} cardBg={cardBg}/>*/}
                    <ClubsMedia clubId={clubId} />
                </div>
                <Tables clubId={clubId} />
                <MatchTime clubId={clubId} />
            </div> :
            <div className="flex flex-col justify-center  items-center w-1/1 h-36 text-white text-2xl">
                <img src={emptyImg} className={'w-[2.17rem] h-[2.5rem] object-cover'} />
                <p className={'mt-2'}>The club coming soon</p>
            </div>}
    </ClubContentStyled>)
}


// function ClubsTabs({clubId, cardBg}) {
//     const tabsItems = [{
//         label: 'Racing Match', key: 'racing', children: <ClubsRacing clubId={clubId}/>
//     }, {label: 'Media', key: 'media', children: <ClubsMedia clubId={clubId}/>},];
//     return (<Tabs defaultActiveKey="racing" items={tabsItems} className="mg-tabs"/>);
// }

function Tables({ clubId }) {
    const [columns, setColumns] = useState([]);
    const [columnsData, setColumnsData] = useState([]);

    const [columnsStat, setColumnsStat] = useState([]);
    const [statData, setStatData] = useState([]);

    const [nftSaleColumns, setNftSaleColumns] = useState([]);
    const [nftSaleData, setNftSaleData] = useState([]);

    useRequest(getNFTSaleList, {
        defaultParams: [clubId],
        onSuccess: (tdata) => {
            // console.log(tdata.data);
            if (tdata.data && tdata.data.length > 0) {
                let clist = tdata.data;
                let cols = []
                Object.keys(clist[0]).forEach(key => cols.push({ title: key, dataIndex: key }));
                setNftSaleColumns(cols);
                let colDatas = [];
                for (let index = 0; index < clist.length; index++) {
                    const item = clist[index];
                    item.key = index;
                    colDatas.push(item)
                }
                //console.log(" useRequest colDatas", colDatas)
                setNftSaleData(colDatas)
            }
        }
    })
    const { data, loading } = useRequest(() => getClubDetailMatch(clubId), {
        onSuccess: (cdata) => {
            if (cdata.data && cdata.data.list.length > 0) {
                let clist = cdata.data.list;
                let cols = []
                Object.keys(clist[0]).forEach(key => cols.push({ title: key, dataIndex: key }));
                setColumns(cols);
                let colDatas = [];
                for (let index = 0; index < clist.length; index++) {
                    const item = clist[index];
                    item.key = index;
                    colDatas.push(item)
                }
                //console.log(" useRequest colDatas", colDatas)
                setColumnsData(colDatas)
            }
            if (cdata.data && Object.keys(cdata?.data?.yearstat).length > 0) {
                let ctotal = cdata.data.yearstat[Object.keys(cdata.data.yearstat)[0]];
                if (ctotal) {
                    let cols = []
                    Object.keys(ctotal).forEach(key => cols.push({ title: key, dataIndex: key }));
                    setColumnsStat(cols);
                    ctotal.key = 1;
                    ctotal.Earnings = '$' + ctotal.Earnings
                    //Earnings
                    //console.log(" useRequest ctotal", [ctotal])
                    setStatData([ctotal])
                } else {
                    setColumnsStat([]);
                    setStatData([])
                }
            }
        }
    });
    if (loading) {
        return (<div className=" w-1/1 h-36   flex justify-center items-center ">
            <CircularProgress />
        </div>)
    }
    return (<div>
        <div className={'text-white text-base font-gtwalb mt-6'}>NFT Sale</div>
        <Table
            className="mg-table mt-2"
            columns={nftSaleColumns}
            dataSource={nftSaleData}
            pagination={false}
        />
        <div className={'text-white text-base font-gtwalb mt-6'}>Racing Match</div>
        <div className="text-white text-opacity-60 font-gtwalp text-base mt-2 mb-3">Past Result</div>
        <Table
            className="mg-table"
            columns={columns}
            dataSource={columnsData}
            pagination={false}
        />
        {/*- {new Date().getFullYear()} Statistics*/}
        <div className="text-white text-opacity-60 font-gtwalp text-base mt-7 mb-3">Statistics</div>
        <Table
            className="mg-table"
            columns={columnsStat}
            dataSource={statData}
            pagination={false}
        />
    </div>)
}

function ClubsMedia({ clubId }) {
    const navigate = useNavigate();
    //const { data, loading } = useRequest(() => getClubDetailMedia(clubId));
    const { data, loading } = useRequest(() => getMediaList(clubId, 1));
    // const [index, setIndex] = useState(-1);
    if (loading) {
        return (<div className=" w-1/1 h-36 flex justify-center items-center ">
            <CircularProgress />
        </div>)
    }
    return (
        <div>
            <div className={'flex justify-between mt-5'}>
                <p className={'text-white text-base font-gtwalb'}>Media</p>
                <span className={'text-white text-base font-gtwalmp flex items-center cursor-pointer'}
                    onClick={() => {
                        navigate(`/medialist/${clubId}`)
                    }
                    }>more<img
                        src={rightArrowImg}
                        className={'w-4 h-4 ml-[0.19rem]'} /></span>
            </div>
            <div className={'grid grid-cols-5 gap-y-4 mt-3'}>
                <PreviewModal list={data?.data} preViewClass={'w-[13.25rem] h-[9.93rem] flex justify-center bg-black '} />
            </div>
        </div>
    )
}

const ClubContentStyled = styled.div`
  .mg-btn {
    width: 11.81rem;
    height: 2.5rem;
    background: #6F19F7;
    border-radius: 0.63rem;
  }

  .mg-card {
    background-image: url(${AssetsImgs.club_detail_bg});
  }

  .btn-mint {
    width: 11.81rem;
    height: 2.5rem;
    background: #B902FD;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .btn-detail {
    width: 11.81rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .mg-tabs {
    color: rgba(255, 255, 255, 0.6);

    .ant-tabs-nav {
      margin: 0;

      ::before {
        border: 0.06rem solid rgba(255, 255, 255, 0.09);
      }
    }

    .ant-tabs-nav-list {
      width: 100%;

      .ant-tabs-tab {
        font-size: 1rem;

        .ant-tabs-tab-btn {
          margin: 0 auto;

          :hover {
            color: #fff;
          }
        }
      }

      .ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #fff;
      }
    }

    .ant-tabs-ink-bar {
      background-color: #fff;
      height: 0.13rem;
    }

  }

  .mg-row {
    padding: 3rem;
  }

  .mg-table {
    .ant-table {
      border: 0.03rem solid #33333B;
      color: #fff;
      background-color: transparent;
      border-radius: 0.63rem;

      .ant-table-thead > tr > th {
        background-color: #45338B73;
        color: rgba(255, 255, 255, 0.4);
        border: none;
        //border-radius: 0.63rem;
        //border-radius: 0.63rem 0.63rem 0 0;
        padding-left: 1.5rem;
        padding-top: 1.5rem;

        font-size: 0.88rem;
      }

      .ant-table-tbody {
        background-color: #45338B73;

        > tr.ant-table-placeholder:hover > td {
          background-color: transparent;
        }

        > tr > td {
          border-bottom: 0.03rem solid rgba(255, 255, 255, 0.1);
          padding-left: 1.5rem;
          padding-top: 2rem;
          padding-bottom: 2rem;
          font-size: 0.88rem;
        }

        .ant-empty-description {
          color: #fff;
        }
      }

      .ant-table-tbody > tr:last-child > td:first-child {
        border-bottom-left-radius: 0.63rem;
      }

      .ant-table-tbody > tr:last-child > td:last-child {
        border-bottom-right-radius: 0.63rem;
      }

      .ant-table-cell-row-hover {
        background-color: transparent;
        //background-color: rgba(0,0,0,0.3);
      }

    }
  }
`;
