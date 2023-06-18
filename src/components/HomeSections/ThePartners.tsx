import styled from "styled-components"
import Diamond from "@/components/HomeSections/components/Diamond";
import themeSetting from "@/config/themeSetting";
import React, {useRef, useState} from "react";
import {getPartners} from "@/services/v1/home";
import {useInViewport, useRequest, useUpdateEffect} from "ahooks";
import titleBgImg from "@/assets/images/title_bg.png";

export default function ThePartners() {
    const ref=useRef(null);
    const [partners, setPartners] = useState([]);
    const [inViewport,ratio] = useInViewport(ref,{
        threshold: [ 0.75, 1]
    });
/*    useUpdateEffect(()=>{
        console.log(ratio)
    },[ratio])*/
    useRequest(getPartners, {
        onSuccess: (tdata) => {
            setPartners(tdata?.data)
        }
    });
    return (
        <Styled ref={ref} style={{backgroundColor: themeSetting.bgColor}}
                className={'z-10 flex flex-col items-center pb-[6.25rem]'}>
            <div className="flex text-[3.03rem] leading-[3.54rem] font-gtwalbpo text-white mt-[7.5rem]">
                <span>The <span className={'bg-gradient-title-2'}>Partners</span></span>
            </div>
            <img src={titleBgImg} className={'w-[23rem] bg-cover bg-center'}/>
            <div className={'flex items-center mt-[3.75rem]'}>
                <div className={'relative flex flex-col items-center relative left-[5rem]'}>
                    <Diamond size={'6.06rem'} activate={inViewport} className={'relative bottom-[2.5rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'3.19rem'} activate={inViewport} className={'relative right-[4rem]'} fill={'#35246F'} stroke={'#47308F'}/>
                </div>

                <div className={'relative flex flex-col items-center relative left-[6.5rem]'}>
                    <Diamond size={'3.44rem'} activate={inViewport} className={'h-[8.5rem] relative left-[1.5rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative bottom-[0.4rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative bottom-[1.6rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative bottom-[1.1rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'4.94rem'} activate={inViewport} className={'h-[7rem] relative left-[1.5rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                </div>

                <div className={'relative flex flex-col items-center relative left-[4rem]'}>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative left-[2.2rem] top-[0.2rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[9rem]'} fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[9rem]'} fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative left-[2.2rem] bottom-[0.2rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                </div>

                <div className={'relative flex flex-col items-center relative left-10'}>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative top-5'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] z-10'} item={partners[4]}/>
                    <Diamond size={'11.25rem'} activate={inViewport} className={'h-[10.3rem]'} item={partners[3]} edgColor={'#E854FF'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] z-10'} item={partners[7]}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative bottom-5'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                </div>
                {/*中心*/}
                <div className={'relative flex flex-col items-center'}>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem]'} fill={'#35246F'}  stroke={'#47308F'}/>
                    <Diamond size={'11.25rem'} activate={inViewport} className={'h-[10.3rem]'} edgColor={'#E854FF'} item={partners[0]}/>
                    <Diamond size={'11.25rem'} activate={inViewport} className={'h-[10.3rem]'} edgColor={'#E854FF'} item={partners[2]}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem]'} fill={'#35246F'}  stroke={'#47308F'}/>
                </div>

                <div className={'relative flex flex-col items-center relative right-10'}>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative top-5'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] z-10'} item={partners[5]}/>
                    <Diamond size={'11.25rem'} activate={inViewport} className={'h-[10.3rem]'} item={partners[1]} edgColor={'#E854FF'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] z-10'} item={partners[6]}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative bottom-5'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                </div>

                <div className={'relative flex flex-col items-center relative right-[4rem]'}>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative right-[2.2rem] top-[0.2rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[9rem]'} fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[9rem]'} fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative right-[2.2rem] bottom-[0.2rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                </div>

                <div className={'relative flex flex-col items-center relative right-[6.5rem]'}>
                    <Diamond size={'3.44rem'} activate={inViewport} className={'h-[8.5rem] relative right-[1.5rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative bottom-[0.4rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative bottom-[1.6rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'8.69rem'} activate={inViewport} className={'h-[8.5rem] relative bottom-[1.1rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'4.94rem'} activate={inViewport} className={'h-[7rem] relative right-[1.5rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                </div>

                <div className={'relative flex flex-col items-center relative right-[7rem]'}>
                    <Diamond size={'3.31rem'} activate={inViewport} className={'relative bottom-[2.8rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'3.19rem'} activate={inViewport} className={'relative left-[4rem]'} fill={'#35246F'} stroke={'#47308F'}/>
                </div>
            </div>

        </Styled>
    )
}
const Styled = styled.div`
`;
