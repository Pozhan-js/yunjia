import styled from 'styled-components';

export default function Discount({children, className}) {
    return (<Styled hidden={parseInt(children) === 0} className={`flex justify-center items-center ${className}`}>
        <div className={'font-gtwalmpo text-white text-sm flex'}>
            {children}%OFF
        </div>
    </Styled>)
}

const Styled = styled.div`
  width: 8rem;
  height: 2rem;
  background: linear-gradient(270deg, #0C0C0D 0%, #E11552 50%, #0C0C0D 100%);
  border-radius: 0;
  opacity: 1;
`;
