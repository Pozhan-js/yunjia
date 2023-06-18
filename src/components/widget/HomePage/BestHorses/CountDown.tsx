import {useCountDown} from "ahooks";

export default function CountDown({className, countdown}) {
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
    return (<div className={'flex items-end' + className}>
        <div className={'text-white text-[1.38rem] leading-6 w-[1.5rem] flex justify-center'}>{days}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>days</div>
        <div className={'text-white text-[1.38rem] leading-6 ml-1 w-[1.5rem] flex justify-center'}>{format(hours)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>hours</div>
        <div className={'text-white text-[1.38rem] leading-6 ml-1 w-[1.5rem] flex justify-center'}>{format(minutes)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>minutes</div>
        <div className={'text-white text-[1.38rem] leading-6 ml-1 w-[1.5rem] flex justify-center'}>{format(seconds)}</div>
        <div className={'text-gray-450 text-base ml-1 leading-5'}>seconds</div>
    </div>)
}

