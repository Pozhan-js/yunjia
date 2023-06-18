import styled from "styled-components";
import React, {useState} from "react";
import {useMount} from "ahooks";
import {useNavigate} from "react-router-dom";

const Type = ({type}) => {
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
        <div className={'tbox flex items-center justify-center px-2 text-white text-[0.75rem] font-gtwalmp'}>
            {name}
        </div>
    )
}
export default function Card({item}) {
    const navigate = useNavigate();
    return (
        <Styled className={'overflow-hidden cursor-pointer'} onClick={() => {
            navigate(`/horse_pedia/${item.id}`)
        }
        }>
            <img src={item.img_url} className={'rounded-t-[0.63rem] object-cover w-full h-[10.5rem]'}/>
            <div className={'px-4 flex flex-col pt-[0.75rem]'}>
                <p className={'text-white text-base w-[15.38rem] whitespace-pre-line'}>{item.sub_title}</p>
                <div className={'flex mt-[0.75rem]'}>
                    <Type type={item?.pedia_type}/>
                    <div className={'tbox flex items-center justify-center px-2 text-[0.75rem] ml-3'}>
                                <span className={'text-white'}>Visits: <span
                                    className={'text-white'}>{item.page_views}</span></span>

                    </div>
                    <p className={'ml-auto text-sm text-white text-opacity-60'}>{item.update_time}</p>
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  height: 17.13rem;
  background: #372770;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;

  .tbox {
    height: 1.25rem;
    background: #5641A5;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    opacity: 1;
  }
`;
