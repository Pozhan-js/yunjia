import axios from "axios";

export async function getClubDetailIndex(clubId: string | number) {
    return axios.get("/api/clubdetail?type=index&id=" + clubId);
}
//俱乐部赛事以及汇总
export async function getClubDetailMatch(clubId: string | number) {
    return axios.get("/api/clubdetail?type=match&id=" + clubId);
}

//俱乐部媒体子曰列表
export async function getClubDetailMedia(clubId: string | number) {
    return axios.get("/api/clubdetail?type=media&id=" + clubId);
}

//俱乐部权益详情
export async function getClubDetailBenefits(clubId: string | number) {
    return axios.get("/api/clubdetail?type=benefits&id=" + clubId);
}
export async function getNFTSaleList(clubId: string | number) {
    return axios.get("/api/clubdetail?type=mints&id=" + clubId);
}
export async function getMatchTime(club_id: string | number, bdate: string = '', edate: string = '', key: string = '') {
    return axios.get(`/api/clubdetail?type=racinglist&id=${club_id}&bdate=${bdate}&edate=${edate}&key=${key}`);
}
