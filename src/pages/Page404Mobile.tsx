import React from 'react'
import styled from "styled-components";
import AssetsImgs from '@/assets/AssetsImgs'
import { useNavigate } from 'react-router-dom'

export default function Page404Mobile() {
    const navigate = useNavigate();
    return (
        <PageStyled className=' w-full h-screen  px-5 pt-[6rem] '>
            <div className=' w-full text-left'>
                <img src={AssetsImgs.img404} className=" w-full inline-block object-cover"></img>
            </div>
            <div className='  w-full text-center mx-auto mt-12 '>
                <div className=' text-white mg-404-text-3xl font-gtwalb '>Oops, Sorry!</div>
                <div className=' text-white mg-404-text-xl font-gtwal mt-[1.13rem]'>This page isn’t available</div>
                <div className=' text-white text-base font-gtwal mt-[1.38rem]'>The page you were looking for couant
                    be Tound.
                </div>
                <div className=' mt-10'>
                    <div
                        className={`btn mg-btn text-white mx-auto cursor-pointer text-base  transition duration-150 ease-in-out`}
                        onClick={() => {
                            navigate(`/`)
                        }}>
                        Back to Home Page
                        <img src={AssetsImgs.ic_arrow} className=" w-4 h-4 inline-block ml-1" />
                    </div>
                </div>
            </div>

        </PageStyled>

    )
}

const PageStyled = styled.div`
  background-color: #25194A;

  .mg-btn {
    width: 15rem;
    height: 3.63rem;
    background: #6F19F7;
    border-radius: 1.13rem;
    padding: 0.75rem 0.8rem;
  }

  .mg-404-text-3xl {
    font-size: 3rem;
  }

  .mg-404-text-xl {
    font-size: 1.2rem;
  }
`;
