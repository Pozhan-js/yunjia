import styled from "styled-components";
import Advertisement from "@/components/widget/HomePage/HotSales/Advertisement";
import rightArrowImg from '@/assets/images/HomePage/HotSales/right_arrow.png';
import {useNavigate} from "react-router-dom";

export default function HotSalesRight({list}) {
    const navigate = useNavigate();
    return (
        <HotSellRightStyled
            className="flex flex-col backdrop-blur-[5rem] overflow-hidden rounded-[1.25rem] px-[0.88rem] pt-[0.88rem]">
            <div className={'flex justify-between'}>
                <p className={'text-white text-[1.38rem]'}>News</p>
                <div className={'flex items-center cursor-pointer'} onClick={() => {
                    navigate('/advlist');
                }
                }>
                    <p className={'text-white text-base'}>more</p>
                    <img src={rightArrowImg} className={'w-4 h-4'}/>
                </div>
            </div>
            <div className={'flex flex-col -mt-[0.5rem]'}>
                {list?.slice(0, 3).map((item, index) => {
                    return (<Advertisement item={item} index={index} key={index}/>);
                })}
            </div>
        </HotSellRightStyled>
    );
}
const HotSellRightStyled = styled.div`
  width: 24.94rem;
  height: 29.81rem;
`;
