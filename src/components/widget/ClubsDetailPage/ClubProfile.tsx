import React from 'react'
import styled from "styled-components";
import AssetsImgs from "./AssetsImgs";
import {Tooltip} from "antd";

export default function ClubProfile({profile, sire, cardBg}: any) {
    return (
        <ClubProStyled>
            <div
                style={{backgroundColor: cardBg}}
                className="mg-card-profile w-1/1 py-4 px-6 text-white text-sm">
                <div className=" flex  items-center">
                    <img className=" w-6" src={AssetsImgs.ic_club_profile}/>
                    <div className=" ml-2 text-base">Profile</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Age (DOB)</div>
                    <div className=" ml-auto text-right mg-text-color-1">{profile?.age}</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Sex</div>
                    <div className=" ml-auto text-right">{profile?.sex}</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Color</div>
                    <div className=" ml-auto text-right">{profile?.color}</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Rating</div>
                    <div className=" ml-auto text-right">{profile?.rating}</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Trainer</div>
                    <div className=" ml-auto text-right">{profile?.trainer}</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Current Location</div>
                    <div className=" ml-auto text-right mg-text-color-2">{profile?.location}</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Birth of Country</div>
                    <div className=" ml-auto text-right mg-text-color-3">{profile?.country}</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Passport ID</div>
                    <div className=" ml-auto text-right">{profile?.passportid}</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Issue By</div>
                    <div className=" ml-auto text-right">{profile?.issue}</div>
                </div>
            </div>
            <div
                style={{backgroundColor: cardBg}}
                className=" mg-card-profile w-1/1 py-4 px-6 text-white text-sm mt-5">
                <div className=" flex  items-center">
                    <img className=" w-6" src={AssetsImgs.ic_club_sire}/>
                    <div className=" ml-2  text-base">Sire</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Breeder</div>
                    <Tooltip title={sire?.breeder}>
                        <div className=" ml-auto text-right max-w-[8rem] truncate">{sire?.breeder}</div>
                    </Tooltip>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Sire</div>
                    <div className=" ml-auto text-right  mg-text-color-3">{sire?.sire}</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Dam</div>
                    <div className=" ml-auto text-right">{sire?.dam}</div>
                </div>
                <div className=" flex  items-center w-1/1  mt-4">
                    <div className=" opacity-40">Dam's Sire</div>
                    <div className=" ml-auto text-right">{sire?.damsire}</div>
                </div>
            </div>
        </ClubProStyled>
    )
}

const ClubProStyled = styled.div`
  .mg-card-profile {

    border-radius: 0.63rem;
    border: 0.06rem solid #33333C;

    .mg-text-color-1 {
      color: #4CAD6DFF;
    }

    .mg-text-color-2 {
      color: #FFA033FF;
    }

    .mg-text-color-3 {
      color: #FC35A7FF;
    }
  }
`;
