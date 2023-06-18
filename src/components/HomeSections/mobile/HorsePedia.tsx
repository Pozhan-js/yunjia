import styled from 'styled-components';
import { useRequest } from "ahooks";
import { getDailyHorsePedia } from "@/services/v1/home";
import titleImg from '@/assets/images/HomePage/HorsePedia/mobile/title.png';
import bgImg from '@/assets/images/HomePage/HorsePedia/mobile/bg.png';
import titleBgImg from "@/assets/images/title_bg.png";

export default function HorsePedia() {
  const { data } = useRequest(getDailyHorsePedia);
  return (
    <Styled style={{ backgroundImage: `url(${bgImg})` }}
      id={'horsepedia'}
      className={'bg-cover bg-center bg-no-repeat flex flex-col items-center w-full pb-[3.31rem] shadow-2xl rounded-md '}>
      {/*<img src={titleImg} className={'w-[18.31rem] h-[3.56rem] mt-[3.75rem] object-cover'}/>*/}
      <div className="mt-[3.75rem] flex text-[1.75rem] font-gtwalbpo text-white">
        <span>The Daily</span>
        <span className={'ml-2 bg-gradient-title-2'}>Horse Pedia</span>
      </div>
      <img src={titleBgImg} className={'w-[13.62rem] bg-cover bg-center'} />

      <div className={'mt-[2.5rem] flex flex-col px-5'}>
        <img src={data?.data.res_url}
          className={'w-[18rem h-[12.05rem] object-contain object-center ml-[1.63rem]'} />

        <p className={'title font-gtwalm mt-8'}>{data?.data.title?.split(':')[0]}<br /> {data?.data.title?.split(':')[1]}
        </p>
        <p className={'desc text-white text-opacity-80 mt-[1.75rem]'}>
          {data?.data.content}
        </p>
      </div>
    </Styled>
  )
}
const Styled = styled.div`
  .go-btn {
    width: 14rem;
    height: 3.25rem;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
    border: 0.06rem solid;
    //border-image: radial-gradient(circle, rgba(248, 171, 255, 1), rgba(247, 152, 255, 1), rgba(242, 89, 255, 1), rgba(178, 54, 255, 1), rgba(95, 38, 255, 1)) 0.06 0.06;
  }

  .title {
    width: 18.44rem;
    height: 3.25rem;
    font-size: 1.31rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1.54rem;
  }

  .desc {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    -webkit-background-clip: text;
  }
`;
