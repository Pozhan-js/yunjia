import styled from 'styled-components';
import assets from '@/components/widget/HomePage/TopCollectionsRank/Assets';
import OpenSea from "@/components/widget/HomePage/TopCollectionsRank/OpenSea";
import ClubsReward from "@/components/widget/HomePage/TopCollectionsRank/ClubsRewards";
import ClubsTradingData from "@/components/widget/HomePage/TopCollectionsRank/ClubsTradingData";
import {useRequest} from "ahooks";
import {getRank} from "@/services/v1/home";
import titleBgImg from "@/assets/images/title_bg.png";
import React from "react";

export default function TopCollectionsRank() {
    const {data}:any = useRequest(getRank)
    return (
        <Styled className={'flex flex-col items-center bg-[#0C0C0D] z-30 pb-[9.25rem]'}>
            {/*<img src={assets.titleImg} className={'w-[30.5rem] h-[5.81rem]'}/>*/}
            <div className="flex text-[3.03rem] leading-[3.54rem] font-gtwalbpo text-white">
                <span className={''}>Top Collections </span>
                <span className={'ml-2 bg-gradient-title-2'}>Rank</span>
            </div>
            <img src={titleBgImg} className={'w-[23rem] bg-cover bg-center'}/>
            {data?.code === 200 && <div className={'flex w-[90vw] mt-[3.75rem] justify-around'}>
                <OpenSea list={data?.data?.highest}></OpenSea>
                <ClubsReward list={data?.data?.rewards}></ClubsReward>
                <ClubsTradingData list={data?.data?.floortrend}></ClubsTradingData>
            </div>}

        </Styled>
    )
}
const Styled = styled.div`

`;
