import { useNavigate } from "react-router-dom";
export default function Item2({ item, showBottomLine }) {
    const navigate = useNavigate();
    return (
        <div className={'flex mt-[1.25rem]'} >
            <img src={item.img} className={'w-[3rem] h-[3rem] object-cover'} />
            <div className={'ml-3 w-full'}>
                <p className={'text-white text-[1.2rem] font-gtwalp max-w-[42rem] line-clamp-2 cursor-pointer'} onClick={() => {
                    if (item?.external_href?.includes("http")) {
                        window.open(item?.external_href);
                    } else {
                        navigate(`/clubs/${item?.club_id}`)
                    }
                }}>{item?.title}</p>

                <div className={'flex items-center mt-2'}>
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

                <div className={'box w-full mt-[0.63rem] text-sm text-white flex items-center'}>
                    <p className={'ml-[1.25rem]'}>Placed: <span className={'text-[#FFA033]'}>{item?.placed}</span></p>
                    <p className={'ml-[2.5rem]'}>Prize: <span className={'text-[#FFA033]'}>${item?.prize}</span></p>
                </div>
                {/*<div className={'line-b w-full mt-[0.88rem]'} hidden={!showBottomLine} />*/}
            </div>
        </div>
    )
}
