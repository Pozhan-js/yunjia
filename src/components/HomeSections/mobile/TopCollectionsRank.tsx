import styled from 'styled-components';
import OpenSea from "@/components/widget/HomePage/TopCollectionsRank/mobile/OpenSea";
import {useRequest} from "ahooks";
import {getRank} from "@/services/v1/home";
import titleImg from '@/assets/images/HomePage/TopCollectionsRank/mobile/title.png'
import titleBgImg from "@/assets/images/title_bg.png";

export default function TopCollectionsRank() {
    const {data}: any = useRequest(getRank)
    return (
        <Styled className={'flex flex-col items-center'}>
            {/*<img src={titleImg} className={'w-[17.63rem] h-[3.56rem] mt-10'}/>*/}
            <div className="mt-[3.75rem] flex text-[1.75rem] font-gtwalbpo text-white">
                <span>Top Collections</span>
                <span className={'ml-2 bg-gradient-title-2'}>Rank</span>
            </div>
            <img src={titleBgImg} className={'w-[13.62rem] bg-cover bg-center'}/>

            {data?.code === 200 && <div className={'flex mt-10'}>
                <OpenSea list={data?.data?.highest}></OpenSea>
            </div>}

        </Styled>
    )
}
const Styled = styled.div`
  background: #14111C;
`;
