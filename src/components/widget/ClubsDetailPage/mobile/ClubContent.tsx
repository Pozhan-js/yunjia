import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { Col, Row, Tabs, Table, Spin, message } from 'antd';
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
import PreviewModal from "@/components/widget/ClubsDetailPage/mobile/PreviewModal";
import MatchTime from "@/components/widget/ClubsDetailPage/mobile/MatchTime";
import rightArrowImg from "@/assets/images/HorseHubPage/right_arrow.png";
import emptyImg from '@/assets/images/ClubsDetailPage/empty.png';

export default function ClubContent({ clubId }) {

  //const [clubId, setClubId] = useState(3);
  const [profile, setProfile] = useState(null);
  const [sire, setSire] = useState(null);
  const navigate = useNavigate();
  const [btnName, setBtnName] = useState('');
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
          break;
        case 2:
          setBtnName('Mint End')
          break;
      }
    }
  }, [loading])
  if (loading) {
    return (<div className=" w-1/1 h-36 flex justify-center items-center ">
      <Spin />
    </div>)
  }

  const handleCopy = (address) => {
    //console.log('handleCopy  address:', address)
    copy(address);
    message.success('Address copied successfully !');
  }
  return (<ClubContStyled className={'mb-4'}>
    {data?.data?.base ? <div className=" w-full">
      <div className=" w-full">
        <div
          className="mg-card pb-6 mb-4  w-1/1 bg-cover bg-top bg-no-repeat rounded-[0.625rem] text-white box-border">
          <div className="w-1/1  pt-10 mb-4 px-5">
            <div className=" mb-6">
              <img className=" w-[6.66rem] h-[6.66rem] mx-auto" src={data?.data?.base?.img_url} />
            </div>
            <h3 className="w-1/1 text-center text-white text-2xl font-gtwalb">{data?.data?.base?.name}</h3>
            <div className=" flex justify-between items-center w-1/1 text-xs opacity-60 mt-3 ">
              <div className=" ">Omnihorse</div>
              <div className="w-0 h-2 border-r border-r-gray-400 mx-[0.375rem] "></div>
              <div className=" ">{data?.data?.base?.blockchain}</div>
              <div className="w-0 h-2 border-r border-r-gray-400 mx-[0.375rem] "></div>
              <div className="whitespace-nowrap text-ellipsis">{data?.data?.base?.token_standard}</div>
              <div className="w-0 h-2 border-r border-r-gray-400 mx-[0.375rem] "></div>
              <div
                className="whitespace-nowrap text-ellipsis">Member {data?.data?.base?.holder_total}</div>
            </div>
            <div
              className=" flex justify-center cursor-pointer items-center w-1/1 mt-4  text-xs">
              <div>{utils.formatSubAddress(data?.data?.base?.token_contract)}</div>
              <div className=" ml-2" onClick={() => {
                handleCopy(data?.data?.base?.token_contract)
              }}><img src={copyImg} className={'w-[1.13rem] h-[1.13rem]'} /></div>
            </div>
          </div>
          <div className=" px-5 mb-4 mt-4">
            <p className=" text-[0.81rem] leading-4  w-1/1 max-h-[6rem] font-gtwalp text-ellipsis overflow-hidden whitespace-pre-wrap text-[#ffffff99] ">
              {data?.data?.base?.club_content}
            </p>
          </div>
          <div className=" w-1/1 text-center px-5 ">
            <button disabled={!(data?.data?.mint?.runningstatus === 1)} onClick={() => {
              navigate(`/mint_detail/${data?.data?.mint?.mintid}`)
            }}
              className={`btn-mint text-base font-msrb ${data?.data?.mint?.runningstatus !== 1 && 'text-opacity-60'}`}>
              {btnName}
            </button>
            <button className={'btn-detail font-semibold text-base mt-3'} onClick={() => {
              navigate('/horse_hub/' + data?.data?.base?.horseid);    // 马的id
            }}>
              Horse Details
            </button>
          </div>
        </div>
      </div>
      {/*  <div className=" w-full">
        <ClubProfile profile={profile} sire={sire} />
      </div>*/}
      <div className=" w-1/1 text-white mt-2">
        <ClubBenefits clubId={clubId} />
      </div>
      <div className=" w-1/1  mt-6">
        {/* <ClubsTabs clubId={clubId} /> */}
        <ClubsMedia clubId={clubId} />
        <ClubsRacing clubId={clubId} />
      </div>
      <MatchTime clubId={clubId} />
    </div> : <div className="flex flex-col justify-center  items-center w-1/1 h-40 text-white text-base">
      <img src={emptyImg} className={'w-[2.17rem] h-[2.5rem] object-cover'} />
      <p className={'mt-2'}>The club coming soon</p>
    </div>}
  </ClubContStyled>)
}

const ClubContStyled = styled.div`
  .mg-btn {
    width: 11.81rem;
    height: 2.5rem;
    background: #6F19F7;
    border-radius: 0.63rem;
  }
  .btn-mint{
    width: 18.44rem;
    height: 2.75rem;
    background: #B902FD;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }
  .btn-detail {
    width: 18.44rem;
    height: 2.75rem;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }
  .mg-card {
    background-image: url(${AssetsImgs.ic_club_top_bg});
    background-color: #161528;
  }

  .mg-tabs {
    color: rgba(255, 255, 255, 0.6);


    .ant-tabs-nav {
      margin: 0;

      ::before {
        border: 0.06rem solid rgba(255, 255, 255, 0.1);
        margin: 0 -1.25rem;
      }

      .ant-tabs-nav-list {
        font-family: 'GTWalsheimProMedium';
        width: 100%;
        justify-content: flex-start;
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

        .ant-tabs-tab + .ant-tabs-tab {
          margin: 0 0 0 1.875rem;
        }
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
    max-width: initial;
    width: fit-content;
    min-width: 100%;

    .ant-table {
      border: 0.03rem solid #33333B;
      border-radius: 0.63rem;
      color: #fff;
      /* background-color: #17171A; */
      background-color: #45338B73;

      .ant-table-thead > tr > th {
        /* background-color: #17171A; */
        background-color: transparent;
        color: rgba(255, 255, 255, 0.4);
        border: none;
        border-radius: 0.63rem;
        padding: 1.5rem 1.5rem 0.5rem 1rem;
        font-size: 1rem;
        white-space: nowrap;
      }

      .ant-table-tbody {
        > tr.ant-table-placeholder:hover > td {
          background-color: transparent;
        }

        > tr > td {
          border-bottom: 0.03rem solid #33333B;
          padding-left: 1.5rem;
          padding-top: 2rem;
          padding-bottom: 2rem;
          font-size: 1rem;
          white-space: nowrap;
        }

        .ant-empty-normal {
          color: #fff;
          opacity: 0.6;
          font-size: 0.75rem;

          .ant-empty-image {
            height: 1.875rem;

            svg {
              width: 3.125rem;
              height: 1.875rem;
            }
          }
        }
      }

      .ant-table-tbody > tr:last-child > td:first-child {
        border-bottom-left-radius: 0.63rem;
      }

      .ant-table-tbody > tr:last-child > td:last-child {
        border-bottom-right-radius: 0.63rem;
      }

      .ant-table-tbody > tr.ant-table-row:hover > td {
        background: transparent;
      }

      .ant-table-cell-row-hover {
        background-color: transparent;
        //background-color: rgba(0,0,0,0.3);
      }

    }
  }
`;


// function ClubsTabs({ clubId }) {
//   const tabsItems = [{
//     label: 'Racing Match', key: 'racing', children: <ClubsRacing clubId={clubId} />
//   }, { label: 'Media', key: 'media', children: <ClubsMedia clubId={clubId} /> },];
//   return (<Tabs defaultActiveKey="racing" items={tabsItems} className="mg-tabs" />);
// }

function ClubsRacing({ clubId }) {
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
      if (cdata.data && cdata.data.list && cdata.data.list.lengh > 0) {
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
      } else {
        setColumnsData([])
      }
      // if (cdata.data && cdata.data.total) {
      //   let ctotal = cdata.data.total;
      //   let cols = []
      //   Object.keys(ctotal).forEach(key => cols.push({ title: key, dataIndex: key }));
      //   setColumnsStat(cols);
      //   ctotal.key = 1;
      //   ctotal.Earnings = '$' + ctotal.Earnings
      //   //console.log(" useRequest ctotal", [ctotal])
      //   setStatData([ctotal])
      // }
      if (cdata.data && cdata?.data?.yearstat) {
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
    return (<div className=" w-1/1 h-36  flex justify-center items-center ">
      <Spin />
    </div>)
  }
  return (<div className={`overflow-hidden  ${columns?.length > 0 ? '-mr-5' : ''} `}>
    <div className={'text-white text-base font-gtwalb mt-6'}>NFT Sale</div>
    <div className=" overflow-x-auto  pb-2">
      <Table
        className={`mg-table mt-2 ${columns?.length > 0 ? 'pr-5' : ''}`}
        columns={nftSaleColumns}
        dataSource={nftSaleData}
        pagination={false}
      />
    </div>
    <div className={'text-white text-base font-gtwalb mt-6'}>Racing Match</div>
    <div className="text-white font-gtwalb text-base mt-4 mb-3">Past Result</div>
    <div className=" overflow-x-auto  pb-2">
      <Table
        className={`mg-table ${columns?.length > 0 ? 'pr-5' : ''}`}
        columns={columns}
        dataSource={columnsData}
        pagination={false}
      />
    </div>
    <div className="text-white font-gtwalb text-base mt-6 mb-3">Statistics</div>
    <div className=" overflow-x-auto  pb-2">
      <Table
        className={`mg-table ${columns?.length > 0 ? 'pr-5' : ''}`}
        columns={columnsStat}
        dataSource={statData}
        pagination={false}
      />
    </div>
  </div>)
}

function ClubsMedia({ clubId }) {

  const navigate = useNavigate();
  //const { data, loading } = useRequest(() => getClubDetailMedia(clubId));
  const { data, loading } = useRequest(() => getMediaList(clubId, 1));
  if (loading) {
    return (<div className=" w-1/1 h-36 flex justify-center items-center ">
      <Spin />
    </div>)
  }
  return (<ClubsMediaStyled>
    <div className=" mt-3 overflow-hidden ">
      <div className="flex justify-between ">
        <p className={'text-white text-base font-gtwalb'}>Media</p>
        <span className={'text-white text-base font-gtwalmp flex items-center cursor-pointer'}
          onClick={() => {
            navigate(`/medialist/${clubId}`)
          }
          }>more<img
            src={rightArrowImg}
            className={'w-4 h-4 ml-[0.19rem]'} /></span>
      </div>
      <div className=" mt-[0.875rem] flex flex-wrap items-center">
        <PreviewModal list={data?.data}  />
        {/*{data?.data?.length > 0 ? data.data.map((item, index_) => {*/}
        {/*    return (<div className=" w-1/2 mt-1 " key={index_}>*/}
        {/*        {item.res_type === 1 ?*/}
        {/*            <a href={item.res_url && item.res_url.length > 0 ? item.res_url : '#'}*/}
        {/*                className={`rounded-[0.625rem] inline-block ${(index_ + 1) % 2 === 1 ? 'pr-1' : 'pl-1'}`}*/}
        {/*                target="_blank">*/}
        {/*                <img*/}
        {/*                    className={`rounded-[0.625rem] cursor-pointer  object-cover transition duration-[350ms] `}*/}
        {/*                    src={item.img_url && item.img_url.length > 0 ? item.img_url : item.res_url}*/}
        {/*                    alt='Media Picture' />*/}
        {/*            </a> : null}*/}
        {/*    </div>)*/}
        {/*}) :}*/}
      </div>
    </div>
  </ClubsMediaStyled>)
}


const ClubsMediaStyled = styled.div`
  .mask {
    background: rgba(0, 0, 0, 0.5);
  }

  
`;
