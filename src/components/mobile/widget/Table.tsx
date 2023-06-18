import styled from "styled-components";

export default function Table({ className = '', headers = [], data = [], columnVal = '', border = false }) {
    return (
        <Styled className={'' + className}>
            <table className="w-full">
                <thead className={''}>
                    <tr className={''}>
                        {headers.map((item, index) => {
                            if (!item.val || item.val === columnVal) {
                                return (
                                    <th key={index}
                                        className={'text-white text-opacity-40 text-sm font-gtwalm text-left ' + (item?.width ? item?.width : '')}
                                        style={item?.style}>{item?.title}</th>
                                )
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => {
                        return (
                            <tr key={index} className={`${border ? 'border-b-[0.03rem] border-[#33333B]' : ''} `}>
                                {headers.map((item, index_) => {
                                    if (!item.val || item.val === columnVal) {
                                        return (
                                            <td key={index_} className={'text-white py-[0.8rem]'}>
                                                {item?.render ? item?.render(row[item?.key], row, index) : row[item?.key]}
                                            </td>
                                        )
                                    }
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Styled>
    )
}
const Styled = styled.div`

  .divider {
    width: 73rem;
    height: 0.03rem;
    opacity: 1;
    background: #33333B;
  }
`;
