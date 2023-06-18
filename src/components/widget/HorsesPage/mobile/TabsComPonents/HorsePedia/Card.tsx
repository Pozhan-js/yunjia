import styled from "styled-components";
import Image from "@/components/widget/Image";
import { useState } from "react";
import { useMount } from "ahooks";
import { useNavigate } from "react-router-dom";

const Type = ({ type }) => {
    const [name, setName] = useState('Others');
    useMount(() => {
        switch (type) {
            case 0:
                setName('Others');
                break;
            case 1:
                setName('Buy');
                break;
            case 2:
                setName('Skil');
                break;
            case 3:
                setName('Racing');
                break;
            case 4:
                setName('Breading');
                break;
        }
    })
    return (
        <div className={'box flex items-center justify-center px-2 text-white text-[0.75rem] font-gtwalmp'}>
            {name}
        </div>
    )
}
export default function Card({ item }) {
    const navigate = useNavigate();
    return (
        <Styled className={'flex flex-col'} onClick={() => {
            navigate(`/horse_pedia/${item.id}`)
        }}>
            <Image src={item?.img_url}
                className={'object-cover object-center h-[13.94rem] w-full rounded flex-shrink-0'} />
            <div className={'flex flex-col w-full px-3 py-5'}>
                <p className={'text-white text-[1.25rem] font-msrb'}>
                    {item?.title}
                </p>
                <p className={'mt-2 text-white text-opacity-60 text-sm'}>
                    {item?.sub_title}
                </p>
                <div className={'text-[0.75rem] text-white text-opacity-60 mt-3'}>
                    {item.update_time}
                </div>
                <div className={'flex mb-2 space-x-[0.75rem] mt-3'}>
                    <Type type={item?.pedia_type} />
                    <div className={'box flex items-center justify-center px-2 text-[0.75rem]'}>
                        <span className={'text-white text-opacity-60'}>Visits: <span className={'text-white'}>{item?.page_views}</span></span>

                    </div>
                    <div className={'box flex items-center justify-center px-2 text-[0.75rem]'}>
                        <span className={'text-white text-opacity-60'}>Source: <span className={'text-white'}>{item?.source}</span></span>
                    </div>
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  background: #45338B;
  box-shadow: 0rem 0.25rem 2.5rem 0rem #27185B;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;
  .box{
    height: 1.25rem;
    background: #5641A5;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    opacity: 1;
  }
  .card {
    height: 3.13rem;
    background: #3F2D83;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    opacity: 1;
  }
`;
