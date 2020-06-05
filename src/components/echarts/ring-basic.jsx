import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

class BasicRing extends React.Component {
    getOption() {
        const { config } = this.props;
        const { color, data, legendData } = config;
        const option = {
            color,
            legend: {
                bottom: 5,
                orient: 'horizontal',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    fontSize: 12, // 字体大小
                    color: '#fff', // 字体颜色
                },
                legendData,
            },
            series: [
                {
                    name: '百分比',
                    type: 'pie',
                    radius: ['35%', '45%'],
                    clockWise: false,
                    avoidLabelOverlap: false,
                    hoverOffset: 1, // hover突出数据
                    silent: true, // 不响应鼠标任何反馈
                    labelLine: {
                        normal: {
                            length2: 0,
                            lineStyle: {
                                color: '#fff',
                            },
                        },
                    },
                    label: {
                        normal: {
                            formatter: (params) => {
                                return `{name|${params.name}}{icon|:}{value|${params.value}%}`;
                            },
                            rich: {
                                name: {
                                    fontSize: 12,
                                    color: '#fff',
                                },
                                icon: {
                                    fontSize: 12,
                                    color: '#fff',
                                },
                                value: {
                                    fontSize: 12,
                                    color: '#fff',
                                },
                            },
                        },
                    },
                    data,
                },
            ],
        };
        return option;
    }

    render() {
        const { style } = this.props;
        return (
            <ReactEcharts
                option={this.getOption()}
                notMerge
                lazyUpdate
                theme=""
                onChartReady={this.onChartReadyCallback}
                style={style}
            />
        );
    }
}

BasicRing.defaultProps = {
    color: [
        new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: '#FE40D9' },
            { offset: 1, color: '#F60527' },
        ]),
        '#999',
    ],
    style: { height: '110px', width: '110px' },
};
BasicRing.propTypes = {
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    style: PropTypes.object,
    config: PropTypes.object.isRequired,
};

export default BasicRing;
