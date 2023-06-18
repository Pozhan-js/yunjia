import axios from "axios";

export async function getNftList(address: string, clubid: number, lv: number) {
    if (address == undefined) return;
    return axios.get(`/api/compose?type=index&address=${address}&clubid=${clubid}&lv=${lv}`);
}

export async function getComposeNftSign(address: string, mid: number, cids: string) {
    return axios.get(`/api/compose?type=sign&address=${address}&mid=${mid}&cids=${cids}`);
}
