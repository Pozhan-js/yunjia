import styled from 'styled-components';
import NftCard from "@/components/widget/HomePage/MorePicks/NftCard";

export default function MorePicks({list}) {
    if (list?.length === 0) {
        return;
    }
    return (
        <Styled className={'w-full mx-auto px-9 sm:px-6 md:px-32'}>
            <div>
                <p className={'bg-clip-text text-opacity-70 text-white text mt-[4.8rem] text-[2.25rem] font-montserrat italic'}>More Picks</p>
            </div>
            {list?.length < 5 ? <div className={'mt-[3.3rem] flex items-start space-x-6'}>
                {list?.map((item, index) => {
                    return (<NftCard item={item} key={index}/>)
                })}
            </div> : <div className={'mt-[3.3rem] flex justify-around'}>
                {list?.slice(0, 5).map((item, index) => {
                    return (<NftCard item={item} key={index}/>)
                })}
            </div>
            }

        </Styled>
    )
}

const Styled = styled.div`
  .text {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.25);
  }
`;
