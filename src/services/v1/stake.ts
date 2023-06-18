import axios from "axios";


export async function getStakeMain(account: string) {
    if (account == undefined) return;
    return axios.get(`/api/stake?type=main&address=${account}`);
}

export async function getStakeMyNft(clubId: string | number, account: string, order: string) {
    if (account == undefined) return;
    return axios.get(`/api/stake?type=mynft&address=${account}&clubid=${clubId}&order=${order}`);
}

export async function getStakeMyStakeNft(clubId: string | number, account: string) {
    if (account == undefined) return;
    return axios.get(`/api/stake?type=mystakenft&address=${account}&clubid=` + clubId);
}

export async function claimOMH(address: string) {
    if (address == undefined) return;
    return axios.get(`/api/stake?type=claim&address=${address}`);
}


export async function getTopClubs(address: string) {
    if (address == undefined) return;
    return axios.get(`/api/clubs?type=topclubs&address=${address}`);
}
// export async function getTestStake(tokenIds, account) {
//     return axios.get(`/api/stake?type=teststake&address=${account}&tokenIds=` + tokenIds);
// }
