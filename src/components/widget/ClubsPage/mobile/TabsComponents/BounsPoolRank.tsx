import styled from "styled-components";
import { Select } from "antd";
import { useState } from "react";
import Table from "@/components/mobile/widget/Table";
import Image from "@/components/widget/Image";
import { clubs_classes, bonusrank_column } from '@/utils/constant';
import { useMount, useRequest, useUpdateEffect } from "ahooks";
import { getBonusRankTab } from "@/services/v1/clubs";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import omhImg from "@/assets/images/OMH@2x.png";

const { Option } = Select;

const headers = [
    {
        title: '',
        key: '',
        width: 'w-[14%]',
        render: (text, record, index) => {
            const [color, setColor] = useState('#FFFFFF');
            useMount(() => {
                switch (index) {
                    case 0:
                        setColor('#FFBA38')
                        break;
                    case 1:
                        setColor('#7363EC')
                        break;
                    case 2:
                        setColor('#65C3D8')
                        break;

                }
            })
            return (
                <p style={{ color: color }} className={'text-base font-gtwalb ml-4 '}>{index + 1}</p>
            )
        }
    },
    {
        title: 'Club',
        key: 'name',
        width: 'w-8/12',
        render: (text, record) => {
            const navigate = useNavigate();
            return (
                <div className={'flex items-center'} onClick={() => {
                    navigate(`/clubs/${record?.id}`)
                }}>
                    <img src={record?.img} className={'w-[2.625rem] h-[2.625rem]'} />
                    <p className={'text-white text-sm font-gtwalp ml-[0.8rem] pr-2'}>{text}</p>
                </div>
            )

        }
    },
    {
        title: 'Racing Count',
        key: 'rnum',
        val: 'rnum',
        width: 'w-3/12 text-center whitespace-nowrap ',
        render: (text) => {
            return (
                <div className={'flex items-center justify-center '}>
                    {/* <img src={omhImg} className={'h-4 w-4'} /> */}
                    <p className={'text-sm text-white font-gtwalp ml-[0.8rem]'}>{text}</p>
                </div>
            )
        }
    },
    {
        title: 'Prize Pool',
        key: 'scoin',
        val: 'scoin',
        width: 'w-3/12 text-center whitespace-nowrap ',
        render: (text) => {
            return (
                <div className={'flex items-center justify-center'}>
                    {/* <img src={omhImg} className={'h-4 w-4'} /> */}
                    <p className={'text-sm text-white font-gtwalp ml-[0.8rem]'}>${text}</p>
                </div>
            )
        }
    },
    // {
    //     title: 'Claimed',
    //     key: 'claimed',
    //     width: 'min-w-[7rem]',
    //     render: (text) => {
    //         return (
    //             <div className={'flex items-center'}>
    //                 <img src={omhImg} className={'h-4 w-4'} />
    //                 <p className={'text-sm text-white font-gtwalp ml-[0.8rem]'}>{text}</p>
    //             </div>
    //         )
    //     }
    // },
    // {
    //     title: '',
    //     key: '',
    //     width: 'min-w-[7rem]',
    //     render: () => {
    //         const navigate = useNavigate();
    //         return <button onClick={() => {
    //             navigate(`/stake`)
    //         }
    //         }
    //             className={`btn whitespace-nowrap text-white text-base font-gtwalp font-normal`}>Claim</button>

    //     }
    // }
]

export default function BounsPoolRank() {
    const [clubName, setClubName] = useState('');
    const [classesVal, setClassesVal] = useState('desc');
    const [columnVal, setColumnVal] = useState('rnum');
    const [data, setData] = useState([]);
    const { run, loading } = useRequest(getBonusRankTab,
        {
            defaultParams: [classesVal, clubName],
            debounceWait: 500,
            onSuccess: (data) => {
                setData(data?.data)
            }
        });

    useUpdateEffect(() => {
        run(classesVal, clubName)
    }, [classesVal])
    useUpdateEffect(() => {
        run(classesVal, clubName)
    }, [clubName])

    if (loading) {
        return (<div className=" w-1/1 h-[20rem] flex justify-center items-center ">
            <CircularProgress />
        </div>)
    }

    return (
        <Styled className="px-5">
            <div className={'bg-[#483D71FF] w-full h-[2rem] rounded flex items-center'}>
                <svg className="icon ml-4" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem">
                    <path
                        d="M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496l-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28"
                        fill="#7D7A80FF"></path>
                </svg>
                <input placeholder={'Search Clubs name'} value={clubName} onInput={(e: any) => {
                    setClubName(e.target.value)
                }}
                    className={"flex-1 appearance-none bg-transparent border border-transparent w-full py-2 px-1 text-white placeholder-white placeholder-opacity-40 shadow-md rounded-l-md text-base focus:outline-none font-gtwalm"} />
            </div>
            <div className={'flex  mt-2 '}>
                <div className={'mg-select-mobile w-1/2'}>
                    <Select
                        className={'w-full h-[2rem] border-[0.06rem] border-[#FFFFFF4D]'}
                        popupClassName="mg-select-pop-mobile"
                        placeholder="Select a item"
                        defaultValue={classesVal}
                        value={classesVal}
                        optionFilterProp="children"
                        onChange={setClassesVal}
                    >
                        <Option value={'desc'}>Prize high to low</Option>
                        <Option value={'asc'}>Prize low to high</Option>
                        {/* <Option value={0}>ALL</Option>
                        {
                            clubs_classes.map((item, index) => {
                                return (
                                    <Option value={item.val} key={item.val + 1}>{item.label}</Option>
                                )
                            })
                        } */}
                    </Select>
                </div>
                <div className=" w-[0.625rem]"></div>
                <div className={'mg-select-mobile w-1/2'}>
                    <Select
                        className={'w-full h-[2rem] border-[0.06rem] border-[#FFFFFF4D]'}
                        popupClassName="mg-select-pop-mobile"
                        placeholder="Select a item"
                        defaultValue={columnVal}
                        value={columnVal}
                        optionFilterProp="children"
                        onChange={setColumnVal}
                    >
                        {
                            bonusrank_column.map((item, index) => {
                                return (
                                    <Option value={item.val} key={item.val + 1}>{item.label}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
            </div>
            <div className=" overflow-x-auto"></div>
            <Table className={'mt-[1.13rem] w-full '} headers={headers} data={data} columnVal={columnVal} />
        </Styled>
    )
}
const Styled = styled.div`
  .btn {
    width: 6.73rem;
    height: 2.13rem;
    background: #B902FD;
    border-radius: 0.67rem 0.67rem 0.67rem 0.67rem;
    opacity: 1;
  }

  .btn-disable {
    width: 6.73rem;
    height: 2.13rem;
    background: #7B3C93;
    border-radius: 0.67rem 0.67rem 0.67rem 0.67rem;
    opacity: 1;
  }
`;
