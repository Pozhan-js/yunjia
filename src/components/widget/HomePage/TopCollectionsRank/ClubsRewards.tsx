import styled from 'styled-components';
import assets from './Assets';
import $T from '@/utils/utils';
import Button from "@/components/widget/HomePage/TopCollectionsRank/Button";

export default function ClubsReward({list}) {
    return (
        <Styled className={'flex flex-col items-center'}>
            <img className={'top-img relative'} src={assets.clubsRewardsImg}/>
            <p className={'title'}>Clubs Rewards</p>
            <div className={'flex w-full flex-col px-6 mt-[2.25rem]'}>
                {list.map((item, index) => {
                    return (
                        <div key={'ClubsReward' + index}>
                            <div className={'flex w-full items-center'}>
                                <p className={'text-' + (index + 1)}>{index + 1}</p>

                                <img src={item.img} className={'w-[3.13rem] h-[3.13rem] ml-4 rounded-full'}/>

                                <div className={'ml-[1.13rem] flex flex-col'}>
                                    <p className={'item-title truncate'}>{item.title}</p>
                                    <div className={'flex items-center'}>
                                        <div className={'text-sm text-gray-450 font-normal leading-6'}>Jackpot:</div>
                                        <img src={assets.omhImg} className={'w-4 h-4 mx-[0.31rem]'}/>
                                        <div
                                            className={'text-sm font-medium text-white leading-6'}>{$T.formatThousand(item.num)}</div>
                                    </div>
                                </div>
                                <Button className={'ml-auto'}>CLaim</Button>
                                {/*<Button>CLaim</Button>*/}
                            </div>
                            {index < 4 && <div className={'divider my-[1.19rem]'}></div>}
                        </div>
                    )
                })}
            </div>
        </Styled>
    )
}

const Styled = styled.div`
  width: 24.88rem;
  background: #141416;
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  border: 0.03rem solid #FFFFFF10;

  .divider {
    height: 0rem;
    opacity: 1;
    border: 0.03rem solid #FFFFFF14;
  }

  .item-title {
    font-size: 1rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1.5rem;
    -webkit-background-clip: text;
  }

  .item-price {
    font-size: 0.88rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1.5rem;
    -webkit-background-clip: text;
  }

  .text-1 {
    font-size: 1rem;
    font-weight: 600;
    color: #FFBA38;
    line-height: 1.5rem;
    -webkit-background-clip: text;
  }

  .text-2 {
    font-size: 1rem;
    font-weight: 600;
    color: #7363EC;
    line-height: 1.5rem;
    -webkit-background-clip: text;
  }

  .text-3 {
    font-size: 1rem;
    font-weight: 600;
    color: #65C3D8;
    line-height: 1.5rem;
    -webkit-background-clip: text;

  }

  .text-4 {
    font-size: 1rem;
    font-weight: 600;
    color: #999999;
    line-height: 1.5rem;
    -webkit-background-clip: text;

  }

  .text-5 {
    font-size: 1rem;
    font-weight: 600;
    color: #999999;
    line-height: 1.5rem;
    -webkit-background-clip: text;

  }

  .title {
    font-size: 1.19rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1.5rem;
    -webkit-background-clip: text;
  }

  .top-img {
    width: 3.13rem;
    height: 3.13rem;
    transform: translateY(-50%);
  }
  
`;
