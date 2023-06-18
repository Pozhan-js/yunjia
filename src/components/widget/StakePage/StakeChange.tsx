import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {Select} from 'antd';
import AssetsImgs from './AssetsImgs'
import TransactionModal from "@/components/widget/TransactionModal";
import useContractTool from "@/utils/useContractTool";
import ChangeNftList from "@/components/widget/StakePage/ChangeNftList";
import _ from 'lodash';
import {useMount} from "ahooks";
import theme from '@/config/themeSetting';
const {Option} = Select;

export default function StakeChange({statData, handleToBack, selectClubId, myClubList}) {
    const [selectNftList, setSelectNftList] = useState([]);   //选择的NftList
    const [selectedNftOriList, setSelectedNftOriList] = useState([])//原始已经质押中的Nftlist
    const [clubId, setClubId] = useState(selectClubId);
    const [orderBy, setOrderBy] = useState('powerDown');
    const {createMultiStakeAndWithdraw, createMultiStake, withdrawMultiStake} = useContractTool();
    const transactionModalRef = useRef<any>();
    const [confirmDisable, setConfirmDisable] = useState(true);
    const [power, setPower] = useState(0);
    const nftListRef = useRef<any>();
    useMount(() => {
        setPower(statData.my_power);
    })
    useEffect(() => {
        if (_.isEqual(_.orderBy(selectedNftOriList, 'id'), _.orderBy(selectNftList, 'id'))) {
            setConfirmDisable(true);
        } else {
            setConfirmDisable(false);
        }
        setPower(_.sumBy(selectNftList, 'power'));
    }, [selectNftList]);

    const SuccessFooter = () => {
        return (<button className={'close-btn text-white text-base'} onClick={
            () => {
                // console.log("refresh")
                transactionModalRef.current?.hideModal();
                nftListRef.current?.refresh();
            }
        }>Close</button>)
    };
    const handleChangeStake = (stakeAsset, stakeTokenIds, withdrawAsset, withdrawTokenIds) => {
        if (stakeAsset.length > 0 && withdrawAsset.length > 0) {
            // Change Your Mining NFT
            transactionModalRef.current.showModal({type: 0});
            createMultiStakeAndWithdraw([stakeAsset, stakeTokenIds, withdrawAsset, withdrawTokenIds]).then(() => {
                transactionModalRef.current.showModal({
                    type: 1, text: (<div>The task has been submitted to the blockchain,<br/>it may take 2-3 minutes to
                        confirm</div>),
                    footer: (<SuccessFooter/>)
                });
            }).catch(() => {
                transactionModalRef.current.showModal({type: -1});
            })
        } else if (stakeAsset.length > 0) {
            // Stake Your NFT
            transactionModalRef.current.showModal({type: 0});
            createMultiStake([stakeAsset, stakeTokenIds]).then(() => {
                transactionModalRef.current.showModal({
                    type: 1, text: (<div>The task has been submitted to the blockchain,<br/>it may take 2-3 minutes to
                        confirm</div>),
                    footer: (<SuccessFooter/>)
                });
            }).catch(() => {
                transactionModalRef.current.showModal({type: -1});
            })
        } else if (withdrawAsset.length > 0) {
            // Unstake Your NFT
            transactionModalRef.current.showModal({type: 0});
            withdrawMultiStake([withdrawAsset, withdrawTokenIds]).then(() => {
                transactionModalRef.current.showModal({
                    type: 1, text: (<div>The task has been submitted to the blockchain,<br/>it may take 2-3 minutes to
                        confirm</div>),
                    footer: (<SuccessFooter/>)
                });
            }).catch((err) => {
                console.log(err)
                transactionModalRef.current.showModal({type: -1});
            })
        }

    }
    const handleConfirm = () => {
        let cStakeArray = [];  //新增的质押
        let cUnstakeArray = []; //解除的质押
        let selectNftMap = new Map();   // 现选中的item
        let selectedNftOriMap = new Map();  // 已经质押中的item

        selectNftList.forEach(item => {
            let key = item.token_contract + "_" + item.token_id;
            selectNftMap.set(key, item);
        })

        selectedNftOriList.forEach(item => {
            let key = item.token_contract + "_" + item.token_id;
            selectedNftOriMap.set(key, item);
        })
        // 新增质押
        selectNftMap.forEach((val, key) => {
            if (!selectedNftOriMap.has(key)) {
                cStakeArray.push(val)
            }
        });
        // 解除的质押
        selectedNftOriMap.forEach((val, key) => {
            if (!selectNftMap.has(key)) {
                cUnstakeArray.push(val)
            }
        });
        const stakeAsset = [];
        const stakeTokenIds = [];
        const withdrawAsset = [];
        const withdrawTokenIds = [];

        let stakeTokenMap = new Map();
        // 新增质押不同NFT 合约数据组合
        cStakeArray.forEach(item => {
            if (!stakeTokenMap.has(item.token_contract)) {
                stakeTokenMap.set(item.token_contract, [item.token_id])
            } else {
                stakeTokenMap.get(item.token_contract).push(item.token_id);
            }
        });
        stakeTokenMap.forEach((val, key) => {
            // console.log(val, key);
            stakeAsset.push(key);
            stakeTokenIds.push(val);
        })

        // 解除的质押不同NFT 合约数据组合
        let unstakeTokenMap = new Map();
        cUnstakeArray.forEach(item => {
            if (!unstakeTokenMap.has(item.token_contract)) {
                unstakeTokenMap.set(item.token_contract, [item.token_id])
            } else {
                unstakeTokenMap.get(item.token_contract).push(item.token_id);
            }
        });
        unstakeTokenMap.forEach((val, key) => {
            // console.log(val, key);
            withdrawAsset.push(key);
            withdrawTokenIds.push(val);
        });
        const StakeContent = () => {
            if (stakeAsset.length > 0 && withdrawAsset.length > 0) {
                // Change Your Mining NFT
                return (<div className=' flex flex-col items-center mt-[3rem]'>
                    <img className=' w-8 h-8' src={AssetsImgs.ic_lock}/>
                    <div className={'mt-3 text-white text-base'}>Change Your Mining NFT</div>
                    <div className=' mt-3 text-white opacity-60 text-sm text-center px-5 pb-5'>
                        Mining NFTs will be changed from the smart contract ,please confirm whether to change?
                    </div>
                </div>)
            } else if (stakeAsset.length > 0) {
                // Stake Your NFT
                return (<div className=' flex flex-col items-center mt-[3rem]'>
                    <img className=' w-8 h-8' src={AssetsImgs.ic_lock}/>
                    <div className={'mt-3 text-white text-base'}>Stake Your NFT</div>
                    <div className=' mt-3 text-white opacity-60 text-sm text-center px-5 pb-5'>
                        Mining NFTs will be locked in the smart contract ,please confirm whether to stake?
                    </div>
                </div>)
            } else if (withdrawAsset.length > 0) {
                // Unstake Your NFT
                return (<div className=' flex flex-col items-center mt-[3rem]'>
                    <img className=' w-8 h-8' src={AssetsImgs.ic_lock}/>
                    <div className={'mt-3 text-white text-base'}>Unstake Your NFT</div>
                    <div className=' mt-3 text-white opacity-60 text-sm text-center px-5 pb-5'>
                        Mining NFTs will be unlocked from the smart contract ,please confirm whether to unstake?
                    </div>
                </div>)
            }
            return (<></>);
        }
        transactionModalRef.current.setOptions({
            title: 'Stake Your NFT',
            content: (<StakeContent/>),
            footer: (<button className={'close-btn text-white text-base mt-5'} onClick={
                () => {
                    transactionModalRef.current.hideModal();
                    handleChangeStake(stakeAsset, stakeTokenIds, withdrawAsset, withdrawTokenIds);
                }}
            >Confirm</button>)

        })
        transactionModalRef.current?.showModal({
            type: 999,
            style: {
                width: '28rem'
            }
        });

    }
    const handleSelectChange = (value) => {
        setClubId(value);
    }
    const handleOrderByChange = (value) => {
        setOrderBy(value);
    }
    return (<>
        {/*    closeCallBack={() => {*/}
        {/*    nftListRef.current.refresh();*/}
        {/*}}*/}
        <TransactionModal ref={transactionModalRef}/>
        <ChangeStyled>
            <div className='flex justify-start items-center mb-4'>
                <div className=' w-16'>

                    <div
                        style={{backgroundColor:theme.stakePage.topCard.bgColor}}
                        className='p-4 rounded-md flex justify-center items-center cursor-pointer'
                         onClick={() => handleToBack(clubId)}>
                        <img className=' w-8 h-8' src={AssetsImgs.btn_back}/>
                    </div>
                </div>
                <div className=' w-[40rem] ml-6'>
                    <div
                        style={{backgroundColor:theme.stakePage.topCard.bgColor}}
                        className='rounded-md  p-1 flex justify-center relative'>
                        <div className=' w-1/2 flex justify-center '>
                            <div className=' w-5/12  text-center '><img className=' w-14 h-14 mx-auto '
                                                                        src={AssetsImgs.power}/></div>
                            <div className=' w-7/12 pt-2'>
                                <div className="text-white text-opacity-60 text-sm ">My Power</div>
                                <div
                                    className=' text-white tracking-wider  text-xl font-ggm'>{power}</div>
                            </div>
                        </div>
                        <div className=' w-1/2 flex justify-center'>
                            <div className=' w-5/12 text-center '><img className=' w-14 h-14 mx-auto'
                                                                       src={AssetsImgs.ic_omh}/></div>
                            <div className=' w-7/12 pt-2'>
                                <div className="text-white text-opacity-60 text-sm ">My OMH</div>
                                <div className=' text-white tracking-wider  text-sm  font-ggm '><span
                                    className=' font-medium text-lg '>≈{statData.my_dayreward.toFixed(2)}</span> /day
                                </div>
                            </div>
                        </div>
                        <div className='mg-sepa-line absolute left-1/2 top-4  w-0'></div>
                    </div>
                </div>
            </div>

            <div className="flex justify-start items-center w-1/1  py-3 ">
                <div className='mg-select mr-8'>
                    <Select
                        showSearch
                        popupClassName="mg-select-pop"
                        placeholder="Select a item"
                        defaultValue={clubId}
                        value={clubId}
                        optionFilterProp="children"
                        onChange={handleSelectChange}
                        filterOption={(input, option:any) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        <Option value={0}>All Club</Option>
                        {myClubList?.map((item, index) => {
                            // key={item.id}
                            return (<Option value={item.id} key={index+1}>{item.name}</Option>)
                        })}
                    </Select>
                </div>
                <div className='mg-select mr-8'>
                    <Select
                        popupClassName="mg-select-pop"
                        placeholder="Select a item"
                        defaultValue={1}
                        value={orderBy}
                        optionFilterProp="children"
                        onChange={handleOrderByChange}
                    >
                        <Option value={'powerDown'}>Power high to low</Option>
                        <Option value={'powerUp'}>Power low to high</Option>
                    </Select>
                </div>
                <div className=' text-base text-white '>Total Mining
                    : {selectNftList ? selectNftList.length : 0}</div>
                <div className=' w-36 ml-auto flex  items-center'>
                    <button
                        disabled={confirmDisable}
                        className={`${confirmDisable ? 'bg-[#3A2161] text-opacity-60' : 'bg-[#6F19F7]'}  text-white text-base w-[8.75rem] h-[2.75rem] rounded-[1.38rem]`}
                        onClick={handleConfirm}>Confirm
                    </button>
                </div>
            </div>
        </ChangeStyled>
        {clubId >= 0 && orderBy.length > 0 ?
            <ChangeNftList ref={nftListRef} clubId={clubId} orderBy={orderBy} setSelectNftList={setSelectNftList}
                           setSelectedNftOriList={setSelectedNftOriList}/> : null}
    </>)
}


const ChangeStyled = styled.div`
  .ant-select-arrow {
    padding-right: 0.5rem;
  }

  //.mg-card {
  //  background-color: #17171A;
  //
  .mg-sepa-line {
    width: 0.06rem;
    height: 2.25rem;
    background-color: rgba(255, 255, 255, 0.1);
  }

  //}

  //.mg-border {
  //  border: 0.06rem solid #33333C;
  //}

`;





