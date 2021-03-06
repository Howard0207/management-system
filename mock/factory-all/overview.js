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

router.get('/statistic_power', (req, res) => {
    const result = {
        date: [
            '00:00',
            '00:15',
            '00:30',
            '00:45',
            '01:00',
            '01:15',
            '01:30',
            '01:45',
            '02:00',
            '02:15',
            '02:30',
            '02:45',
            '03:00',
            '03:15',
            '03:30',
            '03:45',
            '04:00',
            '04:15',
            '04:30',
            '04:45',
            '05:00',
            '05:15',
            '05:30',
            '05:45',
            '06:00',
            '06:15',
            '06:30',
            '06:45',
            '07:00',
            '07:15',
            '07:30',
            '07:45',
            '08:00',
            '08:15',
            '08:30',
            '08:45',
            '09:00',
            '09:15',
            '09:30',
            '09:45',
            '10:00',
            '10:15',
            '10:30',
            '10:45',
            '11:00',
            '11:15',
            '11:30',
            '11:45',
            '12:00',
            '12:15',
            '12:30',
            '12:45',
            '13:00',
            '13:15',
            '13:30',
            '13:45',
            '14:00',
            '14:15',
            '14:30',
            '14:45',
            '15:00',
            '15:15',
            '15:30',
            '15:45',
            '16:00',
            '16:15',
            '16:30',
            '16:45',
            '17:00',
            '17:15',
            '17:30',
            '17:45',
            '18:00',
            '18:15',
            '18:30',
            '18:45',
            '19:00',
            '19:15',
            '19:30',
            '19:45',
            '20:00',
            '20:15',
            '20:30',
            '20:45',
            '21:00',
            '21:15',
            '21:30',
            '21:45',
            '22:00',
            '22:15',
            '22:30',
            '22:45',
            '23:00',
            '23:15',
            '23:30',
            '23:45',
        ],
        current_power: [
            { name: '2020-05-19 00:00:00', value: ['2020-05-19 00:00:00', 162324.64] },
            { name: '2020-05-19 01:00:00', value: ['2020-05-19 01:00:00', 151040.94] },
            { name: '2020-05-19 02:00:00', value: ['2020-05-19 02:00:00', 154607.29] },
            { name: '2020-05-19 03:00:00', value: ['2020-05-19 03:00:00', 145600.7] },
            { name: '2020-05-19 04:00:00', value: ['2020-05-19 04:00:00', 154785.32] },
            { name: '2020-05-19 05:00:00', value: ['2020-05-19 05:00:00', 155759.48] },
            { name: '2020-05-19 06:00:00', value: ['2020-05-19 06:00:00', 152981.32] },
            { name: '2020-05-19 07:00:00', value: ['2020-05-19 07:00:00', 150484.56] },
            { name: '2020-05-19 08:00:00', value: ['2020-05-19 08:00:00', 107113.14] },
            { name: '2020-05-19 09:00:00', value: ['2020-05-19 09:00:00', 112258.88] },
            { name: '2020-05-19 10:00:00', value: ['2020-05-19 10:00:00', ''] },
            { name: '2020-05-19 11:00:00', value: ['2020-05-19 11:00:00', ''] },
            { name: '2020-05-19 12:00:00', value: ['2020-05-19 12:00:00', ''] },
            { name: '2020-05-19 13:00:00', value: ['2020-05-19 13:00:00', ''] },
            { name: '2020-05-19 14:00:00', value: ['2020-05-19 14:00:00', ''] },
            { name: '2020-05-19 15:00:00', value: ['2020-05-19 15:00:00', ''] },
            { name: '2020-05-19 16:00:00', value: ['2020-05-19 16:00:00', ''] },
            { name: '2020-05-19 17:00:00', value: ['2020-05-19 17:00:00', ''] },
            { name: '2020-05-19 18:00:00', value: ['2020-05-19 18:00:00', ''] },
            { name: '2020-05-19 19:00:00', value: ['2020-05-19 19:00:00', ''] },
            { name: '2020-05-19 20:00:00', value: ['2020-05-19 20:00:00', ''] },
            { name: '2020-05-19 21:00:00', value: ['2020-05-19 21:00:00', ''] },
            { name: '2020-05-19 22:00:00', value: ['2020-05-19 22:00:00', ''] },
            { name: '2020-05-19 23:00:00', value: ['2020-05-19 23:00:00', ''] },
        ],
        current_p: [
            { name: '2020-05-19 00:00:00', value: ['2020-05-19 00:00:00', 155749.57] },
            { name: '2020-05-19 00:15:00', value: ['2020-05-19 00:15:00', 173551.71] },
            { name: '2020-05-19 00:30:00', value: ['2020-05-19 00:30:00', 161809.22] },
            { name: '2020-05-19 00:45:00', value: ['2020-05-19 00:45:00', 158188.04] },
            { name: '2020-05-19 01:00:00', value: ['2020-05-19 01:00:00', 165483.23] },
            { name: '2020-05-19 01:15:00', value: ['2020-05-19 01:15:00', 154824.68] },
            { name: '2020-05-19 01:30:00', value: ['2020-05-19 01:30:00', 144957.23] },
            { name: '2020-05-19 01:45:00', value: ['2020-05-19 01:45:00', 138898.6] },
            { name: '2020-05-19 02:00:00', value: ['2020-05-19 02:00:00', 140912.28] },
            { name: '2020-05-19 02:15:00', value: ['2020-05-19 02:15:00', 145300.93] },
            { name: '2020-05-19 02:30:00', value: ['2020-05-19 02:30:00', 171959.43] },
            { name: '2020-05-19 02:45:00', value: ['2020-05-19 02:45:00', 160256.54] },
            { name: '2020-05-19 03:00:00', value: ['2020-05-19 03:00:00', 156686.89] },
            { name: '2020-05-19 03:15:00', value: ['2020-05-19 03:15:00', 147193.04] },
            { name: '2020-05-19 03:30:00', value: ['2020-05-19 03:30:00', 137873.89] },
            { name: '2020-05-19 03:45:00', value: ['2020-05-19 03:45:00', 140648.99] },
            { name: '2020-05-19 04:00:00', value: ['2020-05-19 04:00:00', 153908.91] },
            { name: '2020-05-19 04:15:00', value: ['2020-05-19 04:15:00', 150174.14] },
            { name: '2020-05-19 04:30:00', value: ['2020-05-19 04:30:00', 149961.99] },
            { name: '2020-05-19 04:45:00', value: ['2020-05-19 04:45:00', 165096.27] },
            { name: '2020-05-19 05:00:00', value: ['2020-05-19 05:00:00', 160064.11] },
            { name: '2020-05-19 05:15:00', value: ['2020-05-19 05:15:00', 148064.39] },
            { name: '2020-05-19 05:30:00', value: ['2020-05-19 05:30:00', 172012.31] },
            { name: '2020-05-19 05:45:00', value: ['2020-05-19 05:45:00', 142897.1] },
            { name: '2020-05-19 06:00:00', value: ['2020-05-19 06:00:00', 159768.81] },
            { name: '2020-05-19 06:15:00', value: ['2020-05-19 06:15:00', 147078.24] },
            { name: '2020-05-19 06:30:00', value: ['2020-05-19 06:30:00', 146363.08] },
            { name: '2020-05-19 06:45:00', value: ['2020-05-19 06:45:00', 158715.13] },
            { name: '2020-05-19 07:00:00', value: ['2020-05-19 07:00:00', 151549.49] },
            { name: '2020-05-19 07:15:00', value: ['2020-05-19 07:15:00', 155428.92] },
            { name: '2020-05-19 07:30:00', value: ['2020-05-19 07:30:00', 158673.32] },
            { name: '2020-05-19 07:45:00', value: ['2020-05-19 07:45:00', 136286.5] },
            { name: '2020-05-19 08:00:00', value: ['2020-05-19 08:00:00', 121001.52] },
            { name: '2020-05-19 08:15:00', value: ['2020-05-19 08:15:00', 143027.45] },
            { name: '2020-05-19 08:30:00', value: ['2020-05-19 08:30:00', 137244.3] },
            { name: '2020-05-19 08:45:00', value: ['2020-05-19 08:45:00', 134354.42] },
            { name: '2020-05-19 09:00:00', value: ['2020-05-19 09:00:00', 159410.28] },
            { name: '2020-05-19 09:15:00', value: ['2020-05-19 09:15:00', 148497.13] },
            { name: '2020-05-19 09:30:00', value: ['2020-05-19 09:30:00', 151014.76] },
            { name: '2020-05-19 09:45:00', value: ['2020-05-19 09:45:00', 97608.88] },
            { name: '2020-05-19 10:00:00', value: ['2020-05-19 10:00:00', ''] },
            { name: '2020-05-19 10:15:00', value: ['2020-05-19 10:15:00', ''] },
            { name: '2020-05-19 10:30:00', value: ['2020-05-19 10:30:00', ''] },
            { name: '2020-05-19 10:45:00', value: ['2020-05-19 10:45:00', ''] },
            { name: '2020-05-19 11:00:00', value: ['2020-05-19 11:00:00', ''] },
            { name: '2020-05-19 11:15:00', value: ['2020-05-19 11:15:00', ''] },
            { name: '2020-05-19 11:30:00', value: ['2020-05-19 11:30:00', ''] },
            { name: '2020-05-19 11:45:00', value: ['2020-05-19 11:45:00', ''] },
            { name: '2020-05-19 12:00:00', value: ['2020-05-19 12:00:00', ''] },
            { name: '2020-05-19 12:15:00', value: ['2020-05-19 12:15:00', ''] },
            { name: '2020-05-19 12:30:00', value: ['2020-05-19 12:30:00', ''] },
            { name: '2020-05-19 12:45:00', value: ['2020-05-19 12:45:00', ''] },
            { name: '2020-05-19 13:00:00', value: ['2020-05-19 13:00:00', ''] },
            { name: '2020-05-19 13:15:00', value: ['2020-05-19 13:15:00', ''] },
            { name: '2020-05-19 13:30:00', value: ['2020-05-19 13:30:00', ''] },
            { name: '2020-05-19 13:45:00', value: ['2020-05-19 13:45:00', ''] },
            { name: '2020-05-19 14:00:00', value: ['2020-05-19 14:00:00', ''] },
            { name: '2020-05-19 14:15:00', value: ['2020-05-19 14:15:00', ''] },
            { name: '2020-05-19 14:30:00', value: ['2020-05-19 14:30:00', ''] },
            { name: '2020-05-19 14:45:00', value: ['2020-05-19 14:45:00', ''] },
            { name: '2020-05-19 15:00:00', value: ['2020-05-19 15:00:00', ''] },
            { name: '2020-05-19 15:15:00', value: ['2020-05-19 15:15:00', ''] },
            { name: '2020-05-19 15:30:00', value: ['2020-05-19 15:30:00', ''] },
            { name: '2020-05-19 15:45:00', value: ['2020-05-19 15:45:00', ''] },
            { name: '2020-05-19 16:00:00', value: ['2020-05-19 16:00:00', ''] },
            { name: '2020-05-19 16:15:00', value: ['2020-05-19 16:15:00', ''] },
            { name: '2020-05-19 16:30:00', value: ['2020-05-19 16:30:00', ''] },
            { name: '2020-05-19 16:45:00', value: ['2020-05-19 16:45:00', ''] },
            { name: '2020-05-19 17:00:00', value: ['2020-05-19 17:00:00', ''] },
            { name: '2020-05-19 17:15:00', value: ['2020-05-19 17:15:00', ''] },
            { name: '2020-05-19 17:30:00', value: ['2020-05-19 17:30:00', ''] },
            { name: '2020-05-19 17:45:00', value: ['2020-05-19 17:45:00', ''] },
            { name: '2020-05-19 18:00:00', value: ['2020-05-19 18:00:00', ''] },
            { name: '2020-05-19 18:15:00', value: ['2020-05-19 18:15:00', ''] },
            { name: '2020-05-19 18:30:00', value: ['2020-05-19 18:30:00', ''] },
            { name: '2020-05-19 18:45:00', value: ['2020-05-19 18:45:00', ''] },
            { name: '2020-05-19 19:00:00', value: ['2020-05-19 19:00:00', ''] },
            { name: '2020-05-19 19:15:00', value: ['2020-05-19 19:15:00', ''] },
            { name: '2020-05-19 19:30:00', value: ['2020-05-19 19:30:00', ''] },
            { name: '2020-05-19 19:45:00', value: ['2020-05-19 19:45:00', ''] },
            { name: '2020-05-19 20:00:00', value: ['2020-05-19 20:00:00', ''] },
            { name: '2020-05-19 20:15:00', value: ['2020-05-19 20:15:00', ''] },
            { name: '2020-05-19 20:30:00', value: ['2020-05-19 20:30:00', ''] },
            { name: '2020-05-19 20:45:00', value: ['2020-05-19 20:45:00', ''] },
            { name: '2020-05-19 21:00:00', value: ['2020-05-19 21:00:00', ''] },
            { name: '2020-05-19 21:15:00', value: ['2020-05-19 21:15:00', ''] },
            { name: '2020-05-19 21:30:00', value: ['2020-05-19 21:30:00', ''] },
            { name: '2020-05-19 21:45:00', value: ['2020-05-19 21:45:00', ''] },
            { name: '2020-05-19 22:00:00', value: ['2020-05-19 22:00:00', ''] },
            { name: '2020-05-19 22:15:00', value: ['2020-05-19 22:15:00', ''] },
            { name: '2020-05-19 22:30:00', value: ['2020-05-19 22:30:00', ''] },
            { name: '2020-05-19 22:45:00', value: ['2020-05-19 22:45:00', ''] },
            { name: '2020-05-19 23:00:00', value: ['2020-05-19 23:00:00', ''] },
            { name: '2020-05-19 23:15:00', value: ['2020-05-19 23:15:00', ''] },
            { name: '2020-05-19 23:30:00', value: ['2020-05-19 23:30:00', ''] },
            { name: '2020-05-19 23:45:00', value: ['2020-05-19 23:45:00', ''] },
        ],
        previous_p: [
            { name: '2020-05-19 00:00:00', value: ['2020-05-19 00:00:00', 139899.04] },
            { name: '2020-05-19 00:15:00', value: ['2020-05-19 00:15:00', 155667.23] },
            { name: '2020-05-19 00:30:00', value: ['2020-05-19 00:30:00', 138516.24] },
            { name: '2020-05-19 00:45:00', value: ['2020-05-19 00:45:00', 141660.38] },
            { name: '2020-05-19 01:00:00', value: ['2020-05-19 01:00:00', 152931.5] },
            { name: '2020-05-19 01:15:00', value: ['2020-05-19 01:15:00', 147098.01] },
            { name: '2020-05-19 01:30:00', value: ['2020-05-19 01:30:00', 140778.59] },
            { name: '2020-05-19 01:45:00', value: ['2020-05-19 01:45:00', 159325.12] },
            { name: '2020-05-19 02:00:00', value: ['2020-05-19 02:00:00', 126193.14] },
            { name: '2020-05-19 02:15:00', value: ['2020-05-19 02:15:00', 132856.47] },
            { name: '2020-05-19 02:30:00', value: ['2020-05-19 02:30:00', 142888.49] },
            { name: '2020-05-19 02:45:00', value: ['2020-05-19 02:45:00', 104584.74] },
            { name: '2020-05-19 03:00:00', value: ['2020-05-19 03:00:00', 104757.91] },
            { name: '2020-05-19 03:15:00', value: ['2020-05-19 03:15:00', 137761.38] },
            { name: '2020-05-19 03:30:00', value: ['2020-05-19 03:30:00', 136494.67] },
            { name: '2020-05-19 03:45:00', value: ['2020-05-19 03:45:00', 152890.75] },
            { name: '2020-05-19 04:00:00', value: ['2020-05-19 04:00:00', 146457.95] },
            { name: '2020-05-19 04:15:00', value: ['2020-05-19 04:15:00', 133757.6] },
            { name: '2020-05-19 04:30:00', value: ['2020-05-19 04:30:00', 139234.2] },
            { name: '2020-05-19 04:45:00', value: ['2020-05-19 04:45:00', 135663.08] },
            { name: '2020-05-19 05:00:00', value: ['2020-05-19 05:00:00', 142951.16] },
            { name: '2020-05-19 05:15:00', value: ['2020-05-19 05:15:00', 149995.37] },
            { name: '2020-05-19 05:30:00', value: ['2020-05-19 05:30:00', 147758.94] },
            { name: '2020-05-19 05:45:00', value: ['2020-05-19 05:45:00', 158256.11] },
            { name: '2020-05-19 06:00:00', value: ['2020-05-19 06:00:00', 153818.81] },
            { name: '2020-05-19 06:15:00', value: ['2020-05-19 06:15:00', 145199.8] },
            { name: '2020-05-19 06:30:00', value: ['2020-05-19 06:30:00', 153479.35] },
            { name: '2020-05-19 06:45:00', value: ['2020-05-19 06:45:00', 146454.32] },
            { name: '2020-05-19 07:00:00', value: ['2020-05-19 07:00:00', 161971.43] },
            { name: '2020-05-19 07:15:00', value: ['2020-05-19 07:15:00', 147860.51] },
            { name: '2020-05-19 07:30:00', value: ['2020-05-19 07:30:00', 122192.98] },
            { name: '2020-05-19 07:45:00', value: ['2020-05-19 07:45:00', 130663.68] },
            { name: '2020-05-19 08:00:00', value: ['2020-05-19 08:00:00', 116445.52] },
            { name: '2020-05-19 08:15:00', value: ['2020-05-19 08:15:00', 148489.1] },
            { name: '2020-05-19 08:30:00', value: ['2020-05-19 08:30:00', 153977.92] },
            { name: '2020-05-19 08:45:00', value: ['2020-05-19 08:45:00', 137637.41] },
            { name: '2020-05-19 09:00:00', value: ['2020-05-19 09:00:00', 161169.14] },
            { name: '2020-05-19 09:15:00', value: ['2020-05-19 09:15:00', 159488.39] },
            { name: '2020-05-19 09:30:00', value: ['2020-05-19 09:30:00', 154488.61] },
            { name: '2020-05-19 09:45:00', value: ['2020-05-19 09:45:00', 179463.28] },
            { name: '2020-05-19 10:00:00', value: ['2020-05-19 10:00:00', 159957.84] },
            { name: '2020-05-19 10:15:00', value: ['2020-05-19 10:15:00', 170753.46] },
            { name: '2020-05-19 10:30:00', value: ['2020-05-19 10:30:00', 170460.24] },
            { name: '2020-05-19 10:45:00', value: ['2020-05-19 10:45:00', 160805.93] },
            { name: '2020-05-19 11:00:00', value: ['2020-05-19 11:00:00', 177916.35] },
            { name: '2020-05-19 11:15:00', value: ['2020-05-19 11:15:00', 166768.17] },
            { name: '2020-05-19 11:30:00', value: ['2020-05-19 11:30:00', 169419.36] },
            { name: '2020-05-19 11:45:00', value: ['2020-05-19 11:45:00', 169965.08] },
            { name: '2020-05-19 12:00:00', value: ['2020-05-19 12:00:00', 137849.27] },
            { name: '2020-05-19 12:15:00', value: ['2020-05-19 12:15:00', 120963.6] },
            { name: '2020-05-19 12:30:00', value: ['2020-05-19 12:30:00', 161785.09] },
            { name: '2020-05-19 12:45:00', value: ['2020-05-19 12:45:00', 140525.32] },
            { name: '2020-05-19 13:00:00', value: ['2020-05-19 13:00:00', 141176.95] },
            { name: '2020-05-19 13:15:00', value: ['2020-05-19 13:15:00', 163702.17] },
            { name: '2020-05-19 13:30:00', value: ['2020-05-19 13:30:00', 160067.03] },
            { name: '2020-05-19 13:45:00', value: ['2020-05-19 13:45:00', 167243.6] },
            { name: '2020-05-19 14:00:00', value: ['2020-05-19 14:00:00', 156009.84] },
            { name: '2020-05-19 14:15:00', value: ['2020-05-19 14:15:00', 142937.83] },
            { name: '2020-05-19 14:30:00', value: ['2020-05-19 14:30:00', 99692.08] },
            { name: '2020-05-19 14:45:00', value: ['2020-05-19 14:45:00', 90367.7] },
            { name: '2020-05-19 15:00:00', value: ['2020-05-19 15:00:00', 99781.27] },
            { name: '2020-05-19 15:15:00', value: ['2020-05-19 15:15:00', 131642.04] },
            { name: '2020-05-19 15:30:00', value: ['2020-05-19 15:30:00', 142501.41] },
            { name: '2020-05-19 15:45:00', value: ['2020-05-19 15:45:00', 153312.53] },
            { name: '2020-05-19 16:00:00', value: ['2020-05-19 16:00:00', 152444.71] },
            { name: '2020-05-19 16:15:00', value: ['2020-05-19 16:15:00', 147046.49] },
            { name: '2020-05-19 16:30:00', value: ['2020-05-19 16:30:00', 151687.27] },
            { name: '2020-05-19 16:45:00', value: ['2020-05-19 16:45:00', 136021.75] },
            { name: '2020-05-19 17:00:00', value: ['2020-05-19 17:00:00', 150219.58] },
            { name: '2020-05-19 17:15:00', value: ['2020-05-19 17:15:00', 153208.81] },
            { name: '2020-05-19 17:30:00', value: ['2020-05-19 17:30:00', 148607.74] },
            { name: '2020-05-19 17:45:00', value: ['2020-05-19 17:45:00', 163944.47] },
            { name: '2020-05-19 18:00:00', value: ['2020-05-19 18:00:00', 152466.13] },
            { name: '2020-05-19 18:15:00', value: ['2020-05-19 18:15:00', 153986.24] },
            { name: '2020-05-19 18:30:00', value: ['2020-05-19 18:30:00', 168539.44] },
            { name: '2020-05-19 18:45:00', value: ['2020-05-19 18:45:00', 145378.86] },
            { name: '2020-05-19 19:00:00', value: ['2020-05-19 19:00:00', 169218.72] },
            { name: '2020-05-19 19:15:00', value: ['2020-05-19 19:15:00', 160627.91] },
            { name: '2020-05-19 19:30:00', value: ['2020-05-19 19:30:00', 156097.44] },
            { name: '2020-05-19 19:45:00', value: ['2020-05-19 19:45:00', 159898.63] },
            { name: '2020-05-19 20:00:00', value: ['2020-05-19 20:00:00', 138442.54] },
            { name: '2020-05-19 20:15:00', value: ['2020-05-19 20:15:00', 157883.15] },
            { name: '2020-05-19 20:30:00', value: ['2020-05-19 20:30:00', 156050.13] },
            { name: '2020-05-19 20:45:00', value: ['2020-05-19 20:45:00', 147241.67] },
            { name: '2020-05-19 21:00:00', value: ['2020-05-19 21:00:00', 170703.25] },
            { name: '2020-05-19 21:15:00', value: ['2020-05-19 21:15:00', 160514.24] },
            { name: '2020-05-19 21:30:00', value: ['2020-05-19 21:30:00', 148410.58] },
            { name: '2020-05-19 21:45:00', value: ['2020-05-19 21:45:00', 164241.39] },
            { name: '2020-05-19 22:00:00', value: ['2020-05-19 22:00:00', 154512.3] },
            { name: '2020-05-19 22:15:00', value: ['2020-05-19 22:15:00', 178505.42] },
            { name: '2020-05-19 22:30:00', value: ['2020-05-19 22:30:00', 156482.18] },
            { name: '2020-05-19 22:45:00', value: ['2020-05-19 22:45:00', 159203.38] },
            { name: '2020-05-19 23:00:00', value: ['2020-05-19 23:00:00', 157119.17] },
            { name: '2020-05-19 23:15:00', value: ['2020-05-19 23:15:00', 116478.85] },
            { name: '2020-05-19 23:30:00', value: ['2020-05-19 23:30:00', 143065.13] },
            { name: '2020-05-19 23:45:00', value: ['2020-05-19 23:45:00', 167473.94] },
        ],
    };
    res.json(result);
});
router.get('/echarts-map', (req, res) => {
    const { key } = req.query;
    let result = [];
    if (key === '440000') {
        result = [
            {
                provinceName: null,
                provinceKey: null,
                cityName: '惠州市',
                cityKey: 441300,
                user_number: 1,
                device_number: 3,
            },
            {
                provinceName: null,
                provinceKey: null,
                cityName: '肇庆市',
                cityKey: 441200,
                user_number: 1,
                device_number: 2,
            },
            {
                provinceName: null,
                provinceKey: null,
                cityName: '茂名市',
                cityKey: 440900,
                user_number: 1,
                device_number: 2,
            },
            {
                provinceName: null,
                provinceKey: null,
                cityName: '汕头市',
                cityKey: 440500,
                user_number: 1,
                device_number: 2,
            },
            {
                provinceName: null,
                provinceKey: null,
                cityName: '清远市',
                cityKey: 441800,
                user_number: 1,
                device_number: 6,
            },
        ];
    }
    if (key === '130000') {
        result = [
            {
                provinceName: null,
                provinceKey: null,
                cityName: '秦皇岛市',
                cityKey: 130300,
                user_number: 2,
                device_number: 8,
            },
            {
                provinceName: null,
                provinceKey: null,
                cityName: '廊坊市',
                cityKey: 131000,
                user_number: 0,
                device_number: 0,
            },
            {
                provinceName: null,
                provinceKey: null,
                cityName: '邢台市',
                cityKey: 130500,
                user_number: 2,
                device_number: 12,
            },
            {
                provinceName: null,
                provinceKey: null,
                cityName: '石家庄市',
                cityKey: 130100,
                user_number: 1,
                device_number: 3,
            },
            {
                provinceName: null,
                provinceKey: null,
                cityName: '承德市',
                cityKey: 130800,
                user_number: 5,
                device_number: 17,
            },
        ];
    }
    res.json(result);
});
module.exports = router;
