import axios from "axios";

export async function getHorseHubDetail(id) {
    return axios.get(`/api/horse?type=detailhub&id=${id}`);
}

export async function getMediaList(id, page) {
    return axios.get(`/api/horse?type=media&id=${id}&page=${page}`);
}
