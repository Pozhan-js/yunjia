import axios from "axios";

export async function getFaqList(qtype='') {
    //?type=faq&qtype=2
    return axios.get(`/api/data?type=faq&qtype=${qtype ? qtype : ''}`);
}
