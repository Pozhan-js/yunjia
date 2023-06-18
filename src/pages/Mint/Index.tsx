import styled from "styled-components";
import NoticeBar from "@/components/widget/NoticeBar";
import Topic from "@/components/widget/MintPage/Topic";
import Footer from "@/components/widget/Footer/Footer";

import Content from "@/components/widget/MintPage/Content";
import {getMintBanner} from "@/services/v1/mint";
import {useRequest} from "ahooks";
import theme from '@/config/themeSetting';
import _ from "lodash";
import {useSelector} from "react-redux";

export default function Index() {
    const {data, loading} = useRequest(getMintBanner)
    const header_top = useSelector((state: any) => state.HEADER_TOP);
    return (
        <Styled
            style={{backgroundColor: theme.bgColor}}
            className={'min-h-screen font-gtwal'}>
           <NoticeBar block={true} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                       bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`}/>
            <div className={'w-full mx-auto px-9 sm:px-6 md:px-32 flex flex-col'}>
                {!loading && !_.isEmpty(data?.data) && <Topic data={data?.data}/>}
                <Content/>
            </div>
            <Footer absolute={false}/>
        </Styled>
    )
}
const Styled = styled.div`

`;
