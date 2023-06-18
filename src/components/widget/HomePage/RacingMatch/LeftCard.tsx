import styled from "styled-components";
import {useState} from "react";
import {useMount} from "ahooks";
import utils from "@/utils/utils";
import LeftItem from "@/components/widget/HomePage/RacingMatch/components/LeftItem";


export default function LeftCard({list, height = '28.69rem',showTitle=true}) {
    // console.log(list);
    return (
        <div className={'px-5'}>
            <Styled className={'px-[1.88rem] py-[1.13rem] font-gtwalp'} style={{height: height}}>
                <p className={'text-white text-base'} hidden={!showTitle}>
                   Recent Match
                </p>
                <div className={''}>
                    {list.map((item, index) => {
                        return (
                            <LeftItem key={index} item={item} showBottomLine={list.length - 1 !== index}/>
                        )
                    })}

                </div>

            </Styled>
        </div>
    )
}
const Styled = styled.div`
  width: 40rem;
  background: #35246F;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;

  .line-b {
    height: 0.06rem;
    opacity: 0.1;
    background-color: #FFFFFF;
  }
`;
