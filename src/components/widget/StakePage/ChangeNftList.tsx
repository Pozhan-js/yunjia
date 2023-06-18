import { useSelector } from "react-redux";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useRequest, useUpdateEffect } from "ahooks";
import { getStakeMyNft } from "@/services/v1/stake";
import { message } from "antd";
import AssetsImgs from "@/components/widget/StakePage/AssetsImgs";
import NftCard from "@/components/widget/PersonalPage/NftCard";
import styled from "styled-components";
import _ from 'lodash';
import { CircularProgress } from "@mui/material";
import $T from '@/utils/utils';

const ChangeNftList = ({ clubId, orderBy, setSelectNftList, setSelectedNftOriList }: any, ref) => {
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [selectNfts, setSelectNfts] = useState([]);
    const [list, setList] = useState([]);
    const { loading, run, refresh } = useRequest(() => getStakeMyNft(clubId, account, orderBy), {
        onSuccess: (cdata) => {
            if (cdata && cdata.data) {
                let tmpArr = _.filter(cdata.data, (o) => o?.stakestatus === 1)
                let allNft = _.filter(cdata.data, (o) => o?.mint_type !== 2)
                // console.log(tmpArr)
                setList(allNft);
                setSelectNfts(_.clone(tmpArr));
                setSelectNftList(_.clone(tmpArr));
                setSelectedNftOriList(_.clone(tmpArr));
            }
        }
    });
    useImperativeHandle(ref, () => ({
        refresh: refresh
    }))
    useUpdateEffect(() => {
        // @ts-ignore
        run(clubId, account)
    }, [clubId, orderBy])
    if (loading) {
        return (<div className=" w-1/1 h-[20rem]  flex justify-center items-center ">
            <CircularProgress />
        </div>)
    }
    const handleSelectCard = (item) => {
        if ($T.checkNftStatus(item) === false) return;  // 质押状态不可选中
        let selectIdx = selectNfts.findIndex(c => c.id === item.id);
        if (selectIdx >= 0) {
            selectNfts.splice(selectIdx, 1)
        } else selectNfts.push(item)

        let newArr = selectNfts.slice();
        setSelectNfts(newArr);
        setSelectNftList(newArr)
    }
    const handleBuyBtn = () => {
        message.success({ content: 'to opensea.io !', duration: 2 });
    }
    return (<ChangeNftListStyled>
        <div className={'grid grid-cols-5 gap-x-6 my-6 gap-y-8 select-none'}>
            {list.length > 0 ? list.map((item, index) => {
                return (<div key={index} className={'mg-card-border relative cursor-pointer'} onClick={() => {
                    handleSelectCard(item)
                }}>
                    {selectNfts.findIndex(c => c.id === item.id) >= 0 ?
                        <div className='w-[13.75rem] h-[19.63rem] absolute top-0 left-0 z-10'>
                            <img className=' w-1/1 h-1/1 ' src={AssetsImgs.frame_selected}
                                alt={''} />  </div> : null}

                    <NftCard item={item} canClick={false} />
                </div>)
            }) : <div className=' mg-card-border ml-4 '>
                <div className=' mg-card  w-1/1 h-1/1 relative '>
                    <img src={AssetsImgs.bg_add}></img>
                    <div className=' w-1/1 text-center absolute top-[9.7rem]  '>
                        <img className=' w-28  mx-auto ' src={AssetsImgs.btn_add} onClick={() => {
                            handleBuyBtn()
                        }}></img>
                    </div>
                    <div className=' w-1/1 text-center text-white opacity-40 absolute top-[13.2rem]  text-sm '>BUY
                        NFT IN OPENSEA
                    </div>
                </div>
            </div>}
        </div>
    </ChangeNftListStyled>)
}
export default forwardRef(ChangeNftList);
const ChangeNftListStyled = styled.div`
  .mg-card-active {
    background-position: center;
    background-size: cover;
    background-image: url(${AssetsImgs.frame_selected});
  }
`;
