import {useCountDown} from "ahooks";
import styled from 'styled-components';

export default function CountDownS({countdown}) {
    const [countdown_, formattedRes] = useCountDown({
        leftTime: countdown * 1000,
    });
    const {days, hours, minutes, seconds} = formattedRes;
    const format = (t) => {
        if (t.toString().length < 2) {
            return "0" + t;
        }
        return t.toString();
    }
    return (
        <Styled className={'flex flex-col'}>

            <div className={'flex w-full mt-3'}>
                <div className={'flex flex-col items-center'}>
                    <div className={'flex space-x-1'}>
                        {format(days)?.split('').map((item, index) => {
                            return (<div className={'countdown-num box flex items-center justify-center'}
                                         key={index}>{item}</div>)
                        })}
                    </div>
                    <div className={'bottom-text font-gtwal text-white leading-6 bg-clip-text mt-1 uppercase text-opacity-60'}>days</div>
                </div>
                <div className={'flex flex-col items-center ml-4'}>
                    <div className={'flex space-x-1'}>
                        {format(hours)?.split('').map((item, index) => {
                            return (<div className={'countdown-num box flex items-center justify-center'}
                                         key={index}>{item}</div>)
                        })}
                    </div>
                    <div className={'bottom-text font-gtwal text-white leading-6 bg-clip-text mt-1 uppercase text-opacity-60'}>hours</div>
                </div>

                <div className={'flex flex-col items-center ml-4'}>
                    <div className={'flex space-x-1'}>
                        {format(minutes).split('').map((item, index) => {
                            return (<div className={'countdown-num box flex items-center justify-center'}
                                         key={index}>{item}</div>)
                        })}
                    </div>
                    <div className={'bottom-text font-gtwal text-white leading-6 bg-clip-text mt-1 uppercase text-opacity-60'}>minutes</div>
                </div>
                <div className={'flex flex-col items-center ml-4'}>
                    <div className={'flex space-x-1'}>
                        {format(seconds)?.split('').map((item, index) => {
                            return (<div className={'countdown-num box flex items-center justify-center'}
                                         key={index}>{item}</div>)
                        })}
                    </div>
                    <div className={'bottom-text font-gtwal text-white leading-6 bg-clip-text mt-1 uppercase text-opacity-60'}>seconds</div>
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .bottom-text{
    height: 1.5rem;
    font-size: 0.88rem;
    font-weight: 400;
    line-height: 1.5rem;
  }

  .countdown-num {
    font-size: 1.5rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1.76rem;
    -webkit-background-clip: text;
  }

  .box {
    width: 2.63rem;
    height: 3.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.29rem 0.29rem 0.29rem 0.29rem;
    opacity: 1;
    border: 0.03rem solid rgba(255, 255, 255, 0.22);
    filter: blur(undefinedpx);
  }

`;

