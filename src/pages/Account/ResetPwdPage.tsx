import React from "react";
import styled from "styled-components";
import Footer from "@/components/widget/Footer/Footer";
import { useSearchParams } from "react-router-dom";
import theme from '@/config/themeSetting';
import ResetPwd from "@/components/widget/Account/ResetPwd";


export default function ResetPwdPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log('code', code, useSearchParams())
  return (
    <PageStyled
      style={{ backgroundColor: theme.bgColor }}
      className=" pt-24"
    >
      <div
        className={
          "w-full mx-auto px-9 sm:px-6 md:px-32 pt-6 flex flex-col mb-8"
        }
      >
        <ResetPwd resetCode={code} />
      </div>
      <Footer absolute={false} className={""}></Footer>
    </PageStyled>
  );
}
const PageStyled = styled.div`

`;
