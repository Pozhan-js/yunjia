import { useState } from "react";

import Footer from "@/components/mobile/widget/Footer";

import Banner from "@/components/HomeSections/mobile/Banner";
import RoadMap from "@/components/HomeSections/mobile/RoadMap";
import HorsepowerMining from "@/components/HomeSections/mobile/HorsepowerMining";
import HotSales from "@/components/HomeSections/mobile/HotSales";
import PrivateJockeyClubSection from "@/components/HomeSections/mobile/PrivateJockeyClubs";
import UpcomingCollections from '@/components/HomeSections/mobile/UpcomingCollections';
import BestHorses from "@/components/HomeSections/mobile/BestHorses";
import TopCollectionsRank from "@/components/HomeSections/mobile/TopCollectionsRank";
import HorsePedia from "@/components/HomeSections/mobile/HorsePedia";
import { useRequest, useThrottle } from "ahooks";
import { getHotSell, getMint, getModules } from "@/services/v1/home";
import '@/assets/styles/antd/message/index.css';
import Loading from "@/components/widget/Loading";
import { useSelector } from "react-redux";
import theme from "@/config/themeSetting";
import ThePartners from "@/components/HomeSections/mobile/ThePartners";
import MediaEvaluation from "@/components/HomeSections/mobile/MediaEvaluation";
import RacingMatch from "@/components/HomeSections/mobile/RacingMatch";
import NoticeModal from "@/components/HomeSections/mobile/NoticeModal";


function Home() {
    const [mintData, setMintData] = useState<any>({});
    const [hotSellData, setHotSellData] = useState<any>({});
    const { data: homeModules, loading } = useRequest(getModules);
    const [bannerLoading, setBannerLoading] = useState(true);
    // const header_top = useSelector((state:StoreState) => state.HEADER_TOP);

    useRequest(getMint, {
        onSuccess: (data) => {
            setMintData(data.data);
        }
    });
    useRequest(getHotSell, {
        onSuccess: (data) => {
            setHotSellData(data.data);
        }
    });
    // console.log(header_top);
    // if (loading) {
    //     return (<div className=" w-1/1 min-h-screen flex justify-center items-center bg-black">
    //         <Loading className={''} />
    //     </div>)
    // }
    return (
        //
        <div className="font-gtwal flex flex-col overflow-hidden bg-[#2C1E59] relative">
            {(loading || bannerLoading) && (
                <div className={`w-1/1 min-h-screen flex justify-center items-center bg-[${theme.bgColor}]`}>
                    <Loading />
                </div>)}
            {/*  Site header */}
            {/*<NoticeBar block={false} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}*/}
            {/*           bgColor={`${header_top ? '#402170CC' : '#FFFFFF00'}`}/>*/}
            <NoticeModal />
            <Banner bannerLoading={bannerLoading} setBannerLoading={setBannerLoading}></Banner>
            <HotSales hotData={hotSellData?.hotsale}
                rightNews={hotSellData?.hotproject}></HotSales>
            {homeModules?.data.index_racing_match_show && <RacingMatch />}

            {homeModules?.data.index_private_club_show && <PrivateJockeyClubSection  totalPrizeShow={homeModules?.data.index_private_club_total_show }></PrivateJockeyClubSection>}

            {homeModules?.data.index_own_omnihorse_nft_show &&
                <BestHorses list={mintData.newmint}></BestHorses>}
            {homeModules?.data.index_upcoming_nft_show &&
                <UpcomingCollections
                    list={mintData.nextmint}></UpcomingCollections>}
            {homeModules?.data.index_midrank_show && <TopCollectionsRank></TopCollectionsRank>}
            <HorsepowerMining></HorsepowerMining>
            <RoadMap></RoadMap>
            <HorsePedia></HorsePedia>
            <ThePartners />
            <MediaEvaluation />
            {/*{homeModules.data.index_our_team_show && <OurTeam></OurTeam>}*/}
            <Footer absolute={false} bgColor={'bg-[#25194A]'} className={''}></Footer>
        </div>
    );
}

export default Home;
