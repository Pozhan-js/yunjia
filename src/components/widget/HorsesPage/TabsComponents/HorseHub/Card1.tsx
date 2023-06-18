import styled from "styled-components";
import Status from "@/components/widget/HorsesPage/TabsComponents/HorseHub/Status";
import Image from "@/components/widget/Image";
import {useNavigate} from "react-router-dom";

export default function Card1({item}) {
    const navigate = useNavigate();
    return (
        <Styled className={'flex flex-col overflow-hidden cursor-pointer'} onClick={() => {
            navigate(`/horse_hub/${item.id}`)
        }
        }>
            <div className={'flex flex-col px-[1.13rem] pt-[1.13rem]'}>
                <p className={'text-white font-msrb text-[1.13rem] leading-6'}>{item.name}</p>
                <p className={'font-gtwalp text-sm text-white text-opacity-60 mt-2'}>{item.issue}</p>
                <div className={'flex items-center justify-between'}>
                    <p className={'font-gtwalp text-sm text-white text-opacity-60 mt-1'}>{item.lastdate}</p>
                    <Status status={item.healthstatus}/>
                </div>

            </div>
            <Image src={item.img_url} className={'w-full object-contain object-center h-[12.33rem] mt-3'}/>
            <div className={'grid grid-cols-2 gap-[0.0625rem] flex-1'}>
                <div className={'card flex flex-col py-[0.69rem] px-[1.13rem]'}>
                    <p className={'text-[0.75rem] text-white font-gtwalmp'}>Age</p>
                    <p className={'text-white text-opacity-60 text-[0.75rem]'}>{item.age}</p>
                </div>
                <div className={'card flex flex-col py-[0.69rem] px-[1.13rem]'}>
                    <p className={'text-[0.75rem] text-white font-gtwalmp'}>Sex</p>
                    <p className={'text-white text-opacity-60 text-[0.75rem]'}>{item.sex}</p>
                </div>
                <div className={'card flex flex-col py-[0.69rem] px-[1.13rem]'}>
                    <p className={'text-[0.75rem] text-white font-gtwalmp'}>Sire</p>
                    <p className={'text-white text-opacity-60 text-[0.75rem]'}>{item.sire}</p>
                </div>
                <div className={'card flex flex-col py-[0.69rem] px-[1.13rem]'}>
                    <p className={'text-[0.75rem] text-white font-gtwalmp'}>Dam</p>
                    <p className={'text-white text-opacity-60 text-[0.75rem]'}>{item.dam}</p>
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`


  background: rgba(69, 51, 139, 0.45);
  box-shadow: 0rem 0.25rem 2.5rem 0rem #27185B;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;

  .card {
    background: #3F2D83;

  }
`;
