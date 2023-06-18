import styled from 'styled-components';
import React, { useState } from "react";
import { useRequest, useSet, useUpdateEffect } from "ahooks";
import { getHorseHub, getHorsePedia, getHorseTypes } from "@/services/v1/horses";
import { CircularProgress } from "@mui/material";
import { Select } from "antd";
import { horsePedia_classes } from '@/utils/constant';
import Card from "./Card";

const { Option } = Select;


export default function HorsePedia() {
    const pageSize = 20;
    const [horsePedia, setHorsePedia] = useState('');
    const [page, setPage] = useState(1);
    //const [status, setStatus] = useState('all');
    const [orderBy, setOrderBy] = useState('timeDown');

    const [type2, setType2] = useState('all');
    const [types2Count, setTypes2Count] = useState({});
    const [noMore, setNoMore] = useState(false);
    const [listData, {
        add,
        remove,
        reset
    }] = useSet([]);
    useUpdateEffect(() => {
        setPage(1);
        run(1, horsePedia, type2, orderBy)
    }, [horsePedia])

    useUpdateEffect(() => {
        setPage(1);
        run(1, horsePedia, type2, orderBy)
    }, [type2])
    useUpdateEffect(() => {
        setPage(1);
        run(1, horsePedia, type2, orderBy)
    }, [orderBy])

    const { run, loading } = useRequest(getHorsePedia,
        {
            defaultParams: [page, horsePedia, type2, orderBy],
            debounceWait: 500,
            onSuccess: (data) => {
                /*setTotalNum(data.data.total)*/
                if (page === 1) {
                    reset()
                }
                setNoMore(false)
                if (data?.data.types) {
                    setTypes2Count(data?.data.types);
                }
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
            <div className={'flex space-x-4 mt-[0.8rem] w-full overflow-x-auto  pb-3'}>
                {horsePedia_classes.map((item, index) => {
                    return (
                        <div key={index}
                            onClick={() => {
                                setType2(item.val)
                            }}
                            className={`flex text-white items-center justify-center text-base font-gtwalp px-2 cursor-pointer ${item.val === type2 ? 'filter-btn' : ''}`}>
                            {item.label}({types2Count[item.val.toString()]})
                        </div>
                    )
                })}
            </div>
            <div className={'mt-1 grid grid-cols-1 gap-y-[1.5rem]'}>
                {
                    Array.from(listData).map((item, index) => {
                        return (
                            <Card key={index} item={item} />
                        )
                    })
                }
            </div>
            {!noMore ? <div className={'flex flex-col items-center'}>
                {loading ? <div className={'pb-5'}>
                    <CircularProgress />
                </div> :
                    <div className={'text-white text-lg cursor-pointer py-8 text-opacity-80'} onClick={() => {
                        run(page, horsePedia)
                    }}>Load More</div>}
            </div> : <div className={'h-[5.3rem]'}></div>}
        </>)
    }
    return (<Styled>
        <div className={'max-w-full items-start pt-5'}>
            <div className={'flex flex-col items-center'}>
                <div className={'bg-[#483D71FF] w-full h-[2rem] rounded flex items-center'}>
                    <svg className="icon ml-4" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem">
                        <path
                            d="M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496l-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28"
                            fill="#7D7A80FF"></path>
                    </svg>
                    <input placeholder={'Search horsepedia'} value={horsePedia} onChange={(e: any) => {
                        setHorsePedia(e.target.value)
                    }}
                        className={"flex-1 appearance-none bg-transparent border border-transparent w-full py-2 px-1 text-white placeholder-white placeholder-opacity-40 shadow-md rounded-l-md text-sm focus:outline-none font-gtwal"} />
                </div>

                <div className={'flex ml-auto mg-select-mobile mt-[0.63rem] w-full'}>
                    <Select
                        className={'h-[2rem] w-full border-[0.06rem] border-[#FFFFFF4D]'}
                        popupClassName="mg-select-pop-mobile"
                        placeholder="Select a item"
                        defaultValue={orderBy}
                        value={orderBy}
                        onChange={setOrderBy}
                    >
                        <Option value={'timeDown'}>Latest</Option>
                        <Option value={'timeUp'}>Oldest</Option>
                        {/* <Option value={5}>ALL</Option> 
                        {
                            horsePedia_classes.map((item, index) => {
                                return (
                                    <Option value={item.val} key={item.val}>{item.label}</Option>
                                )
                            })
                        }*/}
                    </Select>
                </div>
            </div>
            <Content />
        </div>
    </Styled>)
}
const Styled = styled.div`
  .filter-btn {
    height: 2rem;
    background: #6F19F7;
    border-radius: 1rem 1rem 1rem 1rem;
    opacity: 1;
  }

  .right-btn {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    border: 0.06rem solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6)
  }

  .right-btn-active {
    width: 2.75rem;
    height: 2.75rem;
    background: #6F19F7;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }
`;
