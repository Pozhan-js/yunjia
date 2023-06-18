import styled from "styled-components";
import Image from "@/components/widget/Image";
import { useNavigate } from "react-router-dom";

export default function ({ item }) {
    const navigate = useNavigate();
    return (
        <Styled className={"flex flex-col rounded"} onClick={() => {
            navigate(`/horse_pedia/${item?.id}`)
        }
        }>
            <Image src={item?.img_url} className={"w-full h-[10.5rem] object-cover rounded-t-[0.63rem]"} />
            <div className={"flex flex-col px-4 py-3"}>
                <div
                    className={
                        "text-white text-base font-gtwalmp"
                    }
                >
                    {item.title}
                </div>
                <div className={"mt-[0.63rem] text-sm text-white text-opacity-60"}>
                    {item.create_time}
                </div>
            </div>
        </Styled>
    )
}
const Styled = styled.div`
  height: 17.13rem;
  background: #372770;
  border-radius: 0.63rem 0.63rem 0.63rem 0.63rem;
  opacity: 1;
`;
