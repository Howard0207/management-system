import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

class BasicRing extends React.Component {
    getOption() {
        const { percent, color } = this.props;
        const option = {
            series: [
                {
                    name: '百分比',
                    type: 'pie',
                    radius: ['70%', '90%'],
                    clockWise: false,
                    color,
                    avoidLabelOverlap: false,
                    hoverOffset: 1, // hover突出数据
                    silent: true, // 不响应鼠标任何反馈
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '10',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        {
                            value: percent,
                        },
                        {
                            value: 1 - percent,
                            itemStyle: {
                                normal: {
                                    color: color[1],
                                },
                                emphasis: {
                                    color: color[1],
                                },
                            },
                        },
                    ],
                },
            ],
        };
        return option;
    }

    render() {
        const { style, className } = this.props;
        return (
            <div className={className}>
                <ReactEcharts
                    option={this.getOption()}
                    notMerge
                    lazyUpdate
                    theme=""
                    onChartReady={this.onChartReadyCallback}
                    style={style}
                />
            </div>
        );
    }
}

BasicRing.defaultProps = {
    percent: 0.5,
    color: [
        new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: '#FE40D9' },
            { offset: 1, color: '#F60527' },
        ]),
        '#999',
    ],
    style: { height: '110px', width: '110px' },
    className: '',
};
BasicRing.propTypes = {
    percent: PropTypes.number,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    style: PropTypes.object,
    className: PropTypes.string,
};

export default BasicRing;
