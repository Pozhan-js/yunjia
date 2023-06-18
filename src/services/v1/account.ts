import axios from "axios";

export async function sendVCodeToEmail(email: string) {
    return axios.get(`/api/account?type=code&email=${email}`);
}

export async function sendVCodeToEmailForgotpwd(email: string) {
    return axios.get(`/api/account?type=code&codetype=forgotpwd&email=${email}`);
}

// 检查账户
export async function checkAccountEmail(email: string) {
    return axios.get(`/api/account?type=checkaccount&account=${email}`);
}

// 重置密码：
export async function resetPassword(code: string, pwd: string) {
    return axios.get(`/api/account?type=resetpwd&code=${code}&pwd=${pwd}`);
}

// 找回密码邮件
export async function retrievePwdToEmail(code: string, email: string, host: string) {
    return axios.get(`/api/account?type=forgotpwd&code=${code}&email=${email}&host=${encodeURIComponent(host)}`);
}

export async function logout(token: string) {
    return axios.get(`/api/account?type=logout&token=${token}`);
}

export async function login(account: string, pwd: string) {
    return axios.get(`/api/account?type=login&account=${account}&pwd=${pwd}`);
}

export async function registerBind(nickname: string, email: string, pwd: string, address: string, code: string, signature: string) {
    return axios.post('/api/account', { type: 'bind', nickname, email, pwd, address, code, signature });
    //return axios.get(`/api/account?type=bind&nickname=${nickname}&email=${email}&pwd=${pwd}&address=${address}&code=${code}&signature=${signature}`);
}

export async function userInfo(token: string, address: string, signature: string) {
    return axios.get(`/api/account?type=userinfo&token=${token}&address=${address}&signature=${signature}`);
}

export async function loginaddress(address: string, signature: string) {
    return axios.get(`/api/account?type=loginaddress&address=${address}&signature=${signature}`);
}
export async function loginbind(address: string, signature: string, email: string, pwd: string) {
    return axios.get(`/api/account?type=loginbind&address=${address}&signature=${signature}&account=${email}&pwd=${pwd}`);
}
