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
                className={'z-10 flex flex-col items-center pb-[3.75rem]'}>
            <div className="flex text-[1.75rem] leading-[3.54rem] font-gtwalbpo text-white">
                <span>The <span className={'bg-gradient-title-2'}>Partners</span></span>
            </div>
            <img src={titleBgImg} className={'w-[13.62rem] bg-cover bg-center'} />
            <div className={'flex items-center mt-[1.75rem]'}>

                <div className={'relative flex flex-col items-center relative left-[2rem]'}>
                    <Diamond size={'1.88rem'} activate={inViewport} className={'h-[4.5rem] left-[1.2rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] relative left-[1.2rem] bottom-[0.3rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.7rem]'} fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.7rem]'} fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] relative left-[1.2rem] top-[0.3rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'1.88rem'} activate={inViewport} className={'h-[4.5rem] left-[1.2rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                </div>

                <div className={'relative flex flex-col items-center relative left-5'}>
                    <Diamond size={'1.25rem'} activate={inViewport} className={'h-[4rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] relative top-[0.35rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] z-10'} item={partners[4]}/>
                    <Diamond size={'6.36rem'} activate={inViewport} className={'h-[5.8rem]'} item={partners[3]} edgColor={'#E854FF'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] z-10'} item={partners[7]}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] relative bottom-[0.35rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'1.25rem'} activate={inViewport} className={'h-[4rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                </div>
                {/*中心*/}
                <div className={'relative flex flex-col items-center'}>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] relative top-2'} fill={'#35246F'}  stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.8rem]'} fill={'#35246F'}  stroke={'#47308F'}/>
                    <Diamond size={'6.36rem'} activate={inViewport} className={'h-[5.8rem]'} edgColor={'#E854FF'} item={partners[0]}/>
                    <Diamond size={'6.36rem'} activate={inViewport} className={'h-[5.8rem]'} edgColor={'#E854FF'} item={partners[2]}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.8rem]'} fill={'#35246F'}  stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] relative bottom-2'} fill={'#35246F'}  stroke={'#47308F'}/>
                </div>

                <div className={'relative flex flex-col items-center relative right-5'}>
                    <Diamond size={'1.25rem'} activate={inViewport} className={'h-[4rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] relative top-[0.35rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] z-10'} item={partners[5]}/>
                    <Diamond size={'6.36rem'} activate={inViewport} className={'h-[5.8rem]'} item={partners[1]} edgColor={'#E854FF'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] z-10'} item={partners[6]}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] relative bottom-[0.35rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                    <Diamond size={'1.25rem'} activate={inViewport} className={'h-[4rem]'} fill={'#35246F'}
                             stroke={'#47308F'}/>
                </div>

                <div className={'relative flex flex-col items-center relative right-[2rem]'}>
                    <Diamond size={'1.88rem'} activate={inViewport} className={'h-[4.5rem] right-[1.2rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] relative right-[1.2rem] bottom-[0.3rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.7rem]'} fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.7rem]'} fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'4.91rem'} activate={inViewport} className={'h-[4.5rem] relative right-[1.2rem] top-[0.3rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                    <Diamond size={'1.88rem'} activate={inViewport} className={'h-[4.5rem] right-[1.2rem]'}
                             fill={'#35246F'} stroke={'#47308F'}/>
                </div>
            </div>

        </Styled>
    )
}
const Styled = styled.div`
`;
