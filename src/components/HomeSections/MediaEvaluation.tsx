import styled from "styled-components";
import themeSetting from "@/config/themeSetting";
import React, {useState} from "react";
import titleBgImg from "@/assets/images/title_bg.png";
import {getMediaEvaluations} from "@/services/v1/home";
import {useRequest} from "ahooks";
import leftImg from '@/assets/images/HomePage/MediaEvaluation/left.png';
import rightImg from '@/assets/images/HomePage/MediaEvaluation/right.png';

const Card = ({item}) => {
    const [enter, setEnter] = useState(false);
    return (
        <CardStyled>
            <div className={`${enter ? 'box-2' : 'box'} cursor-pointer px-8 flex flex-col items-center justify-center h-full`}
                 onClick={() => {
                     window.open(item.external_href);
                 }} onMouseEnter={() => {
                setEnter(true);
            }
            } onMouseLeave={() => {
                setEnter(false);
            }
            }>
                <div className={'flex flex-col h-full justify-center'}>
                    <img src={leftImg} className={'w-[1.25rem] h-[1.03rem] mr-auto'}/>
                    <p className={'text-white text-base font-gtwalp text-center ml-6 w-[16.81rem]'}>{item.sub_title}</p>
                    <img src={rightImg} className={'w-[1.25rem] h-[1.03rem] ml-auto'}/>
                </div>
                <img src={item.img} className={'relative bottom-[1.88rem] w-[8rem] object-cover'}/>
            </div>
        </CardStyled>
    )
}
const CardStyled = styled.div`
  .box {
    width: 23.69rem;
    height: 18rem;
    background: #35246F;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .box-2 {
    width: 23.69rem;
    height: 18rem;
    background: linear-gradient(180deg, #402D80 0%, #4D2B85 100%);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }
`;
export default function MediaEvaluation() {
    const [list, setList] = useState([]);
    useRequest(getMediaEvaluations, {
        onSuccess: (tdata) => {
            setList(tdata?.data);
        }
    })
    return (
        <Styled style={{backgroundColor: themeSetting.bgColor}}
                className={'z-10 flex flex-col items-center w-full px-9 sm:px-6 md:px-32 pb-[7.5rem]'}>
            <div className="flex text-[3.03rem] leading-[3.54rem] font-gtwalbpo text-white mt-[7.5rem]">
                <span>Media <span className={'bg-gradient-title-2'}>Evaluation</span></span>
            </div>
            <img src={titleBgImg} className={'w-[23rem] bg-cover bg-center'}/>
            <div className={'mt-[4.38rem] grid grid-cols-3 gap-6'}>
                {list?.map((item, index) => {
                    return (
                        <Card key={index} item={item}/>
                    )
                })}
            </div>
        </Styled>
    )
}
const Styled = styled.div``;
