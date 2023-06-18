import styled from "styled-components";
import { useParams } from "react-router-dom";
import NftCard from "@/components/widget/MintPage/mobile/MintDetail/NftCard";
import { getMintDetails, getMintDiscount } from "@/services/v1/mint";
import { useRequest, useUpdateEffect } from "ahooks";
import Loading from "@/components/widget/Loading";
import { useSelector } from "react-redux";
import titleBgImg from "@/assets/images/title_bg.png";
import bg from '@/assets/images/MintPage/bg.png';


export default function MintDetail() {
    const { id } = useParams();
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS)

    const { data, loading } = useRequest(getMintDetails, {
        defaultParams: [id]
    })
    const { data: discount_data, loading: loading2 } = useRequest(getMintDiscount, {
        defaultParams: [id, WALLET_ADDRESS],
    })
    if (loading || loading2) {
        return (<Loading />)
    }
    return (
        <Styled className=" pt-[3.5rem] " >
            <div className={'w-full px-5 flex flex-col mb-8 text-white text-base  bg-cover bg-no-repeat pt-6'}
                style={{ backgroundImage: `url(${bg})` }}>
                <div className={' w-full  flex flex-col items-center '}>
                    <div className={'text-white text-[1.75rem] font-gtwalbpo text-center leading-7 '}>{data?.data.title} <span className="bg-gradient-title-2 inline-block">{data?.data?.runningstatus === 2 ? 'Mint End' : 'Mint'}</span></div>
                    <img src={titleBgImg} className={'w-[14rem]  mt-1'} />
                </div>
                <div className={' text-center mt-3 text-white opacity-60 text-[0.875rem] leading-[1.125rem] font-gtwalp'}>
                    {data?.data.desc}
                </div>
                {data?.data && <NftCard className={'mt-12'} item={data?.data} self_discount={discount_data?.data} />}
            </div>
            {/* <div className={'w-full px-5 flex flex-col mb-8 text-white text-base relative bg-cover bg-no-repeat'}
                style={{ backgroundImage: `url(${bg})` }}>
                <div
                    className={' w-full h-[3.71rem] object-cover absolute left-1/2 -translate-x-1/2 -top-[4rem] flex flex-col items-center '}>
                    <div className={'text-white text-[1.75rem] font-gtwalbpo'}>{data?.data.title}<span className="bg-gradient-title-2">{data?.data?.runningstatus !== 2 ? ' Mint End' : ' Mint'}</span></div>
                    <img src={titleBgImg} className={'w-[14rem]  mt-1'} />
                </div>
                <div className={' text-center mt-3 text-white opacity-60 text-[0.875rem] leading-[1.125rem] font-gtwalp'}>
                    {data?.data.desc}
                </div>
                {data?.data && <NftCard className={'mt-12'} item={data?.data} self_discount={discount_data?.data} />}
            </div> */}
        </Styled>
    )
}
const Styled = styled.div`
  background-color: #25194A;
`;
