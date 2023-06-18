import React from 'react';
import styled from 'styled-components';
import AssetsImgs from '@/assets/AssetsImgs'

const data = [
    {
        id: 1,
        name: 'Lorem Ipsum',
        image: AssetsImgs.ic_discord,
        currency: '500.6 ETH'
    },
    {
        id: 2,
        name: 'Jane Doe',
        image: AssetsImgs.ic_discord,
        currency: '500.6 ETH'
    },
    {
        id: 3,
        name: 'John Doe',
        image: AssetsImgs.ic_discord,
        currency: '500.6 ETH'
    },
    {
        id: 4,
        name: 'Sarah Doe',
        image: AssetsImgs.ic_discord,
        currency: '500.6 ETH'
    }
]

export default function RankCard({ aosName }) {
    return (
        <RankCardStyled data-aos={aosName}>
            {
                data.map((item) => {
                    return <div key={item.id} className="card">
                        <div className="number">
                            <p>0 {item.id}</p>
                        </div>
                        <div className="profile">
                            <img src={item.image} alt="" />
                            <div className="text">
                                <h4>{item.name}</h4>
                                <p>{item.currency}</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </RankCardStyled>
    )
}

const RankCardStyled = styled.div`
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.03);
    transition: all .4s ease-in-out;
    &:hover{
        transform: translateY(-20px);
    }
    .card{
        display: flex;
        align-items: center;
        padding: 1.5rem 1rem;
        .number{
            padding-right: 1rem;
            font-size: 1.6rem;
            opacity: 0.5;
            p{
                font-weight: 700;
            }
        }
        .profile{
            display: flex;
            img{
                width: 70px;
                height: 70px;
                object-fit: cover;
                border-radius: 50%;
                margin-right: 1rem;
                border: 2px solid #395FF6;
            }

            .text{
                display: flex;
                flex-direction: column;
                justify-content: center;
                h4{
                    font-weight: 500;
                }
                p{
                    padding-top: .5rem;
                    opacity: 0.5;
                }
            }
        }
    }
`;