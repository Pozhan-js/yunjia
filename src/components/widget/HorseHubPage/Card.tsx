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
            <img src={item.img_url} className={'rounded-t-[0.63rem] object-cover w-full h-[9.28rem]'}/>
            <div className={'pl-4 pr-2 flex flex-col pt-[0.63rem]'}>
                <p className={'text-white text-base w-[15.38rem] whitespace-pre-line leading-[1.33rem]'}>{item.sub_title}</p>
                <div className={'flex mt-[0.63rem]'}>
                    <Type type={item?.pedia_type}/>
                    <div className={'tbox flex items-center justify-center px-2 text-[0.67rem] ml-[0.6rem]'}>
                                <span className={'text-white text-opacity-60'}>Visits: <span
                                    className={'text-white'}>{item.page_views}</span></span>

                    </div>
                    <p className={'ml-auto text-[0.78rem] text-white text-opacity-60'}>{item.update_time}</p>
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  width: 16.19rem;
  height: 15.14rem;
  background: #372770;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;

  .tbox {
    height: 1.11rem;
    background: #5641A5;
    border-radius: 0.22rem 0.22rem 0.22rem 0.22rem;
    opacity: 1;
  }
`;
