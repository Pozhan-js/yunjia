import styled from "styled-components";
import themeSetting from "@/config/themeSetting";
import { useSelector } from "react-redux";
import IndexView from "@/components/widget/ComposePage/mobile/IndexView";
import { useEffect, useState } from "react";
import UpgradeView from "@/components/widget/ComposePage/mobile/UpgradeView";
import { useLocation } from "react-router-dom";
import { useUpdateEffect } from "ahooks";
import upgradeMaskImg from "@/assets/images/ComposePage/mobile/upgrade_mask.png";
import SelectView from "@/components/widget/ComposePage/mobile/SelectedView";

export default function Index() {
    const account = useSelector((state: StoreState) => state.WALLET_ADDRESS);
    const [viewId, setViewId] = useState(1);  // 1 IndexView 2 UpgradeView 3 ChooseNftView
    const { state } = useLocation();

    useUpdateEffect(() => {
        // console.log(state)
        if (state?.view_id) {
            setViewId(state.view_id);
        }
    }, [state])
    return (
        <Styled
            style={{ backgroundColor: themeSetting.bgColor }}
            className={'min-h-screen font-gtwalp'}
        >
            {/*<NoticeBar/>*/}
            <div
                // style={{paddingTop: `${header_height + 2}rem`}}
                className={`w-full px-5 flex flex-col pb-8 pt-[3.8rem]`}>
                {viewId === 1 && <IndexView account={account} />}
                {viewId === 2 && <UpgradeView />}
                <img hidden={viewId !== 2} src={upgradeMaskImg}
                    className={'h-[3.69rem] w-full bg-cover bg-center absolute left-0 top-[17.8rem] z-0'} alt={''} />
                {viewId === 3 && <SelectView />}
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  .lv-box {
    background: rgba(69, 51, 139, 0.45);
    border-radius: 0.63rem;
  }
`;
