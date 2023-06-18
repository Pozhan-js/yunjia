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
            <div className={`${enter ? 'box-2' : 'box'} cursor-pointer px-8 flex flex-col items-center justify-center`}
                 onClick={() => {
                     window.open(item.external_href);
                 }} onMouseEnter={() => {
                setEnter(true);
            }
            } onMouseLeave={() => {
                setEnter(false);
            }
            }>
                <div className={'flex flex-col justify-center h-full'}>
                    <img src={leftImg} className={'w-[1.25rem] h-[1.03rem] mr-auto'}/>
                    <p className={'text-white text-base font-gtwalp text-center ml-6'}>{item.sub_title}</p>
                    <img src={rightImg} className={'w-[1.25rem] h-[1.03rem] ml-auto'}/>
                </div>
                <img src={item.img} className={'w-[8rem] object-cover relative bottom-[1.88rem]'}/>
            </div>
        </CardStyled>
    )
}
const CardStyled = styled.div`
  .box {
    width: 20.94rem;
    height: 17.38rem;
    background: #35246F;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }

  .box-2 {
    width: 20.94rem;
    height: 17.38rem;
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
                className={'z-10 flex flex-col items-center w-full px-9 sm:px-6 md:px-32 pb-[4.38rem]'}>
            <div className="flex text-[1.75rem] leading-[3.54rem] font-gtwalbpo text-white">
                <span>Media <span className={'bg-gradient-title-2'}>Evaluation</span></span>
            </div>
            <img src={titleBgImg} className={'w-[13.62rem] bg-cover bg-center'}/>
            <div className={'mt-[1.88rem] flex flex-col space-y-[0.75rem]'}>
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
