import {useState} from "react";

import Footer from "@/components/widget/Footer/Footer";

import Banner from "@/components/HomeSections/Banner";
import RoadMap from "@/components/HomeSections/RoadMap";
import HorsepowerMining from "@/components/HomeSections/HorsepowerMining";
import HotSales from "@/components/HomeSections/HotSales";
import MorePicks from "@/components/HomeSections/MorePicks";
import PrivateJockeyClubSection from "@/components/HomeSections/PrivateJockeyClubs";
import HowToWorks from "@/components/HomeSections/HowToWorks";
import UpcomingCollections from '@/components/HomeSections/UpcomingCollections';
import BestHorses from "@/components/HomeSections/BestHorses";
import TopCollectionsRank from "@/components/HomeSections/TopCollectionsRank";
import HorsePedia from "@/components/HomeSections/HorsePedia";
import OurTeam from "@/components/HomeSections/OurTeam";
import {useRequest, useThrottle} from "ahooks";
import {getHotSell, getMint, getModules} from "@/services/v1/home";
import NoticeBar from "@/components/widget/NoticeBar";
import '@/assets/styles/antd/message/index.css';
import Loading from "@/components/widget/Loading";
import {useSelector} from "react-redux";
import theme from '@/config/themeSetting';
import ThePartners from "@/components/HomeSections/ThePartners";
import MediaEvaluation from "@/components/HomeSections/MediaEvaluation";
import RacingMatch from "@/components/HomeSections/RacingMatch";
import NoticeModal from "@/components/HomeSections/NoticeModal";

function Index() {
    const [fixed, setFixed] = useState(false);
    const [mintData, setMintData] = useState<any>({});
    const [hotSellData, setHotSellData] = useState<any>({});
    const {data: homeModules, loading}: any = useRequest(getModules);
    const [bannerLoading, setBannerLoading] = useState(true);
    const header_top = useSelector((state: any) => state.HEADER_TOP);
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

    return (
        // bg-[#0C0C0D]
        <div
            style={{backgroundColor: theme.bgColor}}
            className={`flex flex-col min-h-screen overflow-hidden relative font-gtwal`}>
            {(loading || bannerLoading) && (
                <div className={`w-1/1 min-h-screen flex justify-center items-center bg-[${theme.bgColor}]`}>
                    <Loading/>
                </div>)}
            {/*  Site header */}
            {/*<Header menu={indexData?.menu}/>*/}
            <NoticeBar block={false} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                       bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`}/>
            <NoticeModal/>
            <Banner bannerLoading={bannerLoading} setBannerLoading={setBannerLoading}></Banner>

            <HotSales hotData={hotSellData?.hotsale}
                      rightNews={hotSellData?.hotproject}></HotSales>

            <MorePicks list={hotSellData?.hotmint}></MorePicks>

            {homeModules?.data.index_racing_match_show &&   <RacingMatch/> }

            {homeModules?.data.index_private_club_show && <PrivateJockeyClubSection totalPrizeShow={homeModules?.data.index_private_club_total_show }></PrivateJockeyClubSection>}

            <HowToWorks></HowToWorks>

            <HorsepowerMining fixed={fixed}></HorsepowerMining>
            {homeModules?.data.index_own_omnihorse_nft_show &&
                <BestHorses setFixed={setFixed}
                            list={mintData.newmint}></BestHorses>}
            {homeModules?.data.index_upcoming_nft_show &&
                <UpcomingCollections
                    list={mintData.nextmint}></UpcomingCollections>}

            {homeModules?.data.index_midrank_show && <TopCollectionsRank></TopCollectionsRank>}


            <RoadMap></RoadMap>
            <HorsePedia></HorsePedia>
            {/*{homeModules?.data.index_our_team_show && <OurTeam></OurTeam>}*/}

            <ThePartners/>

            <MediaEvaluation/>

            <Footer absolute={false}></Footer>

        </div>
    );
}

export default Index;
