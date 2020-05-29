import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import 'echarts/extension/bmap/bmap';
import ReactEcharts from 'echarts-for-react';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMap: false,
        };
    }

    getOption = () => {
        const geoCoordMap = {
            '1': [119.2070396626, 26.0471838188],
            '2': [119.2147498638, 26.0481609598],
            '3': [119.209339, 26.038355],
            '4': [119.2163806469, 26.0442086921],
            '5': [119.2132263691, 26.0498767809],
            '6': [119.219382299, 26.0524969442],
            '7': [119.2194920093, 26.0496647145],
            '8': [119.2194276363, 26.0475440293],
            '9': [119.225689, 26.044945],
            '10': [119.215699, 26.045237],
            '11': [119.2191260061, 26.0366349971],
            '12': [119.212969, 26.039069],
        };
        const oneData = [
            [
                {
                    name: '1',
                },
                {
                    name: '2',
                    value: 20,
                },
            ],
            [
                {
                    name: '1',
                },
                {
                    name: '3',
                    value: 20,
                },
            ],
            [
                {
                    name: '1',
                },
                {
                    name: '4',
                    value: 20,
                },
            ],
        ];
        const twoData = [
            [
                {
                    name: '5',
                },
                {
                    name: '6',
                    value: 20,
                },
            ],
            [
                {
                    name: '5',
                },
                {
                    name: '7',
                    value: 20,
                },
            ],
            [
                {
                    name: '5',
                },
                {
                    name: '8',
                    value: 20,
                },
            ],
        ];
        const threeData = [
            [
                {
                    name: '9',
                },
                {
                    name: '10',
                    value: 20,
                },
            ],
            [
                {
                    name: '9',
                },
                {
                    name: '11',
                    value: 20,
                },
            ],
            [
                {
                    name: '9',
                },
                {
                    name: '12',
                    value: 20,
                },
            ],
        ];

        const planePath =
            'path://M16.678,17.086h9.854l-2.703,5.912c5.596,2.428,11.155,5.575,16.711,8.607c3.387,1.847,6.967,3.75,10.541,5.375 v-6.16l-4.197-2.763v-5.318L33.064,12.197h-11.48L20.43,15.24h-4.533l-1.266,3.286l0.781,0.345L16.678,17.086z M49.6,31.84 l0.047,1.273L27.438,20.998l0.799-1.734L49.6,31.84z M33.031,15.1l12.889,8.82l0.027,0.769L32.551,16.1L33.031,15.1z M22.377,14.045 h9.846l-1.539,3.365l-2.287-1.498h1.371l0.721-1.352h-2.023l-0.553,1.037l-0.541-0.357h-0.34l0.359-0.684h-2.025l-0.361,0.684 h-3.473L22.377,14.045z M23.695,20.678l-0.004,0.004h0.004V20.678z M24.828,18.199h-2.031l-0.719,1.358h2.029L24.828,18.199z  M40.385,34.227c-12.85-7.009-25.729-14.667-38.971-12.527c1.26,8.809,9.08,16.201,8.213,24.328 c-0.553,4.062-3.111,0.828-3.303,7.137c15.799,0,32.379,0,48.166,0l0.066-4.195l1.477-7.23 C50.842,39.812,45.393,36.961,40.385,34.227z M13.99,35.954c-1.213,0-2.195-1.353-2.195-3.035c0-1.665,0.98-3.017,2.195-3.017 c1.219,0,2.195,1.352,2.195,3.017C16.186,34.604,15.213,35.954,13.99,35.954z M23.691,20.682h-2.02l-0.588,1.351h2.023 L23.691,20.682z M19.697,18.199l-0.721,1.358h2.025l0.727-1.358H19.697z';

        const convertData = function (data) {
            const res = [];
            for (let i = 0; i < data.length; i++) {
                const dataItem = data[i];
                const fromCoord = geoCoordMap[dataItem[1].name];
                const toCoord = geoCoordMap[dataItem[0].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[1].name,
                        toName: dataItem[0].name,
                        coords: [fromCoord, toCoord],
                    });
                }
            }
            return res;
        };

        const color = ['#a6c84c', '#ffa022', '#46bee9'];
        const series = [];
        [
            ['1', oneData],
            ['5', twoData],
            ['9', threeData],
        ].forEach(function (item, i) {
            series.push(
                {
                    name: item[0],
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke',
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                        },
                    },
                    symbolSize(val) {
                        return val[2] / 4;
                    },
                    showEffectOn: 'render',
                    itemStyle: {
                        normal: {
                            color: color[i],
                        },
                    },
                    data: [
                        {
                            name: item[0],
                            value: geoCoordMap[item[0]].concat([100]),
                        },
                    ],
                },
                {
                    name: `${item[0]} Top10`,
                    type: 'lines',
                    coordinateSystem: 'bmap',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#fff',
                        symbolSize: 3,
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 0,
                            curveness: 0.2,
                        },
                    },
                    data: convertData(item[1]),
                },
                {
                    name: `${item[0]} Top10`,
                    type: 'lines',
                    coordinateSystem: 'bmap',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: planePath,
                        symbolSize: 15,
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 1,
                            opacity: 0.4,
                            curveness: 0.2,
                        },
                    },
                    data: convertData(item[1]),
                },
                {
                    name: `${item[0]} Top10`,
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke',
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                        },
                    },
                    symbolSize(val) {
                        return val[2] / 4;
                    },
                    showEffectOn: 'render',
                    itemStyle: {
                        normal: {
                            color: color[i],
                        },
                    },
                    data: item[1].map(function (dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
                        };
                    }),
                }
            );
        });

        const option = {
            bmap: {
                // 百度地图中心经纬度 坐标拾取器http://api.map.baidu.com/lbsapi/getpoint/index.html
                center: [119.2166696096, 26.0446365813],
                // 百度地图缩放等级，数字越大，放大越大，地图比例尺越小
                zoom: 16,
                // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
                roam: true,
                // mapStyle是百度地图的自定义样式，见 http://developer.baidu.com/map/custom/
                mapStyle: {
                    styleJson: [
                        {
                            featureType: 'water',
                            elementType: 'all',
                            stylers: {
                                color: '#021019',
                            },
                        },
                        {
                            featureType: 'highway',
                            elementType: 'geometry.fill',
                            stylers: {
                                color: '#000000',
                            },
                        },
                        {
                            featureType: 'highway',
                            elementType: 'geometry.stroke',
                            stylers: {
                                color: '#147a92',
                            },
                        },
                        {
                            featureType: 'arterial',
                            elementType: 'geometry.fill',
                            stylers: {
                                color: '#000000',
                            },
                        },
                        {
                            featureType: 'arterial',
                            elementType: 'geometry.stroke',
                            stylers: {
                                color: '#0b3d51',
                            },
                        },
                        {
                            featureType: 'local',
                            elementType: 'geometry',
                            stylers: {
                                color: '#000000',
                            },
                        },
                        {
                            featureType: 'land',
                            elementType: 'all',
                            stylers: {
                                color: '#08304b',
                            },
                        },
                        {
                            featureType: 'railway',
                            elementType: 'geometry.fill',
                            stylers: {
                                color: '#000000',
                            },
                        },
                        {
                            featureType: 'railway',
                            elementType: 'geometry.stroke',
                            stylers: {
                                color: '#08304b',
                            },
                        },
                        {
                            featureType: 'subway',
                            elementType: 'geometry',
                            stylers: {
                                lightness: -70,
                            },
                        },
                        {
                            featureType: 'building',
                            elementType: 'geometry.fill',
                            stylers: {
                                color: '#000000',
                            },
                        },
                        {
                            featureType: 'all',
                            elementType: 'labels.text.fill',
                            stylers: {
                                color: '#857f7f',
                            },
                        },
                        {
                            featureType: 'all',
                            elementType: 'labels.text.stroke',
                            stylers: {
                                color: '#000000',
                            },
                        },
                        {
                            featureType: 'building',
                            elementType: 'geometry',
                            stylers: {
                                color: '#022338',
                            },
                        },
                        {
                            featureType: 'green',
                            elementType: 'geometry',
                            stylers: {
                                color: '#062032',
                            },
                        },
                        {
                            featureType: 'boundary',
                            elementType: 'all',
                            stylers: {
                                color: '#1e1c1c',
                            },
                        },
                        {
                            featureType: 'manmade',
                            elementType: 'geometry',
                            stylers: {
                                color: '#022338',
                            },
                        },
                        {
                            featureType: 'poi',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off',
                            },
                        },
                        {
                            featureType: 'all',
                            elementType: 'labels.icon',
                            stylers: {
                                visibility: 'off',
                            },
                        },
                        {
                            featureType: 'all',
                            elementType: 'labels.text.fill',
                            stylers: {
                                color: '#2da0c6',
                                visibility: 'on',
                            },
                        },
                        {
                            featureType: 'background',
                            elementType: 'all',
                            stylers: {
                                color: '#0e1054ff',
                            },
                        },
                    ],
                },
            },
            series,
        };
        return option;
    };

    componentDidMount() {
        this.loadBMap().then(() => {
            this.setState({ showMap: true });
        });
    }

    loadBMap() {
        return new Promise((resolve, reject) => {
            const { BMap } = window;
            if (typeof BMap !== 'undefined') {
                resolve(BMap);
            }
            window.onBMapCallback = () => {
                resolve(BMap);
            };
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `http://api.map.baidu.com/api?v=2.0&ak=hDGbdbr3I6v0o5Hjxb5Kz9Hs24NZKQzN&callback=onBMapCallback`;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    render() {
        const { showMap } = this.state;
        return (
            <>
                {showMap ? (
                    <ReactEcharts option={this.getOption()} notMerge lazyUpdate style={{ height: '500px' }} />
                ) : (
                    <div style={{ height: '500px', display: 'flex', alignItems: 'center' }}>
                        <Spin style={{ margin: '0 auto' }} tip="地图加载中..." />
                    </div>
                )}
            </>
        );
    }
}
Map.propTypes = {};
export default withRouter(Map);
