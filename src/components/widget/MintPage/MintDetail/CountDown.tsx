import {useCountDown} from "ahooks";

export default function CountDown({className, countdown,onEnd}) {
    const [countdown_, formattedRes] = useCountDown({
        leftTime: countdown * 1000,
        onEnd
    });
    const {days, hours, minutes, seconds} = formattedRes;
    const format = (t) => {
        if (t.toString().length < 2) {
            return "0" + t;
        }
        return t.toString();
    }
    return (<div className={'flex items-end w-[20rem] justify-end ' + className}>
        <div
            className={'text-white text-[1.25rem] leading-5 w-[1.5rem] flex justify-center font-gtwalb'}>{format(days)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>days</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-gtwalb'}>{format(hours)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>hours</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-gtwalb'}>{format(minutes)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>minutes</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-gtwalb'}>{format(seconds)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>seconds</div>
    </div>)
}

