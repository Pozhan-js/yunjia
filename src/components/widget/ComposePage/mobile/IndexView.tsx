import { Select } from "antd";
import NftCard from "./NftCard";
import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { getStakeMain } from "@/services/v1/stake";
import { getNftList } from "@/services/v1/compose";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const { Option } = Select;
const lvList = [
    {
        label: 'ALL',
        value: 0
    },
    {
        label: 'Lv1',
        value: 1
    },
    {
        label: 'Lv2',
        value: 2
    },
    {
        label: 'Lv3',
        value: 3
    },
    {
        label: 'Lv4',
        value: 4
    }

];
export default function IndexView({ account }) {
    const [clubId, setClubId] = useState(0);
    const [clubList, setClubList] = useState([]);
    const [selectedLv, setSelectedLv] = useState(0);
    const [nftCount, setNftCount] = useState(0);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
        }, 0);
    }, [clubId, selectedLv]);

    useRequest(() => getStakeMain(account), {
        onSuccess: (data: any) => {
            setClubList(data.data.myclub)
        }
    });

    return (
        <>
            <div className=''>
                <div className="lv-box w-full h-[2rem] flex items-center justify-around">
                    {lvList.map((item, index) => {
                        return (
                            <div key={index} className={'relative'}>
                                <div
                                    onClick={() => setSelectedLv(item.value)}
                                    className={`font-gtwalmp cursor-pointer ${selectedLv === item.value ? 'text-base text-white' : 'text-base text-white text-opacity-60'}`}>
                                    {item.label}
                                </div>
                                <div className={'absolute w-[1.63rem] h-[0.13rem] bg-[#B902FD] mt-1'}
                                    hidden={selectedLv !== item.value}>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="mg-select-mobile mt-[0.625rem]">
                    <Select
                        className="w-full h-[2rem] border-[0.06rem] border-[#FFFFFF4D]"
                        showSearch
                        popupClassName="mg-select-pop-mobile"
                        placeholder="Select a item"
                        defaultValue={0}
                        value={clubId}
                        optionFilterProp="children"
                        onChange={setClubId}
                        filterOption={(input, option: any) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        <Option value={0}>All Club</Option>
                        {
                            clubList?.map((item, index) => {
                                return (
                                    <Option value={item.id} key={index + 1}>{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className={'font-gtwalp text-base text-white mt-3'}>
                    Total: {nftCount}
                </div>
            </div>


            {/*NFT List   grid grid-cols-2 gap-x-[0.81rem] my-4 gap-y-3 */}
            {/* <div className={'flex justify-between'}> */}
            {!refresh ? <NftContent account={account} selectedLv={selectedLv} clubId={clubId} setNftCount={setNftCount} /> : null}

            {/* <div className={' grid grid-cols-2 gap-x-[0.81rem] my-4 gap-y-3'}>
                {nftList.map((item, index) => {
                    return (
                        <NftCard key={index} item={item} onClick={() => {
                            navigate('', {
                                state: {
                                    view_id: 2,
                                    nft_item: item
                                }
                            })
                        }} />
                    )
                })}
            </div> */}
        </>
    )
}

function NftContent({ account, selectedLv, clubId, setNftCount }) {
    const [nftList, setNftList] = useState([]);
    const navigate = useNavigate();
    const { data, loading } = useRequest(getNftList, {
        defaultParams: [account, clubId, selectedLv],
        onSuccess: (data) => {
            if (data.data) {
                setNftList(data.data)
                setNftCount(data.data.length)
            }
        }
    });
    if (loading) {
        return (<div className=" w-1/1 h-[10rem]  flex justify-center items-center ">
            <CircularProgress />
        </div>)
    }
    return (
        <div className={' grid grid-cols-2 gap-x-[0.81rem] my-4 gap-y-3'}>
            {nftList.map((item, index) => {
                return (
                    <NftCard key={index} item={item} onClick={() => {
                        navigate('', {
                            state: {
                                view_id: 2,
                                nft_item: item
                            }
                        })
                    }} />
                )
            })}
        </div>
    )
}
