import axios from "axios";

export async function getMintBanner() {
    return axios.get("/api/mintbanner");
}

export async function getMintList(page: string | number) {
    return axios.get("/api/mints?page=" + page);
}

export async function getMintDetails(id: string | number) {
    return axios.get("/api/mintdetail?id=" + id);
}

export async function getScrollNews() {
    return axios.get("/api/data?type=scrollnews");
}

export async function getPool() {
    return axios.get("/api/data?type=pool");
}

export async function getMintDiscount(id: string | number, address: string) {
    if (address == undefined) return;
    return axios.get(`/api/data?type=discount&mintid=${id}&address=${address}`);
}

export async function getBatchMintSign(id: string | number, address: string, num: string | number) {
    if (address == undefined) return;
    return axios.get(`/api/data?type=mintsign&mintid=${id}&address=${address}&num=${num}`);
}
