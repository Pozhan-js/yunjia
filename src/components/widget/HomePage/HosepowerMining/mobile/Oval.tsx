import styled from 'styled-components';
import assets from '@/components/widget/HomePage/HosepowerMining/Assets';
import bigClubsImg from '@/assets/images/HomePage/HorsepowerMining/mobile/big_Clubs.png';

export default function Oval() {

    return (<OvalStyled className='relative flex w-full justify-center items-center'>
        <img src={assets.lightImg} className={'absolute z-0 w-[15rem] h-[15rem]'}/>
        <div className='relative'>
            <img src={bigClubsImg} className={'w-[19.37rem]'}/>
            {/*className={'w-[47.13rem] h-[15.88rem]'}*/}
            <img src={assets.circleImg}
                 className={'circle z-10 absolute top-[3.55rem] translate-x-[-50%] object-cover object-center'}></img>

            <div className="absolute ball ball1">
                <img src={assets.mintingImg}/>
            </div>
            <div className="absolute ball ball2">
                <img src={assets.daoImg}/>
            </div>
            <div className="absolute ball ball3">
                <img src={assets.gamingImg}/>
            </div>
            <div className="absolute ball ball4">
                <img src={assets.boxImg}/>
            </div>
        </div>
    </OvalStyled>)
}

const OvalStyled = styled.div`
  .ball {
    img {
      width: 4.25rem;
      height: 4.25rem;
    }
  }

  .circle {
    width: 6.53rem;
    left: calc(50.33%);
  }

  @keyframes animX {
    from {
      left: -2.125rem;
    }
    to {
      left: calc(100% - 2.75rem);
    }
  }
  @keyframes animY {
    from {
      top: 2.5rem;
    }
    to {
      top: 7rem;
    }
  }

  @keyframes scale {
    0% {
      transform: scale(0.7)
    }
    50% {
      transform: scale(1)
    }
    100% {
      transform: scale(0.7)
    }
  }

  .ball1 {
    animation: animX 10s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
    animY 10s cubic-bezier(0.36, 0, 0.64, 1) -5s infinite alternate,
    scale 20s cubic-bezier(0.36, 0, 0.64, 1) -5s infinite alternate;
  }

  .ball2 {
    animation: animX 10s cubic-bezier(0.36, 0, 0.64, 1) -5s infinite alternate,
    animY 10s cubic-bezier(0.36, 0, 0.64, 1) -10s infinite alternate,
    scale 20s cubic-bezier(0.36, 0, 0.64, 1) -10s infinite alternate;
  }

  .ball3 {
    animation: animX 10s cubic-bezier(0.36, 0, 0.64, 1) -10s infinite alternate,
    animY 10s cubic-bezier(0.36, 0, 0.64, 1) -15s infinite alternate,
    scale 20s cubic-bezier(0.36, 0, 0.64, 1) -15s infinite alternate;
  }

  .ball4 {
    animation: animX 10s cubic-bezier(0.36, 0, 0.64, 1) -15s infinite alternate,
    animY 10s cubic-bezier(0.36, 0, 0.64, 1) -20s infinite alternate,
    scale 20s cubic-bezier(0.36, 0, 0.64, 1) -20s infinite alternate;
  }
`;
