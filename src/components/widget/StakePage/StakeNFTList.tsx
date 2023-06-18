import { useState } from 'react'
import styled from "styled-components";
import { Select } from 'antd';
import AssetsImgs from './AssetsImgs'
import { getStakeMyStakeNft } from "@/services/v1/stake";
import { useSelector } from "react-redux";
import { useRequest, useUpdateEffect } from 'ahooks'
import NftCard from "@/components/widget/PersonalPage/NftCard";
import { CircularProgress } from "@mui/material";

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
            <div className=" py-3 items-center pl-2 grid grid-cols-12">
                <div className='mg-select col-span-3'>
                    <Select
                        showSearch
                        popupClassName="mg-select-pop"
                        placeholder="Select a item"
                        defaultValue={clubId}
                        value={clubId}
                        optionFilterProp="children"
                        onChange={handleSelectChange}
                        filterOption={(input, option: any) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        <Option value={0}>All Club</Option>
                        {
                            clubList?.map((item, index) => {
                                return (
                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className={'col-span-4'}>
                    <div className=' text-base text-white '>Total : {nftCount}</div>
                </div>
                <div className=" text-right col-span-5">
                    <button
                        className={`mg-btn text-white text-base w-[8.75rem] h-[2.75rem] cursor-pointer  transition duration-150 ease-in-out`}
                        onClick={() => handleChangePage(clubId)}>{nftCount === 0 ? 'Choose' : 'Change'}
                    </button>
                </div>
            </div>

            {clubId >= 0 ?
                <LoadNftCardList className={'pl-2'} clubId={clubId} account={account} setNftCount={setNftCount}
                    handleChangePage={handleChangePage} /> : null}

        </NFTLiStyled>
    )
}

const NFTLiStyled = styled.div`
  .mg-btn {
    background: #6F19F7;
    border-radius: 1.19rem;
  }

  .ant-select-arrow {
    padding-right: 0.5rem;
  }
  
`;

function LoadNftCardList({ clubId, account, setNftCount, handleChangePage, className }) {
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
        <div className={`grid grid-cols-5 gap-x-6 my-6 gap-y-8 ${className}`}>{
            data && data.data && data.data.length > 0 ?
                data.data.map((item, index) => {
                    return (
                        <NftCard item={item} key={index} />
                    )
                }) :
                <div className='ml-4'>
                    <div className='w-1/1 h-1/1 relative '>
                        <img src={AssetsImgs.bg_add}
                            className={'w-[13.75rem] h-[19.63rem] object-contain rounded-[0.63rem]'}></img>
                        <div className=' text-center absolute top-[9.7rem] left-1/2 -ml-16 '>
                            <img className=' w-28  mx-auto ' src={AssetsImgs.btn_add}
                                onClick={() => handleChangePage(clubId)}></img>
                        </div>
                        <div className='w-[13.75rem] text-center text-white opacity-40 absolute top-[13.2rem]  text-sm '>CHOOSE A
                            NFT
                        </div>
                    </div>
                </div>
        }</div>
    )
}
