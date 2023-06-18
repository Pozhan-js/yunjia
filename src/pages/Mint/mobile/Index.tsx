import styled from "styled-components";
import Topic from "@/components/widget/MintPage/mobile/Topic";

import Content from "@/components/widget/MintPage/mobile/Content";
import {getMintBanner} from "@/services/v1/mint";
import {useRequest} from "ahooks";
import Footer from "@/components/mobile/widget/Footer";
import _ from "lodash";

export default function Index() {
    const {data, loading} = useRequest(getMintBanner)
    return (
        <Styled className={'pt-[3.5rem] font-gtwal'}>
            <div className={'w-full  px-5 flex flex-col mb-8 text-white text-base'}>
                {!loading && !_.isEmpty(data?.data) && <Topic item={data?.data}/>}
                <Content/>
            </div>
            <Footer absolute={false} bgColor={'bg-[#25194A]'} className={''}></Footer>
        </Styled>
    )
}
const Styled = styled.div`
  background-color: #25194A
`;
