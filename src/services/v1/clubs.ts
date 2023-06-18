import axios from "axios";

export async function getClubsTop() {
    return axios.get("/api/clubs?type=index");
}

export async function getClubsTab(filter: string = '', key: string = '') {
    return axios.get(`/api/clubs?type=clublist&filter=${filter}&key=${key}`);
}

export async function getRacingTab(bdate: string = '', edate: string = '', key: string = '') {
    return axios.get(`/api/clubs?type=racinglist&bdate=${bdate}&edate=${edate}&key=${key}`);
}

export async function getBonusRankTab(filter: string = '', key: string = '') {
    return axios.get(`/api/clubs?type=rewardsrank&filter=${filter}&key=${key}`);
}

export async function getPowerRankTab(address: string = '') {
    return axios.get(`/api/clubs?type=powerrank&address=${address}`);
}


