import styled from "styled-components";
import Status from "@/components/widget/HorsesPage/TabsComponents/HorseHub/Status";
import Image from "@/components/widget/Image";
import {useNavigate} from "react-router-dom";

export default function Card2({item}) {
    const navigate = useNavigate();
    return (
        <Styled className={'flex items-center py-[1.88rem]'} onClick={() => {
            navigate(`/horse_hub/${item.id}`)
        }}>
            <Image src={item.img_url}
                   className={'object-cover object-center h-[11rem] w-[17rem] ml-8 rounded flex-shrink-0'}/>
            <div className={'flex flex-col ml-[1.13rem] mr-[1.88rem] w-full h-full'}>
                <div className={'flex justify-between pt-[0.63rem]'}>
                    <div className={'flex flex-col'}>
                        <p className={'text-white font-msrb text-[1.13rem] leading-6'}>{item.name}</p>
                        <p className={'font-gtwalp text-sm text-white text-opacity-60 mt-[0.88rem]'}>{item.issue}</p>
                    </div>
                    <div className={'flex flex-col font-gtwalp text-sm text-white text-opacity-60'}>
                        <p>last update</p>
                        <p>{item.lastdate}</p>
                    </div>
                </div>
                <Status status={item.healthstatus} className={'mt-2'}/>
                <div className={'grid grid-cols-4 gap-x-3 mt-auto'}>
                    <div className={'card flex flex-col px-3 justify-center'}>
                        <p className={'text-sm text-white font-gtwalmp'}>Age</p>
                        <p className={'text-white text-opacity-60 text-sm'}>{item.age}</p>
                    </div>

                    <div className={'card flex flex-col px-3 justify-center'}>
                        <p className={'text-sm text-white font-gtwalmp'}>Sex</p>
                        <p className={'text-white text-opacity-60 text-sm'}>{item.sex}</p>
                    </div>

                    <div className={'card flex flex-col px-3 justify-center'}>
                        <p className={'text-sm text-white font-gtwalmp'}>Sire</p>
                        <p className={'text-white text-opacity-60 text-sm'}>{item.sire}</p>
                    </div>

                    <div className={'card flex flex-col px-3 justify-center'}>
                        <p className={'text-sm text-white font-gtwalmp'}>Dam</p>
                        <p className={'text-white text-opacity-60 text-sm'}>{item.dam}</p>
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

  .card {
    height: 3.13rem;
    background: #3F2D83;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    opacity: 1;
  }
`;
