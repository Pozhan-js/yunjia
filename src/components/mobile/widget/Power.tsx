import powerImg from "@/assets/images/HomePage/HotSales/Frame@2x.png";
import styled from "styled-components";

interface params {
    item: any,
    className?: string
}

export default function Power({item, className = ''}: params) {
    // console.log(item);
    return (
        <Styled className={className}>
            <div className={'relative flex justify-center items-center'}>
                <img src={powerImg} className={'object-cover w-[1.25rem] h-[1.25rem] mt-[0.15rem]'}/>
                <div
                    className={'ml-2 text-white text-base font-ktp text-light'}>{item?.power > 0 ? item?.power : '??'}</div>
            </div>
        </Styled>

    )
}

const Styled = styled.div`
  .text-light {
    text-shadow: 0 0 5px rgba(34, 110, 225, 0.7), 0 0 8px rgba(53, 176, 253, 0.6);
  }
`;
