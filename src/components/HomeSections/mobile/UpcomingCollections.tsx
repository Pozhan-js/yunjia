import styled from 'styled-components';
import NftCard from "@/components/widget/HomePage/MorePicks/mobile/NftCard";
import { useNavigate } from "react-router-dom";


export default function Section({ list }) {
    // const navigate = useNavigate();
    return (
        <Styled className={' pt-[2rem] px-5 self-center'} hidden={list?.length===0}>
            <div>
                <p className={'text-opacity-70 text-white text-[1.75rem] font-gtwalmpo leading-8'}>Upcoming
                    Collections</p>
            </div>
            <div className={'grid grid-cols-2 gap-x-3 gap-y-2 mt-[2rem]'}>
                {list?.map((item, index) => {
                    return (<NftCard item={item} key={index} />)
                })}
            </div>

        </Styled>
    )
}

const Styled = styled.div`

`;
