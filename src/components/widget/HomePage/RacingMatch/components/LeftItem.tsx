import { useState } from "react";
import { useMount } from "ahooks";
import { useNavigate } from "react-router-dom";

const Status = ({ racestatus }) => {
    const [status, setStatus] = useState({ text: 'On Going', bgColor: '#4CAD6D' });
    useMount(() => {
        if (racestatus > 0) {
            setStatus({ text: 'Not Started', bgColor: '#584B7D' });
        } else if (racestatus == -1) {
            setStatus({ text: 'On Going', bgColor: '#4CAD6D' });
        } else {
            setStatus({ text: 'The End', bgColor: '#B02A21' });
        }

    })
    return (
        <div style={{ backgroundColor: status.bgColor }}
            className={'flex items-center h-[1.2rem] rounded-[0.27rem] ml-[0.67rem] px-[0.27rem] py-[0.13rem] flex-shrink-0'}>
            <p className={'text-white font-gtwalmp text-sm'}>{status.text}</p>
        </div>
    )
}
export default function LeftItem({ item, showBottomLine }) {
    const navigate = useNavigate();
    return (
        <div className={'flex mt-[1.25rem]'} >
            <img src={item?.img} className={'w-[3rem] h-[3rem] object-cover'} />
            <div className={'ml-3 w-full'}>
                <div className={'flex items-center'}>
                    <p className={'text-white text-[1.2rem] font-gtwalp max-w-[42rem] line-clamp-1 cursor-pointer'} onClick={() => {
                        if (item?.external_href?.includes("http")) {
                            window.open(item?.external_href);
                        } else {
                            navigate(`/clubs/${item?.club_id}`)
                        }
                    }}>{item?.title}</p>
                    {/*//item?.racestatus*/}
                    <Status racestatus={item?.countdown} />
                </div>
                {/*<p className={'text-white text-opacity-60 text-sm mt-1'}>{item?.subtitle}</p>*/}
                <p className={'text-white text-opacity-60 whitespace-pre-line text-sm mt-1 line-clamp-2'}>{item?.content}</p>
                <div className={'flex justify-between mt-1'}>
                    <div className={'flex items-center '}>
                        <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem">
                            <path
                                d="M508.5 61.7c-193.9 0-351 157.2-351 351s269.7 544.1 351 544.1 351-350.2 351-544.1-157.1-351-351-351z m0 527.6c-97.5 0-176.6-79-176.6-176.6s79-176.6 176.6-176.6 176.6 79 176.6 176.6S606 589.3 508.5 589.3z"
                                fill="#3694CB"></path>
                        </svg>
                        <div
                            className={'text-base text-[#3694CB] font-gtwalp ml-[0.31rem]'}>{item?.location}
                        </div>
                    </div>
                    <p className={'text-white text-opacity-60 text-sm mt-1'}>{item?.startdate}</p>
                </div>
                <div className={'line-b w-full mt-[1.25rem]'} hidden={!showBottomLine} />
            </div>
        </div>
    )
}
