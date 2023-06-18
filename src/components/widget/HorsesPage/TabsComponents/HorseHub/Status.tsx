import {useMount} from "ahooks";
import styled from "styled-components";
import {useState} from "react";

export default function Status({status, className = ''}) {
    const [state, setState] = useState<any>({bgColor: '#6F19F7', text: 'Training'});
    useMount(() => {
        switch (status) {
            case 1:
                setState({bgColor: '#6F19F7', text: 'Training'});
                break;
            case 2:
                setState({bgColor: '#B902FD', text: 'Breeding'});
                break;
        }
    })
    return (
        <Styled
            style={{backgroundColor: state.bgColor}}
            className={'flex items-center justify-center ' + className}>
            <p className={'text-[0.75rem] text-white'}>{state.text}</p>
        </Styled>
    )
}
const Styled = styled.div`
  width: 3.75rem;
  height: 1.25rem;

  border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
  opacity: 1;
`;
