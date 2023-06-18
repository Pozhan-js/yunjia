import axios from "axios";

export async function getHeaderBanner() {
    return axios.get("/api/index")
}


export async function getMint() {
    return axios.get("/api/indexfuturemint");
}

export async function getHotSell() {
    return axios.get("/api/indexhotad");
}

export async function getRank() {
    return axios.get("/api/indexrank");
}

export async function getRoadMap() {
    return axios.get("/api/indexroadmap");
}

export async function getDailyHorsePedia() {
    return axios.get("/api/indexdaily");
}

export async function subscribeEmail(email: string) {
    return axios.post("https://coije1jbmh.execute-api.us-west-1.amazonaws.com/production/subscription", {
        emailAddress: email
    });
}

export async function clubsInfo() {
    return axios.get("/api/data?type=jockeyclub");
}

export async function getModules() {
    return axios.get("/api/data?type=moduleshow");
}

export async function getPartners() {
    return axios.get('/api/data?type=partner');
}

export async function getMediaEvaluations() {
    return axios.get('/api/indexmedia');
}

export async function getNewsList(page) {
    return axios.get(`/api/maindata?type=newslist&page=${page}`);
}

export async function getRacing() {
    return axios.get('/api/clubs?type=racings');
}

export async function getTreasury()
{
    return axios.get('/api/data?type=treasury');
}
export async function getBonusRank()
{
    return axios.get('/api/clubs?type=topclubs');
}


export async function getRacingNotice()
{
    return axios.get('/api/maindata?type=racings');
}
