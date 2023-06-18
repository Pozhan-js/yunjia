import styled from "styled-components";
import cardBg from '@/assets/images/ComposePage/mobile/card_bg.png';
import Power from "@/components/widget/Power";
import idleImg from "@/assets/images/PersonalPage/idle@2x.png";
import miningImg from "@/assets/images/PersonalPage/Mining1@2x.png";
import LvIcon from "./LvIcon";
import Image from "@/components/widget/Image";


const Status = () => {
    return (<div className={'flex mt-6'}>
        <img src={idleImg} className={'w-6 h-6 object-cover'} alt={''}/>
        <div className={'text-white font-ggm text-[0.81rem] font-medium flex items-center'}>Idle</div>

        {/*质押过程中动画*/}
        {/*{(stakestatus === 2 || nftstatus === 2) &&*/}
        {/*    <p className={'text-[#FFA033] font-gtwal font-[0.81rem] leading-4 animation-text text-center -mb-1'}>Waiting*/}
        {/*        for blockchain confimation*/}
        {/*    </p>}*/}
    </div>)
}
export default function NftCard({item, onClick = null}) {

    return (
        <Styled
            style={{backgroundImage: `url(${cardBg})`}}
            className={'w-[44vw] h-[66.68vw] bg-cover bg-center relative relative flex flex-col items-center cursor-pointer'}
            onClick={onClick}
        >
            {/* w-[10.06rem] h-[15.25rem] */}
            <LvIcon lv={item.level} className={'absolute right-[0.5rem] top-[0.625rem]'}/>
            <Image src={item.img_url}
                   className={`object-cover w-[7.356rem] h-[10.704rem] mt-3`}/>
            <Power item={item} className={''}/>
            <Status/>
        </Styled>
    )
}
const Styled = styled.div`
`;
