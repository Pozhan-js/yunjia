import powerBgImg from "@/assets/images/power_bg.png";
import Power from "@/components/widget/Power";
import styled from "styled-components";

export default function PowerBg({item,bgColor='linear-gradient(90deg, rgba(66,42,146,0) 0%, #5236B0 31%, #502CC8 51%, #5236B0 68%, rgba(66,42,146,0) 100%)'}) {
    return (
        <Styled
            style={{background: bgColor}}
            className={'flex justify-center items-center w-[10.94rem] h-[2.25rem]'}>
            <Power item={item}/>
        </Styled>
    )
}
const Styled = styled.div`

`;
