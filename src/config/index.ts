import dev from "./dev";
import prod from "./prod";
// 是否开发模式
export const isDev = import.meta.env.MODE === "development";
export const __VERSION__ = 1.1;
export const config = {
    ETHERSCAN_URL: 'https://goerli.etherscan.io', // 链etherscan地址
    STAKE_CONTRACT_ADDRESS: '0xa5c6D68F6a0a908a31eDf0C0314720105FbEeF2C', // 质押合约地址
    OMH_ERC20_CONTRACT_ADDRESS: '0x6FEd93c941166E94b923514915054bA5ffE9ece5', // OMH代币合约地址
    DIVIDEND_POOL_CONTRACT_ADDRESS: '0x800f247fF19483D674613d0C707BC2D27CD7d7C5', // 分红池合约地址
    TRANSITION_CONTRACT_ADDRESS: '0x4d809f20A724E1D7D687a29cF6B42Ce13E4Bf768',  // 老NFT转换合约地址
    // 当前环境
    ...(isDev ? dev : prod)
}
