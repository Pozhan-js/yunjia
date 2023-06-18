import React from 'react'
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

function PgButton({className,name, rightArrow, href}) {
    const navigate = useNavigate();
    return (
        <PgButtonStyled className={`${className} inline-flex text-white text-[1.13rem] font-msrb cursor-pointer items-center`}
                        onClick={() => {
                            if (href.includes('http')) {
                                window.open(href)
                            } else {
                                navigate(href);
                            }
                        }}
        >
            {name}
            {rightArrow &&
                (<svg className="w-3 h-3 text-white fill-current flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"/>
                </svg>)}
        </PgButtonStyled>
    )
}

const PgButtonStyled = styled.a`
  width: 11.25rem;
  height: 3rem;
  background: #B902FD;
  opacity: 1;
  padding: 1rem 2rem;
  border-radius: 0.83rem 0.83rem 0.83rem 0.83rem;
  filter: blur(undefinedpx);

`;
export default PgButton;
