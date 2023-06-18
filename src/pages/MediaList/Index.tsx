import styled from "styled-components";
import themeSetting from "@/config/themeSetting";
import NoticeBar from "@/components/widget/NoticeBar";
import { useRequest, useSet } from "ahooks";
import { getMediaList } from "@/services/v1/horseHub";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PreviewModal from "@/components/widget/MediaListPage/PreviewModal";
import Footer from "@/components/widget/Footer/Footer";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

export default function MediaList() {
    const header_top = useSelector((state: any) => state.HEADER_TOP);
    const { id } = useParams();
    // const [listData, {
    //     add,
    //     remove,
    //     reset
    // }] = useSet([]);
    const [listData, setListData] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [noMore, setNoMore] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const { loading, run } = useRequest(getMediaList, {
        defaultParams: [id, page],
        debounceWait: 500,
        onSuccess: (tdata) => {
            let tmpArr = listData;
            setIsUpdate(true)
            if (page === 1) {
                tmpArr = [];
            }
            if (tdata.data.length < pageSize) {
                setNoMore(false);
            } else {
                setNoMore(true)
            }
            tdata.data.forEach((item) => {
                tmpArr.push(item)
            })
            setPage(page + 1);
            setListData(tmpArr);
            setTimeout(() => {
                setIsUpdate(false)
            }, 100);
        }
    })
    return (
        <Styled style={{ backgroundColor: themeSetting.bgColor }} className={'min-h-screen'}>
            <NoticeBar block={true} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`} />
            {listData.length > 0 ? <div className={'flex justify-center'}>
                {!isUpdate &&
                    <PreviewModal preViewClass={'w-[13.94rem] min-h-[8rem] bg-black rounded-lg '} list={listData} />}
            </div>
                : <div className="mt-3 w-full flex justify-center items-center text-center h-5 text-white text-base ">No items to
                    display</div>
            }
            {noMore ? <div className={'flex flex-col items-center'}>
                {loading ? <div className={'pb-5'}>
                    <CircularProgress />
                </div> :
                    <div className={'text-white text-lg cursor-pointer py-8 text-opacity-80'} onClick={() => {
                        run(id, page)
                    }}>Load More</div>}
            </div> : <div className={'h-[5.3rem]'}></div>}
            <Footer absolute={false} />
        </Styled>
    )
}
const Styled = styled.div`
`;
