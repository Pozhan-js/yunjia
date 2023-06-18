interface ThemeSettings {
    // 导航栏颜色
    navColor: string;
    // 底部颜色
    footerColor: string;
    // 页面背景颜色
    bgColor: string;
    // NFT大按钮颜色
    nftBigBtn: {
        color: string;
        disableColor: string;
    }
    // NFT小按钮颜色
    nftSmallBtn: {
        color: string;
        disableColor: string;
    }
    // 首页样式
    homePage: {
        BestHorses: {
            powerBg: string;
        },
        PrivateJockeyClubs: {
            bgColor: string;
            cardBg: string;
        }
    }
    // mint页样式
    mintPage: {
        topic: {
            bgColor: string;
        }
        mintListItem: {
            bgColor: string;
        }
    },
    // mint详情页样式
    mintDetailPage: {
        NftCard: {
            bgColor: string;
            powerBg?: string;
        }
    },
    // 质押页样式
    stakePage: {
        topCard: {
            bgColor: string;
        }
        tooltip: any;
    },
    // 个人中心样式
    personalPage: {
        topBg: string,
        bgColor: string,
        topCard: {
            bgColor: string
        }
    },
    // 问题页样式
    faqsPage: {
        bgColor: string;
    },
    // 俱乐部页样式
    clubsPage: {
        cardBg: string;
    }
}

const Settings: ThemeSettings = {
    navColor: '#22193FE0',
    footerColor: '#25194AFF',
    bgColor: '#25194E',
    nftBigBtn: {
        color: '#DB00FFFF',
        disableColor: '#5E3C93',
    },
    nftSmallBtn: {
        color: '#B902FD',
        disableColor: '#5E3C93',
    },
    homePage: {
        BestHorses: {
            powerBg: 'linear-gradient(90deg, rgba(22, 21, 25, 0) 0%, #391F61 41.15%, #422580 51.56%, #391F61 63.02%, rgba(22, 21, 25, 0) 100%)'
        },
        PrivateJockeyClubs: {
            bgColor: '#25194E',
            cardBg: '#35256E'
        }
    },
    mintPage: {
        topic: {
            bgColor: 'linear-gradient(263.53deg, #5738CB 6.32%, #851ED6 86.16%)'
        },
        mintListItem: {
            bgColor: '#45338B73'
        }
    },
    stakePage: {
        topCard: {
            bgColor: 'rgba(69, 51, 139, 0.45)'
        },
        tooltip: {
            bgColor: '#5032A7FF'
        }
    },
    mintDetailPage: {
        NftCard: {
            bgColor: 'rgba(104,53,184,0.4)',
            powerBg: 'linear-gradient(90deg, rgba(22,21,25,0) 0%, #391F61 41%, #422580 52%, #391F61 63%, rgba(22,21,25,0) 100%)'
        }
    },
    personalPage: {
        topBg: '#433576FF',
        bgColor: '#2A1D56FF',
        topCard: {
            bgColor: '#45338B73'
        }
    },
    faqsPage: {
        bgColor: '#2A1D56FF'
    },
    clubsPage: {
        cardBg: '#45338B73'
    }


}

export default Settings;
