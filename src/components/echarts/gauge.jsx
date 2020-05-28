/**
 * 仪表图
 * */
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import echarts from 'echarts';

function Gauge(props) {
    const { config, style } = props;
    const { unit = 'kW' } = config;
    const initOption = {
        backgroundColor: '#fff',
        name: 'name',
        min: 0,
        max: 100,
        splitNumber: 1,
        width: 20,
        startColor: 'rgb(88, 202, 41)',
        endColor: 'rgb(229, 0, 0)',
        hiddenColor: 'rgb(51,51,58)',
        itemStyleColor: 'rgb(51,51,58)',
        unit: 'kW',
        initValue: 0,
        pointerWidth: 5,
        startAngle: 210,
        endAngle: -30,
        detail: {
            show: true,
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: '#ccc',
            width: 100,
            height: 40,
            offsetCenter: ['0', '45%'], // x, y，单位px
            formatter: `{value}${unit}`,
            textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#555',
                fontSize: 15,
            },
        },
    };

    const mergeOptions = Object.assign(initOption, config);

    const option = {
        backgroundColor: mergeOptions.backgroundColor,
        series: [
            {
                name: mergeOptions.name,
                type: 'gauge',
                min: mergeOptions.min,
                max: mergeOptions.max,
                splitNumber: mergeOptions.splitNumber,
                radius: '100%',
                startAngle: mergeOptions.startAngle,
                endAngle: mergeOptions.endAngle,
                axisLine: {
                    // 坐标轴线
                    lineStyle: {
                        // 属性lineStyle控制线条样式
                        color: [
                            [
                                1,
                                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                    {
                                        offset: 1,
                                        color: mergeOptions.startColor,
                                    },
                                    {
                                        offset: 0,
                                        color: mergeOptions.endColor,
                                    },
                                ]),
                            ],
                        ],
                        width: mergeOptions.width,
                        shadowColor: mergeOptions.hiddenColor, // 默认透明
                    },
                },
                axisLabel: {
                    show: false, // 坐标轴小标记
                },
                axisTick: {
                    show: false, // 坐标轴小标记
                },
                splitLine: {
                    show: false, // 分隔线
                },
                itemStyle: {
                    color: '#ABABAB', // color: mergeOptions.itemStyleColor,
                },
                pointer: {
                    // 分隔线
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 5,
                    width: mergeOptions.pointerWidth,
                    length: '60%',
                },
                title: {
                    show: false,
                    offsetCenter: [0, '40%'],
                    textStyle: {
                        fontWeight: 'bolder', // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize: 20,
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor: '#fff', // 默认透明
                        shadowBlur: 10,
                    },
                },
                detail: mergeOptions.detail,
                data: [{ value: mergeOptions.initValue, name: mergeOptions.unit }],
            },
        ],
    };
    return <ReactEcharts option={option} notMerge lazyUpdate style={style} />;
}

Gauge.propTypes = {
    style: PropTypes.object,
    config: PropTypes.object,
};

Gauge.defaultProps = {
    style: {},
    config: {},
};

export default Gauge;
