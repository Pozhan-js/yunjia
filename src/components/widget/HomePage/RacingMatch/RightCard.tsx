import styled from "styled-components";
import utils from "@/utils/utils";
import { useNavigate } from "react-router-dom";

export default function RightCard({ list, height = '28.69rem', showTitle = true }) {
    const navigate = useNavigate();
    return (
        <div className={'px-5'}>
            <Styled className={'px-[1.88rem] py-[1.13rem] font-gtwalp'} style={{ height: height }}>
                <p className={'text-white text-base'} hidden={!showTitle}>
                    Racing Result
                </p>
                <div className={''}>
                    {list.map((item, index) => {
                        return (
                            <div className={'flex mt-[1.25rem]'} key={index} >
                                <img src={item.img} className={'w-[3rem] h-[3rem] object-cover'} />
                                <div className={'ml-3 w-full'}>
                                    <div className={'flex items-center'}>
                                        <p className={'text-white text-[1.2rem] font-gtwalp max-w-[42rem] line-clamp-1 cursor-pointer'} onClick={() => {
                                            if (item?.external_href?.includes("http")) {
                                                window.open(item?.external_href);
                                            } else {
                                                navigate(`/clubs/${item?.club_id}`)
                                            }
                                        }}>{item?.title}</p>
                                    </div>
                                    <div className={'flex justify-between mt-2'}>
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
                                        <p className={'text-white text-opacity-60 text-sm'}>{item?.startdate}</p>
                                    </div>
                                    <div className={'box w-full mt-[0.63rem] text-sm text-white flex items-center'}>
                                        <p className={'ml-[1.25rem]'}>Placed: <span className={'text-[#FFA033]'}>{item?.placed}</span></p>

                                        <p className={'ml-[2.5rem]'}>Prize: <span className={'text-[#FFA033]'}>${item?.prize}</span></p>

                                    </div>
                                    <div className={'w-full mt-[0.88rem]'} />
                                    {/* <div className={'line-b w-full mt-[0.88rem]'} hidden={list.length - 1 === index} /> */}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </Styled>
        </div>
    )
}
const Styled = styled.div`
  width: 40rem;
  background: #35246F;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;

  .box {
    height: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem 1rem 1rem 1rem;
    opacity: 1;
  }
  .line-b{
    height: 0.06rem;
    opacity: 0.1;
    background-color:#FFFFFF;
  }
`;
