import styled from 'styled-components';
import NftCard from "@/components/widget/HomePage/MorePicks/NftCard";
// import Button from "@/components/widget/Button";
import React from "react";
import {useNavigate} from "react-router-dom";
import theme from '@/config/themeSetting';

export default function Section({list}) {
    const navigate = useNavigate();
    return (
        <Styled
            style={{backgroundColor: theme.bgColor}}
            hidden={list?.length===0}
            className={'z-30 pt-[3.72rem] mt-[-0.1rem] w-full mx-auto px-9 sm:px-6 md:px-32'}>
            <div>
                <p className={'text-opacity-70 text-white text-[2.25rem] font-gtwalmpo'}>Upcoming Collections</p>
            </div>
            {/*<div className={'flex items-start space-x-6 mt-[2.81rem]'}>*/}
            {/*    {list?.map((item, index) => {*/}
            {/*        return (<NftCard item={item} key={index}/>)*/}
            {/*    })}*/}
            {/*</div>*/}
            {list?.length < 5 ? <div className={'flex items-start space-x-6  mt-[2.81rem]'}>
                {list?.map((item, index) => {
                    return (<NftCard item={item} key={index}/>)
                })}
            </div> : <div className={'flex justify-around  mt-[2.81rem]'}>
                {list?.slice(0, 5).map((item, index) => {
                    return (<NftCard item={item} key={index}/>)
                })}
            </div>
            }
            <div className={'flex justify-center mb-28 mt-10'}>
                {list?.length > 5 && <button onClick={() => {
                    navigate('/mint')
                }}
                                             className={'go-btn text-white font-montserrat text-base'}>
                    See More
                </button>}
            </div>
        </Styled>
    )
}

const Styled = styled.div`
  .go-btn {
    width: 14rem;
    height: 3.25rem;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
    border: 0.06rem solid rgba(255, 255, 255, 0.2);
  }

  .text {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.25);
  }
`;
