import styled from "styled-components";
import { useState } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import { useRequest, useUpdateEffect } from "ahooks";
import { getRacingTab } from "@/services/v1/clubs";
import { CircularProgress } from "@mui/material";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import utils from "@/utils/utils"
import { getMatchTime } from "@/services/v1/clubsDetail";

dayjs.extend(utc)

const Status = ({ racestatus }) => {
    let status = { text: 'On Going', bgColor: '#4CAD6D' };
    switch (racestatus) {
        case 0:
            status = { text: 'Not Started', bgColor: '#584B7D' };
            break;
        case 1:
            status = { text: 'On Going', bgColor: '#4CAD6D' };
            break;
        case 2:
            status = { text: 'The End', bgColor: '#B02A21' };
            break;
    }
    return (
        <div style={{ backgroundColor: status.bgColor }}
            className={'flex items-center h-[1.125rem] rounded-[0.27rem] px-[0.27rem] py-[0.13rem] w-fit mt-2'}>
            <p className={'text-white font-gtwalmp text-xs'}>{status.text}</p>
        </div>
    )
}

const MulItem = ({ list = [] }) => {
    const navigate = useNavigate();
    return (
        <div className={'flex flex-col space-y-[1.25rem] mt-2'}>
            {list?.map((item, index) => {
                return (
                    <div className={'flex cursor-pointer'} key={index} onClick={() => {
                        if (item?.external_href.includes("http")) {
                            window.open(item?.external_href);
                        } else {
                            navigate(`/clubs/${item?.club_id}`)
                        }
                    }}>
                        <img src={item?.img} className={'w-10 h-10'} />
                        <div className={'flex flex-col ml-[0.81rem]'}>
                            <div className={''}>
                                <p className={'text-white text-base font-gtwalp w-[13rem]'}>{utils.formatSubStr(item?.title, 50)}</p>
                                <Status racestatus={item?.racestatus} />
                            </div>
                            <div className={'flex flex-col mt-[0.56rem] right-box p-[0.8rem] overflow-ellipsis'}>
                                <div
                                    className={'text-white text-opacity-60 font-gtwalp whitespace-pre-line text-sm'}>{item?.content}</div>
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
                                            <div>Prize: <span className=" text-[#FFA033] ">{utils.formatNumberToThousand(item?.prize) + item?.prize_unit}</span></div>
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


export default function MatchTime({ clubId }) {

    const [dataList, setDataList] = useState([]);
    const [beginTime, setBeginTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const { run, loading } = useRequest(getMatchTime,
        {
            defaultParams: [clubId, '', '', ''],
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
                let btimeUtc = dayjs(item?.begintime).utc();
                const arr = btimeUtc.format('DD MMM/HH:00 a').split('/');
                item.btYear = btimeUtc.year() + '';
                item.btMonth = arr[0];
                item.btHour = arr[1];
                return item;
            });

            let dataYearMap = new Map();
            dataYear.forEach(item => {
                if (dataYearMap.has(item.btYear))
                    dataYearMap.get(item.btYear).push(item)
                else
                    dataYearMap.set(item.btYear, [item]);

            });
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
            setDataList(dataList);
        }
    }
    useUpdateEffect(() => {
        run(clubId, beginTime, endTime, '')
    }, [beginTime, endTime])

    const onChangeBegin: DatePickerProps['onChange'] = (date, dateString) => {
        // console.log("onChangeBegin", date, dateString);
        setBeginTime(dateString)
    };
    const onChangeEnd: DatePickerProps['onChange'] = (date, dateString) => {
        // console.log("onChangeEnd", date, dateString);
        setEndTime(dateString)
    };


    return (
        <Styled className={'w-full mt-6'}>
            <div className="text-white font-gtwalb text-base">Recent Match</div>
            <div className={'mt-[0.875rem] flex justify-between items-center'}>
                <div className="mg-datepicker"><DatePicker inputReadOnly={true} onChange={onChangeBegin} allowClear={false}
                    popupClassName="mg-datepopup" /></div>
                <hr className="w-[0.625rem] border-t border-t-[#ffffff66]  mx-[0.625rem]" />
                <div className="mg-datepicker"><DatePicker inputReadOnly={true} onChange={onChangeEnd} allowClear={false}
                    popupClassName="mg-datepopup" /></div>
            </div>
            {
                loading ? <div className=" w-1/1 h-[20rem] flex justify-center items-center ">
                    <CircularProgress />
                </div> : <div >
                    {
                        !dataList || dataList.length <= 0 ? <div className="h-14 flex justify-center items-end">No Match</div> :
                            dataList.map((yItem, yIndex) => {
                                return (<div key={yIndex}>
                                    <div className={'font-gtwalp text-white text-[1.188rem] text-opacity-60 pl-[4rem] pt-5'}>
                                        {yItem.year}
                                    </div>
                                    <div className={'flex flex-col pb-[2.56rem]  pt-5'}>
                                        {yItem.values?.map((item, index) => {
                                            return (
                                                <div className={'flex'} key={index}>
                                                    <div
                                                        className={'left-box text-white text-base whitespace-pre-wrap flex items-center text-center'}>
                                                        {item?.key}
                                                    </div>
                                                    {_.map(item?.value, (items, k) => {
                                                        const time = k?.split(' ');
                                                        return (
                                                            <div className={'border-l border-[#52525B] flex ml-4 pb-[2.13rem]'} key={k}>
                                                                <div className={'mt-4 w-6 h-[0.06rem] bg-[#66667B]'} />
                                                                <div className={'ml-2 max-w-[17.2rem] mt-[0.3125rem]'}>
                                                                    <p className={'text-white text-opacity-60 font-ggr'}>{time[0]} {time[1]} (UTC)
                                                                    </p>
                                                                    <MulItem list={items} />
                                                                </div>
                                                            </div>)
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>)
                            })}
                </div>
            }

        </Styled>
    )
}
const Styled = styled.div`

  .left-box {
    width: 3.13rem;
    height: 3.13rem;
    background: #4CAD6D;
    border-radius: 0.63rem;
    padding: 0.2rem;
  }

  .right-box {
    width: 12.31rem;
    background: rgba(69, 51, 139, 0.45);
    border-radius: 1.25rem;
    overflow: hidden;
  }

  .mg-datepicker {
    .ant-picker {
      background: #25194A;
      border: 0.06rem solid #ffffff66;
      border-radius: 0.63rem;
      width: 10.19rem;
      height: 2rem;

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
