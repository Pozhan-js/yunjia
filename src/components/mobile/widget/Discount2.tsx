import styled from 'styled-components';

export default function Discount({ children, className }) {
  return (<Styled hidden={parseInt(children) === 0} className={`flex justify-center items-center ${className}`}>
    <div className={'font-gtwalmp discount-text flex'}>
      {children}%OFF
    </div>
  </Styled>)
}

const Styled = styled.div`
  width: 8rem;
  height: 1.75rem;
  background: linear-gradient(270deg, #0C0C0D 0%, #E11552 50%, #0C0C0D 100%);

  .discount-text {
    width: 3.38rem;
    height: 1rem;
    font-size: 0.88rem;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1.03rem;
    text-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.47);
  }
`;
