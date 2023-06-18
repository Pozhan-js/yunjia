const clubs_classes = [
    {
        label: 'minting',
        val: '1'
    },
    {
        label: 'training',
        val: '2'
    },
    {
        label: 'racing',
        val: '3'
    },
    {
        label: 'breeding',
        val: '4'
    },
    {
        label: 'mining',
        val: '5'
    },
    // {
    //     label: 'building',
    //     val: '6'
    // }
];
const horsePedia_classes = [
    {
        label: 'ALL',
        val: 'all'
    },
    {
        label: 'Buy',
        val: '1'
    },
    {
        label: 'Skil',
        val: '2'
    },
    {
        label: 'Racing',
        val: '3'
    },
    {
        label: 'Breeding',
        val: '4'
    },
    {
        label: 'Others',
        val: '0'
    },
];

const clubs_column = [
    // {
    //     label: 'Floor Price',
    //     val: 'floorprice',
    // },
    {
        label: 'Prize Pool',
        val: 'allcoin',
    },
    // {
    //     label: 'Volume',
    //     val: 'nftnum',
    // },
    // {
    //     label: 'Member',
    //     val: 'memnum',
    // },
    {
        label: 'State',
        val: 'clubstate'
    }
];

const bonusrank_column = [
    {
        label: 'Racing Count',
        val: 'rnum',
    },
    {
        label: 'Prize Pool',
        val: 'scoin',
    }
];
const powerrank_column = [
    {
        label: 'Power',
        val: 'spower',
    },
    {
        label: 'Owner',
        val: 'address',
    }
];

export {
    clubs_classes,
    clubs_column,
    bonusrank_column,
    powerrank_column,
    horsePedia_classes
}
