import {useCountDown} from "ahooks";
import {useEffect} from "react";
import $T from '@/utils/utils';
import {isFunction} from "lodash";
import styled from "styled-components";

export default function CountDown({className = '', countdown, setCount = null, hidden = false}) {
    const [countdown_, {hours, minutes, seconds}] = useCountDown({
        leftTime: countdown * 1000,
    });

    useEffect(() => {
        if (isFunction(setCount)) {
            setCount(countdown_);
        }
    }, [countdown_])

    return (<Styled className={'flex ' + className} hidden={hidden}>
        <div className={'box flex flex-col items-center justify-center'}>
            <div className={'text-white text-[1.81rem] font-gtwalb'}>{$T.formatNumberFillZero(hours)}</div>
            <div className={'text-white text-sm font-gtwalp'}>hours</div>
        </div>
        <span className={'mx-3 text-white text-[1.81rem] flex items-center'}>:</span>
        <div className={'box flex flex-col items-center justify-center'}>
            <div className={'text-white text-[1.81rem] font-gtwalb'}>{$T.formatNumberFillZero(minutes)}</div>
            <div className={'text-white text-sm font-gtwalp'}>minutes</div>
        </div>
        <span className={'mx-3 text-white text-[1.81rem] flex items-center'}>:</span>
        <div className={'box flex flex-col items-center justify-center'}>
            <div className={'text-white text-[1.81rem] font-gtwalb'}>{$T.formatNumberFillZero(seconds)}</div>
            <div className={'text-white text-sm font-gtwalp'}>seconds</div>
        </div>
    </Styled>)
}

const Styled = styled.div`
  .box {
    width: 4.38rem;
    height: 4.38rem;
    border-radius: 0.38rem 0.38rem 0.38rem 0.38rem;
    opacity: 1;
    border: 0.03rem solid rgba(255, 255, 255, 0.19);
  }
`;
