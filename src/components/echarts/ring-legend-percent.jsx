import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';

function RingWithLegendPercent(props) {
    const { config, style } = props;
    const { data, unit, colorlist, legendFormatter, legendNameData, seriesName, sum } = config;
    const options = {
        color: colorlist,
        tooltip: {
            trigger: 'item',
            formatter: unit,
        },
        legend: {
            orient: 'vertical',
            y: 'center',
            left: '48%',
            icon: 'rect',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                fontSize: 14,
                color: '#000',
                rich: {
                    bfStyle: {
                        color: '#737377',
                        fontSize: '14px',
                        width: 70,
                    },
                },
            },
            formatter: legendFormatter,
            data: legendNameData,
        },
        series: [
            {
                name: seriesName || '',
                type: 'pie',
                center: ['25%', '50%'],
                radius: ['65%', '85%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        formatter: `{a|${sum} }{b|次}`,
                        rich: {
                            a: {
                                display: 'inline-block',
                                color: '#000000',
                                fontSize: 30,
                            },
                            b: {
                                display: 'inline-block',
                                fontSize: 12,
                                color: 'rgba(0,0,0,0.45)',
                            },
                        },
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'bold',
                        },
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data,
            },
        ],
    };

    return <ReactEcharts option={options} notMerge lazyUpdate style={style} />;
}

RingWithLegendPercent.propTypes = {
    style: PropTypes.object,
    config: PropTypes.object,
};

RingWithLegendPercent.defaultProps = {
    style: {},
    config: {},
};
export default RingWithLegendPercent;
