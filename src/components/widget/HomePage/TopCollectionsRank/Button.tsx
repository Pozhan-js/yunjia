import styled from 'styled-components';

export default function Button(props) {
    return (
        <Styled className={props.className}>
            <button className={`btn_ font-gtwalm bg-clip-text`}>
                <div className={'text-content'}>{props.children}</div>
            </button>
        </Styled>
    )
}
const Styled = styled.div`
  .btn_ {
    width: 5.63rem;
    height: 2rem;
    border-radius: 0.38rem 0.38rem 0.38rem 0.38rem;
    opacity: 1;
    border: 0.06rem solid rgba(185, 185, 185, 0.33);
  }

  .text-content {
    height: 1.5rem;
    font-size: 0.88rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1.5rem;
  }
`;
