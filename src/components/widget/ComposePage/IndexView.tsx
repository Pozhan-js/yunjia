import {Select} from "antd";
import NftCard from "@/components/widget/ComposePage/NftCard";
import {useEffect, useState} from "react";
import {useRequest, useUpdateEffect} from "ahooks";
import {getStakeMain} from "@/services/v1/stake";
import {getNftList} from "@/services/v1/compose";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";

const {Option} = Select;
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
export default function IndexView({account}) {
    const [clubId, setClubId] = useState(0);
    const [clubList, setClubList] = useState([]);
    const [selectedLv, setSelectedLv] = useState(0);
    const [nftList, setNftList] = useState([]);
    const navigate = useNavigate();
    useRequest(() => getStakeMain(account), {
        onSuccess: (data: any) => {
            setClubList(data.data.myclub)
        }
    });
    const {loading, run} = useRequest(getNftList, {
        defaultParams: [account, 0, 0],
        onSuccess: (data) => {
            setNftList(data.data)
        }
    });
    useUpdateEffect(() => {
        run(account, clubId, selectedLv)
    }, [clubId, selectedLv]);


    return (
        <>
            <div className={'flex mg-select'}>
                <Select
                    showSearch
                    popupClassName="mg-select-pop"
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
                <div className="ml-6 lv-box flex items-center justify-around">
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
            </div>
            <div className={'font-gtwalp text-base text-white mt-3'}>
                Total: {nftList.length}
            </div>

            {/*NFT List*/}
            {loading ? <div className=" w-full h-[20rem] flex justify-center items-center ">
                <CircularProgress/>
            </div> : <div className={'grid grid-cols-5 gap-x-6 my-4 gap-y-8'}>
                {nftList.map((item, index) => {
                    return (
                        <NftCard key={index} item={item} onClick={() => {
                            navigate('', {
                                state: {
                                    view_id: 2,
                                    nft_item: item
                                }
                            })
                        }}/>
                    )
                })}
            </div>}

        </>
    )
}
