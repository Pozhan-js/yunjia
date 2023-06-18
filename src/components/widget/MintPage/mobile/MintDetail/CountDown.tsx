import { useCountDown } from "ahooks";

export default function CountDown({ className, countdown }) {
    const [countdown_, formattedRes] = useCountDown({
        leftTime: countdown * 1000,
    });
    const { days, hours, minutes, seconds } = formattedRes;
    const format = (t) => {
        if (t.toString().length < 2) {
            return "0" + t;
        }
        return t.toString();
    }
    return (<div className={'flex items-center w-[20rem] justify-start font-gtwal ' + className}>
        <div
            className={'text-white text-[1.25rem] leading-5 w-[1.5rem] flex justify-center font-ggm'}>{format(days)}</div>
        <div className={'text-gray-450 text-sm ml-1 leading-5'}>days</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-ggm'}>{format(hours)}</div>
        <div className={'text-gray-450 text-sm ml-1 leading-5'}>hours</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-ggm'}>{format(minutes)}</div>
        <div className={'text-gray-450 text-sm ml-1 leading-5'}>minutes</div>
        <div
            className={'text-white text-[1.25rem] leading-5 ml-1 w-[1.5rem] flex justify-center font-ggm'}>{format(seconds)}</div>
        <div className={'text-gray-450 text-sm ml-1 leading-5'}>seconds</div>
    </div>)
}

