import styled from 'styled-components';
import Oval from "@/components/widget/HomePage/HosepowerMining/mobile/Oval";
import assets from "@/components/widget/HomePage/HosepowerMining/Assets";
import titleImg from '@/assets/images/HomePage/HorsepowerMining/mobile/title.png';
import bgImg from '@/assets/images/HomePage/HorsepowerMining/mobile/bg.png';
import titleBgImg from "@/assets/images/title_bg.png";

function HorsepowerMining() {
    return (
        <ClubsSectionStyled
            id={'Token'}
            className={`w-full mt-[3rem]`}>
            {/*hidden element*/}
            {/*{props.fixed && (<div aria-hidden="true" className={'w-full'} style={{height: style.height}}></div>)}*/}
            {/*${props.fixed ? "fixed" : ''}*/}
            <div className={`w-full flex flex-col justify-center items-center`}>
                {/*<img src={titleImg} className={'w-[16.19rem] h-[3.56rem] object-cover object-center'}/>*/}
                {/*flex w-full bg-no-repeat flex-col justify-center items-center*/}
                <div className="mt-[2.94rem] flex text-[1.75rem] font-gtwalbpo text-white">
                    <span>Horsepower</span>
                    <span className={'ml-2 bg-gradient-title-2'}>Mining</span>
                </div>
                <img src={titleBgImg} className={'w-[13.62rem] bg-cover bg-center'}/>

                <div className={'bg-cover bg-center w-full bg-no-repeat'}>
                    <div className={'flex w-full flex-col justify-center items-center mt-4 relative'}>
                        <p className='w-[20.13rem] text-white text-opacity-80 bg-clip-text text-center z-10'>
                            Our Horsepower Mining program is based on each horse’s performance. All you need to do is
                            stake your NFT. Whenever a horse wins, your mining power goes up. The longer you stay
                            staked, the more $OMH tokens you earn!
                        </p>
                        {/*animation ball*/}
                        <img src={bgImg} className={'w-[31.69rem] h-[20.24rem] absolute object-cover top-[3rem]'}/>
                        <Oval></Oval>
                        <div
                            className='flex flex-col space-y-6 pt-8 text-sm font-normal leading-4 text-white text-opacity-80 font-gtwal mb-7 relative z-10'>
                            <div className={'flex items-center flex-1'}>
                                <img src={assets.currencyImg} className={'w-10 h-10'}/>
                                <p className={'ml-4'}>
                                    Currency of The<br/>
                                    Metaverse Economy
                                </p>
                            </div>
                            <div className={'flex items-center flex-1'}>
                                <img src={assets.rewardImg} className={'w-10 h-10'}/>
                                <p className={'ml-4'}>
                                    Reward for Playing<br/>
                                    and Staking
                                </p>
                            </div>
                            <div className={'flex items-center flex-1'}>
                                <img src={assets.decentImg} className={'w-10 h-10'}/>
                                <p className={'ml-4'}>
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
        </ClubsSectionStyled>
    )
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


`;
