import styled from "styled-components";
import RightMenu from "@/components/widget/RightMenu";
import { useSelector } from "react-redux";
import bgImg from "@/assets/images/HomePage/Banner/mobile/bg.png";
import $T from '@/utils/utils';
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "@/config";
import copyImg from "@/assets/images/HomePage/Banner/mobile/copy.png";
import walletImg from "@/assets/images/HomePage/Banner/mobile/wallet.png";
import copy from "copy-to-clipboard";
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from "@mui/material";
import TransactionModal from "@/components/widget/TransactionModal";
import omhImg from "@/assets/images/HomePage/Banner/omhImg.png";
import rightArrowImg from "@/assets/images/HomePage/Banner/rightArrowImg.png";
import useWeb3 from "@/utils/useWeb3";

const ConfirmBtn = styled.button`
  width: 10rem;
  height: 2.5rem;
  background: #6F19F7;
  border-radius: 1.38rem 1.38rem 1.38rem 1.38rem;
  opacity: 1;
`
export default function Banner({ bannerLoading, setBannerLoading }) {
    // {banner, rewardpool}
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = useState(false);
    const BANNER_DATA: any = useSelector((state: StoreState) => state.BANNER_DATA);
    const transactionModalRef = useRef<any>();
    const { AddAsset } = useWeb3();
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
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

            setDelta(500);
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
    const Alert: any = React.forwardRef(function Alert(props, ref: any) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

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
                    <span className={'text-white font-ggm text-sm mt-8'}>Whether to add OMH contract to wallet?</span>
                    <ConfirmBtn className={'mt-8 text-white font-ggm text-base font-bold'}
                        onClick={() => {
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
                width: '80vw',
                height: '18.75rem'
            }
        });
    }
    return (
        <HeadStyled className={'w-full px-5 bg-cover bg-center relative box-border'}
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
            <div data-aos="slide-left" data-aos-easing={'ease-out'}
                className={'absolute top-0 mt-[5rem] left-0 ml-[2.75rem] z-0'}>
                <img onLoad={() => {
                    setBannerLoading(false)
                }} src={BANNER_DATA.banner?.res_url}
                    className={`w-screen object-cover ${!bannerLoading && 'animate__animated animate__slideInRight'}`} />
            </div>

            <div className="mt-[19rem] z-10 relative content ">
                <span className={'font-montserrat text-white whitespace-nowrap text-[2.5rem] leading-[2.93rem]'}>Enter The </span> <br />
                <span
                    className="text-[3.63rem] font-montserrat text-white font-bold leading-[3.25rem] animate__animated animate__fadeIn inline-block mt-1 min-h-[3.25rem] border-r-[0.26rem] border-r-[#888]">
                    {text.length > 0 ? text : 'O'}
                </span>
                <p className={'mt-2 text-[1rem] text-white text-opacity-80 font-gtwalp'}>
                    {BANNER_DATA.banner?.content}
                </p>
            </div>
            <div className={'mt-6'}>
                <div className="w-full flex justify-center">
                    <button
                        className={`text-white text-[1.06rem] w-full font-gtwalmp flex items-center justify-center mint-btn rounded`}
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
            </div>
            {/*<div className="w-full flex justify-center ">*/}
            <div className={'flex flex-col w-full text-white text-[0.75rem] font-gtwalp mt-[0.88rem] mb-[2.19rem]'}>
                <div className={'text-white text-opacity-60 font-gtwalp'}>OMH Contract Address</div>
                <div className={'flex items-center flex-1 mt-1'}>
                    <div className={"flex items-center w-full contract-bg rounded-[0.63rem]"}>
                        <p className={"px-2"}>ERC20</p>
                        <div
                            className={"w-0 border-[0.03rem] border-[#FFFFFF] border-opacity-40 h-[0.75rem]"}></div>
                        <a className={"pl-2 pr-5 break-all flex-grow"} onClick={() => {
                            window.open(config.ETHERSCAN_URL + `/address/${BANNER_DATA.banner?.subtitle}`);
                        }}>
                            {$T.formatSubAddress(BANNER_DATA.banner?.subtitle, 18, 6)}
                        </a>
                    </div>
                    <img src={copyImg} className={'w-[1.75rem] h-[1.75rem] ml-1'} onClick={() => {
                        copy(BANNER_DATA.banner?.subtitle)
                        setAlertOpen(true)
                    }} />
                    <img src={walletImg} onClick={importToken} className={'w-[1.75rem] h-[1.75rem] ml-1'} />
                </div>

            </div>
            {/*</div>*/}

            {/*<RightMenu></RightMenu>*/}
        </HeadStyled>
    );
}

const HeadStyled = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #03091f;

  .content {
    text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
  }

  .contract-bg {
    height: 1.75rem;
    background: rgba(255, 255, 255, 0.1);
    opacity: 1;
    border: 0.03rem solid rgba(255, 255, 255, 0);
  }

  .mint-btn {
    height: 3rem;
    background: rgba(185, 2, 253, 0.9);
    opacity: 1;
    filter: blur(undefinedpx);
  }
`;


