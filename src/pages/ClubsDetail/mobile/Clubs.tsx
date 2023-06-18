import React from 'react'
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ClubContent from '@/components/widget/ClubsDetailPage/mobile/ClubContent';
import Footer from "@/components/mobile/widget/Footer";

export default function Clubs() {
    const { id } = useParams();
    return (
        <ClubsStyled>
            <div className={'w-full px-5 pt-[4.5rem]  flex flex-col mb-4 text-white text-base'}>
                <ClubContent clubId={id}></ClubContent>
            </div>
            <Footer absolute={false} bgColor={'bg-[#25194A]'}></Footer>
        </ClubsStyled>
    )
}
const ClubsStyled = styled.div`
  background-color: #25194A;
`;
