import styled from 'styled-components';
import Oval from "@/components/widget/HomePage/HosepowerMining/Oval";
// import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import assets from "@/components/widget/HomePage/HosepowerMining/Assets"
import {useThrottleFn} from "ahooks";
import titleBgImg from "@/assets/images/title_bg.png";


function HorsepowerMining(props: any) {
    const [style, setStyle] = useState<any>({});
    const ref = useRef<any>();
    const {run} = useThrottleFn(() => {
        if (props.fixed) {
            setStyle({
                top: (ref.current?.offsetTop - window.scrollY) / parseFloat(document.documentElement.style.fontSize) + 'rem',
                height: ref.current?.offsetHeight / parseFloat(document.documentElement.style.fontSize) + 'rem',
                position: 'fixed',
            });
        } else {
            setStyle({});
        }
    }, {wait: 500},);
    useEffect(() => {
        run();
    }, [props.fixed]);
    return (<ClubsSectionStyled
        ref={ref}
        id={'Token'}
        className={`w-full mt-[8.25rem]`}>
        {/*hidden element*/}
        {props.fixed && (<div aria-hidden="true" className={'w-full'} style={{height: style.height}}></div>)}
        {/*${props.fixed ? "fixed" : ''}*/}
        <div className={`w-full flex flex-col justify-center items-center pt-30`}
             style={style}>

            <div className="flex text-[3.03rem] leading-[3.54rem] font-gtwalbpo text-white">
                <span className={''}>Horsepower</span>
                <span className={'ml-2 bg-gradient-title-2'}>Mining</span>
            </div>
            <img src={titleBgImg} className={'w-[23rem] bg-cover bg-center'}/>

            <div style={{backgroundImage: `url(${assets.bgImg})`, backgroundSize: '100%'}}
                 className={'bg-contain bg-center w-full bg-no-repeat'}>
                <div className={'flex w-full  flex-col justify-center items-center mt-[3.75rem]'}>
                    <p className='content bg-clip-text text-center font-gtwal'>
                        Our Horsepower Mining program is based on each horse’s performance. All you need to do is
                        stake your NFT. Whenever a horse wins, your mining power goes up. The longer you stay
                        staked, the more $OMH tokens you earn!
                    </p>
                    {/*animation ball*/}
                    <Oval></Oval>
                    <div
                        className='w-[48rem] flex justify-between pt-16 text-[#BFBFBF] text-base font-normal font-gtwal leading-6 text-center mb-20'>
                        <div className={'flex flex-col items-center flex-1'}>
                            <img src={assets.currencyImg} className={'w-10 h-10'}/>
                            <p>
                                Currency of The<br/>
                                Metaverse Economy
                            </p>
                        </div>
                        <div className={'flex flex-col items-center flex-1'}>
                            <img src={assets.rewardImg} className={'w-10 h-10'}/>
                            <p>
                                Reward for Playing<br/>
                                and Staking
                            </p>
                        </div>
                        <div className={'flex flex-col items-center flex-1'}>
                            <img src={assets.decentImg} className={'w-10 h-10'}/>
                            <p>
                                Decentralized<br/>
                                Governance
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            {/*<button className={'go-btn border-light-blue-500 text-white border-white mt-[3.75rem] font-montserrat'}>*/}
            {/*    Go to Clubs*/}
            {/*</button>*/}
        </div>
    </ClubsSectionStyled>)
}

export default HorsepowerMining;
const ClubsSectionStyled = styled.div`
  .go-btn {
    width: 14rem;
    height: 3.25rem;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
    border: 0.06rem solid;
    //border-image: radial-gradient(circle, rgba(248, 171, 255, 1), rgba(247, 152, 255, 1), rgba(242, 89, 255, 1), rgba(178, 54, 255, 1), rgba(95, 38, 255, 1)) 0.06 0.06;
  }

  .club-section-b-box {
    height: 3rem;
    font-size: 1rem;
    font-weight: 400;
    color: #BFBFBFFF;
    line-height: 1.5rem;
  }

  .title {
    width: 45.69rem;
    height: 3.38rem;
    font-size: 2.5rem;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 3.38rem;

    .gradient-text {
      background: linear-gradient(90deg, #A7CFFF 0%, #FFFFFF 51%, #B49AFF 100%);
      background-clip: text;
      display: inline-block;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }
  }

  .content {
    width: 64rem;
    height: 4.5rem;
    font-size: 1rem;

    font-weight: 400;

    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5rem;

  }
`
