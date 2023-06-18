import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { Select } from 'antd';
import AssetsImgs from './AssetsImgs'
import TransactionModal from "@/components/widget/TransactionModal";
import useContractTool from "@/utils/useContractTool";
import ChangeNftList from "./ChangeNftList";
import _ from 'lodash';
import { useMount } from "ahooks";
import $T from '@/utils/utils';
import backImg from '@/assets/images/StakePage/mobile/back.png';

const { Option } = Select;

export default function StakeChange({ statData, handleToBack, selectClubId, myClubList }) {
    const [selectNftList, setSelectNftList] = useState([]);   //选择的NftList
    const [selectedNftOriList, setSelectedNftOriList] = useState([])//原始已经质押中的Nftlist
    const [clubId, setClubId] = useState(selectClubId);
    const [orderBy, setOrderBy] = useState('powerDown');
    const { createMultiStakeAndWithdraw, createMultiStake, withdrawMultiStake } = useContractTool();
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
            transactionModalRef.current.showModal({ type: 0 });
            createMultiStakeAndWithdraw([stakeAsset, stakeTokenIds, withdrawAsset, withdrawTokenIds]).then(() => {
                transactionModalRef.current.showModal({
                    type: 1, text: (<div>The task has been submitted,<br />it may take 2-3minutes to confirm</div>),
                    footer: <SuccessFooter />
                });
            }).catch(() => {
                transactionModalRef.current.showModal({ type: -1 });
            })
        } else if (stakeAsset.length > 0) {
            // Stake Your NFT
            transactionModalRef.current.showModal({ type: 0 });
            createMultiStake([stakeAsset, stakeTokenIds]).then(() => {
                transactionModalRef.current.showModal({
                    type: 1, text: (<div>The task has been submitted,<br />it may take 2-3minutes to confirm</div>),
                    footer: <SuccessFooter />
                });
            }).catch(() => {
                transactionModalRef.current.showModal({ type: -1 });
            })
        } else if (withdrawAsset.length > 0) {
            // Unstake Your NFT
            transactionModalRef.current.showModal({ type: 0 });
            withdrawMultiStake([withdrawAsset, withdrawTokenIds]).then(() => {
                transactionModalRef.current.showModal({
                    type: 1, text: (<div>The task has been submitted,<br />it may take 2-3minutes to confirm</div>),
                    footer: <SuccessFooter />
                });
            }).catch((err) => {
                console.log(err)
                transactionModalRef.current.showModal({ type: -1 });
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
                    <img className=' w-8 h-8' src={AssetsImgs.ic_lock} />
                    <div className={'mt-3 text-white text-base'}>Change Your Mining NFT</div>
                    <div className=' mt-3 text-white opacity-60 text-sm text-center px-5 pb-5'>
                        Mining NFTs will be changed from the smart contract ,please confirm whether to change?
                    </div>
                </div>)
            } else if (stakeAsset.length > 0) {
                // Stake Your NFT
                return (<div className=' flex flex-col items-center mt-[3rem]'>
                    <img className=' w-8 h-8' src={AssetsImgs.ic_lock} />
                    <div className={'mt-3 text-white text-base'}>Stake Your NFT</div>
                    <div className=' mt-3 text-white opacity-60 text-sm text-center px-5 pb-5'>
                        Mining NFTs will be locked in the smart contract ,please confirm whether to stake?
                    </div>
                </div>)
            } else if (withdrawAsset.length > 0) {
                // Unstake Your NFT
                return (<div className=' flex flex-col items-center mt-[3rem]'>
                    <img className=' w-8 h-8' src={AssetsImgs.ic_lock} />
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
            content: (<StakeContent />),
            footer: (<button className={'close-btn text-white text-base mt-5'} onClick={
                () => {
                    transactionModalRef.current.hideModal();
                    handleChangeStake(stakeAsset, stakeTokenIds, withdrawAsset, withdrawTokenIds);
                }}
            >Confirm</button>)

        })
        transactionModalRef.current.showModal({
            type: 999,
            style: {
                width: '85vw'
            }
        });

    }
    const handleSelectChange = (value: number) => {
        setClubId(value);
    }
    const handleOrderByChange = (value) => {
        setOrderBy(value);
    }
    return (<>
        <TransactionModal ref={transactionModalRef} />
        <Styled>
            <div className='w-full'>
                <div className='mg-card mt-[1.69rem] rounded h-8 flex items-center justify-center'
                    onClick={() => handleToBack(clubId)}>
                    <div className={'flex items-center'}>
                        <img className='w-4 h-4 object-cover object-center' src={backImg} />
                        <span className={'text-white text-opacity-60 ml-2'}>back</span>
                    </div>
                </div>
            </div>
            <div className='mg-card mg-border rounded px-3 flex flex-col relative mt-2 h-[10rem]'>
                <div className='flex items-center flex-1'>
                    <img className='w-[4rem] h-[4rem] object-cover object-center' src={AssetsImgs.power} />
                    <div className='flex flex-col ml-1'>
                        <div className="text-white text-opacity-60 text-[0.75rem]">My Power</div>
                        <div
                            className='text-white text-[1.19rem] font-ggm font-medium'>{$T.formatThousand(power)}</div>
                    </div>
                </div>
                <div className={'w-full px-5 h-[0.06rem] bg-[#FFFFFF1A]'}></div>
                <div className='flex items-center flex-1'>
                    <img className='w-[4rem] h-[4rem] object-cover object-center' src={AssetsImgs.ic_omh} />
                    <div className='flex flex-col ml-1'>
                        <div className="text-white text-opacity-60 text-[0.75rem]">My OMH</div>
                        <div className='text-white text-[1.19rem] font-gtwalm font-medium'><span
                            className='text-white text-[1.19rem] font-ggm font-medium'>≈{$T.formatThousand(statData.my_dayreward.toFixed(2))}</span> /
                            <span className={'text-sm'}>day</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <div className='text-base text-white mb-2'>Total Mining（{selectNftList ? selectNftList.length : 0}）
                </div>

                <div className='mg-select-mobile-2'>
                    <Select
                        popupClassName="mg-select-pop"
                        placeholder="Select a item"
                        defaultValue={1}
                        value={orderBy as any}
                        optionFilterProp="children"
                        onChange={handleOrderByChange}
                    >
                        <Option value={'powerDown'}>Power high to low</Option>
                        <Option value={'powerUp'}>Power low to high</Option>
                    </Select>
                </div>
                <div className='mg-select-mobile mt-[0.63rem] flex justify-between'>
                    <Select
                        showSearch
                        popupClassName="mg-select-pop"
                        placeholder="Select a item"
                        defaultValue={clubId}
                        value={clubId}
                        optionFilterProp="children"
                        onChange={handleSelectChange}
                        filterOption={(input, option: any) => option?.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        <Option value={0}>All Club</Option>
                        {myClubList?.map((item: any, index: number) => {
                            // key={item.id}
                            return (<Option value={item.id} key={index + 1}>{item.name}</Option>)
                        })}
                    </Select>
                    <button
                        disabled={confirmDisable}
                        className={`${confirmDisable ? 'bg-[#3A2161] text-opacity-60' : 'bg-[#6F19F7]'} mt-auto ml-[0.625rem] text-white text-sm w-[6.25rem] h-[2rem] rounded-[1.38rem] flex-shrink-0`}
                        onClick={handleConfirm}>Confirm
                    </button>
                </div>


            </div>

        </Styled>
        {clubId >= 0 && orderBy.length > 0 ?
            <ChangeNftList ref={nftListRef} clubId={clubId} orderBy={orderBy} setSelectNftList={setSelectNftList}
                setSelectedNftOriList={setSelectedNftOriList} /> : null}
    </>)
}


const Styled = styled.div`
  .ant-select-arrow {
    padding-right: 0.5rem;
  }

  .mg-card {
    background-color: #45338B73;
  }

  .mg-border {
    border: 0.06rem solid #33333C;
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

  .mg-select-mobile-2 {
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





