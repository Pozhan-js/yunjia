import React, { useState } from 'react';
import assets from '@/components/mobile/widget/Footer/Assets';
import styled from 'styled-components';
import { Modal } from "antd";
import { subscribeEmail } from "@/services/v1/home";
import { message } from 'antd';
import PrivacyPolicy from "@/components/widget/PrivacyPolicy";
import TermsOfUse from "@/components/widget/TermsOfUse";
import logoImg from '@/assets/images/Header/mobile/logo.png';

export default function Footer({ absolute = true, className = '', bgColor = 'bg-[#25194A]' }) {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [showTermsOfUse, setTermsOfUse] = useState(false);
    const [email, setEmail] = useState('');
    const showPrivacyPolicyModal = () => {
        setShowPrivacyPolicy(true);
    };

    const showTermsOfUseModal = () => {
        setTermsOfUse(true);
    };

    const handlePrivacyPolicyCancel = () => {
        setShowPrivacyPolicy(false);
    };
    const handleTermsOfUseCancel = () => {
        setTermsOfUse(false);
    };
    return (
        <Styled
            className={`border-0 ${absolute ? 'absolute' : ''} bottom-0 w-full font-gtwal ${bgColor} ${className} z-20`}>
            <Modal title="Privacy Policy" wrapClassName='footer-modal' open={showPrivacyPolicy}
                onCancel={handlePrivacyPolicyCancel} footer={null} width={'90%'}>
                <div className={'h-[60vh] overflow-auto text-white'}>
                    <PrivacyPolicy />
                </div>
            </Modal>
            <Modal title="Terms Of Use" wrapClassName='footer-modal' open={showTermsOfUse}
                onCancel={handleTermsOfUseCancel} footer={null} width={'90%'}>
                <div className={'h-[60vh] overflow-auto text-white'}>
                    <TermsOfUse />
                </div>
            </Modal>

            <div className={`h-full ${bgColor}`}>
                <div className={'flex flex-col w-full pt-[2.13rem] px-5'}>
                    <div className={'flex flex-col part-1 flex-1 items-start'}>
                        <div className={'flex flex-col'}>
                            <div className={'title'}>
                                Stay in the loop
                            </div>
                            <div className={'content mt-[1.31rem]'}>
                                Join our mailing list for racing tips and tricks, upcoming NFT drops, and more.
                            </div>
                            <div className={'flex mt-6 item-center'}>
                                <input placeholder={'Enter your email'} value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                    className={"email-input appearance-none bg-[#3A2A6A] border border-transparent w-full py-2 px-4 text-white placeholder-white placeholder-opacity-60 shadow-md rounded-l-md text-base focus:outline-none"} />
                                <button
                                    onClick={() => {
                                        subscribeEmail(email).then(() => {
                                            message.success('success');
                                        }).catch(() => {
                                            message.error('fail');
                                        })
                                    }}
                                    className={"text-white text-base font-medium font-gtwalm submit-btn rounded flex-shrink-0 ml-4"}>
                                    Subscribe
                                </button>
                            </div>
                            <div className={'flex items-center'}>
                                {/*<img src={assets.logoImg} className={'object-cover w-[12.65rem] h-[8.02rem]'}/>*/}
                                <div className={'flex w-full social-icon mt-[1.44rem] justify-around'}>
                                    <img src={assets.discordImg} className={'opacity-60'} onClick={() => {
                                        window.open('https://discord.com/invite/3pJPCskDP8')
                                    }} />
                                    <img src={assets.telegramImg} className={'opacity-60'} onClick={() => {
                                        window.open('https://t.me/omnihorse')
                                    }} />
                                    <img src={assets.twitterImg} className={'opacity-60'} onClick={() => {
                                        window.open('https://twitter.com/omnihorse_NFT')
                                    }} />
                                    <img src={assets.mediumImg} className={'opacity-60'} onClick={() => {
                                        window.open('https://medium.com/@OmniHorse_NFT')
                                    }} />
                                    <img src={assets.youtubeImg} className={'opacity-60'} onClick={() => {
                                        window.open('https://www.youtube.com/channel/UC_1Jp6Vfbdh_AwNfnU-pa8Q')
                                    }} />
                                    <img src={assets.groupImg} className={'opacity-60'} onClick={() => {
                                        window.open('https://www.instagram.com/omnihorse/')
                                    }} />
                                </div>
                            </div>
                            <div className={'mt-[1.5rem] flex items-center'}>
                                <img src={assets.whitepaperImg} className={'w-4 h-4 ml-1'} />
                                <a className={'text-white font-medium text-base font-ggm leading-4 ml-1'}
                                    onClick={() => {
                                        window.open('https://whitepaper.omnihorse.io/')
                                    }}>WHITEPAPER</a>
                                <img src={assets.smallArrowImg}
                                    className={'w-4 h-4 ml-1 border-gray-500'} />
                            </div>
                        </div>
                        <div className={'divider my-7 w-full'}></div>
                        <img src={logoImg} className={'w-[8.66rem] h-[1.88rem] object-cover object-center'} />
                        <div className={'flex flex-row w-full mt-7'}>
                            <div className={'flex flex-col flex-1'}>
                                <div className={'font-gtwalb text-white text-base uppercase'}>CONTACT US</div>
                                <div className={'flex flex-col text-white text-opacity-60'} onClick={() => {
                                    window.open('mailto:contact@omnihorse.io');
                                }}>
                                    <a className={'bottom-item mt-3'}>E-mail:</a>
                                    <a className={'bottom-item mt-2'}>contact@omnihorse.io</a>
                                </div>
                            </div>
                            <div className={'flex flex-col flex-1'}>
                                <div className={'font-gtwalb text-white text-base uppercase'}>agreement</div>
                                <a className={'bottom-item text-white mt-3 text-opacity-60'}
                                    onClick={showTermsOfUseModal}>Terms of Services</a>
                                <a className={'bottom-item text-white mt-2 text-opacity-60'}
                                    onClick={showPrivacyPolicyModal}>Privacy Policy</a>
                            </div>
                        </div>
                        <div className={'divider my-6 w-full'}></div>
                        <a className={'bottom-tip text-white text-opacity-60 text-center w-full mb-6'}>© 2022
                            OmniHorse</a>
                    </div>
                </div>
            </div>
        </Styled>

    );
}
const Styled = styled.div`
  .divider {
    height: 0.03rem;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .email-input {
    height: 3rem;
    /* background: #272730; */
    border-radius: 0.63rem ;
    opacity: 1;
    border: 0.03rem solid #3C3C4D;
  }
  .submit-btn{
    width: 7.25rem;
    height: 3rem;
    background: #6F19F7;
    border-radius: 0.63rem ;
    opacity: 1;
  }
  .social-icon {
    img {
      width: 1.56rem;
      height: 1.56rem;
    }
  }

  .part-1 {
    .title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 1.76rem;
      -webkit-background-clip: text;
    }

    .content {
      font-size: 1rem;
      font-weight: 400;
      color: rgba(255, 255, 255);
      line-height: 1.17rem;
      -webkit-background-clip: text;
    }

    .bottom-title {
      font-size: 1rem;
      font-weight: 400;
      color: #B902FD;
      line-height: 1.17rem;
      -webkit-background-clip: text;
    }

    .bottom-item {
      font-size: 1rem;
      font-weight: 400;
    }

    .bottom-tip {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.17rem;
      -webkit-background-clip: text;
    }
  }
`;
