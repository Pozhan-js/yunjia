import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import utils from "@/utils/utils"

export default function BannerLeft({ item }) {
    const navigate = useNavigate();
    return (
        <Styled
            onClick={() => {
                navigate(item?.href)
            }}
            className={'bg-cover bg-center cursor-pointer'}
            style={{ backgroundImage: `url(${item?.res_url})` }}>
            <div className={'flex flex-col justify-center h-full px-5'}>
                <p className={' w-8/12 text-[1.687rem] font-msrb text-white leading-[1.69rem]  '}>{utils.formatSubStr(item?.title, 25)}</p>
                <p className={'w-8/12 text-[0.625rem] font-gtwalp text-white text-opacity-60 mt-[1rem] whitespace-pre-wrap'}>{item?.subtitle}</p>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  width: 100%;
  height: 12rem;
  border-radius: 0.63rem;
  opacity: 1;
`;
