// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const Mock = require('mockjs');

const router = express.Router();
const monitorItems = ['三相电压不平衡', '功率因数', '电压', '电压谐波', '电流谐波', '频率'];
router.get('/qualityList', (req, res) => {
    const result = monitorItems.map((item) => {
        return {
            name: item,
            detail: Math.round(Math.random()),
        };
    });
    const qualified = Mock.mock('@integer(0, 6)');
    res.json({
        qualified,
        unqualified: 6 - qualified,
        qualityList: result,
    });
});
module.exports = router;
