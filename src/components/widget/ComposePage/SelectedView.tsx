import styled from "styled-components";
import theme from "@/config/themeSetting";
import AssetsImgs from "@/components/widget/StakePage/AssetsImgs";
import {useLocation, useNavigate} from "react-router-dom";
import {useMount, useRequest, useSet} from "ahooks";
import {getNftList} from "@/services/v1/compose";
import {useState} from "react";
import {useSelector} from "react-redux";
import NftCard from "@/components/widget/ComposePage/NftCard";
import selectedFrame from '@/assets/images/ComposePage/selected_frame.png';
import {CircularProgress} from "@mui/material";

export default function SelectView() {
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const navigation = useNavigate();
    const {state: {nft_item, lv}} = useLocation();
    const [selectedList, {add, remove, reset}] = useSet([]);
    const [nftList, setNftList] = useState([]);
    const [max, setMaxNum] = useState(0);
    // console.log(nft_item)
    useMount(() => {
        setMaxNum(Math.pow(nft_item.level, 2));
    })
    const {loading} = useRequest(getNftList, {
        defaultParams: [account, nft_item.clubid, lv],
        onSuccess: (data) => {
            const nft_list = data.data.filter((item) => {
                return item.id != nft_item.id
            })
            setNftList(nft_list)
        }
    });
    const quickSelect = () => {
        let size = selectedList.size;
        for (let i = 0; i < nftList.length; i++) {
            if (size < max) {
                if (!selectedList.has(nftList[i])) {
                    size = size + 1;
                    add(nftList[i])
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
        <Styled className={'min-h-screen relative font-gtwalp w-full z-10'}>
            <div className={'flex w-full'}>
                <div
                    style={{backgroundColor: theme.stakePage.topCard.bgColor}}
                    className='rounded flex flex-shrink-0 justify-center items-center cursor-pointer w-[3.75rem] h-[3.75rem]'
                    onClick={() => navigation(-1)}>
                    <img className='w-8 h-8' src={AssetsImgs.btn_back} alt={''}/>
                </div>
                <div className={'ml-[3.5rem] flex flex-col w-full'}>
                    <div className={'flex justify-between'}>
                        <div className={'box-1 flex items-center justify-center text-base'}>
                            <span className={'font-gtwalpm text-white'}>Lv{nft_item?.level} <span
                                className={'font-ggm text-white'}> ({selectedList.size}/{max})</span></span>
                        </div>
                        <div className={'flex'}>
                            <button
                                onClick={quickSelect}
                                className={'btn-2 text-white font-gtwalpm font-medium text-base flex-shrink-0 whitespace-nowrap'}>Quick
                                Select
                            </button>
                            <button
                                onClick={confirm}
                                className={'btn ml-[0.625rem] text-white font-gtwalpm font-medium text-base flex-shrink-0 whitespace-nowrap'}>
                                Confirm
                            </button>
                        </div>
                    </div>
                    {loading ? <div className=" w-full h-[20rem] flex justify-center items-center ">
                        <CircularProgress/>
                    </div> : <div
                        className={'mt-4 box-2 w-full rounded grid grid-cols-4 gap-6 p-[1.88rem] overflow-y-scroll select-none'}>
                        {nftList.map((item, index) => {
                            return (
                                <div key={index} className={'relative w-[13.75rem] h-[19.63rem]'} onClick={() => {
                                    if (selectedList.has(item)) {
                                        remove(item)
                                    } else {
                                        if (selectedList.size >= max) return;
                                        add(item)
                                    }
                                }}>
                                    <NftCard item={item}/>
                                    <img hidden={!selectedList.has(item)} src={selectedFrame}
                                         className={'w-full h-full object-center object-cover absolute top-0 left-0 cursor-pointer'}
                                         alt={''}/>
                                </div>
                            )
                        })}
                    </div>}
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

  .btn {
    width: 7.75rem;
    height: 2.38rem;
    background: #6F19F7;
    border-radius: 1.19rem 1.19rem 1.19rem 1.19rem;
    opacity: 1;
  }

  .btn-2 {
    background: #B902FD;
    width: 7.75rem;
    height: 2.38rem;
    border-radius: 1.19rem 1.19rem 1.19rem 1.19rem;
    opacity: 1;
  }

  .box-2 {
    ::-webkit-scrollbar {
      display: none;
    }

    background: rgba(69, 51, 139, 0.45);
    opacity: 1;
  }
`;
