import styled from "styled-components";
import {useState} from 'react';
import {useRequest} from 'ahooks'
import {getStakeMain} from "@/services/v1/stake";
import StakeNFTList from "./StakeNFTList";
import StakeChange from './StakeChange';
import StakeStatistic from './StakeStatistic';
import {useSelector} from "react-redux";
import Loading from "@/components/widget/Loading";
import TopClubs from "@/components/widget/StakePage/TopClubs";

export default function StakeContent() {
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [selectClubId, setSelectClubId] = useState(0)
    const [isChangePage, setIsChangePage] = useState(false);
    const {data, loading} = useRequest(() => getStakeMain(account));
    const handleChangePage = (clubId) => {
        setIsChangePage(!isChangePage)
        setSelectClubId(clubId)
    }
    if (loading) {
        return <Loading loading={loading}/>
    }
    return (!isChangePage ? <>
                <StakeStatistic statData={data?.data?.coindata}></StakeStatistic>
                <TopClubs/>
                <StakeContStyled className="mt-3">
                    <StakeNFTList handleChangePage={handleChangePage} initClubId={selectClubId}
                                  clubList={data?.data?.clublist}></StakeNFTList>
                </StakeContStyled>
            </> :
            // 质押操作页面
            <StakeChange statData={data?.data?.coindata} myClubList={data?.data?.myclub} selectClubId={selectClubId}
                         handleToBack={handleChangePage}/>
    )
}


const StakeContStyled = styled.div`
  .mg-card {
    background-color: #17171A;
  }

  .mg-border {
    border: 0.06rem solid #33333C;
  }

  .mg-row {
    border-radius: 0.5rem;
    padding: 0.06rem;

    .ant-row {
      margin: 0 !important;
    }
  }

  .mg-row-active {
    box-sizing: border-box;
    background: linear-gradient(208deg, rgba(193, 52, 250, 1), rgba(36, 219, 244, 1));
    border: none;
    padding: 0.06rem;
    box-shadow: 0px 0.06rem 0.06rem 0px #51138fff;
    border-radius: 0.5rem;

    .ant-row {
      border-radius: 0.5rem;
      background: linear-gradient(270deg, rgba(82, 32, 147, 0.77) 0%, #183D76 100%);
    }
  }
`;
