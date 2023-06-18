import styled from "styled-components";
import {useState} from "react";
import Table from "@/components/widget/Table.js";
// import Image from "@/components/widget/Image";
import {useMount, useRequest, useUpdateEffect} from "ahooks";
import {getPowerRankTab} from "@/services/v1/clubs";
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import $T from '@/utils/utils';

const TipStyled = styled.div`
  width: 1.73rem;
  height: 1.07rem;
  background: #5C35CC;
  border-radius: 0.27rem 0.27rem 0.27rem 0.27rem;
  opacity: 1;
`;
const Tip = ({num}) => {
    return (
        <TipStyled className={'flex items-center justify-center'}>
            <p className={'text-white text-opacity-40 text-sm'}>{num}</p>
        </TipStyled>
    )
}

const headers = [
    {
        title: 'Ranking',
        key: '',
        style: {
            width: '5rem',
        },
        render: (text, record, index) => {
            const [color, setColor] = useState('#FFFFFF');
            useMount(() => {
                switch (index) {
                    case 0:
                        setColor('#FFBA38')
                        break;
                    case 1:
                        setColor('#7363EC')
                        break;
                    case 2:
                        setColor('#65C3D8')
                        break;

                }
            })
            return (
                <p style={{color: color}} className={'text-base font-gtwalb ml-4'}>{index + 1}</p>
            )
        }
    },
    {
        title: 'Club',
        key: 'curclubs',
        render: (text, record, index) => {
            // console.log(record)
            return (
                <div className={'flex space-x-[0.8rem] items-center'}>
                    {text.length <= 3 ? text?.map((item, index) => {
                        return <img key={index} src={item?.img} className={'w-[3.2rem] h-[3.2rem]'}/>

                    }) : <>
                        {
                            text?.slice(0, 3).map((item, index) => {
                                return <img key={index} src={item?.img} className={'w-[3.2rem] h-[3.2rem]'}/>
                            })
                        }
                        <Tip num={record?.cnum}/>
                    </>
                    }
                </div>
            )
        }
    },
    {
        title: 'Power',
        key: 'spower',
        render: (text) => {
            return (
                <p className={'text-white text-base font-gtwalp'}>{text}</p>
            )
        }
    },
    {
        title: 'Owner',
        key: 'address',
        render: (text) => {
            return (
                <p className={'text-white text-base font-gtwalp'}>{$T.formatSubAddress(text, 4, 4)}</p>
            )
        }
    }
]

export default function PowerRank() {
    const WALLET_ADDRESS = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [data, setData] = useState<any>({});
    const {loading} = useRequest(getPowerRankTab,
        {
            defaultParams: [WALLET_ADDRESS],
            debounceWait: 500,
            onSuccess: (data) => {
                setData(data?.data)
            }
        });

    if (loading) {
        return (<div className=" w-1/1 h-[20rem] flex justify-center items-center ">
            <CircularProgress/>
        </div>)
    }

    return (
        <Styled>
            <div className={'flex font-gtwalm space-x-[4rem] mt-[0.8rem]'}>
                <p className={'text-white text-opacity-40 text-base'}>Total Power : <span
                    className={'text-white'}>{$T.formatThousand(data?.mypower?.allpower)}</span></p>
                <p className={'text-white text-opacity-40 text-base'}>My Position: <span
                    className={'text-white'}>{$T.formatThousand(data?.mypower?.myrank)}</span></p>
                <p className={'text-white text-opacity-40 text-base'}>My Power: <span
                    className={'text-white'}>{$T.formatThousand(data?.mypower?.mypower)}</span></p>
            </div>
            <Table className={'mt-[2rem] rounded'} headers={headers} data={data?.powerlist}/>
        </Styled>
    )
}
const Styled = styled.div`

  .btn {
    width: 6.31rem;
    height: 2rem;
    background: #6F19F7;
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }


`;
