import styled from "styled-components";
import NoticeBar from "@/components/widget/NoticeBar";
import Footer from "@/components/widget/Footer/Footer";
import StakeContent from '@/components/widget/StakePage/mobile/StakeContent';

export default function Stake() {
    return (
        <StakeStyled className={'min-h-screen w-full px-5 pt-[4.5rem] font-gtwalp'}>
            {/*<NoticeBar/>*/}

            <StakeContent></StakeContent>

            {/*<Footer absolute={false}></Footer>*/}
        </StakeStyled>
    )
}


const StakeStyled = styled.div`
  background-color: #25194A;
`;
