import styled from "styled-components";
import themeSetting from "@/config/themeSetting";
import Card from "@/components/widget/AdvListPage/mobile/Card";
import {useRequest, useSet} from "ahooks";
import {getNewsList} from "@/services/v1/home";
import {useState} from "react";
import Footer from "@/components/mobile/widget/Footer";

export default function Index() {
    const [listData, {
        add,
        remove,
        reset
    }] = useSet([]);
    const [noMore, setNoMore] = useState(false);
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
        <Styled style={{backgroundColor: themeSetting.bgColor}} className={'min-h-screen pt-[4.5rem]'}>
            <div className={'flex flex-col space-y-[1.5rem] items-center py-6'}>
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
