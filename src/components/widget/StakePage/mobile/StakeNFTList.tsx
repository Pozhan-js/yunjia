import { useState } from 'react'
import styled from "styled-components";
import { Select } from 'antd';
import AssetsImgs from './AssetsImgs'
import { getStakeMyStakeNft } from "@/services/v1/stake";
import { useSelector } from "react-redux";
import { useRequest, useUpdateEffect } from 'ahooks'
import NftCard from "@/components/widget/PersonalPage/mobile/NftCard";
import { CircularProgress } from "@mui/material";
import bgAddImg from '@/assets/images/StakePage/mobile/bg_add.jpg';
const { Option } = Select;

export default function StakeNFTList({ handleChangePage, clubList, initClubId }) {
    const [clubId, setClubId] = useState(initClubId);
    const [nftCount, setNftCount] = useState(0);
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const handleSelectChange = (value) => {
        setClubId(value);
    };
    return (
        <NFTLiStyled>

            <div className=' text-sm text-white font-gtwalmp font-medium'>Staking NFTs（{nftCount}）</div>

            <div className=" py-3 items-center grid grid-cols-12">
                <div className='mg-select-mobile col-span-8'>
                    <Select
                        showSearch
                        popupClassName={'mg-select-pop-mobile'}
                        placeholder="Select a item"
                        defaultValue={clubId}
                        value={clubId}
                        optionFilterProp="children"
                        onChange={handleSelectChange}
                        // options={[{ label: 'aa', value: 1 }, { label: 'bb', value: 2 }, { label: 'cc', value: 3 }, { label: 'dd', value: 4 },]}
                        filterOption={(input, option: any) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        <Option value={0}>All Club</Option>
                        {/* <Option value={1} >Club 1111</Option>
                        <Option value={2} >Club 2222</Option> */}
                        {
                            clubList?.map((item, index) => {
                                return (
                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                </div>

                <div className=" text-right col-span-4">
                    <button
                        className={`mg-btn text-white text-sm w-[6.25rem] h-[2rem]`}
                        onClick={() => handleChangePage(clubId)}>{nftCount === 0 ? 'Choose' : 'Change'}
                    </button>
                </div>
            </div>

            {clubId >= 0 ?
                <LoadNftCardList clubId={clubId} account={account} setNftCount={setNftCount}
                    handleChangePage={handleChangePage} className={''} /> : null}

        </NFTLiStyled>
    )
}

const NFTLiStyled = styled.div`
  .mg-btn {
    background: #B902FD;
    border-radius: 1.19rem;
  }

  .ant-select-arrow {
    padding-right: 0.5rem;
  }

  .mg-select-mobile {
    .ant-select {
      width: 100%;
      height: 2rem;
      border-radius: 0.63rem;
      border: 0.06rem solid #302A37;

      &:hover {
        border: 0.06rem solid #635e70;

        .ant-select-selector {
          border: none;
        }
      }

      .ant-select-selector {
        color: #fff;
        background-color: transparent;
        height: 100%;
        border: none;
        border-radius: 0.63rem;

        .ant-select-selection-search-input {
          height: 100%;
          padding: 0 0.6rem;

          &:focus {
            outline: none;
            box-shadow: none;
          }
        }

        .ant-select-selection-item {
          font-size: 0.88rem;
          padding: 0 0.6rem;
        }
      }

      .ant-select-arrow {
        color: #fff;
        font-size: 0.88rem;
      }
    }

    .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border: none;
      box-shadow: none;
    }
  }
`;

function LoadNftCardList({ clubId, account, setNftCount, handleChangePage, className = '' }) {
    const { data, loading, run } = useRequest(() => getStakeMyStakeNft(clubId, account), {
        onSuccess: (cdata) => {
            if (cdata && cdata.data) {
                setNftCount(cdata.data.length)
            }
        }
    });
    useUpdateEffect(() => {
        // @ts-ignore
        run(clubId, account)
    }, [clubId])
    if (loading) {
        return (<div className=" w-1/1 h-[20rem] flex justify-center items-center ">
            <CircularProgress />
        </div>)
    }

    return (
        <div className={`grid grid-cols-2 gap-x-3 py-3 gap-y-3 ${className}`}>{
            data && data.data && data.data.length > 0 ?
                data.data.map((item, index) => {
                    return (
                        <NftCard item={item} key={index} />
                    )
                }) :

                <div className='w-[45vw] h-[68vw] relative bg-cover rounded' onClick={() => handleChangePage(clubId)} >
                    {/* style={{ backgroundImage: `url(${bgAddImg})` }} */}
                    <img src={AssetsImgs.bg_add}
                        className={'w-[45vw] h-[68vw] object-contain rounded-[0.63rem]'}></img>
                    <div className=' w-1/1 text-center absolute top-[8.2rem] '>
                        <img className=' w-28  mx-auto ' src={AssetsImgs.btn_add}
                            onClick={() => handleChangePage(clubId)}></img>
                    </div>
                    <div className=' w-1/1 text-center text-white opacity-40 absolute top-[11.7rem] text-sm '>CHOOSE A
                        NFT
                    </div>
                </div>

        }</div>
    )
}
