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
            <div className={'flex flex-col pl-[3.44rem] justify-center h-full'}>
                <p className={'text-[4.13rem] font-msrb text-white w-[29rem] leading-[4.25rem] max-h-[8.9rem] overflow-hidden'}>{item?.title}</p>
                <p className={'text-[1.13rem] font-gtwalp text-white text-opacity-60 mt-[2.75rem] whitespace-pre-wrap'}>{item?.subtitle}</p>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  width: 57.33rem;
  height: 29.33rem;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;
`;
