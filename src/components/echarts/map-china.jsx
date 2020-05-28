import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import chinaJson from 'echarts/map/json/china.json';
import axios from 'axios';
// 引入地图数据...
function getGeoCoordMap(data) {
    const mapName = data || 'china';
    /* 获取地图数据 */
    const geoCoordMap = {};
    const mapFeatures = echarts.getMap(mapName).geoJson.features;
    mapFeatures.forEach((v) => {
        const { name } = v.properties; // 地区名称
        geoCoordMap[name] = v.properties.cp; // 地区经纬度
    });
    return geoCoordMap;
}

const maxSize4Pin = 30;
const minSize4Pin = 10;

const provinces = [
    'shanghai',
    'hebei',
    'shanxi',
    'neimenggu',
    'liaoning',
    'jilin',
    'heilongjiang',
    'jiangsu',
    'zhejiang',
    'anhui',
    'fujian',
    'jiangxi',
    'shandong',
    'henan',
    'hubei',
    'hunan',
    'guangdong',
    'guangxi',
    'hainan',
    'sichuan',
    'guizhou',
    'yunnan',
    'xizang',
    'shanxi1',
    'gansu',
    'qinghai',
    'ningxia',
    'xinjiang',
    'beijing',
    'tianjin',
    'chongqing',
    'xianggang',
    'aomen',
];
const provincesText = [
    '上海',
    '河北',
    '山西',
    '内蒙古',
    '辽宁',
    '吉林',
    '黑龙江',
    '江苏',
    '浙江',
    '安徽',
    '福建',
    '江西',
    '山东',
    '河南',
    '湖北',
    '湖南',
    '广东',
    '广西',
    '海南',
    '四川',
    '贵州',
    '云南',
    '西藏',
    '陕西',
    '甘肃',
    '青海',
    '宁夏',
    '新疆',
    '北京',
    '天津',
    '重庆',
    '香港',
    '澳门',
];
const chinaMap = new Map();
chinaMap
    .set('上海市', '上海')
    .set('河北省', '河北')
    .set('山西省', '山西')
    .set('内蒙古自治区', '内蒙古')
    .set('辽宁省', '辽宁')
    .set('吉林省', '吉林')
    .set('黑龙江省', '黑龙江')
    .set('江苏省', '江苏')
    .set('浙江省', '浙江')
    .set('安徽省', '安徽')
    .set('福建省', '福建')
    .set('江西省', '江西')
    .set('山东省', '山东')
    .set('河南省', '河南')
    .set('湖北省', '湖北')
    .set('湖南省', '湖南')
    .set('广东省', '广东')
    .set('广西壮族自治区', '广西')
    .set('海南省', '海南')
    .set('四川省', '四川')
    .set('贵州省', '贵州')
    .set('云南省', '云南')
    .set('西藏自治区', '西藏')
    .set('陕西省', '陕西')
    .set('甘肃省', '甘肃')
    .set('青海省', '青海')
    .set('宁夏回族自治区', '宁夏')
    .set('新疆维吾尔自治区', '新疆')
    .set('北京市', '北京')
    .set('天津市', '天津')
    .set('重庆市', '重庆')
    .set('香港特别行政区', '香港')
    .set('澳门特别行政区', '澳门');

// 省份转换
const transformation = (obj) => {
    for (let i = 0; i < obj.length; i++) {
        // eslint-disable-next-line no-param-reassign
        obj[i].provinceName = chinaMap.get(obj[i].provinceName);
    }
    return obj;
};
class EchartsMap extends React.Component {
    constructor(props) {
        echarts.registerMap('china', chinaJson);

        super(props);
        this.chart = React.createRef();
        this.state = {
            data: [],
            seriesData: [],
            provinceData: [],
            seriesDataPro: [],
            toolTipData: [],
            mapName: 'china',
            Chinese_: '中国',
            pName: 'china',
        };
    }

    componentDidMount() {
        const data = [
            {
                provinceName: '天津市',
                provinceKey: 120000,
                cityName: null,
                cityKey: null,
                user_number: 1,
                device_number: 8,
            },
            {
                provinceName: '广东省',
                provinceKey: 440000,
                cityName: null,
                cityKey: null,
                user_number: 5,
                device_number: 15,
            },
            {
                provinceName: '北京市',
                provinceKey: 110000,
                cityName: null,
                cityKey: null,
                user_number: 1,
                device_number: 3,
            },
            {
                provinceName: '河北省',
                provinceKey: 130000,
                cityName: null,
                cityKey: null,
                user_number: 10,
                device_number: 40,
            },
        ];
        this.setState({
            data,
        });
        this.fetchProvinceData(data);
    }

    fetchProvinceData = (data) => {
        const seriesDataPro = [];
        const seriesData = [];
        const provinceData = []; // 全国省份数据
        const toolTipData = transformation(data);
        for (let i = 0; i < toolTipData.length; i++) {
            seriesData[i] = {};
            seriesData[i].name = toolTipData[i].provinceName;
            seriesData[i].value = toolTipData[i].user_number;
            seriesData[i].provinceKey = toolTipData[i].provinceKey;
            this.getMaps(seriesDataPro, provinceData, data, toolTipData[i].provinceKey);
        }
        this.setState({ seriesData, provinceData, seriesDataPro, toolTipData });
    };

    getOption(provinceName, Chinese_) {
        const { data, seriesData, provinceData, seriesDataPro, toolTipData } = this.state;
        const tmpSeriesData = provinceName === 'china' ? seriesData : seriesDataPro;
        const tmp = provinceName === 'china' ? toolTipData : provinceData;
        const valueList = seriesData.map((o) => o.value);
        const max = Math.max(...valueList);
        const min = 0;
        const option = {
            tooltip: {
                trigger: 'item',
                formatter(params) {
                    // 鼠标滑过显示的数据
                    let toolTiphtml = '';
                    if (provinceName === 'china') {
                        for (let i = 0; i < tmp.length; i++) {
                            if (params.name === tmp[i].provinceName) {
                                toolTiphtml += `${tmp[i].provinceName}<br><i style="display:inline-block; width: 10px; height: 10px; background: #F8BA00;margin-right: 10px;"></i>用户：${tmp[i].user_number}<br><i style="display:inline-block; width: 10px; height: 10px; background: #FF3BD9;margin-right: 10px;"></i>设备：${tmp[i].device_number}`;
                            }
                        }
                        return toolTiphtml;
                    }
                    for (let i = 0; i < tmp.length; i++) {
                        const ttmp = tmp[i];
                        for (let j = 0; j < ttmp.length; j++) {
                            if (params.name === ttmp[j].cityName) {
                                toolTiphtml += `${ttmp[j].cityName}<br><i style="display:inline-block; width: 15px; height: 15px; background: #F8BA00;margin-right: 10px;"></i>用户：${ttmp[j].user_number}<br><i style="display:inline-block; width: 15px; height: 15px; background: #FF3BD9;margin-right: 10px;"></i>设备：${ttmp[j].device_number}`;
                            }
                        }
                    }
                    return toolTiphtml;
                },
            },
            visualMap: {
                show: true,
                min,
                max,
                left: '2%',
                bottom: window.innerHeight > 900 ? '5%' : '10%',
                text: [max, min], // 文本，默认为数值文本
                calculable: false,
                seriesIndex: 1,
                orient: 'horizontal',
                inRange: {
                    color: ['#DEE7F7', '#5988D6'], // 渐变
                },
                textStyle: {
                    color: '#555',
                },
            },
            geo: {
                show: true,
                map: provinceName,
                roam: false,
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false,
                    },
                },
                top: 'center', // 组件距离容器的距离
                itemStyle: {
                    normal: {
                        areaColor: '#DEE7F7', // 没有值得时候颜色
                        borderColor: '#097bba',
                    },
                    emphasis: {
                        areaColor: '#FF3BD9', // 鼠标滑过选中的颜色
                    },
                },
            },
            series: [
                {
                    name: '散点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbolSize: '1',
                    label: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: true,
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#895139', // 字体颜色
                        },
                    },
                    data: tmpSeriesData,
                },
                {
                    name: Chinese_ || provinceName,
                    type: 'map',
                    mapType: provinceName,
                    selectedMode: 'single',
                    label: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: true,
                        },
                    },
                    itemStyle: {
                        // 默认区域颜色
                        normal: {
                            borderWidth: 1, // 区域边框宽度
                            borderColor: '#fff', // 区域边框颜色
                            areaColor: '#DEE7F7', // 区域颜色
                        },
                        // 鼠标移到区域的颜色
                        emphasis: {
                            borderWidth: 0.5,
                            borderColor: '#E7CDFC',
                            areaColor: '#FF3BD9',
                        },
                    },
                    data: tmpSeriesData,
                },
                {
                    name: '点',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    symbol: 'circle',
                    symbolSize(val) {
                        const a = (maxSize4Pin - minSize4Pin) / (max - min);
                        let b = minSize4Pin - a * min;
                        b = maxSize4Pin - a * max;
                        return (a * val[2] + b) * 0.5;
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter() {
                                return '';
                            },
                            textStyle: {
                                color: '#fff',
                                fontSize: 9,
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#FFC400', // 标志颜色'#F62157'
                        },
                    },
                    zlevel: 6,
                    data: this.convertData(tmpSeriesData),
                },
            ],
        };
        // 针对海南放大
        if (provinceName === '海南') {
            option.series[1].center = [109.844902, 19.0392];
            option.series[1].layoutCenter = ['50%', '50%'];
            option.series[1].layoutSize = '300%';
        } else {
            // 非显示海南时，将设置的参数恢复默认值
            option.series[1].center = undefined;
            option.series[1].layoutCenter = undefined;
            option.series[1].layoutSize = undefined;
        }
        return option;
    }

    convertData = (data) => {
        const { mapName } = this.state;
        // 转换数据
        const geoCoordMap = getGeoCoordMap(mapName);
        const res = [];
        for (let i = 0; i < data.length; i++) {
            const geoCoord = geoCoordMap[data[i].name]; // 数据的名字对应的经纬度
            if (geoCoord) {
                // 如果数据data对应上，
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };

    setSeriesDataPro = (seriesDataPro, data) => {
        for (let i = 0; i < data.length; i++) {
            const pro = {};
            pro.name = data[i].cityName;
            pro.value = data[i].user_number;
            seriesDataPro.push(pro);
        }
    };

    // 获取地区数据
    getMaps = (seriesDataPro, provinceData, data, key) => {
        const myData = {};
        myData.key = key;
        axios
            .get('/factory-all/overview/echarts-map', {
                params: myData,
            })
            .then((res) => {
                provinceData.push(res.data);
                this.setSeriesDataPro(seriesDataPro, res.data);
            });
    };

    initClickEvent = () => {
        this.chart.off('click');
        this.chart.off('dblclick');
        const { pName } = this.state;
        if (pName === 'china') {
            // 全国时，添加click 进入省级
            this.chart.on('click', (param) => {
                const { provinceData } = this.state;
                if (param.data && param.data.provinceKey) {
                    // province(key);  省份请求
                    if (provinceData.length) {
                        // 遍历取到provincesText 中的下标  去拿到对应的省js
                        for (let i = 0; i < provincesText.length; i++) {
                            if (param.name === provincesText[i]) {
                                // 显示对应省份的方法
                                this.showProvince(provinces[i], provincesText[i]);
                                break;
                            }
                        }
                    }
                }
            });
        } else {
            // 省份，添加双击 回退到全国
            this.chart.on('dblclick', this.showChina);
        }
    };

    onChartReadyCallback = (chart) => {
        this.chart = chart;
        this.initClickEvent();
    };

    showChina = () => {
        echarts.registerMap('china', chinaJson);
        this.setState({ mapName: 'china', pName: 'china' }, this.initClickEvent);
    };

    // 展示对应的省
    showProvince = (pName, Chinese_) => {
        // 这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
        // initEcharts(Chinese_);
        import(`echarts/map/json/province/${pName}.json`).then((mapJson) => {
            echarts.registerMap(Chinese_, mapJson.default);
            this.setState({ pName: Chinese_, mapName: Chinese_ });
            this.initClickEvent();
        });
    };

    render() {
        const { pName, Chinese_ } = this.state;
        return (
            <div style={{ height: '500px' }}>
                <ReactEcharts
                    option={this.getOption(pName, Chinese_)}
                    notMerge
                    lazyUpdate
                    theme=""
                    ref={this.chart}
                    onChartReady={this.onChartReadyCallback}
                    style={{ height: '500px' }}
                />
            </div>
        );
    }
}

export default EchartsMap;
