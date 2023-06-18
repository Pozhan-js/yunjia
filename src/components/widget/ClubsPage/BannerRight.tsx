import styled from "styled-components";
import Image from "@/components/widget/Image";
import CountDown from "@/components/widget/ClubsPage/CountDown";
import ImgNoCompetition from "@/assets/images/ClubsPage/racing_no_competition.png"
import utils from "@/utils/utils"


export default function BannerRight({ item, total }) {

    const RacingStaus = ({ item }) => {
        if (item.countdown === -1) {
            return (
                <div className="bg-[#4CAD6D] flex items-center  rounded-[0.27rem] px-[0.8rem] py-[0.1rem] mt-10 mb-3">
                    <p className={'text-white font-gtwalmp  text-[1.25rem]'}>On Going</p>
                </div>
            )
        } else if (item.countdown === -2) {
            return (
                <div className="bg-[#B02A21] flex items-center  rounded-[0.27rem] px-[0.8rem] py-[0.1rem] mt-10 mb-3">
                    <p className={'text-white font-gtwalmp text-[1.25rem]'}>The End</p>
                </div>
            )
        }
        return (
            <CountDown countdown={item.countdown} className={'mt-[1.13rem]'} />
        )
    }

    return (
        <Styled className={`flex flex-col items-center h-full ml-auto ${total === 1 ? 'pt-5' : ''}`}>
            {item != null ? <>
                <p className={'text-white font-msrb mt-[1.38rem] text-[1.25rem]'}>TODAY</p>
                <Image src={item.img} className={'w-[7.5rem] h-[7.5rem] mt-[1.56rem]'} />
                <p className={'text-white font-gtwalb mt-4 text-[1.25rem] px-5 text-center max-h-14 overflow-hidden'}>{utils.formatSubStr(item?.title, 50)}</p>
                <RacingStaus item={item} />
                <div className={'text-white mt-6 text-sm'}>{item.startdate}</div>
            </> : <>
                <p className={'text-white font-msrb mt-[1.38rem] text-[1.25rem]'}>&nbsp;</p>
                <Image src={ImgNoCompetition} className={'w-[7.5rem] h-[7.5rem] mt-[1.56rem]'} />
                <p className={'text-white font-gtwalb mt-4 text-[1.25rem]'}>NO COMPETITION</p>
                <CountDown countdown={0} className={'mt-[1.13rem]'} />
                <div className={'text-white mt-6 text-sm'}>&nbsp;</div>
            </>}

        </Styled>
    )
}
const Styled = styled.div`
  width: 24.3rem;
  height: 29.33rem;
  background: linear-gradient(210.54deg, #5738CB 29.13%, #851ED6 100.63%);
  box-shadow: inset 0rem 0.03rem 0rem 0rem rgba(255, 255, 255, 0.37);
  border-radius: 0.63rem ;
  opacity: 1;
`;
