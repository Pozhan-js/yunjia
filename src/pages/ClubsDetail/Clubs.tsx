import React from "react";
import styled from "styled-components";
import NoticeBar from "@/components/widget/NoticeBar";
import Footer from "@/components/widget/Footer/Footer";
import ClubContent from "@/components/widget/ClubsDetailPage/ClubContent";
import { useParams } from "react-router-dom";
import theme from '@/config/themeSetting';
import {useSelector} from "react-redux";
export default function Clubs() {
  const { id } = useParams();
  const header_top = useSelector((state: any) => state.HEADER_TOP);
  return (
    <ClubsStyled
        style={{backgroundColor:theme.bgColor}}
    >
      <NoticeBar block={true} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                       bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`}/>
      <div
        className={
          "flex justify-center"
        }
      >
        <ClubContent clubId={id} cardBg={theme.clubsPage.cardBg}></ClubContent>
      </div>
      <Footer absolute={false} className={""}></Footer>
    </ClubsStyled>
  );
}
const ClubsStyled = styled.div`

`;
