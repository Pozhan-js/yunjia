import styled from "styled-components";
import themeSetting from "@/config/themeSetting";
import {useSelector} from "react-redux";
import IndexView from "@/components/widget/ComposePage/IndexView";
import {useEffect, useState} from "react";
import UpgradeView from "@/components/widget/ComposePage/UpgradeView";
import {useLocation} from "react-router-dom";
import {useUpdateEffect} from "ahooks";
import upgradeMaskImg from "@/assets/images/ComposePage/upgrade_mask.png";
import SelectView from "@/components/widget/ComposePage/SelectedView";

export default function Index() {
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [viewId, setViewId] = useState(1);  // 1 IndexView 2 UpgradeView 3 ChooseNftView
    const {state} = useLocation();

    useUpdateEffect(() => {
        // console.log(state)
        if (state?.view_id) {
            setViewId(state.view_id);
        }
    }, [state])
    return (
        <Styled
            style={{backgroundColor: themeSetting.bgColor}}
            className={'min-h-screen font-gtwalp pt-[5.5rem] w-full px-9 sm:px-6 md:px-32 flex flex-col box-border'}
        >
            {/*<NoticeBar/>*/}

            {viewId === 1 && <IndexView account={account}/>}
            {viewId === 2 && <UpgradeView/>}
            <img hidden={viewId !== 2} src={upgradeMaskImg}
                 className={'h-[12.25rem] w-screen bg-cover bg-center absolute left-0 top-[28rem] z-0'} alt={''}/>
            {viewId === 3 && <SelectView/>}

        </Styled>
    )
}
const Styled = styled.div`
  .lv-box {
    width: 28.13rem;
    height: 2.75rem;
    background: rgba(69, 51, 139, 0.45);
    border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
    opacity: 1;
  }
`;
