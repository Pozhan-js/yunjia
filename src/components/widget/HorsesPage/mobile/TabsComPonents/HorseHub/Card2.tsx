import styled from "styled-components";
import Status from "./Status";
import Image from "@/components/widget/Image";
import {useNavigate} from "react-router-dom";

export default function Card2({item}) {
    const navigate = useNavigate();
    return (
        <Styled className={'flex flex-col pt-3'} onClick={() => {
            navigate(`/horse_hub/${item.id}`)
        }
        }>
            <div className="px-2 flex justify-start ">
                <Image src={item.img_url} className={' object-contain h-[5rem] w-[7rem] rounded-[0.25rem]'}/>
                <div className={'flex flex-col ml-2 w-[64%] '}>
                    <p className={'text-white font-msrb text-base'}>{item.name}</p>
                    <div className={'flex justify-between '}>
                        <div className={'font-gtwalp text-sm text-white text-opacity-60 '}>
                            <p className=" whitespace-nowrap text-ellipsis overflow-hidden w-[9.5rem] mob-sm:w-[10rem] ">{item.issue}</p>
                            <p>{item.lastdate}</p>
                        </div>
                        <Status status={item.healthstatus} className={'mt-2'}/>
                    </div>
                </div>
            </div>
            <div className={' mt-3 bg-[#3F2D83] flex justify-between px-5 py-[0.625rem] rounded-b '}>
                <div className={' flex flex-col justify-center'}>
                    <p className={'text-xs text-white font-gtwalmp'}>Age</p>
                    <p className={'text-white text-opacity-60 text-[0.625rem]'}>{item.age}</p>
                </div>

                <div className={' flex flex-col justify-center'}>
                    <p className={'text-xs text-white font-gtwalmp'}>Sex</p>
                    <p className={'text-white text-opacity-60 text-[0.625rem]'}>{item.sex}</p>
                </div>

                <div className={' flex flex-col justify-center'}>
                    <p className={'text-xs text-white font-gtwalmp'}>Sire</p>
                    <p className={'text-white text-opacity-60 text-[0.625rem]'}>{item.sire}</p>
                </div>

                <div className={' flex flex-col justify-center'}>
                    <p className={'text-xs text-white font-gtwalmp'}>Dam</p>
                    <p className={'text-white text-opacity-60 text-[0.625rem]'}>{item.dam}</p>
                </div>

            </div>
        </Styled>
    )
}
const Styled = styled.div`
  background: rgba(69, 51, 139, 0.45);
  box-shadow: 0rem 0.25rem 2.5rem 0rem #27185B;
  border-radius: 0.63rem;

`;
