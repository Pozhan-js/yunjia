import styled from 'styled-components';
import topImg from '@/assets/images/HorsesPage/mobile/top_bg.png';
import themeSetting from "@/config/themeSetting";
import Footer from "@/components/mobile/widget/Footer";
import React, { useState } from "react";
import Card1 from "@/components/widget/HorsesPage/mobile/TabsComPonents/HorseHub/Card1";
import { useRequest, useSet, useUpdateEffect } from "ahooks";
import { getHorseHub, getHorseTypes } from "@/services/v1/horses";
import { CircularProgress } from "@mui/material";
import Card2 from '@/components/widget/HorsesPage/mobile/TabsComPonents/HorseHub/Card2';
import { Select } from "antd";

const { Option } = Select;
export default function HorseHub() {
    const pageSize = 20;
    const [horseName, setHorseName] = useState('');
    const [totalNum, setTotalNum] = useState(0);
    const [types, setTypes] = useState<Array<any>>([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(0);
    const [noMore, setNoMore] = useState(false);
    const [displayType, setDisplayType] = useState(0);  // 0图方式 1列表方式
    const [listData, {
        add,
        remove,
        reset
    }] = useSet([]);
    useUpdateEffect(() => {
        // reset()
        // setPage(1)
        // setNoMore(false)
        setPage(1)
        run(1, horseName, status)
    }, [horseName])

    useUpdateEffect(() => {
        // reset()
        // setPage(1)
        // setNoMore(false)
        setPage(1)
        run(1, horseName, status)
    }, [status])
    useRequest(getHorseTypes, {
        onSuccess: (data) => {
            // console.log(data)
            setTypes(data?.data)
        }
    });
    const { run, loading } = useRequest(getHorseHub,
        {
            defaultParams: [page, horseName, status],
            debounceWait: 500,
            onSuccess: (data) => {
                reset()
                setNoMore(false)
                setTotalNum(data.data.total)
                setPage(page + 1);
                if (data.data.list.length < pageSize) {
                    setNoMore(true);
                }
                data.data.list.forEach((item) => {
                    add(item)
                })
            }
        })
    const Content = () => {
        return (<>
            {displayType === 0 ?
                <div className={'grid grid-cols-2 gap-x-[0.44rem] gap-y-3 mt-2 w-full'}>
                    {
                        Array.from(listData).map((item, index) => {
                            return (
                                <Card1 key={index} item={item} />
                            )
                        })
                    }
                </div> :
                <div className={'mt-2 grid grid-cols-1 gap-y-3'}>
                    {
                        Array.from(listData).map((item, index) => {
                            return (
                                <Card2 key={index} item={item} />
                            )
                        })
                    }
                </div>}
            {!noMore ? <div className={'flex flex-col items-center'}>
                {loading ? <CircularProgress /> :
                    <div className={'text-white text-lg cursor-pointer py-8 text-opacity-80'} onClick={() => {
                        run(page, horseName, status)
                    }}>Load More</div>}
            </div> : <div className={'h-[3.75rem]'}></div>}
        </>)
    }
    return (<Styled
        style={{ backgroundColor: themeSetting.bgColor }}
        className={'flex flex-col min-h-screen'}>
        <div className={'max-w-full items-start pt-5'}>
            <div className={'flex flex-col items-center'}>
                <div className={'bg-[#483D71FF] w-full h-[2rem] rounded flex items-center'}>
                    <svg className="icon ml-4" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem">
                        <path
                            d="M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496l-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28"
                            fill="#7D7A80FF"></path>
                    </svg>
                    <input placeholder={'Search horse name'} value={horseName} onChange={(e: any) => {
                        setHorseName(e.target.value)
                    }}
                        className={"flex-1 appearance-none bg-transparent border border-transparent w-full py-2 px-1 text-white placeholder-white placeholder-opacity-40 shadow-md rounded-l-md text-sm focus:outline-none font-gtwal"} />
                </div>

                <div className={'flex justify-between mg-select-mobile mt-[0.63rem] w-full'}>
                    <Select
                        showSearch
                        className={'mr-[0.8rem] w-[15.81rem] h-[2rem] border-[0.06rem] border-[#FFFFFF4D]'}
                        popupClassName="mg-select-pop-mobile"
                        placeholder="Select a item"
                        defaultValue={status}
                        value={status}
                        optionFilterProp="children"
                        onChange={setStatus}
                        filterOption={(input, option: any) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        <Option value={0}>ALL</Option>
                        {
                            types.map((item, index) => {
                                return (
                                    <Option value={item.val} key={item.val}>{item.label}</Option>
                                )
                            })
                        }
                    </Select>
                    <div
                        className={`${displayType === 0 ? 'right-btn-active' : 'right-btn'} flex items-center justify-center cursor-pointer ml-auto`}
                        onClick={() => setDisplayType(0)}>
                        <svg width="40%" height="40%" viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 0H0V4H4V0ZM4 8H0V12H4V8ZM8 0H12V4H8V0ZM12 8H8V12H12V8Z" fill="white" />
                        </svg>
                    </div>
                    <div
                        className={`${displayType === 1 ? 'right-btn-active' : 'right-btn'} flex items-center justify-center ml-[0.44rem] cursor-pointer`}
                        onClick={() => setDisplayType(1)}>
                        <svg width="40%" height="40%" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H12V2H0V0ZM0 5H12V7H0V5ZM12 10H0V12H12V10Z" fill="white" />
                        </svg>
                    </div>
                </div>
                <span className={' w-full mt-3 text-white text-sm font-ggm'}>Total:{totalNum}</span>
            </div>
            <Content />

        </div>
    </Styled>)
}
const Styled = styled.div`


  .right-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 0.63rem;
    border: 0.06rem solid rgba(255, 255, 255);
    opacity: 0.3;
  }

  .right-btn-active {
    width: 2rem;
    height: 2rem;
    background: #6F19F7;
    border-radius: 0.63rem;
    opacity: 1;
  }
`;
