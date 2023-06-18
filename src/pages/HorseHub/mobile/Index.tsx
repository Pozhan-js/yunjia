import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom";
import topBg from '@/assets/images/HorseHubPage/mobile/topBg.png';
import themeSetting from "@/config/themeSetting";
import Footer from "@/components/mobile/widget/Footer";
import React, { useState } from "react";
import Card from "@/components/widget/HorseHubPage/mobile/Card";
import rectangleImg from '@/assets/images/HorseHubPage/Rectangle.png';
import PreviewModal from "@/components/widget/HorseHubPage/mobile/PreviewModal";
import { getHorseHubDetail } from "@/services/v1/horseHub";
import { useRequest } from "ahooks";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/scss'
import { Empty, Table } from "antd";


const nav = [
    {
        label: 'info',
        id: 'info'
    },
    {
        label: 'Media',
        id: 'media'
    },
    {
        label: 'Events History',
        id: 'event'
    },
    {
        label: 'Racing History',
        id: 'racing'
    },
    {
        label: 'Achievements',
        id: 'achieve'
    },
    {
        label: 'Pedia',
        id: 'pedia'
    }
];
const headers = [
    {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date',
    },
    {
        title: 'Racing',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => (
            <div className={'whitespace-nowrap'}>
                {text}
            </div>
        )
    },
    {
        title: 'Location',
        dataIndex: 'Location',
        key: 'Location'
    },
    {
        title: 'Distance',
        dataIndex: 'Distance',
        key: 'Distance'
    },
    {
        title: 'Placed',
        dataIndex: 'placed',
        key: 'placed'
    }, {
        title: 'Prize',
        dataIndex: 'Prize',
        key: 'Prize'
    },
]
export default function Index() {
    const { id } = useParams();
    const [data, setData] = useState<any>({});
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    // 跳转锚点
    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
                // window.scrollBy(0, -10);
            }
        }
    }
    useRequest(getHorseHubDetail, {
        defaultParams: [id],
        onSuccess: (tdata) => {
            // console.log(tdata);
            setData(tdata.data)
        }
    })
    return (
        <Styled style={{ backgroundColor: themeSetting.bgColor }} className={'font-gtwalp  min-h-screen flex flex-col'}>
            <div style={{ backgroundImage: `url(${topBg})` }}
                className={'relative h-[36.75rem] w-full bg-cover'}>
                <div className={'flex flex-col px-5 w-full items-center mt-[5.25rem]'}>
                    <div className={'flex w-full'}>
                        <img src={data?.detail?.img_url} className={'w-[14rem] h-[8.71rem] rounded object-cover'} />
                        <div className={'ml-5 score-box flex flex-col items-center justify-center'}>
                            <p className={'text-sm text-[#C05C00] font-gtwalpm font-medium'}>SCORE</p>
                            <p className={'text-[2.25rem] font-ggm leading-[2.25rem] font-medium text-black'}>{data?.detail?.power}</p>
                        </div>
                    </div>

                    <div className={'flex mt-4 flex-col h-full self-start'}>
                        <div className={'flex items-center'}>
                            <p className={'text-[1.5rem] text-white font-msrb'}>{data?.detail?.name}</p>
                            <div
                                className={'box flex ml-2 items-center justify-center text-white text-[0.75rem] font-gtwalp'}>
                                Breeding
                            </div>
                        </div>
                        <div className={'flex items-center'}>
                            <p className={'text-white text-opacity-60 text-base'}>{data?.detail?.location}</p>
                            <p className={'text-white text-opacity-60 text-sm ml-[1.25rem]'}>{data?.detail?.date_of_birth}</p>
                        </div>

                    </div>
                    <p className={'mt-2 text-white text-sm'}>{data?.detail?.info} </p>
                    <button disabled={data?.detail?.club_status == 6} className={`${data?.detail?.club_status == 6 ? 'btn-disable' : 'btn'} w-full h-[3rem] mt-[1.88rem] rounded text-white text-base mb-5`}
                        onClick={() => {
                            navigate(`/clubs/${data?.detail?.clubid}`)
                        }}>Join Club
                    </button>
                </div>

            </div>

            <div className={''}>
                <div
                    className={'mt-5 flex space-x-[1.88rem] text-sm text-white text-opacity-60 z-10 relative overflow-x-auto px-5'}>
                    {nav.map((item, index_) => {
                        return (
                            <div key={index_} className={'cursor-pointer whitespace-nowrap'}
                                onClick={() => {
                                    setIndex(index_);
                                    scrollToAnchor(item.id)
                                }}>
                                <p className={`${index == index_ ? 'text-white' : ''}`}>{item.label}</p>
                                {index_ == index && <div className={'line-b mt-[0.63rem]'} />}
                            </div>
                        )
                    })}
                </div>

                <div className={'relative py-[0.88rem]'}>
                    <div className={'w-full'}>
                        <div className={'flex flex-col pt-[5rem] -mt-[5rem] px-5'} id={'info'}>
                            <div className={'flex flex-col'}>
                                <p className={'text-white text-base font-gtwalp font-black '}>Profile</p>
                                <div className={'mt-3 flex flex-col'}>
                                    <div className={'flex flex-col space-y-[0.63rem]'}>
                                        <div
                                            className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                            <p className={'text-white text-opacity-60 text-sm'}>Age (DOB)</p>
                                            <p className={'text-white text-sm'}>{data?.profile?.age}</p>
                                        </div>
                                        <div
                                            className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                            <p className={'text-white text-opacity-60 text-sm'}>Sex</p>
                                            <p className={'text-white text-sm'}>{data?.profile?.sex}</p>
                                        </div>
                                        <div
                                            className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                            <p className={'text-white text-opacity-60 text-sm'}>Color</p>
                                            <p className={'text-white text-sm'}>{data?.profile?.color}</p>
                                        </div>
                                        <div
                                            className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                            <p className={'text-white text-opacity-60 text-sm'}>Rating</p>
                                            <p className={'text-white text-sm'}>{data?.profile?.rating}</p>
                                        </div>
                                        <div
                                            className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                            <p className={'text-white text-opacity-60 text-sm'}>Trainer</p>
                                            <p className={'text-white text-sm'}>{data?.profile?.trainer}</p>
                                        </div>
                                        <div
                                            className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                            <p className={'text-white text-opacity-60 text-sm'}>Current Location</p>
                                            <p className={'text-white text-sm'}>{data?.profile?.location}</p>
                                        </div>
                                        <div
                                            className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                            <p className={'text-white text-opacity-60 text-sm'}>Birth of Country</p>
                                            <p className={'text-white text-sm'}>{data?.profile?.country}</p>
                                        </div>

                                        <div
                                            className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                            <p className={'text-white text-opacity-60 text-sm'}>Passport ID</p>
                                            <p className={'text-white text-sm'}>{data?.profile?.passportid}</p>
                                        </div>

                                        <div
                                            className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                            <p className={'text-white text-opacity-60 text-sm'}>Issue By</p>
                                            <p className={'text-white text-sm'}>{data?.profile?.issue}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className={'text-white text-base font-gtwalp font-black mt-[2.5rem]'}>Sire</p>
                                <div className={'mt-3 flex flex-col space-y-[0.63rem]'}>
                                    <div
                                        className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                        <p className={'text-white text-opacity-60 text-sm'}>Breeder</p>
                                        <p className={'text-white text-sm'}>{data?.sire?.breeder}</p>
                                    </div>

                                    <div
                                        className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                        <p className={'text-white text-opacity-60 text-sm'}>Dam</p>
                                        <p className={'text-white text-sm'}>{data?.sire?.dam}</p>
                                    </div>

                                    <div
                                        className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                        <p className={'text-white text-opacity-60 text-sm'}>Sire</p>
                                        <p className={'text-white text-sm'}>{data?.sire?.sire}</p>
                                    </div>

                                    <div
                                        className={'flex justify-between border-dotted border-white border-b-2 border-opacity-40 pb-2'}>
                                        <p className={'text-white text-opacity-60 text-sm'}>Dam's Sire</p>
                                        <p className={'text-white text-sm'}>{data?.sire?.damsire}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={' pt-[5rem] -mt-[5rem]'} id={'media'}>
                            <p className={'text-white text-base font-gtwalp font-black mt-10 px-5'}>Media</p>

                            {/*<div className={'divider w-full'}/>*/}
                            <div className={'grid grid-cols-2 gap-y-3 gap-x-2 mt-4 px-5'}>
                                {data?.media &&
                                    <PreviewModal list={data?.media} preViewClass={'w-full h-[7.63rem] bg-black'}
                                        viewClass={'w-[70vw] h-[50vw]'} />}
                            </div>
                        </div>

                        <div className={'mt-[3.12rem] px-5'}>
                            <p className={'text-white text-base font-gtwalp font-black'}>Pedigree</p>
                            {
                                data?.pedigree?.pedigree_json && data?.pedigree?.pedigree_json.length > 0 ?
                                    <>
                                        <p className={'mt-2 text-white text-sm'}>{data?.pedigree?.content}</p>
                                        <div className={'mt-10 flex flex-col items-center'}>
                                            {data?.pedigree?.pedigree_json[0]?.label && <div
                                                className={'pedigree-box-1 text-white text-sm font-gtwalp flex items-center justify-center whitespace-pre-line'}>
                                                {data?.pedigree?.pedigree_json[0]?.label}
                                            </div>}
                                            <div className={'flex flex-col items-center my-[0.31rem]'}>
                                                <div className={'line-2 h-[0.81rem]'} />
                                                <div className={'line-1 w-[8rem]'} />
                                                <div className={'flex justify-between w-full'}>
                                                    <div className={'line-2 h-[0.81rem]'} />
                                                    <div className={'line-2 h-[0.81rem]'} />
                                                </div>
                                            </div>
                                            <div className={'flex space-x-4'}>

                                                <div className={'flex self-center'}>
                                                    <div className={'line-2 h-[8.34rem]'} />
                                                    <div className={'flex flex-col'}>
                                                        <div className={'line-1 w-[1.09rem]'} />
                                                        <div className={'line-1 w-[1.09rem] mt-[4.81rem]'} />
                                                        <div className={'line-1 w-[1.09rem] mt-auto'} />
                                                    </div>
                                                </div>

                                                <div className={'flex flex-col'}>
                                                    {data?.pedigree?.pedigree_json[0]?.children[0]?.label && <div
                                                        className={'pedigree-box-2 text-white text-sm font-gtwalp flex items-center justify-center text-center whitespace-pre-line'}>
                                                        {data?.pedigree?.pedigree_json[0]?.children[0]?.label}
                                                    </div>}


                                                    {data?.pedigree?.pedigree_json[0]?.children[0]?.children[0]?.label &&
                                                        <div
                                                            className={'pedigree-box-2 mt-[2.13rem] text-white text-sm font-gtwalp flex items-center justify-center text-center whitespace-pre-line'}>
                                                            {data?.pedigree?.pedigree_json[0]?.children[0]?.children[0]?.label}
                                                        </div>}


                                                    {data?.pedigree?.pedigree_json[0]?.children[0]?.children[1]?.label &&
                                                        <div
                                                            className={'pedigree-box-2 mt-3 text-white text-sm font-gtwalp flex items-center justify-center text-center whitespace-pre-line'}>
                                                            {data?.pedigree?.pedigree_json[0]?.children[0]?.children[1]?.label}
                                                        </div>}


                                                </div>

                                                <div className={'flex flex-col'}>
                                                    {data?.pedigree?.pedigree_json[0]?.children[1]?.label && <div
                                                        className={'pedigree-box-2 text-white text-sm font-gtwalp flex items-center justify-center text-center whitespace-pre-line'}>
                                                        {data?.pedigree?.pedigree_json[0]?.children[1]?.label}
                                                    </div>}

                                                    {data?.pedigree?.pedigree_json[0]?.children[1]?.children[0]?.label &&
                                                        <div
                                                            className={'pedigree-box-2 mt-[2.13rem] text-white text-sm font-gtwalp flex items-center justify-center text-center whitespace-pre-line'}>
                                                            {data?.pedigree?.pedigree_json[0]?.children[1]?.children[0]?.label}
                                                        </div>}

                                                    {data?.pedigree?.pedigree_json[0]?.children[1]?.children[1]?.label &&
                                                        <div
                                                            className={'pedigree-box-2 mt-3 text-white text-sm font-gtwalp flex items-center justify-center text-center whitespace-pre-line'}>
                                                            {data?.pedigree?.pedigree_json[0]?.children[1]?.children[1]?.label}
                                                        </div>}

                                                </div>

                                                <div className={'flex self-center'}>
                                                    <div className={'flex flex-col'}>
                                                        <div className={'line-1 w-[1.09rem]'} />
                                                        <div className={'line-1 w-[1.09rem] mt-[4.81rem]'} />
                                                        <div className={'line-1 w-[1.09rem] mt-auto'} />
                                                    </div>
                                                    <div className={'line-2 h-[8.34rem]'} />
                                                </div>
                                            </div>


                                        </div>
                                    </>
                                    :
                                    <Empty className={'text-white'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            }
                        </div>

                        <div className={'flex flex-col pt-[5rem] -mt-[5rem] px-5 relative'} id={'event'}>
                            <p className={'text-white text-base font-gtwalp font-black mt-[3.75rem]'}>Events
                                History</p>
                            {data?.events?.length > 0 ?
                                <>
                                    <div style={{ height: `${data?.events?.length * 5.4}rem` }}
                                        className={'line-v mt-[1.31rem] ml-[4.81rem]'}></div>
                                    <div className={'absolute mt-[9rem] space-y-[1.88rem]'}>
                                        {data?.events?.map((item, index_) => {
                                            // console.log(item)
                                            return (
                                                <div className={'flex z-10'} key={index_}>
                                                    <div
                                                        className={'flex flex-col text-white text-opacity-60 text-sm leading-6 text-right'}>
                                                        <p>{item?.begin_time.split(" ")[0]}</p>
                                                        <p>{item?.begin_time.split(" ")[1]}</p>
                                                    </div>
                                                    <img src={rectangleImg}
                                                        className={'w-[0.63rem] h-[0.63rem] ml-[0.94rem] mt-[0.4rem] mr-8'} />
                                                    <div className={'w-[15rem] text-white text-sm w-[9.94rem]'}>
                                                        {item?.title}
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </> :
                                <div className={'w-full'}>
                                    <Empty className={'text-white'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </div>

                            }


                        </div>

                        <div className={' pt-[5rem] -mt-[5rem] pl-5'} id={'racing'}>
                            <p className={'text-white text-base font-gtwalp font-black mt-[3.12rem]'}>Racing
                                History</p>
                            <div className={'mt-5 overflow-x-auto'}>
                                {/*<Table className={''} tableClassName={''} headers={headers} itemClass={'text-base font-gtwalp'}*/}
                                {/*       data={data?.racing} border={true}/>*/}
                                <Table
                                    className="mg-table"
                                    columns={headers}
                                    dataSource={data?.racing?.map((e, key) => {
                                        e.key = key;
                                        return e;
                                    })}
                                    pagination={false}
                                />
                            </div>
                        </div>


                        <div className={' pt-[5rem] -mt-[5rem] px-5'} id={'achieve'}>
                            <p className={'text-white text-base font-gtwalp font-black mt-[3.75rem]'}>Achievements</p>
                            {data?.achievements?.length > 0 ? <div className={'flex mt-[1.18rem] grid grid-cols-2'}>
                                {
                                    data?.achievements?.map((item, index_) => {
                                        return (
                                            <div className={'flex flex-col items-center'} key={index_}>
                                                <img src={item?.icon_url}
                                                    className={'w-[5.38rem] h-[6.25rem] object-cover'} />
                                                <p className={'mt-[0.88rem] text-white text-sm leading-4'}>{item?.title}</p>
                                                <p className={'text-[#FFA033] text-sm leading-4'}>{item?.sub_title}</p>
                                            </div>
                                        )
                                    })

                                }
                            </div> : <div className={'w-full'}>
                                <Empty className={'text-white'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </div>}

                        </div>
                    </div>
                </div>
            </div>

            <div className={'pl-5 flex flex-col mb-[7.5rem] pt-[5rem] -mt-[5rem]'} id={'pedia'}>
                <p className={'text-white text-base font-gtwalp font-black mt-5'}>Pedia</p>
                <div className={'flex justify-between mt-5'}>
                    {data?.pedia?.length > 0 ? <Swiper
                        slidesPerView={1.3}
                        spaceBetween={10}
                        // setWrapperSize={true}
                        // direction={'vertical'}
                        enabled={data?.pedia?.length > 1}
                    >
                        {

                            data?.pedia?.map((item, index_) => {
                                return (
                                    <SwiperSlide key={index_}>
                                        <Card item={item} />
                                    </SwiperSlide>
                                )
                            })

                        }
                    </Swiper> : <div className={'w-full pr-5'}>
                        <Empty className={'text-white'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>}


                </div>
            </div>

            <Footer absolute={false} />
        </Styled>
    )

}
const Styled = styled.div`
  .reference {
    border-collapse: collapse;

    font-weight: normal;
    width: 62.63rem;
    text-align: center;
    font-size: 0.88rem;

    th, td {
      border: 0.06rem solid #57468F;
      color: #FFFFFF;
    }

    td {
      background-color: #37276E;
    }

    th {
      background-color: #473586;
      color: #FFFFFF;
    }
  }

  .line-b {
    width: 2.44rem;
    height: 0.13rem;
    background: #FFFFFF;
    border-radius: 0rem 0rem 0rem 0rem;
    opacity: 1;
  }

  .divider {
    height: 0.06rem;
    opacity: 0.1;
    background: #FFFFFF;
  }

  .pedigree-box-1 {
    width: 12.5rem;
    height: 2.75rem;
    background: #6F19F7;
    border-radius: 0rem 0rem 0rem 0rem;
    opacity: 1;
  }

  .pedigree-box-2 {
    width: 8.56rem;
    height: 2.75rem;
    background: #6F19F7;
    border-radius: 0rem 0rem 0rem 0rem;
    opacity: 1;
  }

  .line-v {
    width: 0rem;
    opacity: 1;
    border: 0.03rem solid #6F19F7;
  }

  .btn {
    width: 20.94rem;
    height: 3rem;
    background: #B902FD;
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
    opacity: 1;
  }

  .btn-disable {
    width: 20.94rem;
    height: 3rem;
    background: rgba(185, 2, 253, 0.1);
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
    opacity: 1;
  }

  .box {
    width: 3.75rem;
    height: 1.25rem;
    background: #B902FD;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    opacity: 1;
  }

  .score-box {
    width: 5.5rem;
    height: 5.25rem;
    background: #FEC52E;
    border-radius: 1rem 1rem 1rem 1rem;
    opacity: 1;
  }

  .big-box {

    background: #45338B;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .line-b {
    height: 0.13rem;
    background: #FFFFFF;
    opacity: 1;
  }

  .line-1 {
    height: 0.06rem;
    opacity: 1;
    background: #5B44AB;
  }

  .line-2 {
    width: 0.06rem;
    opacity: 1;
    background: #5B44AB;
  }

  .mg-table {
    max-width: initial;
    width: fit-content;
    min-width: 100%;

    .ant-table {
      border: 0.03rem solid rgba(255, 255, 255, 0.2);
      border-radius: 0.63rem;
      color: #fff;
      /* background-color: #17171A; */
      background-color: #45338B73;

      .ant-table-thead > tr > th {
        /* background-color: #17171A; */
        background-color: transparent;
        color: rgba(255, 255, 255, 0.4);
        border: none;
        border-radius: 0.63rem;
        padding: 1.5rem 1.5rem 0.5rem 1rem;
        font-size: 1rem;
      }

      .ant-table-tbody {
        > tr.ant-table-placeholder:hover > td {
          background-color: transparent;
        }

        > tr > td {
          border-bottom: 0.03rem solid rgba(255, 255, 255, 0.2);
          padding-left: 1.5rem;
          padding-top: 2rem;
          padding-bottom: 2rem;
          font-size: 1rem;
        }

        .ant-empty-normal {
          color: #fff;
          opacity: 0.6;
          font-size: 0.75rem;

          .ant-empty-image {
            height: 1.875rem;

            svg {
              width: 3.125rem;
              height: 1.875rem;
            }
          }
        }
      }

      .ant-table-tbody > tr:last-child > td:first-child {
        border-bottom-left-radius: 0.63rem;
      }

      .ant-table-tbody > tr:last-child > td:last-child {
        border-bottom-right-radius: 0.63rem;
      }

      .ant-table-tbody > tr.ant-table-row:hover > td {
        background: transparent;
      }

      .ant-table-cell-row-hover {
        background-color: transparent;
        //background-color: rgba(0,0,0,0.3);
      }

    }
  }
`;
