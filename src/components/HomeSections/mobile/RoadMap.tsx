import styled from 'styled-components';
import {useRequest} from "ahooks";

import assets from "@/components/widget/HomePage/RoadMap/Assets";
import {getRoadMap} from "@/services/v1/home";
import titleImg from '@/assets/images/HomePage/RoadMap/mobile/title.png';
import arrowImg from '@/assets/images/HomePage/RoadMap/mobile/bottom_arrow.png';
import titleBgImg from "@/assets/images/title_bg.png";

export default function RoadMap() {

    const {data} = useRequest(getRoadMap);

    return (<Styled className={'flex flex-col items-center'}>
        {/*<img src={titleImg} className={'w-[14.03rem] h-[3.56rem] object-cover mt-[3.75rem]'}/>*/}

        <div className="mt-[3.75rem] flex text-[1.75rem] font-gtwalbpo text-white">
            <span>Road</span>
            <span className={'ml-2 bg-gradient-title-2'}>Map</span>
        </div>
        <img src={titleBgImg} className={'w-[13.62rem] bg-cover bg-center'}/>

        <div className={'self-start relative ml-[2.75rem] mt-[2.3rem] mb-5'}>
            <div className={'axle'}></div>
            <img src={arrowImg} className={'relative w-4 h-4 object-cover -left-[0.41rem] -top-[0.6rem]'}/>
            <div className={'circle absolute top-[1.69rem] -translate-x-1/2'}>
                <img src={assets.amoImg} className={'w-9 h-9 object-cover object-center'}/>
            </div>
            <div className={'absolute top-[1.69rem] ml-10 flex flex-col'}>
                <span className={'text-[#8F38FF] text-base whitespace-nowrap font-gtwalb'}>
                    {data?.data[0].name}
                </span>
                <div className={'text-white text-sm font-gtwal mt-1'}>
                    {data?.data[0].eventInfo.map((item, index) => {
                        return (
                            <li className={'flex items-center whitespace-nowrap'} key={index}>
                                {item.isComplete ?
                                    <img src={assets.finishImg} className={'w-[1.13rem] h-[1.13rem] mr-1'}/> :
                                    <div className={'gray-circle-icon ml-1 mr-2'}></div>}

                                {item.eventName}
                            </li>
                        )
                    })}
                </div>
            </div>

            <div className={'circle absolute top-[6.69rem] -translate-x-1/2'}>
                <img src={assets.groupImg} className={'w-9 h-9 object-cover object-center'}/>
            </div>
            <div className={'absolute top-[6.69rem] ml-10 flex flex-col'}>
                <span className={'text-[#8F38FF] text-base whitespace-nowrap font-gtwalb'}>
                    {data?.data[1].name}
                </span>
                <div className={'text-white text-sm font-gtwal mt-1'}>
                    {data?.data[1].eventInfo.map((item, index) => {
                        return (
                            <li className={'flex items-center whitespace-nowrap'} key={index}>
                                {item.isComplete ?
                                    <img src={assets.finishImg} className={'w-[1.13rem] h-[1.13rem] mr-1'}/> :
                                    <div className={'gray-circle-icon ml-1 mr-2'}></div>}

                                {item.eventName}
                            </li>
                        )
                    })}
                </div>
            </div>

            <div className={'circle absolute top-[14.75rem] -translate-x-1/2'}>
                <img src={assets.omhImg} className={'w-9 h-9 object-cover object-center'}/>
            </div>
            <div className={'absolute top-[14.75rem] ml-10 flex flex-col'}>
                <span className={'text-[#8F38FF] text-base whitespace-nowrap font-gtwalb'}>
                    {data?.data[2].name}
                </span>
                <div className={'text-white text-sm font-gtwal mt-1'}>
                    {data?.data[2].eventInfo.map((item, index) => {
                        return (
                            <li className={'flex items-center whitespace-nowrap'} key={index}>
                                {item.isComplete ?
                                    <img src={assets.finishImg} className={'w-[1.13rem] h-[1.13rem] mr-1'}/> :
                                    <div className={'gray-circle-icon ml-1 mr-2'}></div>}

                                {item.eventName}
                            </li>
                        )
                    })}
                </div>
            </div>

            <div className={'circle absolute top-[25.81rem] -translate-x-1/2'}>
                <img src={assets.nftImg} className={'w-9 h-9 object-cover object-center'}/>
            </div>
            <div className={'absolute top-[25.81rem] ml-10 flex flex-col'}>
                <span className={'text-[#8F38FF] text-base whitespace-nowrap font-gtwalb'}>
                    {data?.data[3].name}
                </span>
                <div className={'text-white text-sm font-gtwal mt-1'}>
                    {data?.data[3].eventInfo.map((item, index) => {
                        return (
                            <li className={'flex items-center whitespace-nowrap'} key={index}>
                                {item.isComplete ?
                                    <img src={assets.finishImg} className={'w-[1.13rem] h-[1.13rem] mr-1'}/> :
                                    <div className={'gray-circle-icon ml-1 mr-2'}></div>}

                                {item.eventName}
                            </li>
                        )
                    })}
                </div>
            </div>

            <div className={'circle absolute top-[35.38rem] -translate-x-1/2'}>
                <img src={assets.marketImg} className={'w-9 h-9 object-cover object-center'}/>
            </div>
            <div className={'absolute top-[35.38rem] ml-10 flex flex-col'}>
                <span className={'text-[#8F38FF] text-base whitespace-nowrap font-gtwalb'}>
                    {data?.data[4].name}
                </span>
                <div className={'text-white text-sm font-gtwal mt-1'}>
                    {data?.data[4].eventInfo.map((item, index) => {
                        return (
                            <li className={'flex items-center whitespace-nowrap'} key={index}>
                                {item.isComplete ?
                                    <img src={assets.finishImg} className={'w-[1.13rem] h-[1.13rem] mr-1'}/> :
                                    <div className={'gray-circle-icon ml-1 mr-2'}></div>}

                                {item.eventName}
                            </li>
                        )
                    })}
                </div>
            </div>

            <div className={'circle absolute top-[43rem] -translate-x-1/2'}>
                <img src={assets.gameImg} className={'w-9 h-9 object-cover object-center'}/>
            </div>
            <div className={'absolute top-[43rem] ml-10 flex flex-col'}>
                <span className={'text-[#8F38FF] text-base whitespace-nowrap font-gtwalb'}>
                    {data?.data[5].name}
                </span>
                <div className={'text-white text-sm font-gtwal mt-1'}>
                    {data?.data[5].eventInfo.map((item, index) => {
                        return (
                            <li className={'flex items-center whitespace-nowrap'} key={index}>
                                {item.isComplete ?
                                    <img src={assets.finishImg} className={'w-[1.13rem] h-[1.13rem] mr-1'}/> :
                                    <div className={'gray-circle-icon ml-1 mr-2'}></div>}

                                {item.eventName}
                            </li>
                        )
                    })}
                </div>
            </div>

            <div className={'circle absolute top-[48.5rem] -translate-x-1/2'}>
                <img src={assets.soonImg} className={'w-9 h-9 object-cover object-center'}/>
            </div>
            <div className={'absolute top-[48.5rem] ml-10 flex flex-col'}>
                <span className={'text-[#8F38FF] text-base whitespace-nowrap font-gtwalb mt-[1rem]'}>
                    {data?.data[6].name}
                </span>
                <div className={'text-white text-sm font-gtwal mt-1'}>
                    {data?.data[6].eventInfo.map((item, index) => {
                        return (
                            <li className={'flex items-center whitespace-nowrap'} key={index}>
                                {item.isComplete ?
                                    <img src={assets.finishImg} className={'w-[1.13rem] h-[1.13rem] mr-1'}/> :
                                    <div className={'gray-circle-icon ml-1 mr-2'}></div>}

                                {item.eventName}
                            </li>
                        )
                    })}
                </div>
            </div>

        </div>

    </Styled>);
}

const Styled = styled.div`
  .axle {
    width: 0.19rem;
    height: 53.5rem;
    background: #6F19F7;
    opacity: 1;
  }

  .circle {
    width: 3.13rem;
    height: 3.13rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(225deg, #3C1A57 0%, #2C165B 100%);
    opacity: 1;
    border: 0.13rem solid #6F19F7;
    border-radius: 50%;
  }

  .gray-circle-icon {
    width: 0.63rem;
    height: 0.63rem;
    opacity: 1;
    border: 0.13rem solid #838399;
    border-radius: 50%;
  }
`;
