// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const Mock = require('mockjs');

const router = express.Router();

router.get('/some/path', (req, res) => {
    const data = Mock.mock({
        'area|2-4': {
            '110000': '北京市',
            '120000': '天津市',
            '130000': '河北省',
            '140000': '山西省',
        },
    });
    res.json(data);
});

router.get('/tables', (req, res) => {
    const inlineNameList = ['10kV进线', '1#电房10kV进线', '2#电房10kV进线', '甲线', '乙线', '总配电室进线柜'];

    const factoryNameList = [
        '万安纸业',
        '大地水泥',
        '廊坊盛森',
        '广东演示工厂1',
        '富晶特玻新材料',
        '德中飞美家具',
        '联合钢铁',
        '鑫睿特管',
        '兴龙轮毂',
        '京通矿业',
        '六沟科技产业园',
    ];
    const factoryIndustryList = [
        '造纸印刷',
        '水泥建材',
        '机械制造',
        '玻璃陶瓷',
        '泰盛商务大厦',
        '汽车制造',
        '煤矿采选',
        '其他行业',
    ];
    const data = Mock.mock({
        total: 31,
        'rows|10': [
            {
                'factory_id|+1': 1,
                inline_id: '@natural(1, 100)',
                inline_name: `@pick(${inlineNameList})`,
                factory_name: `@pick(${factoryNameList})`,
                factory_industry: `@pick(${factoryIndustryList})`,
                basic_space: '@natural(1, 10000)',
                running_space: '@natural(1, 10000)',
                cos_avg: '@float(0,1)',
                cost_charge: '@float(-1,1)',
                last_3_month_charge: '@float(-1, 1, 0, 2)',
            },
        ],
    });
    res.json(data);
});
module.exports = router;
