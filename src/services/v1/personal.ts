import axios from "axios";

export async function getMyInfo(address) {
    if (address == undefined) return;
    return axios.get("/api/profile?type=info&address=" + address);
}

export async function getMyInventory(address) {
    if (address == undefined) return;
    return axios.get("/api/profile?type=inventory&address=" + address);
}

export async function updateProfile(address, params) {
    if (address == undefined) return;
    return axios.post("/api/profilechg?address=" + address, params);
}

export async function getMyActivyty(address) {
    if (address == undefined) return;
    return axios.get("/api/profile?type=activity");
}
