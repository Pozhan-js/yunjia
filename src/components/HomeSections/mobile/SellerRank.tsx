import React from 'react'
import styled from 'styled-components';
// import RankCard from '../widget/RankCard';


export default function BannerSection() {
    return (
        <BannerSectionStyled className=" px-48 py-10 ">
            <h2>All Entrepreneurs</h2>
            <h3>Top Sellers This Month</h3>
            <div className='sellercards '>
                {/*<RankCard aosName='slide-right'></RankCard>*/}
                {/*<RankCard aosName='zoom-out'></RankCard>*/}
                {/*<RankCard aosName='slide-left'></RankCard>*/}
            </div>
        </BannerSectionStyled>
    )
}

const BannerSectionStyled = styled.div`
  z-index: 30;
  .sellercards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    margin: 2rem 0;
  }
`;
