import styled from "styled-components";
import arrowImg from "@/assets/images/HomePage/HotSales/arrow@2x.png";
import {useNavigate} from "react-router-dom";
import Image from "@/components/widget/Image";

export default function Advertisement({item, index}) {
    const navigate = useNavigate();
    return (
        <Styled className={"relative cursor-pointer"} onClick={() => {
            if (item?.href?.includes('http')) {
                window.open(item?.href);
            } else {
                navigate(item?.href);
            }
        }
        }>
            <div className="flex py-[0.8rem]">
                <div className={'flex-shrink-0 '}>
                    <Image src={item?.res_url}
                           className={"w-[11.25rem] h-[7.5rem] object-cover rounded-[0.5rem]"}/>
                </div>

                <div className={"flex flex-col ml-3 justify-center"}>
                    <div className={"title line-clamp-2 overflow-ellipsis leading-6 font-gtwalmp"}>
                        {item.title}
                    </div>
                    <div
                        className={
                            "font-normal font-gtwalp line-clamp-2 overflow-ellipsis text-sm text-gray-450 leading-4 mt-[0.63rem]"
                        }
                    >
                        {item.content}
                    </div>
                </div>
            </div>
            {index < 2 &&
                <div className={'divider'}></div>}
        </Styled>
    );
}
const Styled = styled.div`
  //background: #252327;
  .divider {
    border: 0.03rem solid rgba(255, 255, 255, 0.06);
  }

  .title {
    font-size: 1.13rem;
    font-weight: 500;
    color: #ffffff;
  }
`;
