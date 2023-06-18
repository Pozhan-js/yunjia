import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo.png'
import styled from 'styled-components';
import _ from 'lodash';
import { useScroll, useUpdateEffect } from "ahooks";
import { useDispatch, useSelector } from "react-redux";
import { updateHeaderHeight, updateHeaderTop, updateMenu } from "@/store/actions";
import HeaderDropDown from "@/components/widget/HeaderDropDown";
import CoinsOutLineImg from '@/assets/images/Header/coins_outline_28@2x.png';
import ConnectWalletNew from "@/components/widget/ConnectWallet";
import { Location } from "@remix-run/router";
import theme from '@/config/themeSetting';
import PlayButton from '@/components/widget/Games/PlayButton';
import { useWeb3React } from '@web3-react/core'
import { walletSign, useDebounce, getCookieValue, setCookieValue, removeCookieValue } from '@/utils/utils'
import { userInfo, loginaddress } from "@/services/v1/account";
import { getToken, setToken } from '@/utils/auth';
import { store } from "@/store";
import { updateLoginInfo } from "@/store/actions";
import { useRequest } from "ahooks";
import SignHome from '@/components/widget/Account/SignHome';
import { message, Modal, Checkbox } from 'antd';
//import ic_wallet from '@/assets/images/PersonalPage/wallet@2x.png';
import ic_game from '@/assets/images/Game/ic_game.png';



function Header({ menu }) {
    const location: Location = useLocation();
    const [top, setTop] = useState(false);
    const storeMenuData = useSelector((state: StoreState) => state.MENU_DATA);
    const scroll = useScroll();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [opacity, setOpacity] = useState(0);
    const [selectIndex, setSelectIndex] = useState(null);
    const ref = useRef<any>();


    //#region  处理账号
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(1)
    const { provider } = useWeb3React();
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [tipsChecked, setTipsChecked] = useState(false);
    let tipsCheckKey = 'tipsChecked';

    const { run: runLoginAddr, loading } = useRequest(loginaddress,
        {
            defaultParams: [''],
            manual: true,
            debounceWait: 800,
            onSuccess: (data: any) => {
                //console.log('loginaddress data:', data)
                if (data.code === 200) {
                    setToken(data.data.token)
                    store.dispatch(updateLoginInfo(data.data));
                    if (!data.data.email || data.data.email.length <= 0) {
                        let tipsChecked = getCookieValue(tipsCheckKey);
                        if (tipsChecked !== "1") {
                            //message.success({ content: 'The mailbox is not bound yet. Do you want to bind it?', duration: 2 });
                            setOpenTipsModal(true)
                        }
                    }
                }
            }
        });
    const handleModalType = (type) => {
        setModalOpen(false)
        setTimeout(() => {
            setModalType(type)
            setModalOpen(true)
        }, 100);
    }
    const [openTipsModal, setOpenTipsModal] = useState(false);

    const handleTipsOkModal = () => {
        setOpenTipsModal(false);
        handleModalType(4)
    };

    const [debParam, setDebParam] = useState(null);
    const [openWalletSign, setOpenWalletSign] = useState(false);
    const debounceParam = useDebounce(debParam, 1000);
    useEffect(() => {
        if (WALLET_ADDRESS && WALLET_ADDRESS.length > 0 && provider && openWalletSign === false) {
            setOpenWalletSign(true)
            walletSign(provider, WALLET_ADDRESS, (sign) => {
                runLoginAddr(WALLET_ADDRESS, sign || '');
            })
        }
    }, [debounceParam]);
    useEffect(() => {
        if (WALLET_ADDRESS && WALLET_ADDRESS.length > 0 && provider) {
            setDebParam(provider);
        }
    }, [provider]);

    const handleTipsChange = () => {
        if (tipsChecked) {
            setTipsChecked(false)
            removeCookieValue(tipsCheckKey);
        } else {
            setTipsChecked(true)
            setCookieValue(tipsCheckKey, '1', 60 * 24 * 7);
        }
    }

    //#endregion


    // console.log(location)
    // 菜单处理
    useUpdateEffect(() => {
        if (menu !== null) {
            let data = _.sortBy(menu, (o) => {
                return o.sort
            });
            let parent_menu = _.filter(data, (item) => item.parent_id === 0);
            let children_menu = _.filter(data, (item) => item.parent_id !== 0);
            parent_menu.forEach((item, index) => {
                item.index = index;
                item.chilren = _.filter(children_menu, (o) => o.parent_id === item.id);
            })
            dispatch(updateMenu(parent_menu));
            const height = (ref.current?.offsetHeight / parseFloat(document.documentElement.style.fontSize));
            dispatch(updateHeaderHeight(height));
        }
    }, [menu])

    // 滚动条置顶
    useUpdateEffect(() => {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }, [location.pathname])

    // 锚点跳转
    const scrollToAnchor = (anchorName) => {
        if (location.pathname !== '/') {
            navigate('/');
        }
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
        }
    }

    // 锚点和路由跳转
    const navigateTo = (href, index) => {
        // console.log(href)
        if (href.includes('#')) {
            try {
                // console.log(href);
                const anchorName = href.split('#')[1];
                setSelectIndex(index);
                scrollToAnchor(anchorName)
            } catch (e) {

            }
        } else {
            navigate(href);
        }
    }

    // 吸顶效果
    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY > 10) {
                setTop(true)
                dispatch(updateHeaderTop(true))
            } else {
                setTop(false)
                dispatch(updateHeaderTop(false))
            }
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    useUpdateEffect(() => {
        // bg-[#0F0E15] bg-opacity-80
        let o = window.scrollY / (parseFloat(document.documentElement.style.fontSize) * 33);
        if (o > 1) {
            setOpacity(1);
        } else {
            setOpacity(o);
        }
        // style={{backgroundColor: `rgba(15,14,21,${opacity})`}}
    }, [scroll])

    // 当前选中菜单
    const selected = (item) => {
        return location.pathname === item.href || _.findKey(item.chilren, (o) => location.pathname === o.href) !== undefined;
    }

    return (<Styled className={'font-gtwal'}>
        {
            modalOpen ? <SignHome modalType={modalType} handleModalType={handleModalType} handleGotoGame={null} /> : <></>
        }
        <Modal
            title="Tips"
            wrapClassName='mg-account-modal'
            zIndex={1310}
            maskClosable={false}
            open={openTipsModal}
            onOk={handleTipsOkModal}
            onCancel={() => { setOpenTipsModal(false) }}
            okText="Bind Now"
        >
            <div className='  text-center font-gtwalpm '>
                <img src={ic_game} className='w-12  mx-auto' />
                <p className='text-base text-white mt-2'>Connect wallet successful, whether to bind games account now?</p>
                <div className=' -mb-3 mt-5  mg-tips-checkbox'>
                    <Checkbox checked={tipsChecked} onChange={handleTipsChange}>
                        Do not remind within seven days !
                    </Checkbox>
                </div>
            </div>
        </Modal>
        <header
            ref={ref}
            style={{ backgroundColor: top && theme.navColor }}
            className={`fixed top-0 text-white w-full z-30 bg-opacity-90 transition duration-300 ease-in-out ${top && 'backdrop-blur-[1.25rem] shadow-lg z-50 bg-opacity-90'}`}
        >
            <div className="max-w-full mx-auto px-9 sm:px-6 md:px-32">
                <div className="flex items-center justify-between h-[3.5rem] md:h-[4.5rem]">
                    {/* Site branding */}
                    <div className="flex-shrink-0">
                        {/* Logo */}
                        <Link to="/" className="block">
                            <img src={logo} className=" w-36 h-8 border-none"></img>
                        </Link>
                    </div>

                    {/* Site navigation */}
                    <nav className="flex flex-grow">
                        <ul className="flex justify-center flex-wrap items-center ml-[5rem]">
                            {storeMenuData?.map((item, index) => {
                                return (<li key={index}>
                                    <div className={'px-5 py-3'}>
                                        {item.chilren.length > 0 ? <HeaderDropDown item={item} /> :
                                            <a onClick={() => {
                                                navigateTo(item.href, item.index)
                                            }}
                                                className={`font-gtwalm text-white text-base flex items-center transition duration-150 ease-in-out`}>{item.name}</a>}

                                        {selected(item) && <div className={'divider'}></div>}
                                    </div>

                                </li>)
                            })}
                        </ul>
                        <ul className="flex flex-grow justify-end flex-wrap items-center">
                            <li>
                                <PlayButton />
                            </li>
                            <li>
                                <button
                                    hidden={location.pathname === '/stake'}
                                    onClick={() => {
                                        navigate('/stake');
                                    }}
                                    className={`flex items-center justify-center text-white text-base font-gtwalm w-[7.875rem] h-[2.38rem] bg-[#B902FD] hover:bg-[#B902DD] transition duration-150 ease-in-out rounded-lg`}>
                                    <img src={CoinsOutLineImg} className={'w-[1.75rem] h-[1.75rem]'} />
                                    <div className={'ml-[0.31rem]'}>Claim</div>
                                </button>
                            </li>
                            <li>
                                {/*<ConnectWallet/>*/}
                                <ConnectWalletNew className={''} />
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    </Styled>);
}

export default Header;

const Styled = styled.div`
  .divider {
    height: 0.13rem;
    background: #FFFFFF;
    border-radius: 0;
    opacity: 1;
  }


`;
