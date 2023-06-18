import styled from "styled-components";
import NoticeBar from "@/components/widget/NoticeBar";
import Footer from "@/components/widget/Footer/Footer";
import StakeContent from '@/components/widget/StakePage/StakeContent';
import theme from '@/config/themeSetting';
import {useSelector} from "react-redux";
import React from "react";

export default function Stake() {
    const header_top = useSelector((state: any) => state.HEADER_TOP);
    return (
        <StakeStyled
            style={{backgroundColor: theme.bgColor}}
            className={'min-h-screen font-gtwalp'}>
            <NoticeBar block={true} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                       bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`}/>
            <div className={'w-full mx-auto px-9 sm:px-6 md:px-32 pt-6 flex flex-col mb-8'}>
                <StakeContent></StakeContent>
            </div>
            <Footer absolute={false} className={''}></Footer>
        </StakeStyled>
    )
}


const StakeStyled = styled.div`

`;
