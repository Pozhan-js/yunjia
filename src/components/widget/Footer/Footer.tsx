import React, { useState } from 'react';
import assets from '@/components/widget/Footer/Assets';
import styled from 'styled-components';
import { Modal } from "antd";
import { subscribeEmail } from "@/services/v1/home";
import { message } from 'antd';
import PrivacyPolicy from "@/components/widget/PrivacyPolicy";
import TermsOfUse from "@/components/widget/TermsOfUse";
import theme from '@/config/themeSetting'

interface params {
    absolute?: boolean,
    className?: string,
    bgColor?: string
}

export default function Footer({ absolute = true, className = '', bgColor = '' }: params) {
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
            style={{ backgroundColor: bgColor ? bgColor : theme.footerColor }}
            className={`border-0 ${absolute ? 'absolute' : ''} bottom-0 w-full font-gtwalp ${className} z-20`}>
            <Modal title="Privacy Policy" wrapClassName='footer-modal' open={showPrivacyPolicy}
                onCancel={handlePrivacyPolicyCancel} footer={null} width={'50%'}>
                <div className={'h-[75vh] overflow-auto text-white'}>
                    <PrivacyPolicy />
                </div>
            </Modal>
            <Modal title="Terms Of Use" wrapClassName='footer-modal' open={showTermsOfUse}
                onCancel={handleTermsOfUseCancel} footer={null} width={'50%'}>
                <div className={'h-[75vh] overflow-auto text-white'}>
                    <TermsOfUse />
                </div>
            </Modal>
            <div className={`h-full`} style={{ backgroundColor: 'inherit' }}>
                <div className={'flex w-full flex-row pt-[3rem] px-24'}>
                    <div className={'flex flex-col items-center'}>
                        <img src={assets.logoImg} className={'object-cover w-[12.65rem] h-[8.02rem]'} />
                        <div className={'flex social-icon space-x-[1.88rem] mt-[3rem] footer-menu'}>
                            <img src={assets.discordImg} onClick={() => {
                                window.open('https://discord.com/invite/3pJPCskDP8')
                            }} />
                            <img src={assets.telegramImg} onClick={() => {
                                window.open('https://t.me/omnihorse')
                            }} />
                            <img src={assets.twitterImg} onClick={() => {
                                window.open('https://twitter.com/omnihorse_NFT')
                            }} />
                            <img src={assets.mediumImg} onClick={() => {
                                window.open('https://medium.com/@OmniHorse_NFT')
                            }} />
                            <img src={assets.youtubeImg} onClick={() => {
                                window.open('https://www.youtube.com/channel/UC_1Jp6Vfbdh_AwNfnU-pa8Q')
                            }} />
                            <img src={assets.groupImg} onClick={() => {
                                window.open('https://www.instagram.com/omnihorse/')
                            }} />
                        </div>
                    </div>
                    <div className={'ml-[9.25rem] flex flex-col right flex-1 items-start'}>
                        <div className={'flex flex-col'}>
                            <div className={'title'}>
                                Stay in the loop
                            </div>
                            <div className={'content mt-[1.31rem] w-[27.19rem]'}>
                                Join our mailing list for racing tips and tricks, upcoming NFT drops, and more.
                            </div>
                            <div className={'flex mt-6 item-center'}>
                                <input placeholder={'Enter your email'} value={email} onChange={(e: any) => {
                                    setEmail(e.target.value)
                                }}
                                    className={"flex-1 appearance-none bg-[#3A2A6AFF] border border-transparent w-full py-2 px-4 text-white placeholder-white placeholder-opacity-60 shadow-md rounded-l-md text-base focus:outline-none"} />
                                <button
                                    onClick={() => {
                                        subscribeEmail(email).then(() => {
                                            message.success('success');
                                        }).catch(() => {
                                            message.error('fail');
                                        })
                                    }}
                                    className={"bg-[#6F19F7] hover:bg-[#6F29F7] text-white text-base font-medium rounded-r-[0.63rem] w-[10rem]"}>
                                    Subscribe
                                </button>
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
                        <div className={'divider my-8 w-full'}></div>
                        <div className={'flex flex-row w-full'}>
                            <div className={'flex flex-col'}>
                                <div className={'bottom-title uppercase'}>CONTACT US</div>
                                <div className={'flex flex-col'} onClick={() => {
                                    window.open('mailto:contact@omnihorse.io');
                                }}>
                                    <a className={'bottom-item mt-2'}>E-mail:</a>
                                    <a className={'bottom-item mt-2'}>contact@omnihorse.io</a>
                                </div>
                            </div>
                            <div className={'flex flex-col ml-[5.5rem]'}>
                                <div className={'bottom-title uppercase'}>agreement</div>
                                <a className={'bottom-item mt-2'} onClick={showTermsOfUseModal}>Terms of Services</a>
                                <a className={'bottom-item mt-2'} onClick={showPrivacyPolicyModal}>Privacy Policy</a>
                            </div>
                            <a className={'ml-auto mt-auto bottom-tip text-gray-450'}>© 2022 OmniHorse</a>
                        </div>
                    </div>
                </div>
            </div>
        </Styled>

    );
}
const Styled = styled.div`
  height: 30.38rem;
  //background: rgba(116, 108, 129, 0.1);

  .divider {
    height: 0.03rem;
    background: rgba(255, 255, 255, 0.1);
  }

  .social-icon {
    img {
      width: 1.38rem;
      height: 1.38rem;
    }
  }

  .right {
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
      color: rgba(255, 255, 255, 0.6);
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
      color: #FFFFFF;
      line-height: 1.17rem;
      -webkit-background-clip: text;
    }

    .bottom-tip {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.17rem;
      -webkit-background-clip: text;
    }
  }
`;
