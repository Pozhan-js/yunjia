import styled from "styled-components";
import arrowImg from "@/assets/images/HomePage/HotSales/arrow@2x.png";
import { useNavigate } from "react-router-dom";
import Image from "@/components/widget/Image";

export default function Advertisement({ item }) {
    const navigate = useNavigate();
    return (
        <div className={'mb-12'}>
            <Styled className={"flex flex-col rounded"} onClick={()=>{
                if (item?.href?.includes('http')) {
                    window.open(item?.href);
                } else {
                    navigate(item?.href);
                }
            }}>
                <Image src={item?.res_url} className={"w-full h-[11.63rem] object-cover rounded-t-[0.63rem]"} />
                <div className={"flex flex-col px-[1.58rem]"}>
                    <div className={"title line-clamp-1 overflow-ellipsis leading-6 mt-[1.17rem]"}>
                        {item.title}
                    </div>
                    <div
                        className={
                            "font-normal line-clamp-2 overflow-ellipsis text-sm text-gray-450 leading-4 mt-[0.63rem]"
                        }
                    >
                        {item.content}
                    </div>

                    {/*{item?.href && <div*/}
                    {/*    className={*/}
                    {/*        "flex items-center text-[#B902FD] text-sm leading-4 cursor-pointer mt-[0.81rem]"*/}
                    {/*    }*/}
                    {/*    onClick={() => {*/}
                    {/*        if (item?.href?.includes('http')) {*/}
                    {/*            window.open(item?.href);*/}
                    {/*        } else {*/}
                    {/*            navigate(item?.href);*/}
                    {/*        }*/}
                    {/*    }*/}

                    {/*    }*/}
                    {/*>*/}
                    {/*    Detail*/}
                    {/*    <img src={arrowImg} className={"w-[1.19rem] h-[0.44rem] ml-1"} />*/}
                    {/*</div>}*/}
                </div>
            </Styled>
        </div>
    );
}
const Styled = styled.div`
  height: 20.13rem;
  /* background: #1F1F24; */
  background: rgba(69, 51, 139, 0.45);
  opacity: 1;
  .title {
    font-size: 1.13rem;
    font-weight: 500;
    color: #ffffff;
  }
`;
