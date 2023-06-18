import axios from "axios";

export async function getHorseHub(page: number | string, key: string, status: number | string) {
    return axios.get(`/api/horse?type=index&page=${page}&key=${key}&status=${status}`);
}
export async function getHorsePedia(page: number | string, key: string, ptype: number | string, orderBy: string) {
    return axios.get(`/api/horse?type=pedia&key=${key}&ptype=${ptype}&page=${page}&od=${orderBy}`);
}
export async function getHorseTypes() {
    return axios.get(`/api/data?type=horsefilter`);
}

export async function getHorsePediaDetail(id) {
    return axios.get(`/api/horse?type=detail&id=${id}`);
}
