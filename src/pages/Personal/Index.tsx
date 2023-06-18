import styled from 'styled-components';
import NoticeBar from "@/components/widget/NoticeBar";
import avatarImg from '@/assets/images/PersonalPage/avatar.jpg';
import TopCard from "@/components/widget/PersonalPage/TopCard";
import NftCard from "@/components/widget/PersonalPage/NftCard";
import {useRequest} from "ahooks";
import {getMyInfo, getMyInventory, updateProfile} from "@/services/v1/personal";
import {useDispatch, useSelector} from "react-redux";
import editImg from '@/assets/images/PersonalPage/edit@2x.png';
import {useRef, useState} from "react";
import {message} from "antd";
import {updateAvatar} from "@/store/actions";
import _ from 'lodash';
import TransactionModal from "@/components/widget/TransactionModal";
import useContractTool from "@/utils/useContractTool";
import theme from '@/config/themeSetting';


export default function Index() {
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [pointerAvatar, setPointerAvatar] = useState(false);
    const [pointerTop, setPointerTop] = useState(false);
    // const header_height = useSelector(state => state.HEADER_HEIGHT);
    const avatarRef = useRef<any>();
    const bgRef = useRef<any>();
    const dispatch = useDispatch();
    const [normalNftList, setNormalNftList] = useState([]);
    const [updateNftList, setUpdateNftList] = useState([]);
    const transactionModalRef = useRef<any>();
    const header_top = useSelector((state: any) => state.HEADER_TOP);
    const {updateAllNft} = useContractTool();

    const {data: my_info, refresh} = useRequest(getMyInfo, {
        defaultParams: [WALLET_ADDRESS],
        onSuccess: (data) => {
            // console.log(data)
            dispatch(updateAvatar(data.data.addressinfo.avatar));
        }
    });
    useRequest(getMyInventory, {
        defaultParams: [WALLET_ADDRESS],
        onSuccess: (data) => {
            const ret = _.groupBy(data.data, (o) => o.mint_type);
            if (_.has(ret, 1)) {
                setNormalNftList(ret[1]);
            }
            if (_.has(ret, 2)) {
                setUpdateNftList(ret[2]);
            }
        }
    });
    const uploadBackGroundImage = (e) => {
        console.log('uploadBackGroundImage', e.target.files[0]);
        const formData = new FormData();
        formData.append('background', e.target.files[0]);
        updateProfile(WALLET_ADDRESS, formData).then(() => {
            refresh();
            message.success('modify success!!')
        })
    }
    const updateAvatarImage = (e) => {
        console.log('updateAvatarImage', e.target.files[0])
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        updateProfile(WALLET_ADDRESS, formData).then(() => {
            refresh();
            message.success('modify success!!');
        })
    }
    // 升级全部nft
    const upgradeAllNft = () => {
        let nfts = _.groupBy(updateNftList, (o) => o?.token_contract);
        let originalAsset = [];
        let tokenIds = []
        _.forIn(nfts, (v, k, o) => {
            // console.log(v, k)
            let ids = [];
            originalAsset.push(k);
            v.forEach((o) => {
                ids.push(o?.token_id);
            })
            tokenIds.push(ids)
        })
        // console.log(originalAsset, tokenIds)
        transactionModalRef.current.showModal({type: 0});

        updateAllNft([originalAsset, tokenIds]).then(() => {
            transactionModalRef.current.showModal({type: 1});
        }).catch(() => {
            transactionModalRef.current.showModal({type: -1});
        })
    }
    return (<Styled
        style={{backgroundColor: theme.personalPage.bgColor}}
        className={'min-h-screen font-ggr'}>
        <TransactionModal ref={transactionModalRef}/>

        <NoticeBar block={true} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                   bgColor={`rgba(77,58,140,0.7)`}/>
        {/*<div style={{height: `${header_height}rem`}}></div>*/}
        <div

            style={{
                backgroundColor: theme.personalPage.topBg,
                backgroundImage: `url(${my_info?.data?.addressinfo.background})`
            }}
            className={'w-full mx-auto px-9 sm:px-6 md:px-32 pt-6 flex flex-col h-[20rem] relative bg-no-repeat bg-cover'}>
            {/*upload backgroudImg*/}
            <div
                className={'w-full mx-auto px-9 sm:px-6 md:px-32 pt-6 flex flex-col h-[20rem] absolute top-0 left-0 cursor-pointer'}
                onMouseEnter={() => setPointerTop(true)} onMouseLeave={() => setPointerTop(false)}
                onClick={() => {
                    if (pointerTop) {
                        bgRef.current.click();
                    }
                }}
            >
                <input ref={bgRef} accept="image/*" type="file" hidden={true}
                       onChange={uploadBackGroundImage}/>
            </div>
            <div
                className={`w-full mx-auto px-9 sm:px-6 md:px-32 pt-6 flex items-center justify-center h-[20rem] absolute bg-[#00000080] left-0 top-0 pointer-events-none ${pointerTop ? '' : 'hidden'}`}>
                <img src={editImg} className={'object-cover w-[1.5rem] h-[1.5rem]'}/>
            </div>

            {/*upload avatar*/}
            <div
                className={'border-white border-[0.3rem] rounded-full absolute -bottom-[1rem] cursor-pointer bg-white'}>
                <img src={my_info?.data?.addressinfo.avatar ? my_info?.data?.addressinfo.avatar : avatarImg}
                     className={'w-[10.63rem] h-[10.63rem] rounded-full object-cover'}
                     onMouseEnter={(e) => setPointerAvatar(true)}
                     onMouseLeave={(e) => setPointerAvatar(false)}
                     onClick={(e) => {
                         e.stopPropagation();
                         e.nativeEvent.stopImmediatePropagation();
                         avatarRef.current.click();
                     }}/>
                <div
                    className={`w-[10.63rem] h-[10.63rem] flex items-center justify-center rounded-full absolute top-0 bg-[#00000080] pointer-events-none ${pointerAvatar ? '' : 'hidden'}`}>
                    <img src={editImg} className={'object-cover w-[1.5rem] h-[1.5rem]'}/>
                    <input ref={avatarRef} accept="image/*" type="file" hidden={true}
                           onChange={updateAvatarImage}/>
                </div>
            </div>


        </div>
        <div className={'w-full mx-auto px-9 sm:px-6 md:px-32 pt-6 flex flex-col'}>
            {my_info && <TopCard info={my_info?.data} theme={theme.personalPage.topCard}/>}
            <div className={'self-start'}>
                <div className={'font-ggm text-white font-medium text-base mt-7 mb-2'}>Inventory
                    ({normalNftList.length})
                </div>
                <div className={'under-line w-full'}></div>
            </div>
            <div className={'under-line-2'}></div>
            <div className={'mt-4'}>
                {normalNftList.length > 0 ? <div className={'grid grid-cols-5 gap-x-6 my-6 gap-y-8'}>
                    {normalNftList.map((item, index) => {
                        return (<NftCard item={item} key={index}/>)
                    })}
                </div> : <div
                    className={'h-[16rem] flex items-center justify-center font-gtwalm text-base text-white text-opacity-60'}>
                    No items to display
                </div>}
            </div>
            {updateNftList.length > 0 &&
                <>

                    <div className={'mt-5 flex justify-between'}>
                        <div className={'flex items-center'}>
                            <p className={'font-ggm text-white font-medium text-base'}>Total
                                Upgrade: {updateNftList.length}</p>
                            <p className={'text-[#999999] text-base font-ggm ml-2'}>(only mining after
                                upgrading) </p>
                        </div>
                        <button
                            onClick={upgradeAllNft}
                            className={'w-[8.75rem] h-[2.75rem] bg-[#B902FD] text-white text-[1rem] rounded-[1.38rem]'}>
                            Upgrade All
                        </button>
                    </div>

                    <div className={'mt-4'}>
                        {updateNftList.length > 0 ? <div className={'grid grid-cols-5 gap-x-6 my-6 gap-y-8'}>
                            {updateNftList.map((item, index) => {
                                return (<NftCard item={item} key={index} canClick={false}/>)
                            })}
                        </div> : <div
                            className={'h-[16rem] flex items-center justify-center font-gtwalm text-base text-white text-opacity-60'}>
                            No items to display
                        </div>}
                    </div>
                </>
            }
        </div>
    </Styled>)
}

const Styled = styled.div`

  .under-line {
    height: 0.13rem;
    background: #FFFFFF;
    border-radius: 0;
    opacity: 1;
  }

  .under-line-2 {
    height: 0.06rem;
    opacity: 0.1;
    background: #FFFFFF;
  }

  .box {
    height: 7.5rem;
    background: #17171A;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }
`

