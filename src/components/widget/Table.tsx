import styled from "styled-components";

export default function Table({
                                  className = '',
                                  tableClassName = '',
                                  headers = [],
                                  data = [],
                                  border = false,
                                  itemClass = ''
                              }) {
    return (
        <Styled className={className}>
            <table className={"w-full bg-[#45338B73] " + tableClassName}>
                <thead className={''}>
                <tr className={''}>
                    {headers.map((item, index) => {
                        return (
                            <th key={index}
                                className={'text-white text-opacity-40 text-base font-gtwalm min-w-[10rem] text-left px-6 py-[1.56rem]'}
                                style={item?.style}>{item?.title}</th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => {
                    return (
                        <tr key={index}
                            className={`${border && data.length - 1 != index ? 'border-b-[0.03rem] border-[#FFFFFF1A]' : ''} `}>
                            {headers.map((item, index_) => {
                                return (
                                    <td key={index_} className={`text-white py-[1.56rem] px-6 ` + itemClass}>
                                        {item?.render ? item?.render(row[item?.key], row, index) : row[item?.key]}
                                    </td>
                                )
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
