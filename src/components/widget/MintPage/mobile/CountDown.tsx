import { useCountDown } from "ahooks";
import { useEffect } from "react";
import $T from '@/utils/utils';
import { isFunction } from "lodash";

export default function CountDown({ className, countdown, setCount, hidden = false }) {

    const [countdown_, formattedRes] = useCountDown({
        leftTime: countdown * 1000,
    });
    const { days, hours, minutes, seconds } = formattedRes;

    useEffect(() => {
        if (isFunction(setCount)) {
            setCount(countdown_);
        }
    }, [countdown_])

    return (<div className={'flex items-end w-[20rem] mt-2 ' + className} hidden={hidden}>
        <div
            className={'text-white text-[1.25rem] leading-5 w-[1.5rem] flex justify-center font-ggm'}>{$T.formatNumberFillZero(days)}</div>
        <div className={'text-gray-450 text-sm ml-1 leading-5 mr-2'}>days</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-ggm'}>{$T.formatNumberFillZero(hours)}</div>
        <div className={'text-gray-450 text-sm ml-1 leading-5 mr-2'}>hours</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-ggm'}>{$T.formatNumberFillZero(minutes)}</div>
        <div className={'text-gray-450 text-sm ml-1 leading-5 mr-2'}>minutes</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-ggm'}>{$T.formatNumberFillZero(seconds)}</div>
        <div className={'text-gray-450 text-sm ml-1 leading-5'}>seconds</div>
    </div>)
}

