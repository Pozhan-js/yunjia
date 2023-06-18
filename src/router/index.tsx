import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isPc } from '@/utils/utils';
import { CircularProgress } from "@mui/material";

import App from '@/App';
//const AppPromise = import('@/App');
//const App = lazy(() => AppPromise);

//import Index from '@/pages/Home/Index';
// import Page404 from '@/pages/Page404';
// import Mint from "@/pages/Mint/Index";
// import MintDetail from "@/pages/Mint/MintDetail";
// import Stake from '@/pages/Stake/Stake';
// import Clubs from '@/pages/Clubs/Index';
// import Clubs_Detail from '@/pages/ClubsDetail/Clubs';
// import Personal from '@/pages/Personal/Index';
// import Faqs from '@/pages/Faqs/Index';
// import Horses from '@/pages/Horses/Index';
// import Compose from '@/pages/Compose/Index';
// import HorsePediaDetail from '@/pages/HorsePediaDetail/Index';
// import HorsePedia from '@/pages/HorsePedia/Index';
// import HorseHub from '@/pages/HorseHub/Index';
// import ResetPwdPage from '@/pages/Account/ResetPwdPage';
// import AdvList from '@/pages/AdvList/Index';
// import MediaList from '@/pages/MediaList/Index';

const Index = lazy(() => import('@/pages/Home/Index'));
const Page404 = lazy(() => import('@/pages/Page404'));
const Mint = lazy(() => import('@/pages/Mint/Index'));
const MintDetail = lazy(() => import('@/pages/Mint/MintDetail'));
const Stake = lazy(() => import('@/pages/Stake/Stake'));
const Clubs = lazy(() => import('@/pages/Clubs/Index'));
const Clubs_Detail = lazy(() => import('@/pages/ClubsDetail/Clubs'));
const Personal = lazy(() => import('@/pages/Personal/Index'));
const Faqs = lazy(() => import('@/pages/Faqs/Index'));
const Horses = lazy(() => import('@/pages/Horses/Index'));
const Compose = lazy(() => import('@/pages/Compose/Index'));
const HorsePediaDetail = lazy(() => import('@/pages/HorsePediaDetail/Index'));
const HorsePedia = lazy(() => import('@/pages/HorsePedia/Index'));
const HorseHub = lazy(() => import('@/pages/HorseHub/Index'));
const ResetPwdPage = lazy(() => import('@/pages/Account/ResetPwdPage'));
const AdvList = lazy(() => import('@/pages/AdvList/Index'));
const MediaList = lazy(() => import('@/pages/MediaList/Index'));



// import MobileIndex from '@/pages/Home/mobile/Index';
// import MobileClubsDetail from '@/pages/ClubsDetail/mobile/Clubs';
// import MobileMint from "@/pages/Mint/mobile/Index";
// import MobileMintDetail from "@/pages/Mint/mobile/MintDetail";
// import MobilePersonal from '@/pages/Personal/mobile/Index';
// import MobileStake from '@/pages/Stake/mobile/Stake';
// import MobileFaqs from '@/pages/Faqs/mobile/Index';
// import MobileHorses from '@/pages/Horses/mobile/Index';
// import MobileCompose from '@/pages/Compose/mobile/Index';
// import MobilePage404 from '@/pages/Page404Mobile'
// import MobileClubs from '@/pages/Clubs/mobile/Index';
// import MobileHorsePediaDetail from '@/pages/HorsePediaDetail/mobile/Index';
// import MobileHorsePedia from '@/pages/HorsePedia/mobile/Index';
// import MobileHorseHub from '@/pages/HorseHub/mobile/Index';
// import MobileAdvList from '@/pages/AdvList/mobile/Index';
// import MobileResetPwdPage from '@/pages/Account/mobile/ResetPwdPage';
// import MobileMediaList from '@/pages/MediaList/mobile/Index';
const MobileIndex = lazy(() => import('@/pages/Home/mobile/Index'));
const MobileClubsDetail = lazy(() => import('@/pages/ClubsDetail/mobile/Clubs'));
const MobileMint = lazy(() => import('@/pages/Mint/mobile/Index'));
const MobileMintDetail = lazy(() => import('@/pages/Mint/mobile/MintDetail'));
const MobilePersonal = lazy(() => import('@/pages/Personal/mobile/Index'));
const MobileStake = lazy(() => import('@/pages/Stake/mobile/Stake'));
const MobileFaqs = lazy(() => import('@/pages/Faqs/mobile/Index'));
const MobileHorses = lazy(() => import('@/pages/Horses/mobile/Index'));
const MobileCompose = lazy(() => import('@/pages/Compose/mobile/Index'));
const MobilePage404 = lazy(() => import('@/pages/Page404Mobile'));
const MobileClubs = lazy(() => import('@/pages/Clubs/mobile/Index'));
const MobileHorsePediaDetail = lazy(() => import('@/pages/HorsePediaDetail/mobile/Index'));
const MobileHorsePedia = lazy(() => import('@/pages/HorsePedia/mobile/Index'));
const MobileHorseHub = lazy(() => import('@/pages/HorseHub/mobile/Index'));
const MobileAdvList = lazy(() => import('@/pages/AdvList/mobile/Index'));
const MobileResetPwdPage = lazy(() => import('@/pages/Account/mobile/ResetPwdPage'));
const MobileMediaList = lazy(() => import('@/pages/MediaList/mobile/Index'));


const BaseRouter = () => {
    if (isPc()) {
        return (
            <BrowserRouter>
                <Suspense fallback={<div className=" w-screen h-screen flex justify-center items-center ">
                    <CircularProgress />
                </div>}>
                    <Routes>
                        <Route path='/' element={<App />}>
                            <Route index element={<Index />} />
                            <Route path="mint" element={<Mint />} />
                            <Route path="mint_detail/:id" element={<MintDetail />} />
                            <Route path="stake" element={<Stake />} />
                            <Route path="clubs" element={<Clubs />} />
                            <Route path="clubs/:id" element={<Clubs_Detail />} />
                            <Route path="personal" element={<Personal />} />
                            <Route path="faq" element={<Faqs />} />
                            <Route path="horse" element={<Horses />} />
                            <Route path="horse_hub/:id" element={<HorseHub />} />
                            <Route path='horse_pedia/:id' element={<HorsePediaDetail />} />
                            <Route path="pedia" element={<HorsePedia />} />
                            <Route path='compose' element={<Compose />} />
                            <Route path='account/reset_password' element={<ResetPwdPage />} />
                            <Route path='advlist' element={<AdvList />} />
                            <Route path='medialist/:id' element={<MediaList />} />
                            <Route path='*' element={<Page404></Page404>} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        )
    } else {
        return (
            <BrowserRouter>
                <Suspense fallback={<div className=" w-screen h-screen flex justify-center items-center ">
                    <CircularProgress />
                </div>}>
                    <Routes>
                        <Route path='/' element={<App />}>
                            <Route index element={<MobileIndex />} />
                            <Route path="mint" element={<MobileMint />} />
                            <Route path="mint_detail/:id" element={<MobileMintDetail />} />
                            <Route path="stake" element={<MobileStake />} />
                            <Route path="clubs" element={<MobileClubs />} />
                            <Route path="clubs/:id" element={<MobileClubsDetail />} />
                            <Route path="personal" element={<MobilePersonal />} />
                            <Route path="faq" element={<MobileFaqs />} />
                            <Route path="horse" element={<MobileHorses />} />
                            <Route path="horse_hub/:id" element={<MobileHorseHub />} />
                            <Route path='horse_pedia/:id' element={<MobileHorsePediaDetail />} />
                            <Route path="pedia" element={<MobileHorsePedia />} />
                            <Route path="compose" element={<MobileCompose />} />
                            <Route path='account/reset_password' element={<MobileResetPwdPage />} />
                            <Route path='advlist' element={<MobileAdvList />} />
                            <Route path='medialist/:id' element={<MobileMediaList />} />
                            <Route path='*' element={<MobilePage404></MobilePage404>} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter >
        )
    }
}

export default BaseRouter;
