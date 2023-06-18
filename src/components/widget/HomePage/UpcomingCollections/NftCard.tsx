import styled from 'styled-components';
import asset from '@/components/widget/HomePage/MorePicks/Assets';
import Button from "@/components/widget/Button";

export default function NftCard({item}) {
    return (
        <Styled className={'flex flex-col items-center w-[14.38rem] mb-30 h-[19.69rem]'}>
            <img className={'h-[19.69rem]'} src={asset.nftBgImg}/>
            <img src={item.clubimg} className={'object-cover w-[10rem] h-[14.56rem] absolute left-1/2 -translate-x-1/2 -top-[15%]'}/>
            <div className={'flex flex-col w-full absolute px-5 bottom-0'}>
                <div className={'flex flex-1 flex-row items-center justify-between'}>
                    <div className={'text-sm font-normal text-[#826BC0]'}>Total</div>
                    <div className={'font-medium text-sm text-[#26C356]'}>{item.mintcount}/{item.totalnft}</div>
                </div>
                <div className={'flex flex-row items-center justify-between'}>
                    <div className={'text-sm font-normal text-[#826BC0]'}>Price</div>
                    <div className={'flex items-center'}>
                        {item.symbol === "ETH" ? <img src={asset.ethImg} className={'w-4 h-4 mr-2'}/> :
                            <img src={asset.omhImg} className={'w-4 h-4 mr-2'}/>}

                        <div className={'text-2 font-gtwalm'}>{item.price}</div>
                    </div>
                </div>
                <Button className={'mt-4'}>Detail</Button>
            </div>

        </Styled>
    )

}
const Styled = styled.div`
  position: relative;

  .text-2 {
    font-size: 1.13rem;
    font-weight: 500;
    color: #FFFFFF;
  }

  .bottom-icon {
    width: 8rem;
    height: 2rem;
    background: linear-gradient(270deg, #0C0C0D 0%, #E11552 50%, #0C0C0D 100%);
    opacity: 1;

    .text-tip {
      font-size: 0.94rem;
      font-weight: 500;
      color: #FFFFFF;
      -webkit-background-clip: text;
    }
  }
`;
