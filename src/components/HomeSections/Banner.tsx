import styled from "styled-components";
import RightMenu from "@/components/widget/RightMenu";
import { useSelector } from "react-redux";
import bgImg from "@/assets/images/HomePage/Banner/bg.png";
import { config } from '@/config';
import TransactionModal from "@/components/widget/TransactionModal";
import React, { useEffect, useRef, useState } from "react";
import omhImg from '@/assets/images/HomePage/Banner/omhImg.png';
import rightArrowImg from '@/assets/images/HomePage/Banner/rightArrowImg.png';
import walletImg from '@/assets/images/HomePage/Banner/wallet.png';
import useWeb3 from "@/utils/useWeb3";
import copyImg from '@/assets/images/HomePage/Banner/copy.png';
import wallet2Img from '@/assets/images/HomePage/Banner/wallet2.png';
import { Alert, Snackbar } from "@mui/material";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";

const ConfirmBtn = styled.button`
  width: 10rem;
  height: 2.5rem;
  background: #6F19F7;
  border-radius: 1.38rem 1.38rem 1.38rem 1.38rem;
  opacity: 1;
`

function Banner({ setBannerLoading, bannerLoading }) {
    // {banner, rewardpool}

    const navigate = useNavigate();
    const BANNER_DATA: any = useSelector((state: StoreState) => state.BANNER_DATA);
    const [alertOpen, setAlertOpen] = useState(false);
    const transactionModalRef = useRef<any>();
    const { AddAsset } = useWeb3();
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(400 - Math.random() * 100);
    const toRotate = [BANNER_DATA.banner?.title];
    const period = 2000;
    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);

            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);

            setDelta(600);
        }
    }
    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker)
        };
    }, [text])
    const importToken = () => {
        transactionModalRef.current.setOptions({
            title: 'import token',
            content: (
                <div className={'flex flex-col items-center'}>
                    <div className='flex items-center justify-center mt-10'>
                        <img src={omhImg} className={'w-16 h-16'} />
                        <img src={rightArrowImg} className={'w-4 h-4 mx-8'} />
                        <img src={walletImg} className={'w-16 h-16'} />
                    </div>
                    <span className={'text-white font-ggm text-base font-bold mt-8'}>Whether to add OMH contract to wallet?</span>
                    <ConfirmBtn className={'mt-8 text-white font-ggm text-base font-bold'}
                        onClick={() => {
                            // console.log(1111)
                            AddAsset(config.OMH_ERC20_CONTRACT_ADDRESS, 'OMH', 'http://omh-console.v2.omnihorse.io/upload/domain-0/images-omh/2022-10-12/007095235.png').then(() => {
                                transactionModalRef.current.hideModal();
                            })
                        }}>confirm</ConfirmBtn>
                </div>
            ),
        })
        transactionModalRef.current.showModal({
            type: 999,
            style: {
                width: '25rem',
                height: '18.75rem'
            }
        });
    }

    return (
        <Styled
            className={'w-full mx-auto px-9 sm:px-6 md:px-32 bg-cover bg-center h-[47.91vw] relative flex flex-col justify-center'}
            style={{ backgroundImage: `url(${bgImg})` }}>
            <TransactionModal ref={transactionModalRef} />
            <Snackbar open={alertOpen} autoHideDuration={1000} onClose={() => {
                setAlertOpen(false)
            }}>
                <Alert onClose={() => {
                    setAlertOpen(false)
                }} severity="success" sx={{ width: '100%' }}>
                    copy success!!
                </Alert>
            </Snackbar>
            <img src={BANNER_DATA.banner?.res_url} onLoad={() => {
                setBannerLoading(false)
            }}
                className={`absolute object-cover object-top right-0 bottom-0 z-10 w-1/2 ${!bannerLoading && 'animate__animated animate__slideInRight'}`} />
            <div className="mt-[5.3rem] w-1/2 text-white">

                <div className={' leading-[5rem]'}>
                    <span className={'font-montserrat text-white whitespace-nowrap text-[5rem]'}>Enter</span> <br />
                    {/*{BANNER_DATA.banner?.title}*/}
                    <span className="text-white whitespace-nowrap font-msrb text-[5.63rem] animate__animated animate__fadeIn border-r-[0.26rem] border-r-[#888]">
                        The {text}
                    </span>
                </div>

                <p className={'mt-2 content text-[1rem] text-white text-opacity-80 font-gtwalp font-normal leading-6 w-[34.88rem]'}>
                    {BANNER_DATA.banner?.content}
                </p>
                <div className="mt-4 xl:mt-12">
                    <button
                        className={`flex text-white text-[1.13rem] font-gtwalp items-center justify-center mint-btn rounded-xl`}
                        onClick={() => {
                            if (BANNER_DATA.banner?.href.includes('http')) {
                                window.open(BANNER_DATA.banner?.href)
                            } else {
                                navigate(BANNER_DATA.banner?.href);
                            }
                        }}
                    >
                        {BANNER_DATA.banner?.btname}
                    </button>
                </div>
                {/*contract address*/}
                <div className={"flex flex-col font-gtwalp mt-[1.75rem] mb-10 items-start"}>
                    <p className={"text-white text-sm text-opacity-60"}>OMH Contract Address</p>
                    <div className={'flex items-center mt-1'}>
                        <div
                            className={
                                "flex items-center text-sm contract-bg rounded-md"
                            }
                        >
                            <p className={"px-2"}>ERC20</p>
                            <div
                                className={
                                    "w-0 border-[0.03rem] border-[#FFFFFF] border-opacity-40 h-[0.75rem]"
                                }
                            ></div>
                            <a className={"px-2"} onClick={() => {
                                window.open(config.ETHERSCAN_URL + `/address/${BANNER_DATA?.banner?.subtitle}`);
                            }}>
                                {BANNER_DATA?.banner?.subtitle}
                            </a>

                        </div>

                        <img src={copyImg} className={'w-[1.75rem] h-[1.75rem] ml-1 cursor-pointer'} onClick={() => {
                            copy(BANNER_DATA?.banner?.subtitle)
                            setAlertOpen(true)
                        }} />
                        <img src={wallet2Img} className={'w-[1.75rem] h-[1.75rem] ml-1 cursor-pointer'}
                            onClick={importToken} />
                    </div>
                </div>
            </div>

            <RightMenu></RightMenu>
        </Styled>
    );
}

export default Banner;
const Styled = styled.div`
  .mint-btn {
    width: 11.25rem;
    height: 3rem;
    background: #B902FD;
    opacity: 1;
  }

  .contract-bg {
    height: 1.75rem;
    background: rgba(255, 255, 255, 0.1);
  }

  .content {
    text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
  }

  .import-btn {
    width: 7.25rem;
    height: 1.5rem;
    background: #6F19F7;
    opacity: 1;
  }
`

