import styled from "styled-components";
import { Select } from "antd";
import { useState } from "react";
import Table from "@/components/widget/Table.js";
import Image from "@/components/widget/Image";
//import {clubs_classes} from '@/utils/constant';
import { useMount, useRequest, useUpdateEffect } from "ahooks";
import { getBonusRankTab } from "@/services/v1/clubs";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import omhImg from "@/assets/images/OMH@2x.png";

const { Option } = Select;

const headers = [
    {
        title: 'Ranking',
        key: '',
        style: {
            width: '5rem',
        },
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
                <p style={{ color: color }} className={'text-base font-gtwalb ml-4'}>{index + 1}</p>
            )
        }
    },
    {
        title: 'Club',
        key: 'name',
        render: (text, record) => {
            const navigate = useNavigate();
            return (
                <div className={'flex items-center cursor-pointer'} onClick={() => {
                    // console.log(record)
                    navigate(`/clubs/${record?.id}`);
                }}>
                    <img src={record?.img} className={'w-[3.2rem] h-[3.2rem]'} />
                    <p className={'text-white text-base font-gtwalp ml-[1.87rem]'}>{text}</p>
                </div>
            )

        }
    },
    {
        title: 'Racing Count',
        key: 'rnum',
        render: (text) => {
            return (
                <div className={'flex items-center'}>
                    {/*<img src={omhImg} className={'h-4 w-4'}/>*/}
                    <p className={'text-[1.07rem] text-white font-gtwalp'}>{text}</p>
                </div>
            )
        }
    },
    {
        title: 'Prize Pool',
        key: 'scoin',
        render: (text) => {
            return (
                <div className={'flex items-center'}>
                    {/*<img src={omhImg} className={'h-4 w-4'}/>*/}
                    <p className={'text-[1.07rem] text-white font-gtwalp'}>${text}</p>
                </div>
            )
        }
    },
    {
        title: '',
        key: '',
        render: (text, record) => {
            const navigate = useNavigate();
            return <button disabled={record?.scoin === 0} onClick={() => {
                navigate(`/stake`)
            }
            }
                className={`${record?.scoin !== 0 ? 'btn' : 'btn-disable'} whitespace-nowrap text-white text-base font-gtwalp font-normal`}>Claim</button>

        }
    }
]

export default function BounsPoolRank() {
    const [clubName, setClubName] = useState('');
    const [classesVal, setClassesVal] = useState('desc');
    const [data, setData] = useState([]);
    const { run, loading } = useRequest(getBonusRankTab,
        {
            defaultParams: [classesVal, clubName],
            debounceWait: 800,
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


    return (
        <Styled>
            <div className={'flex'}>
                <div className={'bg-[#483D71FF] w-[26.69rem] h-[2.75rem] rounded flex items-center'}>
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
                <div className={'mg-select ml-auto'}>
                    <Select
                        showSearch
                        className={''}
                        popupClassName="mg-select-pop"
                        placeholder="Select a item"
                        defaultValue={classesVal}
                        value={classesVal}
                        optionFilterProp="children"
                        onChange={setClassesVal}
                        filterOption={(input, option: any) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        <Option value={'desc'}>Prize high to low</Option>
                        <Option value={'asc'}>Prize low to high</Option>
                        {/*{*/}
                        {/*    clubs_classes.map((item, index) => {*/}
                        {/*        return (*/}
                        {/*            <Option value={item.val} key={item.val + 1}>{item.label}</Option>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                    </Select>
                </div>
            </div>
            {loading ? <div className=" w-1/1 h-[20rem] flex justify-center items-center ">
                <CircularProgress />
            </div> :
                <Table className={'mt-[1.13rem] rounded'} headers={headers} data={data} />
            }

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
