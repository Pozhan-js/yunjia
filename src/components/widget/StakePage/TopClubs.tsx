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
                <p className={'text-white text-[1.13rem] font-gtwalmp font-normal'}>
                    Top Clubs
                </p>
                <span className={'text-white text-base font-gtwalmp flex items-center cursor-pointer'}
                    onClick={() => {
                        navigate('/clubs');
                    }}>more<img src={rightArrowImg}
                        className={'w-4 h-4 ml-[0.19rem]'}
                        alt={''} /></span>
            </div>
            <div className={'flex mt-3 grid grid-cols-5 w-full'}>
                {data.slice(0, 5).map((item, index) => {
                    return (
                        <div key={index} style={{ background: `url(${topClubsBgImg})`, backgroundSize: 'cover' }}
                            onClick={() => {
                                navigate(`/clubs/${item?.club_id}`)
                            }}
                            className={'w-[14.94rem] h-[6.75rem] flex items-center px-[0.8rem] cursor-pointer relative overflow-hidden rounded'}>
                            <div hidden={item.joined === 0}
                                className={'absolute flex items-center justify-center mark-box rounded-bl top-0 right-0 text-white text-[0.75rem]'}>
                                joined
                            </div>
                            <img src={item?.img_url} className={'object-cover w-[5rem] h-[5rem]'} />
                            <div className={'ml-4 flex flex-col'}>
                                <p className={'text-white text-base line-clamp-1'}>{item?.name}</p>
                                <p className={'mt-[0.63rem] text-white text-sm'}>Prize: ＄{item?.tcoin}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .mark-box {
    width: 3.5rem;
    height: 1.5rem;
    background: #7000FF;
    opacity: 1;
  }
`;
