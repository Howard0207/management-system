// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const Mock = require('mockjs');

const router = express.Router();
const factoryList = [
    '万安纸业',
    '大地水泥',
    '廊坊盛森',
    '广东演示工厂1',
    '泰盛商务大厦',
    '德中飞美家具',
    '博远科技',
    '富晶特玻新材料',
    '兴龙轮毂',
    '德鑫矿业',
    '京通矿业',
    '路川水泥',
    '六沟科技产业园',
    '金岭矿业',
    '联合钢铁',
    '鑫睿特管',
    '中天石油装备',
    '华都食品',
    '远联钢铁',
    '科创中心',
];

const addressList = [
    '广东万安纸业有限公司',
    '茂名市大地水泥有限公司',
    '廊坊盛森磨具有限公司',
    '广东演示工厂1有限公司',
    '秦皇岛泰盛商务大厦',
    '河北博远科技有限公司',
    '秦皇岛中秦兴龙轮毂有限公司',
    '承德县德鑫矿业有限公司',
    '京通集团矿业有限公司',
    '承德路川水泥有限公司',
    '承德县六沟科技产业园',
    '承德县金岭矿业集团有限公司',
    '广东粤北联合钢铁有限公司',
    '天津市中天石油装备有限公司',
    '河北滦平华都食品有限公司',
    '远联钢铁有限责任公司',
    '惠南投资科创中心',
];

const logoList = [
    'http://www.dev.elecsafe.soejh.com/static/img/logo.png',
    'http://www.dev.elecsafe.soejh.com/static/yudaxinneng/img/logo.png',
    'http://www.dev.elecsafe.soejh.com/static/huayushoudian/img/logo.png',
];

router.get('/factory-list', (req, res) => {
    const data = Mock.mock({
        'factoryList|10': [
            {
                name: `@pick(${factoryList})`,
                id: '@id',
                'fullName|1': addressList,
                logo: `@pick(${logoList})`,
            },
        ],
    });
    res.json(data);
});

module.exports = router;
