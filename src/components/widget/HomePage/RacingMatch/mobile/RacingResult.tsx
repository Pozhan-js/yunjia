import Item1 from "@/components/widget/HomePage/RacingMatch/mobile/components/Item1";
import styled from "styled-components";
import Item2 from "@/components/widget/HomePage/RacingMatch/mobile/components/Item2";

export default function RacingResult({list,showTitle=true}) {
    return (
        <Styled className={'py-[1.12rem] px-5 w-full mt-5'}>
            <p className={'text-white text-base font-semibold'} hidden={!showTitle}>Racing Result</p>
            {list.map((item,index)=>{
                return (
                    <Item2 item={item} key={index} showBottomLine={list.length - 1 !== index}/>
                )
            })}
        </Styled>
    )
}
const Styled=styled.div`
  background: #35246F;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;

  .box {
    height: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem 1rem 1rem 1rem;
    opacity: 1;
  }
  .line-b {
    height: 0.06rem;
    opacity: 0.1;
    background-color: #FFFFFF;
  }
`;
