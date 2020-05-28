/**
 *
 * 圆环图：数据占比
 *
 * */
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

function RingAccounted(props) {
    const { config, style } = props;
    const { unit, value, titleText, color, titleY, fontSize } = config;
    const option = {
        color: [
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: color[0],
                },
                {
                    offset: 1,
                    color: color[1],
                },
            ]),

            color[2] || '#D8D8D8',
        ],
        title: {
            text: titleText,
            subtext: value,
            x: 'center',
            y: titleY,
            itemGap: 60,
            textStyle: {
                color: '#666',
                fontSize: 12,
                fontWeight: 'normal',
            },
            subtextStyle: value,
        },
        series: [
            {
                name: '来源',
                type: 'pie',
                radius: ['80%', '70%'],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            fontSize,
                            fontWeight: 'bold',
                            // color: 'white',
                        },
                        formatter: `{b}\n{c}${unit}`,
                    },
                },
                data: [
                    {
                        value: value === '' ? '-- ' : value,
                        name: '',
                        label: {
                            normal: {
                                show: true,
                            },
                        },
                    },
                    {
                        value: 100 - value,
                        name: '',
                    },
                ],
            },
        ],
    };

    return <ReactEcharts option={option} notMerge lazyUpdate style={style} />;
}

RingAccounted.propTypes = {
    style: PropTypes.object,
    config: PropTypes.object,
};

RingAccounted.defaultProps = {
    style: {},
    config: {},
};

export default RingAccounted;
