import {useCountDown} from "ahooks";
import {ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key} from "react";
import styled from 'styled-components';

export default function CountDownS({countdown}: { countdown: number }) {
    const [countdown_, formattedRes] = useCountDown({
        leftTime: countdown * 1000,
    });
    const {days, hours, minutes, seconds} = formattedRes;
    const format = (t: number) => {
        if (t.toString().length < 2) {
            return "0" + t;
        }
        return t.toString();
    }
    return (
        <Styled className={'flex flex-col'}>

            <div className={'flex w-full mt-3 justify-between items-center'}>
                <div className={'flex flex-col items-center'}>
                    <div className={'flex space-x-0.5 mob-sm:space-x-1 '}>
                        {format(days)?.split('').map((item: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => {
                            return (<div className={'countdown-num box flex items-center justify-center'}
                                         key={index}>{item}</div>)
                        })}
                    </div>
                    <div
                        className={'bottom-text font-gtwal text-white leading-6 bg-clip-text mt-1 uppercase text-opacity-60'}>days
                    </div>
                </div>
                <div className={'flex flex-col items-center ml-2 mob-sm:ml-[0.625rem] '}>
                    <div className={'flex space-x-0.5 mob-sm:space-x-1 '}>
                        {format(hours)?.split('').map((item: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => {
                            return (<div className={'countdown-num box flex items-center justify-center font-gtwalm'}
                                         key={index}>{item}</div>)
                        })}
                    </div>
                    <div
                        className={'bottom-text font-gtwal text-white leading-6 bg-clip-text mt-1 uppercase text-opacity-60'}>hours
                    </div>
                </div>

                <div className={'flex flex-col items-center  ml-2 mob-sm:ml-[0.625rem] '}>
                    <div className={'flex space-x-0.5 mob-sm:space-x-1 '}>
                        {format(minutes).split('').map((item: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => {
                            return (<div className={'countdown-num box flex items-center justify-center font-gtwalm'}
                                         key={index}>{item}</div>)
                        })}
                    </div>
                    <div
                        className={'bottom-text font-gtwal text-white leading-6 bg-clip-text mt-1 uppercase text-opacity-60'}>minutes
                    </div>
                </div>
                <div className={'flex flex-col items-center  ml-2 mob-sm:ml-[0.625rem]'}>
                    <div className={'flex space-x-0.5 mob-sm:space-x-1 '}>
                        {format(seconds)?.split('').map((item: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => {
                            return (<div className={'countdown-num box flex items-center justify-center font-gtwalm'}
                                         key={index}>{item}</div>)
                        })}
                    </div>
                    <div
                        className={'bottom-text font-gtwal text-white leading-6 bg-clip-text mt-1 uppercase text-opacity-60'}>seconds
                    </div>
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .bottom-text {
    height: 1.5rem;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.5rem;
  }

  .countdown-num {
    font-size: 1.25rem;
    color: #FFFFFF;
    line-height: 1.46rem;
  }

  .box {
    width: 2.25rem;
    height: 3rem;
    border-radius: 0.38rem;
    border: 0.03rem solid rgba(255, 255, 255, 0.22);
    filter: blur(undefinedpx);
  }

`;

