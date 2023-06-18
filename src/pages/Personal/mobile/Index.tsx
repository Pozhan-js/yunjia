import styled from 'styled-components';
import { useRequest, useSetState } from "ahooks";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import { Tabs } from "antd";
import { updateAvatar } from "@/store/actions";
import _ from 'lodash'
import { getMyInfo, getMyInventory, updateProfile } from "@/services/v1/personal";
import TopCard from "@/components/widget/PersonalPage/mobile/TopCard";
import NftCard from "@/components/widget/PersonalPage/mobile/NftCard";
import TransactionModal from "@/components/widget/TransactionModal";
import useContractTool from "@/utils/useContractTool";
import editImg from '@/assets/images/PersonalPage/edit@2x.png';
import avatarImg from '@/assets/images/PersonalPage/avatar.jpg';
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";


export default function Index() {
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [pointerAvatar, setPointerAvatar] = useState(false);
    const [alert, setAlert] = useSetState({ show: false, tip: '' });

    const [pointerTop, setPointerTop] = useState(false);
    // const header_height = useSelector(state => state.HEADER_HEIGHT);
    const avatarRef = useRef<any>();
    const bgRef = useRef<any>();
    const dispatch = useDispatch();
    const [normalNftList, setNormalNftList] = useState([]);
    const [updateNftList, setUpdateNftList] = useState([]);
    const transactionModalRef = useRef<any>();
    const { updateAllNft } = useContractTool();
    const Alert: any = React.forwardRef(function Alert(props, ref: any) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const { data: my_info, refresh } = useRequest(getMyInfo, {
        defaultParams: [WALLET_ADDRESS], onSuccess: (data) => {
            // console.log(data)
            dispatch(updateAvatar(data.data.addressinfo.avatar));
        }
    });
    useRequest(getMyInventory, {
        defaultParams: [WALLET_ADDRESS], onSuccess: (data) => {
            const ret: any = _.groupBy(data.data, (o) => o.mint_type);
            if (_.has(ret, 1)) {
                setNormalNftList(ret[1]);
            }
            if (_.has(ret, 2)) {
                setUpdateNftList(ret[2]);
            }
        }
    });
    const uploadBackGroundImage = (e: any) => {
        console.log('uploadBackGroundImage', e.target.files[0]);
        const formData = new FormData();
        formData.append('background', e.target.files[0]);
        updateProfile(WALLET_ADDRESS, formData).then(() => {
            refresh();
            setAlert({ show: true, tip: 'modify success!!' })
            // message.success('modify success!!')
        })
    }
    const updateAvatarImage = (e: any) => {
        console.log('updateAvatarImage', e.target.files[0])
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        updateProfile(WALLET_ADDRESS, formData).then(() => {
            refresh();
            setAlert({ show: true, tip: 'modify success!!' })
            // message.success('modify success!!');
        })
    }
    // 升级全部nft
    const upgradeAllNft = () => {
        let nfts = _.groupBy(updateNftList, (o: any) => o?.token_contract);
        let originalAsset: string[] = [];
        let tokenIds: any[][] = []
        _.forIn(nfts, (v, k, o) => {
            // console.log(v, k)
            let ids: any[] = [];
            originalAsset.push(k);
            v.forEach((o) => {
                ids.push(o?.token_id);
            })
            tokenIds.push(ids)
        })
        // console.log(originalAsset, tokenIds)
        transactionModalRef.current.showModal({ type: 0, style: { width: '85vw' } });

        updateAllNft([originalAsset, tokenIds]).then(() => {
            transactionModalRef.current.showModal({ type: 1 });
        }).catch(() => {
            transactionModalRef.current.showModal({ type: -1 });
        })
    }

    return (<Styled className={' font-ggr pt-[3.5rem]'}>
        <TransactionModal ref={transactionModalRef} />
        <Snackbar open={alert.show} autoHideDuration={1000} onClose={() => {
            setAlert({ show: false })
        }}>
            <Alert onClose={() => {
                setAlert({ show: false })
            }} severity="success" sx={{ width: '100%' }}>
                {alert.tip}
            </Alert>
        </Snackbar>
        <div
            style={{ backgroundImage: `url(${my_info?.data?.addressinfo.background})` }}
            className={'w-full pt-6 flex flex-col bg-[#70496B] h-[5.88rem] relative bg-no-repeat bg-cover'}>
            {/*upload backgroudImg*/}
            <div
                className={'w-full  pt-6 flex flex-col h-[5.88rem] absolute top-0 left-0 cursor-pointer'}
                onClick={() => {
                    bgRef.current.click();
                }}
            >
                <input ref={bgRef} accept="image/*" type="file" hidden={true}
                    onChange={uploadBackGroundImage} />
            </div>
            <div
                className={`w-full pt-2 flex items-center justify-center h-[5.88rem] absolute bg-[#00000080] left-0 top-0 pointer-events-none ${pointerTop ? '' : 'hidden'}`}>
                <img src={editImg} className={'object-cover w-[1.5rem] h-[1.5rem]'} />
            </div>

            {/*upload avatar*/}
            <div
                className={'border-white border-[0.2rem] rounded-full cursor-pointer bg-white absolute -bottom-[1.2rem] left-1/2 -ml-[2.5rem] '}>
                <img src={my_info?.data?.addressinfo.avatar ? my_info?.data?.addressinfo.avatar : avatarImg}
                    className={'w-[4.38rem] h-[4.38rem] rounded-full object-cover'}
                    onMouseEnter={(e) => setPointerAvatar(true)}
                    onMouseLeave={(e) => setPointerAvatar(false)}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        avatarRef.current.click();
                    }} />
                <div
                    className={`w-[4.38rem] h-[4.38rem]  flex items-center justify-center rounded-full absolute top-0 bg-[#00000080] pointer-events-none ${pointerAvatar ? '' : 'hidden'}`}>
                    <img src={editImg} className={'object-cover w-[1.5rem] h-[1.5rem]'} />
                    <input ref={avatarRef} accept="image/*" type="file" hidden={true}
                        onChange={updateAvatarImage} />
                </div>
            </div>
        </div>
        <div className={'w-full px-5 py-6 flex flex-col'}>
            {my_info && <TopCard info={my_info?.data} />}
            <TabsNftList normalNftList={normalNftList} updateNftList={updateNftList}
                upgradeAllNft={upgradeAllNft}></TabsNftList>
        </div>
    </Styled>)
}

const Styled = styled.div`
  background: #25194A;

  .mg-nft-tabs {
    color: rgba(255, 255, 255, 0.6);

    .ant-tabs-nav {
      margin: 0;

      ::before {
        border: 0.06rem solid rgba(255, 255, 255, 0.09);
        margin: 0 -1.25rem;
      }
    }

    .ant-tabs-nav-list {
      width: 100%;

      .ant-tabs-tab {
        font-size: 0.88rem;

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
    }

    .ant-tabs-ink-bar {
      background-color: #fff;
      height: 0.13rem;
    }

  }
`

interface TabsNftList {
    normalNftList: any,
    updateNftList: any,
    upgradeAllNft: any
}

function TabsNftList({ normalNftList, updateNftList, upgradeAllNft }: TabsNftList) {
    const tabsItems = [{
        label: `Inventory (${normalNftList.length})`,
        key: 'normalNft',
        children: <TabChildNormalNft normalNftList={normalNftList} />
    }, {
        label: `Total Upgrade (${updateNftList.length})`,
        key: 'updateNft',
        children: <TabChildUpdateNft updateNftList={updateNftList} upgradeAllNft={upgradeAllNft} />
    },];

    return (<Tabs defaultActiveKey="normalNft" items={tabsItems} className="mg-nft-tabs mt-[0.125rem]" />)
}

function TabChildNormalNft({ normalNftList }: { normalNftList: any }) {
    return (<div className={'flex justify-center'}>
        <div className={'mt-4'}>
            {normalNftList.length > 0 ? <div className={'grid grid-cols-2 gap-3'}>
                {normalNftList.map((item: any, index: number) => {
                    return (<NftCard item={item} key={index} />)
                })}
            </div> : <div className=' min-h-[15rem]'>
                <div
                    className={'h-[2.7rem] flex items-center justify-center font-gtwalm text-base text-white text-opacity-60'}>
                    No items to display
                </div>
            </div>}
        </div>
    </div>)
}

function TabChildUpdateNft({ updateNftList, upgradeAllNft }) {
    return (<div className={'flex justify-center'}>
        <div className={'mt-4'}>
            {updateNftList.length > 0 ? <>
                <div className={'grid grid-cols-2 gap-3'}>
                    {updateNftList.map((item, index) => {
                        return (<NftCard item={item} key={index} canClick={false} />)
                    })}
                </div>
                <div className={'mt-5 flex justify-center items-center'}>
                    <button
                        onClick={upgradeAllNft}
                        className={'w-[20.94rem] h-[2.75rem] bg-[#B902FD] text-white text-[1rem] rounded-[1.38rem]'}>
                        Upgrade All
                    </button>
                </div>
                <div className='my-2 text-xs text-white opacity-60 text-center w-full'>
                    only mining after upgrading
                </div>
            </> : <div className=' min-h-[15rem]'>
                <div
                    className={'h-[2.7rem] flex items-center justify-center font-gtwalm text-base text-white text-opacity-60'}>
                    No items to display
                </div>
            </div>}
        </div>
    </div>
    )
}
