import styled from "styled-components";
import NoticeBar from "@/components/widget/NoticeBar";
import themeSetting from "@/config/themeSetting";
import Card from "@/components/widget/AdvListPage/Card";
import {useRequest, useSet} from "ahooks";
import {getNewsList} from "@/services/v1/home";
import {useState} from "react";
import Footer from "@/components/widget/Footer/Footer";
import {useSelector} from "react-redux";

export default function Index() {
    const [listData, {
        add,
        remove,
        reset
    }] = useSet([]);
    const [noMore, setNoMore] = useState(false);
    const header_top = useSelector((state: any) => state.HEADER_TOP);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useRequest(getNewsList, {
        defaultParams: [page],
        onSuccess: (tdata) => {
            setPage(page + 1);
            if (tdata.data.length < pageSize) {
                setNoMore(true);
            } else {
                setNoMore(false)
            }
            tdata.data.forEach((item) => {
                add(item)
            })
        }
    })
    return (
        <Styled style={{backgroundColor: themeSetting.bgColor}} className={'min-h-screen'}>
            <NoticeBar block={true} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                       bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`}/>
            <div className={'flex flex-col space-y-[1.5rem] items-center pt-6 pb-[5rem]'}>
                {Array.from(listData).map((item, index) => {
                    return (
                        <Card item={item} key={index}/>
                    )
                })}
            </div>
            <Footer absolute={false}/>
        </Styled>
    )
}

const Styled = styled.div`

`;
