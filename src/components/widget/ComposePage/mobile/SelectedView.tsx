import styled from "styled-components";
import theme from "@/config/themeSetting";
import AssetsImgs from "@/components/widget/StakePage/AssetsImgs";
import {useLocation, useNavigate} from "react-router-dom";
import {useMount, useRequest, useSet} from "ahooks";
import {getNftList} from "@/services/v1/compose";
import {useState} from "react";
import {useSelector} from "react-redux";
import NftCard from "./NftCard";
import {CircularProgress} from "@mui/material";
import selectedFrame from '@/assets/images/ComposePage/selected_frame.png';

export default function SelectView() {
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const navigation = useNavigate();
    const {state: {nft_item}} = useLocation();
    const [selectedList, {add: addSelectedNft, remove: removeSelectedNft}] = useSet([]);
    const [nftList, setNftList] = useState([]);
    const [maxNum, setMaxNum] = useState(0);

    useMount(() => {
        setMaxNum(Math.pow(nft_item.level, 2));
    })
    const {data, loading} = useRequest(getNftList, {
        defaultParams: [account, nft_item.clubid, nft_item.level],
        onSuccess: (data) => {
            const nft_list = data.data.filter((item) => {
                return item.id != nft_item.id
            })
            setNftList(nft_list)
        }
    });
    if (loading) {
        return (<div className=" w-1/1 h-[20rem]  flex justify-center items-center ">
            <CircularProgress/>
        </div>)
    }
    const quickSelect = () => {
        let size = selectedList.size;
        for (let i = 0; i < nftList.length; i++) {
            if (size < maxNum) {
                if (!selectedList.has(nftList[i])) {
                    size = size + 1;
                    addSelectedNft(nftList[i])
                }
            }
        }
    }
    const confirm = () => {
        navigation('', {
            state: {
                view_id: 2,
                nft_item,
                selectedList
            }
        })
    }
    return (
        <Styled className={'relative font-gtwalp w-full z-10'}>
            <div className='w-full'>
                <div className=' bg-[#45338B73] rounded h-8 flex items-center justify-center'
                     onClick={() => navigation(-1)}>
                    <div className={'flex items-center'}>
                        <img className='w-4 h-4 object-cover object-center' src={AssetsImgs.btn_back}/>
                        <span className={'text-white text-opacity-60 ml-2'}>go back</span>
                    </div>
                </div>
            </div>
            <div className={'flex w-full mt-[1.31rem]'}>
                <div className={' flex flex-col w-full'}>
                    <div className={'flex justify-between'}>
                        <div className={'flex items-center justify-center text-sm'}>
                            <span className={'font-gtwalpm text-white'}>Lv{nft_item?.level} <span
                                className={'font-ggm text-white'}> ({selectedList.size}/{maxNum})</span></span>
                        </div>
                        <div className={'flex'}>
                            <button
                                onClick={quickSelect}
                                className={'btn-2 text-white font-gtwalpm font-medium text-sm flex-shrink-0 whitespace-nowrap'}>Quick
                                Select
                            </button>
                            <button
                                onClick={confirm}
                                className={'btn ml-[0.625rem] text-white font-gtwalpm font-medium text-sm flex-shrink-0 whitespace-nowrap'}>
                                Confirm
                            </button>
                        </div>
                    </div>
                    <div
                        className={'mt-3 w-full rounded grid grid-cols-2  gap-x-[0.81rem] gap-y-3 select-none'}>
                        {nftList.map((item, index) => {
                            return (
                                <div key={index} className={'relative w-fit'} onClick={() => {
                                    if (selectedList.has(item)) {
                                        removeSelectedNft(item)
                                    } else {
                                        if (selectedList.size >= maxNum) return;
                                        addSelectedNft(item)
                                    }
                                }}>
                                    <img hidden={!selectedList.has(item)} src={selectedFrame}
                                         className={'w-[44vw] h-[68vw] z-10 absolute top-0 left-0 cursor-pointer'}
                                         alt={''}/>
                                    <NftCard item={item}/>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .box-1 {
    width: 7.75rem;
    height: 2.38rem;
    background: #36276E;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .btn, .btn-2 {
    width: 6.25rem;
    height: 2rem;
    background: #6F19F7;
    border-radius: 1.19rem;
    opacity: 1;
  }

  .btn-2 {
    background: #B902FD;
  }

`;
