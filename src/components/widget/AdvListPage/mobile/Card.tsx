import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Image from "@/components/widget/Image";

export default function Card({item}) {
    const navigate = useNavigate();
    return (
        <Styled className={'flex flex-col font-gtwalp cursor-pointer'} onClick={() => {
            if (item?.href?.includes('http')) {
                window.open(item?.href);
            } else {
                navigate(item?.href);
            }
        }
        }>
            <Image src={item?.res_url} className={'w-full h-[13.98rem] object-cover rounded-t'}/>
            <div className={'ml-[0.81rem] flex flex-col mt-[0.88rem] pr-[1.88rem]'}>
                <p className={'text-white text-[1.25rem] font-semibold line-clamp-2 leading-[1.46rem]'}>{item.title}</p>
                <p className={'text-white text-opacity-60 text-sm mt-[0.38rem]'}>{item.create_time}</p>
                <p className={'text-white text-sm line-clamp-3 mt-2'}>{item.content}</p>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  width: 20.94rem;
  height: 22.88rem;
  background: rgba(69,51,139,0.45);
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;
`;
