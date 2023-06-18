import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Image from "@/components/widget/Image";

export default function Card({item}) {
    const navigate = useNavigate();
    return (
        <Styled className={'flex p-3 font-gtwalp cursor-pointer'} onClick={() => {
            if (item?.href?.includes('http')) {
                window.open(item?.href);
            } else {
                navigate(item?.href);
            }
        }
        }>
            <Image src={item?.res_url} className={'w-[14rem] h-[9.5rem] object-cover rounded'}/>
            <div className={'ml-4 flex flex-col mt-[0.38rem] pr-[1.88rem]'}>
                <p className={'text-white text-[1.13rem] font-semibold'}>{item.title}</p>
                <p className={'text-white text-opacity-60 text-sm mt-2'}>{item.create_time}</p>
                <p className={'text-white text-sm line-clamp-2'}>{item.content}</p>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  width: 68.75rem;
  height: 11rem;
  background: #372770;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;
`;
