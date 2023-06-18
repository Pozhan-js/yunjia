import {useCountDown} from "ahooks";
import {useEffect} from "react";
import $T from '@/utils/utils';
import {isFunction} from "lodash";

export default function CountDown({className='', countdown, setCount, hidden = false}) {

    const [countdown_, formattedRes] = useCountDown({
        leftTime: countdown * 1000,
    });
    const {days, hours, minutes, seconds} = formattedRes;

    useEffect(() => {
        if (isFunction(setCount)) {
            setCount(countdown_);
        }
    }, [countdown_])

    return (<div className={'flex items-end w-[20rem] justify-end ' + className} hidden={hidden}>
        <div
            className={'text-white text-[1.25rem] leading-5 w-[1.5rem] flex justify-center font-gtwalb'}>{$T.formatNumberFillZero(days)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>days</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-gtwalb'}>{$T.formatNumberFillZero(hours)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>hours</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-gtwalb'}>{$T.formatNumberFillZero(minutes)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>minutes</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-gtwalb'}>{$T.formatNumberFillZero(seconds)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>seconds</div>
    </div>)
}

