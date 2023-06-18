import styled from "styled-components";
import Image from "@/components/widget/Image";
import {useState} from "react";
import {useMount} from "ahooks";
import { useNavigate } from "react-router-dom";

const Type=({type})=>{
    const [name,setName]=useState('Others');
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
export default function Card({item}) {
    const navigate = useNavigate();
    return (
        <Styled className={'flex items-center py-[1.88rem] cursor-pointer'} onClick={()=>{
            navigate(`/horse_pedia/${item.id}`)
        }}>
            <Image src={item?.img_url}
                   className={'object-cover object-center h-[11rem] w-[16.5rem] ml-6 rounded flex-shrink-0'}/>
            <div className={'flex flex-col ml-[1.88rem] w-full h-full'}>
                <p className={'w-[27.25rem] text-white text-[1.5rem] font-msrb leading-6'}>
                    {item?.title}
                </p>
                <p className={'mt-4 text-white text-opacity-60 text-sm w-[39.13rem]'}>
                    {item?.sub_title}
                </p>
                <div className={'flex mt-auto mb-2 space-x-[0.75rem]'}>
                    <Type type={item?.pedia_type}/>
                    <div className={'box flex items-center justify-center px-2 text-[0.75rem]'}>
                        <span className={'text-white text-opacity-60'}>Visits: <span className={'text-white'}>{item?.page_views}</span></span>

                    </div>
                    <div className={'box flex items-center justify-center px-2 text-[0.75rem]'}>
                        <span className={'text-white text-opacity-60'}>Source: <span className={'text-white'}>{item?.source}</span></span>
                    </div>
                    <div className={'text-[0.75rem] text-white text-opacity-60'}>
                        {item.update_time}
                    </div>
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`

  height: 14.75rem;
  background: rgba(69, 51, 139, 0.45);
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
