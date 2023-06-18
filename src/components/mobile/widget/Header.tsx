import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/Header/mobile/logo.png'
import styled from 'styled-components';
import _ from 'lodash';
import { useBoolean, useScroll, useUpdateEffect } from "ahooks";
import { useDispatch, useSelector } from "react-redux";
import { updateHeaderHeight, updateHeaderTop, updateMenu } from "@/store/actions";
import ConnectWalletNew from "@/components/mobile/widget/ConnectWallet";
import { SwipeableDrawer, Box, Collapse } from '@mui/material';
import { Location } from "@remix-run/router";
import { List, ListItem } from '@mui/material';
import HeaderCollapse from "@/components/mobile/widget/HeaderCollapse";
import PlayButton from '@/components/widget/Games/mobile/PlayButton';

import { useWeb3React } from '@web3-react/core'
import { walletSign, useDebounce, getCookieValue, setCookieValue, removeCookieValue } from '@/utils/utils'
import { userInfo, loginaddress } from "@/services/v1/account";
import { getToken, setToken } from '@/utils/auth';
import { store } from "@/store";
import { updateLoginInfo } from "@/store/actions";
import { useRequest } from "ahooks";
import SignHome from '@/components/widget/Account/mobile/SignHome';
import { message, Modal, Checkbox } from 'antd';
import ic_game from '@/assets/images/Game/ic_game.png';



const CustomBox = styled(Box)
    `
      .right-btn-bg {
        width: 2.25rem;
        height: 2.13rem;
        background: rgba(255, 255, 255, 0.13);
        border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
        opacity: 1;
      }

      .divider-x {
        height: 0.05rem;
        background-color: rgba(255, 255, 255, 0.1);
      }
    `;
const Item = ({ item, onClick }) => {

    const Item_ = ({ item_ }) => {
        if (item_.chilren.length > 0) {
            return (
                <HeaderCollapse item={item_} onClick={onClick} />
            )
        } else {
            return (
                <ListItem disablePadding className={'py-[1.625rem] font-gtwalb text-white text-base'} onClick={() => { onClick(item_.href, 0) }}>
                    {item_.name}
                </ListItem>
            )
        }
    }
    return (
        <div className={'px-5'}>
            <Item_ item_={item} />
            <div className={'divider-x w-full'}></div>
        </div>
    )
}

function Header({ menu }) {
    const location: Location = useLocation();
    const [top, setTop] = useState(false);
    const storeMenuData = useSelector((state: StoreState) => state?.MENU_DATA);
    const scroll = useScroll();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [opacity, setOpacity] = useState(0);
    const [selectIndex, setSelectIndex] = useState(null);
    const ref = useRef<any>();
    const [open, { toggle }] = useBoolean(false);


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
        <SwipeableDrawer
            anchor={'top'}
            open={open}
            onClose={toggle}
            PaperProps={{ sx: { backgroundColor: 'transparent' } }}
            onOpen={() => {
            }}
            hideBackdrop={true}
            ModalProps={{
                keepMounted: true
            }}
        >
            {/*{list(anchor)}*/}
            <CustomBox className="h-screen bg-transparent backdrop-blur-[4rem]">
                <div className={'flex justify-end text-white p-5'}>
                    <div className={'right-btn-bg flex justify-center items-center'} onClick={toggle}>
                        <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem">
                            <path
                                d="M571.733333 512l268.8-268.8c17.066667-17.066667 17.066667-42.666667 0-59.733333-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 452.266667 243.2 183.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333L452.266667 512 183.466667 780.8c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 8.533333 19.2 12.8 29.866666 12.8s21.333333-4.266667 29.866667-12.8L512 571.733333l268.8 268.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733333L571.733333 512z"
                                fill="#ffffff"></path>
                        </svg>
                    </div>
                </div>
                <ul className="flex flex-col">
                    <List disablePadding>
                        {storeMenuData.map((item, index) => {
                            return (<Item item={item} key={index} onClick={(href, index) => {
                                toggle();
                                navigateTo(href, index);
                            }} />)
                        })}
                    </List>
                </ul>
            </CustomBox>
        </SwipeableDrawer>
        <header
            ref={ref}
            className={`fixed top-0 text-white w-full z-30 bg-opacity-90 transition duration-300 ease-in-out ${top && 'backdrop-blur-[1.25rem] shadow-lg z-50 bg-[#25194A] bg-opacity-90'}`}
        >
            <div className="max-w-full mx-auto px-5">
                <div className="flex items-center justify-between h-[3.5rem]">
                    {/* Site branding */}
                    <div className="flex-shrink-0">
                        {/* Logo */}
                        <Link to="/" className={"block"}>
                            <img src={logo} className=" w-[6.93rem] h-[1.5rem] border-none bg-center bg-cover"></img>
                        </Link>
                    </div>

                    {/* Site navigation */}
                    <nav className="flex">
                        <ul className="flex flex-grow justify-end flex-wrap items-center">
                            <li>
                                <PlayButton />
                            </li>
                            <li>
                                <ConnectWalletNew className={'flex-shrink'} />
                            </li>
                            <li>
                                <div
                                    className={'right-btn-bg cursor-pointer ml-2 flex flex-col items-center justify-center'}
                                    onClick={toggle}>
                                    {/*<img src={listImg} className={'w-[2.25rem] h-[2.13rem]'}/>*/}
                                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="2rem">
                                        <path
                                            d="M48 304h928a48 48 0 1 0 0-96H48a48 48 0 1 0 0 96z m928 160H48a48 48 0 1 0 0 96h928a48 48 0 1 0 0-96z m0 256H48a48 48 0 1 0 0 96h928a48 48 0 1 0 0-96z"
                                            fill="#ffffff"></path>
                                    </svg>
                                </div>
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

  .z-9999 {
    z-index: 9999;
  }

  .right-btn-bg {
    width: 2.25rem;
    height: 2.13rem;
    background: rgba(255, 255, 255, 0.13);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }
`;
