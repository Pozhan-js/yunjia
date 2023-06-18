import styled from 'styled-components';
import assets from '@/components/widget/HomePage/HosepowerMining/Assets';

export default function Oval() {

    return (
        <OvalStyled className='relative flex w-full h-[18rem] justify-center items-center'>
            {/*背景光效*/}
            <img src={assets.lightImg} className={'absolute z-0 w-[40rem] h-[40rem]'}/>
            <div className='relative h-[12rem] w-[48rem] z-10'>
                <img src={assets.bigClubsImg}/>
                {/*className={'w-[47.13rem] h-[15.88rem]'}*/}
                <img src={assets.circleImg} className={'circle z-10 absolute top-0 translate-x-[-50%]'}></img>
                <div className="ball ball1">
                    <img src={assets.mintingImg} className={'w-[7.5rem] h-[7.5rem]'}/>
                </div>
                <div className="ball ball2">
                    <img src={assets.daoImg} className={'w-[7.5rem] h-[7.5rem]'}/>
                </div>
                <div className="ball ball3">
                    <img src={assets.gamingImg} className={'w-[7.5rem] h-[7.5rem]'}/>
                </div>
                <div className="ball ball4">
                    <img src={assets.boxImg} className={'w-[7.5rem] h-[7.5rem]'}/>
                </div>
            </div>
        </OvalStyled>
    )
}

const OvalStyled = styled.div`
  .circle {
    width: 16.16875rem;
    left: calc(50% + 0.2rem);
    //height: 8.8rem;
  }

  @keyframes animX {
    from {
      left: -3.75rem;
    }
    to {
      left: calc(100% - 5rem);
    }
  }
  @keyframes animY {
    from {
      top: 0;
    }
    to {
      top: 10rem;
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
