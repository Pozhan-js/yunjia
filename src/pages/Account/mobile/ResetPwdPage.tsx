import React from "react";
import styled from "styled-components";
import Footer from "@/components/mobile/widget/Footer";
import { useSearchParams } from "react-router-dom";
import theme from '@/config/themeSetting';
import ResetPwd from "@/components/widget/Account/mobile/ResetPwd";


export default function ResetPwdPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log('code', code, useSearchParams())
  return (
    <PageStyled style={{ backgroundColor: theme.bgColor }} className={'min-h-screen w-screen font-gtwalp'}>
      <div className=' w-full bg-cover px-5 pt-[5rem]  mb-[2rem] ' >
        <ResetPwd resetCode={code} />
      </div>
      <Footer absolute={false} className={""}></Footer>
    </PageStyled>
  );
}
const PageStyled = styled.div`

`;
