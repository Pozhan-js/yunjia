import styled from 'styled-components';
import loadingImg from "@/assets/images/loading.gif";
import React from "react";

export default function Loading({ className = '', loading = true, width = '4rem', bgColor = '#25194A' }) { //161619
    if (!loading) {
        return <></>;
    }
    return (
        <Styled className={`fixed top-0 left-0 right-0 h-screen flex items-center justify-center ${className}`}
            style={{ backgroundColor: bgColor }}>
            <img src={loadingImg} style={{ width: width }} alt={''} />
        </Styled>
    )
}
const Styled = styled.div`
  z-index: 99999; // 覆盖所有层
`;
