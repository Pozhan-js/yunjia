import styled from "styled-components";
import { useRequest } from "ahooks";
import { getTopClubs } from "@/services/v1/stake";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import rightArrowImg from "@/assets/images/HorseHubPage/right_arrow.png";
import { useNavigate } from "react-router-dom";
import topClubsBgImg from '@/assets/images/StakePage/topClubsBg.png';

export default function TopClubs() {
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useRequest(getTopClubs, {
        defaultParams: [WALLET_ADDRESS],
        onSuccess: (tdata) => {
            // console.log(tdata.data);
            setData(tdata?.data)
        }
    })
    return (
        <Styled className={'flex flex-col'}>
            <div className={'flex justify-between items-end w-full mt-[1.88rem]'}>
                <p className={'text-white text-sm font-gtwalmp font-normal'}>
                    Top Clubs
                </p>
                <span className={'text-white text-sm  font-gtwalmp flex items-center cursor-pointer'}
                    onClick={() => {
                        navigate('/clubs');
                    }}>more<img src={rightArrowImg}
                        className={'w-4 h-4 ml-[0.19rem]'}
                        alt={''} /></span>
            </div>
            <div className="mt-3  overflow-x-auto pb-2 ">
                <div className={'flex justify-between items-center w-fit'}>
                    {data.slice(0, 5).map((item, index) => {
                        return (
                            <div key={index} style={{ background: `url(${topClubsBgImg})`, backgroundSize: 'cover' }}
                                onClick={() => {
                                    navigate(`/clubs/${item?.club_id}`)
                                }}
                                className={'w-[14.93rem] h-[6.75rem] flex items-center px-[0.8rem] mr-3 relative'}>
                                <div hidden={item?.joined === 0} className=" mg-label text-xs w-14 h-6 flex justify-center items-center bg-[#7000FF] font-gtwalp  ">Joined</div>
                                <img src={item?.img_url} className={'object-cover w-[3.75rem] h-[3.75rem]'} />
                                <div className={'ml-3 flex flex-col'}>
                                    <p className={'text-white text-base whitespace-nowrap text-ellipsis overflow-hidden max-w-[9rem] '}>{item?.name}</p>
                                    <p className={'mt-[0.25rem] text-white text-sm'}>Prize: ${item?.tcoin}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </Styled>
    )
}
const Styled = styled.div`
.mg-label{
    position: absolute;
    top:0;
    right: 0;
    color: #fff;
    border-radius: 0 0.625rem 0 0.625rem ;
}
`;
