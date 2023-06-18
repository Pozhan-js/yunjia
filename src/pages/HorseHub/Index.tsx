import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom";
import topBg from '@/assets/images/HorseHubPage/topBg.png';
import circleImg from '@/assets/images/HorseHubPage/circle.png';
// import Rating from "@/components/widget/HorseHubPage/Rating";
import themeSetting from "@/config/themeSetting";
import Footer from "@/components/widget/Footer/Footer";
import React, { useState } from "react";
import Card from "@/components/widget/HorseHubPage/Card";
import rightArrowImg from '@/assets/images/HorseHubPage/right_arrow.png';
import rectangleImg from '@/assets/images/HorseHubPage/Rectangle.png';
import PreviewModal from "@/components/widget/ClubsDetailPage/PreviewModal";
import { getHorseHubDetail } from "@/services/v1/horseHub";
import { useRequest } from "ahooks";
import Status from "@/components/widget/HorsesPage/TabsComponents/HorseHub/Status";
import { Empty, Table } from "antd";
import NoticeBar from "@/components/widget/NoticeBar";
import { useSelector } from "react-redux";


const nav = [
    {
        label: 'Info',
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
        dataIndex: 'Date'
    },
    {
        title: 'Racing',
        dataIndex: 'title'
    },
    {
        title: 'Location',
        dataIndex: 'Location'
    },
    {
        title: 'Distance',
        dataIndex: 'Distance'
    },
    {
        title: 'Placed',
        dataIndex: 'placed'
    }, {
        title: 'Prize',
        dataIndex: 'Prize'
    },
]
export default function Index() {
    const { id } = useParams();
    const [data, setData] = useState<any>({});
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    // const header_top = useSelector((state: any) => state.HEADER_TOP);
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
                className={'relative h-[25.38rem] w-full flex flex-col items-center justify-center bg-cover'}>
                <div className={'mt-10'}>
                    <div className={'flex h-[12.13rem] mt-5 w-[68.75rem]'}>
                        <img src={data?.detail?.img_url} className={'w-[17.87rem] h-[12.13rem] rounded object-cover'} />
                        <div className={'ml-8 flex flex-col h-full justify-center'}>
                            <div className={'flex items-center'}>
                                <p className={'text-[1.5rem] text-white font-msrb leading-6'}>{data?.detail?.name}</p>
                                <Status status={data?.detail?.health_status} className={'ml-2'} />
                            </div>
                            <p className={'text-white text-opacity-60 text-base mt-[0.63rem]'}>{data?.detail?.location}</p>
                            <p className={'text-white text-opacity-60 text-sm mt-[0.88rem]'}>{data?.detail?.date_of_birth}</p>
                            <button disabled={data?.detail?.club_status == 6}
                                className={`${data?.detail?.club_status == 6 ? 'btn-disable' : 'btn'} text-white text-[1.13rem] font-gtwalb mt-[0.88rem]`}
                                onClick={() => {
                                    navigate(`/clubs/${data?.detail?.clubid}`)
                                }
                                }>Join Club
                            </button>
                        </div>
                        <div className={'ml-auto score-box flex flex-col items-center justify-center'}>
                            <p className={'text-sm text-[#C05C00] font-gtwalpm font-medium'}>SCORE</p>
                            <p className={'text-[2.25rem] font-ggm leading-[2.25rem] font-medium text-black'}>{data?.detail?.power}</p>
                        </div>
                    </div>
                    <p className={'mt-4 text-white text-sm w-[61.38rem]'}>{data?.detail?.info} </p>
                </div>
            </div>

            <div className={'w-[68.75rem] mx-auto'}>
                <div
                    className={'flex mt-[1.88rem] space-x-[2.13rem] text-base text-white text-opacity-60 z-10 relative'}>
                    {nav.map((item, index_) => {
                        return (
                            <div key={index_} className={'cursor-pointer flex flex-col'} onClick={() => {
                                setIndex(index_);
                                scrollToAnchor(item.id)
                            }}>
                                <p className={`${index == index_ ? 'text-white' : ''}`}>{item.label}</p>
                                {index_ == index && <div className={'line-b mt-[0.63rem]'} />}
                            </div>
                        )
                    })}
                </div>
                <div className={'big-box self-center relative py-[1.88rem] px-[2.5rem] mt-2'}>
                    <div>
                        <div className={'flex flex-col pt-[5rem] -mt-[5rem]'} id={'info'}>
                            {/*<p className={'text-white text-base'}>Info</p>*/}
                            {/*<p className={'mt-4 text-white text-base'}>{data?.detail?.info} </p>*/}
                            <div className={'flex flex-col'}>
                                <p className={'text-white text-base'}>Profile</p>
                                <div className={'flex mt-3'}>
                                    <div className={'flex flex-col w-1/4'}>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2'}>Age
                                            (DOB)</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>Sex</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>Color</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>Rating</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>Trainer</p>
                                    </div>
                                    <div className={'flex flex-col w-2/5'}>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2'}>{data?.profile?.age} &nbsp;</p>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>{data?.profile?.sex} &nbsp;</p>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>{data?.profile?.color} &nbsp;</p>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>{data?.profile?.rating} &nbsp;</p>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>{data?.profile?.trainer} &nbsp;</p>
                                    </div>
                                    <div className={'flex flex-col w-1/4'}>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2'}>Current
                                            Location</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>Birth
                                            of Country</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>Passport
                                            ID</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>Issue
                                            By</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem] mt-auto'}></p>
                                    </div>
                                    <div className={'flex flex-col w-1/4'}>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2'}>{data?.profile?.location} &nbsp;</p>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>{data?.profile?.country} &nbsp;</p>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>{data?.profile?.passportid} &nbsp;</p>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>{data?.profile?.issue} &nbsp;</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem] mt-auto'}></p>
                                    </div>
                                </div>
                                <p className={'text-white text-base mt-[1.19rem]'}>Sire</p>
                                <div className={'flex mt-3'}>
                                    <div className={'flex flex-col w-1/4'}>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2'}>Breeder</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>Dam</p>

                                    </div>
                                    <div className={'flex flex-col w-2/5'}>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2'}>{data?.sire?.breeder} &nbsp;</p>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>{data?.sire?.dam} &nbsp;</p>

                                    </div>
                                    <div className={'flex flex-col w-1/4'}>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2'}>Sire</p>
                                        <p className={'text-white text-opacity-60 text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>Dam's
                                            Sire</p>

                                    </div>
                                    <div className={'flex flex-col w-1/4'}>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2'}>{data?.sire?.sire} &nbsp;</p>
                                        <p className={'text-white text-sm border-dotted border-white border-b-2 border-opacity-40 pb-2 py-[0.63rem]'}>{data?.sire?.damsire} &nbsp;</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={' pt-[5rem] -mt-[5rem]'} id={'media'}>
                            <div className={'flex justify-between mt-[3.12rem]'}>
                                <p className={'text-white text-base font-gtwalb'}>Media</p>
                                <span className={'text-white text-base font-gtwalmp flex items-center cursor-pointer'}
                                    onClick={() => {
                                        navigate(`/medialist/${data?.detail.clubid}`)
                                    }
                                    }>more<img
                                        src={rightArrowImg}
                                        className={'w-4 h-4 ml-[0.19rem]'} /></span>
                            </div>
                            <div className={'grid grid-cols-5 gap-y-4 mt-2 '}>
                                {data?.media &&
                                    <PreviewModal list={data?.media} preViewClass={'w-[12.22rem] h-[9.18rem] flex justify-center bg-black '} />}
                            </div>
                        </div>

                        <div className={'mt-[3.12rem]'}>
                            <p className={'text-white text-base font-gtwalb'}>Pedigree</p>

                            {
                                data?.pedigree?.pedigree_json && data?.pedigree?.pedigree_json.length > 0 ?
                                    <>
                                        <p className={'mt-[1.25rem] text-white text-sm'}>{data?.pedigree?.content}</p>
                                        <div className={'mt-[3.44rem] flex items-center h-[14.13rem]'}>
                                            {data?.pedigree?.pedigree_json[0]?.label && <div className={'pedigree-box'}>
                                                {data?.pedigree?.pedigree_json[0]?.label}
                                            </div>}
                                            <div className={'flex items-center mx-[0.69rem]'}>
                                                <div className={'line-1 w-[1.25rem]'} />
                                                <div className={'h-[7.97rem] flex'}>
                                                    <div className={'line-2 h-full'} />
                                                    <div className={'flex flex-col justify-between'}>
                                                        <div className={'line-1 w-[1.19rem]'} />
                                                        <div className={'line-1 w-[1.19rem]'} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={'flex flex-col space-y-[1.88rem]'}>
                                                <div className={'flex items-center'}>
                                                    {data?.pedigree?.pedigree_json[0]?.children[0]?.label &&
                                                        <div className={'pedigree-box'}>
                                                            {data?.pedigree?.pedigree_json[0]?.children[0]?.label}
                                                        </div>}
                                                    <div className={'flex items-center mx-[0.69rem]'}>
                                                        <div className={'line-1 w-[1.25rem]'} />
                                                        <div className={'h-[3.25rem] flex'}>
                                                            <div className={'line-2 h-full'} />
                                                            <div className={'flex flex-col justify-between'}>
                                                                <div className={'line-1 w-[1.19rem]'} />
                                                                <div className={'line-1 w-[1.19rem]'} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={'flex flex-col space-y-[0.62rem]'}>
                                                        {data?.pedigree?.pedigree_json[0]?.children[0]?.children[0]?.label &&
                                                            <div className={'pedigree-box2'}>
                                                                {data?.pedigree?.pedigree_json[0]?.children[0]?.children[0]?.label}
                                                            </div>}

                                                        {data?.pedigree?.pedigree_json[0]?.children[0]?.children[1]?.label &&
                                                            <div className={'pedigree-box2'}>
                                                                {data?.pedigree?.pedigree_json[0]?.children[0]?.children[1]?.label}
                                                            </div>}
                                                    </div>
                                                </div>

                                                <div className={'flex items-center'}>
                                                    {data?.pedigree?.pedigree_json[0]?.children[1]?.label &&
                                                        <div className={'pedigree-box'}>
                                                            {data?.pedigree?.pedigree_json[0]?.children[1]?.label}
                                                        </div>}
                                                    <div className={'flex items-center mx-[0.69rem]'}>
                                                        <div className={'line-1 w-[1.25rem]'} />
                                                        <div className={'h-[3.25rem] flex'}>
                                                            <div className={'line-2 h-full'} />
                                                            <div className={'flex flex-col justify-between'}>
                                                                <div className={'line-1 w-[1.19rem]'} />
                                                                <div className={'line-1 w-[1.19rem]'} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={'flex flex-col space-y-[0.62rem]'}>
                                                        {data?.pedigree?.pedigree_json[0]?.children[1]?.children[0]?.label &&
                                                            <div className={'pedigree-box2'}>
                                                                {data?.pedigree?.pedigree_json[0]?.children[1]?.children[0]?.label}
                                                            </div>}

                                                        {data?.pedigree?.pedigree_json[0]?.children[1]?.children[1]?.label &&
                                                            <div className={'pedigree-box2'}>
                                                                {data?.pedigree?.pedigree_json[0]?.children[1]?.children[1]?.label}
                                                            </div>}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </> :
                                    <Empty className={'text-white'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            }
                        </div>

                        <div className={'flex flex-col pt-[5rem] -mt-[5rem] '} id={'event'}>
                            <p className={'text-white text-base font-gtwalb mt-[3.12rem]'}>Events History</p>
                            {data?.events?.length > 0 ?
                                <div
                                    className={'mt-5 pb-5 flex space-x-[2rem] relative overflow-x-auto gray-scroll'}>
                                    <div style={{ width: `${data?.events?.length * 12}rem` }}
                                        className={'line-h absolute top-[0.4rem] left-0'}></div>
                                    {
                                        data?.events?.map((item, index) => {
                                            // console.log(item)
                                            return (
                                                <div className={'flex flex-col z-10 w-[10rem]'} key={index}>
                                                    <img src={rectangleImg} className={'w-[0.8rem] h-[0.8rem]'} />
                                                    <div
                                                        className={'flex flex-col mt-[0.7rem] text-white text-opacity-60 text-sm leading-6'}>
                                                        <p>{item?.begin_time.split(" ")[0]}</p>
                                                        <p>{item?.begin_time.split(" ")[1]}</p>
                                                    </div>
                                                    <div className={' text-white text-sm mt-[0.81rem] w-[9.94rem]'}>
                                                        {item?.title}
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                                :
                                <div className={'w-full'}>
                                    <Empty className={'text-white'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </div>}

                        </div>

                        <div className={' pt-[5rem] -mt-[5rem]'} id={'racing'}>
                            <p className={'text-white text-base font-gtwalb mt-[3.12rem]'}>Racing History</p>
                            <div className={'mt-5'}>
                                {/*<Table className={'rounded border border-[#FFFFFF1A]'} itemClass={'text-base font-gtwalp'}*/}
                                {/*       headers={headers}*/}
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


                        <div className={' pt-[5rem] -mt-[5rem]'} id={'achieve'}>
                            <p className={'text-white text-base font-gtwalb mt-[3.12rem]'}>Achievements</p>
                            <div className={'flex flex-wrap mt-[0.44rem]'}>
                                {data?.achievements?.length > 0 ? data?.achievements?.map((item, index) => {
                                    return (
                                        <div className={'flex flex-col items-center flex-shrink-0 mx-[1.5rem]'}
                                            key={index}>
                                            <img src={item?.icon_url}
                                                className={'w-[5.56rem] h-[6.25rem] object-cover'} />
                                            <p className={'mt-[0.88rem] text-white text-sm leading-4'}>{item?.title}</p>
                                            <p className={'text-[#FFA033] text-sm leading-4'}>{item?.sub_title}</p>
                                        </div>
                                    )
                                }) :
                                    <div className={'w-full'}>
                                        <Empty className={'text-white'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className={' flex flex-col mb-[7.5rem] pt-[5rem] -mt-[5rem] w-[68.75rem] mx-auto'} id={'pedia'}>
                <div className={'flex justify-between mt-10'}>
                    <p className={'text-white text-base font-gtwalb'}>Pedia</p>
                    <span className={'text-white text-base font-gtwalmp flex items-center cursor-pointer'}
                        onClick={() => {
                            navigate('/pedia');
                        }}>more<img src={rightArrowImg}
                            className={'w-4 h-4 ml-[0.19rem]'}
                            alt={''} /></span>
                </div>

                <div className={'flex space-x-6 mt-5'}>
                    {
                        data?.pedia?.length > 0 ?
                            data?.pedia?.map((item, index) => {
                                return (
                                    <Card item={item} key={index} />
                                )
                            }) :
                            <div className={'w-full'}>
                                <Empty className={'text-white'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </div>
                    }

                </div>
            </div>

            <Footer absolute={false} />
        </Styled>
    )

}
const Styled = styled.div`
  .gray-scroll {
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      //width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 10px;
    }

    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #57468F;
    }

    ::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      //box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      //background: #ededed;
    }
  }

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

    th {
      background-color: #473586;
      color: #FFFFFF;
    }
  }

  .pedigree-box {
    width: 12.5rem;
    height: 2.75rem;
    background: #6F19F7;
    border-radius: 0rem 0rem 0rem 0rem;
    color: #FFFFFF;
    font-size: 0.88rem;
    font-family: GTWalsheimProRegular, serif;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
  }

  .pedigree-box2 {
    width: 13rem;
    height: 2.75rem;
    background: #6F19F7;
    border-radius: 0rem 0rem 0rem 0rem;
    color: #FFFFFF;
    font-size: 0.88rem;
    font-family: GTWalsheimProRegular, serif;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
  }

  .line-h {
    //width: 53.5rem;
    height: 0.03rem;
    opacity: 1;
    background-color: #6F19F7;
  }

  .btn {
    width: 9.75rem;
    height: 2.75rem;
    background: #B902FD;
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
    opacity: 1;
  }

  .btn-disable {
    width: 9.75rem;
    height: 2.75rem;
    background: rgba(185, 2, 253, 0.2);
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
    opacity: 1;
  }

  .score-box {
    width: 5.5rem;
    height: 5.25rem;
    background: #FEC52E;
    border-radius: 1rem 1rem 1rem 1rem;
    opacity: 1;
  }

  .box {
    width: 3.75rem;
    height: 1.25rem;
    background: #B902FD;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    opacity: 1;
  }

  .box-2 {
    width: 10.19rem;
    height: 4.63rem;
    border-radius: 0.63rem;
    background: #693AF0;
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
    .ant-table {
      border: 0.03rem solid rgba(255, 255, 255, 0.2);
      color: #fff;
      background-color: transparent;
      border-radius: 0.63rem;


      .ant-table-thead > tr > th {
        background-color: #45338B73;
        color: rgba(255, 255, 255, 0.4);
        border: none;
        //border-radius: 0.63rem;
        padding-left: 1.5rem;
        padding-top: 1.5rem;

        font-size: 0.88rem;
      }

      .ant-table-tbody {
        background-color: #45338B73;

        > tr.ant-table-placeholder:hover > td {
          background-color: transparent;
        }

        > tr > td {
          border-bottom: 0.03rem solid rgba(255, 255, 255, 0.2);
          padding-left: 1.5rem;
          padding-top: 2rem;
          padding-bottom: 2rem;
          font-size: 0.88rem;
        }

        .ant-empty-description {
          color: #fff;
        }
      }

      .ant-table-tbody > tr:last-child > td:first-child {
        border-bottom-left-radius: 0.63rem;
      }

      .ant-table-tbody > tr:last-child > td:last-child {
        border-bottom-right-radius: 0.63rem;
      }

      .ant-table-cell-row-hover {
        background-color: transparent;
        //background-color: rgba(0,0,0,0.3);
      }

    }
  }
`;
