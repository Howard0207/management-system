/**
 * 环状图百分比，垂直显示的型
 * */
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';

function RingWithLegendPercentVertical(props) {
    const { config, style } = props;
    const { data, unit, colorlist, legendFormatter, legendNameData, seriesName } = config;
    const options = {
        color: colorlist,
        legend: {
            orient: 'vertical',
            x: 'left',
            left: 20,
            y: 'bottom',
            bottom: '-10%',
            icon: 'rect',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                fontSize: 14,
                color: '#000',
                rich: {
                    percentageStyle: {
                        color: '#8C8C8C',
                        fontSize: 14,
                    },
                },
            },
            formatter: legendFormatter,
            data: legendNameData,
        },
        tooltip: {
            trigger: 'item',
            formatter: unit,
        },
        series: [
            {
                name: seriesName || '',
                type: 'pie',
                center: ['50%', '35%'],
                radius: ['40%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
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

RingWithLegendPercentVertical.propTypes = {
    style: PropTypes.object,
    config: PropTypes.object,
};

RingWithLegendPercentVertical.defaultProps = {
    style: {},
    config: {},
};
export default RingWithLegendPercentVertical;
