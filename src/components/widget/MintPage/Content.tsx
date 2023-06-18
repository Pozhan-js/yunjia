import ItemCard from "@/components/widget/MintPage/ItemCard";
import 'antd/es/spin/style/index.css';
import {useRequest, useSet} from "ahooks";
import styled from "styled-components";
import {getMintList} from "@/services/v1/mint";
import {useState} from "react";
import Loading from "@/components/widget/Loading";
import {CircularProgress} from "@mui/material";

export default function Content() {
    const [page, setPage] = useState(1);
    const [noMore, setNoMore] = useState(false);
    const [listData, {
        add,
        remove,
        reset
    }] = useSet([]);
    const {run, loading} = useRequest(getMintList, {
        throttleWait: 500,
        defaultParams: [page],
        onSuccess: (data) => {
            setPage(page + 1);
            if (data.data.length < 10) {
                setNoMore(true);
            }
            data.data.forEach((item) => {
                add(item)
            })
        }
    });
    // if (loading) {
    //     return <Loading loading={loading}/>
    // }
    return (
        <Styled className={''}>
            {/*{loading && <Loading loading={loading}/>}*/}
            <div className={'flex flex-col space-y-6'}>
                {Array.from(listData).map((item, index) => {
                    return (<ItemCard key={index} item={item}/>)
                })}
            </div>
            {!noMore ? <div className={'mt-8 flex flex-col items-center'}>
                {loading ? <CircularProgress className={'mb-8'}/> :
                    <div className={'text-white text-lg cursor-pointer py-4 mb-8 text-opacity-80'} onClick={() => {
                        run(page)
                    }}>Load More</div>}
            </div> : <div className={'h-8'}></div>}
        </Styled>
    )
}
const Styled = styled.div`

`
