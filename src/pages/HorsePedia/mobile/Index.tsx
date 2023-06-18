import styled from 'styled-components';
import React, { useState } from "react";
import themeSetting from "@/config/themeSetting";

import topImg from "@/assets/images/HorsePediaPage/mobile/top_bg.png";
import Footer from "@/components/mobile/widget/Footer";
import HorsePedia from '@/components/widget/HorsesPage/mobile/TabsComPonents/HorsePedia/HorsePedia';


export default function Index() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Styled style={{ backgroundColor: themeSetting.bgColor }} className={'min-h-screen w-screen font-gtwalp'}>
      <div className=' w-full h-[27rem] bg-cover px-5 pt-[6.88rem] '
        style={{ backgroundImage: `url(${topImg})` }}>
        <h2 className=' mg-text-gradient text-[2rem] font-gtwalbpo '>Horsepedia</h2>
        <div className=' mt-1 text-base text-[#ffffffe0] font-gtwal'>The horse is a herbivorous domestic animal, a subspecies of the wild horse, widely distributed throughout the world. There are currently approximately 58 million horses in the world, representing a total of 905 breeds. More horse knowledge is in Horsepedia...
        </div>
      </div>
      <div className={'max-w-full px-5 items-start'}>
        <HorsePedia />
      </div>
      <Footer absolute={false} />
    </Styled>
  )
}
const Styled = styled.div`
  .mg-text-gradient {
    background: linear-gradient(180deg, #BAAFFF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .line-b {
    height: 0.13rem;
    background: #FFFFFF;
    opacity: 1;
  }

  .line-full-b {
    height: 0.06rem;
    background: #FFFFFF;
    opacity: 0.1;
  }
`;
