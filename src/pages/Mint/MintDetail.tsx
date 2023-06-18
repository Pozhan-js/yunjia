import titleBgImg from "@/assets/images/title_bg.png";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import NoticeBar from "@/components/widget/NoticeBar";
import bgImg from '@/assets/images/MintPage/bg.png';
import NftCard from "@/components/widget/MintPage/MintDetail/NftCard";
import {getMintDetails, getMintDiscount} from "@/services/v1/mint";
import {useRequest} from "ahooks";
import Loading from "@/components/widget/Loading";
import {useSelector} from "react-redux";
import theme from '@/config/themeSetting';

export default function MintDetail() {
    const {id} = useParams();
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS)
    const header_top = useSelector((state: any) => state.HEADER_TOP);

    const {data, loading} = useRequest(getMintDetails, {
        defaultParams: [id]
    })
    const {data: discount_data, loading: loading2} = useRequest(getMintDiscount, {
        defaultParams: [id, WALLET_ADDRESS],
    })

    if (loading || loading2) {
        return (<Loading/>)
    }
    return (
        <Styled
            style={{backgroundColor: theme.bgColor}}
            className={'min-h-screen box-content'}>
            <NoticeBar block={true} className={`${header_top ? 'backdrop-blur-[1.25rem]' : ''}`}
                       bgColor={`${header_top ? 'rgba(77,58,140,0.7)' : '#FFFFFF00'}`}/>
            <div className={'flex relative flex-col items-center mt-[7rem] bg-cover w-[84.38rem] h-[46.5rem] mx-auto'}
                 style={{backgroundImage: `url(${bgImg})`}}>

                <div
                    className={'w-[36.69rem] h-[3.71rem] absolute left-1/2 -translate-x-1/2 -top-[6rem] flex flex-col items-center '}>
                    <div className={'text-white text-[3rem] font-gtwalb flex'}>
                        <span>{data?.data.title}</span>
                        <span
                            className={'ml-2 bg-gradient-title-2'}>{data?.data?.runningstatus === 2 ? 'Mint End' : 'Mint'}</span>
                    </div>
                    <img src={titleBgImg} className={'w-[23rem] bg-cover'}/>
                </div>


                <div className={'mt-6 content text-center mt-16'}>
                    {data?.data.desc}
                </div>
                {data?.data && <NftCard className={'mt-12'} item={data?.data} self_discount={discount_data?.data}/>}
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .content {
    opacity: .6;
    width: 58rem;
    font-size: 1rem;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 1.25rem;
    -webkit-background-clip: text;
  }
`;
