import styled from 'styled-components';

export default function Discount({ children, className }) {
  return (<Styled hidden={parseInt(children) === 0} className={`flex justify-center items-center ${className}`}>
    <div className={'font-gtwalm discount-text flex'}>
      {children}%OFF
    </div>
  </Styled>)
}

const Styled = styled.div`
  width: 8rem;
  height: 1.75rem;
  background: linear-gradient(270deg, #0C0C0D 0%, #E11552 50%, #0C0C0D 100%);

  .discount-text {
    height: 1rem;
    font-size: 0.812rem;;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 0.82rem;
    padding-left: 0.875rem;
    -webkit-background-clip: text;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
  }
`;
