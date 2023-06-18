import styled from "styled-components";
import Item1 from "@/components/widget/HomePage/RacingMatch/mobile/components/Item1";

export default function RacingMatch_({list,showTitle=true}){
    return (
        <Styled className={'py-[1.12rem] px-5 w-full'}>
            <p className={'text-white text-base font-semibold'} hidden={!showTitle}>Recent Match</p>
            {list.map((item,index)=>{
                return (
                    <Item1 item={item} key={index} showBottomLine={list.length - 1 !== index}/>
                )
            })}
        </Styled>
    )
}
const Styled=styled.div`
  //height: 41.25rem;
  background: #35246F;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;
  .line-b {
    height: 0.06rem;
    opacity: 0.1;
    background-color: #FFFFFF;
  }
`;
