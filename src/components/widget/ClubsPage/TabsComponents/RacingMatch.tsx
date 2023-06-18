import styled from "styled-components";
import { useState } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import { useMount, useRequest, useUpdateEffect } from "ahooks";
import { getRacingTab } from "@/services/v1/clubs";
import { CircularProgress } from "@mui/material";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import utils from "@/utils/utils"

dayjs.extend(utc)

const Item = ({ item = {} }: any) => {
    const navigate = useNavigate();
    return (<div className={'ml-[2.13rem] flex items-center cursor-pointer'} onClick={() => {
        navigate(`/clubs/${item?.club_id}`)
    }}>
        <img src={item?.img} className={'w-12 h-12'} />
        <div className={'flex flex-col ml-[0.81rem]'}>
            <p className={'text-white text-[1.13rem] font-gtwalm'}>{item?.name}</p>
            <div className={'flex items-center mt-[0.56rem]'}>
                <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem">
                    <path
                        d="M508.5 61.7c-193.9 0-351 157.2-351 351s269.7 544.1 351 544.1 351-350.2 351-544.1-157.1-351-351-351z m0 527.6c-97.5 0-176.6-79-176.6-176.6s79-176.6 176.6-176.6 176.6 79 176.6 176.6S606 589.3 508.5 589.3z"
                        fill="#A2A2A3"></path>
                </svg>
                <div
                    className={'text-base text-white text-opacity-60 font-gtwalp ml-[0.31rem]'}>{item?.location}
                </div>
            </div>
        </div>
    </div>)
}
const Status = ({ racestatus }) => {
    const [status, setStatus] = useState({ text: 'On Going', bgColor: '#4CAD6D' });
    useMount(() => {
        switch (racestatus) {
            case 0:
                setStatus({ text: 'Not Started', bgColor: '#584B7D' });
                break;
            case 1:
                setStatus({ text: 'On Going', bgColor: '#4CAD6D' });
                break;
            case 2:
                setStatus({ text: 'The End', bgColor: '#B02A21' });
                break;
        }
    })
    return (
        <div style={{ backgroundColor: status.bgColor }}
            className={'flex items-center h-[1.2rem] rounded-[0.27rem] ml-[0.67rem] px-[0.27rem] py-[0.13rem]'}>
            <p className={'text-white font-gtwalmp text-sm'}>{status.text}</p>
        </div>
    )
}
const MulItem = ({ list = [] }) => {
    const navigate = useNavigate();
    return (
        <div className={'flex flex-col ml-[2.27rem] space-y-[1.25rem]'}>
            {list?.map((item, index) => {
                return (
                    <div className={'flex cursor-pointer'} key={index} onClick={() => {
                        if (item?.external_href.includes("http")) {
                            window.open(item?.external_href);
                        } else {
                            navigate(`/clubs/${item?.club_id}`)
                        }
                    }}>
                        <img src={item?.img} className={'w-12 h-12'} />
                        <div className={'flex flex-col ml-[0.81rem]'}>
                            <div className={'flex items-center'}>
                                <p className={'text-white text-[1.2rem] font-gtwalp max-w-[42rem]'}>{utils.formatSubStr(item?.title, 140)}</p>
                                <Status racestatus={item?.racestatus} />
                            </div>
                            <div className={'flex flex-col mt-[0.56rem] right-box p-[0.8rem] overflow-ellipsis'}>
                                <div
                                    className={'text-white text-opacity-60 font-gtwalp whitespace-pre-line text-base'}>{item?.content}</div>
                                {/*          <div className={'text-white text-opacity-60 font-gtwalp'}>Entry Draw: 120</div>*/}
                                <div className={'flex items-center'}>
                                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem">
                                        <path
                                            d="M508.5 61.7c-193.9 0-351 157.2-351 351s269.7 544.1 351 544.1 351-350.2 351-544.1-157.1-351-351-351z m0 527.6c-97.5 0-176.6-79-176.6-176.6s79-176.6 176.6-176.6 176.6 79 176.6 176.6S606 589.3 508.5 589.3z"
                                            fill="#3694CB"></path>
                                    </svg>
                                    <div
                                        className={'text-base text-[#3694CB] font-gtwalp ml-[0.31rem]'}>{item?.location}
                                    </div>
                                </div>
                                {
                                    item?.racestatus === 2 ? <div>
                                        <hr className=" h-[0.125rem] bg-[#893EFF] border-0 mt-[0.875rem]"></hr>
                                        <div className=" mt-[0.875rem] text-[0.875rem] text-white flex justify-between items-center ">
                                            <div>Placed: <span className=" text-[#FFA033] ">{item?.placed}</span></div>
                                            <div>Prize: <span className=" text-[#FFA033] ">{item?.prize + item?.prize_unit}</span></div>
                                        </div>
                                    </div> : null
                                }

                            </div>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}

export default function RacingMatch() {
    const [clubName, setClubName] = useState('');
    const [dataList, setDataList] = useState([]);
    const [beginTime, setBeginTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const { run, loading } = useRequest(getRacingTab,
        {
            defaultParams: ['', '', clubName],
            debounceWait: 500,
            onSuccess: (data: any) => {
                setDataList([]);
                setTimeout(() => {
                    handleRacingTime(data?.data);
                }, 200);
            }
        });

    const handleRacingTime = (dataRows) => {
        if (dataRows && dataRows.length > 0) {
            let dataYear = dataRows.map((item) => {
                //console.log('RacingMatch item?.begintime:', item?.begintime);
                let btimeUtc = dayjs(item?.begintime).utc();
                //console.log("RacingMatch  btimeUtc.year()):", btimeUtc.year());
                const arr = btimeUtc.format('DD MMM/HH:00 a').split('/');
                item.btYear = btimeUtc.year() + '';
                item.btMonth = arr[0];
                item.btHour = arr[1];
                return item;
            });
            //console.log('dataYearList:', dataYear)

            let dataYearMap = new Map();
            dataYear.forEach(item => {
                if (dataYearMap.has(item.btYear))
                    dataYearMap.get(item.btYear).push(item)
                else
                    dataYearMap.set(item.btYear, [item]);

            });
            //console.log("dataYearMap:", dataYearMap)
            let dataList = [];
            dataYearMap.forEach((val, key) => {
                let dataMonth = _.groupBy(val, 'btMonth');
                let dataMonthHour = _.map(dataMonth, (v, k) => {
                    return {
                        key: k,
                        value: _.groupBy(v, (o) => {
                            return o.btHour;
                        })
                    }
                })
                dataList.push({
                    'year': key,
                    'values': dataMonthHour
                })
            });
            // console.log("dataList:", dataList)
            setDataList(dataList);
            // let dataYearMap = _.groupBy(dataYear, 'btYear');
        }
    }

    useUpdateEffect(() => {
        run(beginTime, endTime, clubName)
    }, [clubName, beginTime, endTime])

    const onChangeBegin: DatePickerProps['onChange'] = (date, dateString) => {
        // console.log("onChangeBegin", date, dateString);
        setBeginTime(dateString)
    };
    const onChangeEnd: DatePickerProps['onChange'] = (date, dateString) => {
        // console.log("onChangeEnd", date, dateString);
        setEndTime(dateString)
    };


    return (
        <Styled className={'w-full'}>
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
                <div className={'ml-auto  flex justify-end items-center'}>
                    <div className="mg-datepicker"><DatePicker onChange={onChangeBegin} allowClear={false}
                        popupClassName="mg-datepopup" /></div>
                    <hr className="w-[0.625rem] border-t border-t-[#ffffff66]  mx-[0.625rem]" />
                    <div className="mg-datepicker"><DatePicker onChange={onChangeEnd} allowClear={false}
                        popupClassName="mg-datepopup" /></div>
                </div>
            </div>
            {loading ? <div className=" w-1/1 h-[20rem] flex justify-center items-center ">
                <CircularProgress />
            </div> :
                <div className={'box mt-[1.13rem]'}>
                    {!dataList || dataList.length <= 0 ? <div className="h-14 flex justify-center items-center text-white">No Match</div> :
                        dataList.map((yItem, yIndex) => {
                            return (<div key={yIndex}>
                                <div className={'font-gtwalp text-white text-[1.63rem] text-opacity-60 pl-[7.44rem] pt-[2.13rem]'}>
                                    {yItem.year}
                                </div>
                                <div className={'flex flex-col pl-[1.81rem] pb-[2.56rem] pt-[2.81rem]'}>
                                    {yItem.values?.map((item, index) => {
                                        return (
                                            <div className={'flex'} key={index}>
                                                <div
                                                    className={'left-box flex items-center justify-center text-white text-base whitespace-nowrap'}>
                                                    {item?.key}
                                                </div>
                                                {_.map(item?.value, (items, k) => {
                                                    const time = k?.split(' ');
                                                    return (
                                                        <div className={'border-l border-[#52525B] flex ml-4 pb-[2.13rem]'} key={k}>
                                                            <div className={'mt-4 w-6 h-[0.06rem] bg-[#66667B]'} />
                                                            <div className={'flex mt-[2.44rem]'}>
                                                                <p className={'text-white text-opacity-60 font-ggr'}>{time[0]}<br />{time[1]} (UTC)
                                                                </p>
                                                                <MulItem list={items} />
                                                            </div>
                                                        </div>)
                                                })}
                                            </div>
                                        )
                                    })}
                                </div></div>)
                        })}

                    {/* <div className={'font-gtwalp text-white text-[1.63rem] text-opacity-60 pl-[7.44rem] pt-[2.13rem]'}>
                        {new Date().getFullYear()}
                    </div>
                    <div className={'flex flex-col pl-[1.81rem] pb-[2.56rem] pt-[2.81rem]'}>
                        {data?.map((item, index) => {
                            return (
                                <div className={'flex'} key={index}>
                                    <div
                                        className={'left-box flex items-center justify-center text-white text-base whitespace-nowrap'}>
                                        {item?.key}
                                    </div>
                                    {_.map(item?.value, (items, k) => {
                                        const time = k?.split(' ');
                                        return (
                                            <div className={'border-l border-[#52525B] flex ml-4 pb-[2.13rem]'} key={k}>
                                                <div className={'mt-4 w-6 h-[0.06rem] bg-[#66667B]'} />
                                                <div className={'flex mt-[2.44rem]'}>
                                                    <p className={'text-white text-opacity-60 font-ggr'}>{time[0]}<br />{time[1]} (UTC)
                                                    </p>
                                                    <MulItem list={items} />
                                                </div>
                                            </div>)
                                    })}
                                </div>
                            )
                        })}
                    </div> */}
                </div>}

        </Styled>
    )
}
const Styled = styled.div`
  .data-picker {
    .MuiDatePicker {
      .MuiFormControl-root {
        width: 12.5rem;
        height: 2.75rem;
        border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
        opacity: 1;
        border: 0.13rem solid #302A37;
      }
    }
  }

  .box {
    background: rgba(69, 51, 139, 0.45);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .left-box {
    width: 6.38rem;
    height: 2rem;
    background: #4CAD6D;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .right-box {
    width: 18rem;
    background: rgba(69, 51, 139, 0.45);
    border-radius: 0.67rem 0.67rem 0.67rem 0.67rem;
    opacity: 1;
  }

  .mg-datepicker {
    .ant-picker {
      background: #25194A;
      border: 0.06rem solid #ffffff66;
      border-radius: 0.63rem;
      width: 12.5rem;
      height: 2.75rem;

      .ant-picker-input {
        flex-direction: row-reverse;

        > input {
          color: #ffffff66;
          font-size: 1rem;
          margin-left: 0.725rem;
        }

        .ant-picker-suffix {
          color: #ffffff66;
          font-size: 1rem;
        }

      }
    }
  }
`;
