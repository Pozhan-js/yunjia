import styled from "styled-components";
import cardBg from '@/assets/images/ComposePage/card_bg.png';
// import lv1Img from '@/assets/images/ComposePage/lv1.png';
// import lv2Img from '@/assets/images/ComposePage/lv2.png';
// import lv3Img from '@/assets/images/ComposePage/lv3.png';
// import lv4Img from '@/assets/images/ComposePage/lv4.png';
import Power from "@/components/widget/Power";
import idleImg from "@/assets/images/PersonalPage/idle@2x.png";
import miningImg from "@/assets/images/PersonalPage/Mining1@2x.png";
import {useNavigate} from "react-router-dom";
import LvIcon from "@/components/widget/ComposePage/LvIcon";
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
            className={'w-[13.75rem] h-[19.63rem] bg-cover bg-center relative flex flex-col items-center cursor-pointer'}
            onClick={onClick}
        >
            <LvIcon lv={1} className={'absolute right-[0.75rem] top-[1.13rem]'}/>
            <Image src={item.img_url}
                 className={`object-cover w-[9.3rem] h-[13.65rem] pt-8`}/>
            <Power item={item} className={'mt-2'}/>
            <Status/>
        </Styled>
    )
}
const Styled = styled.div`
`;
