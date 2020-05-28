/**
 *
 * 圆环图：信息总览->信息汇总的三种类型图
 *
 * */

import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import echarts from 'echarts';

function RingScore(props) {
    const { config, style } = props;
    const { text, subtext, subtextStyle, value, colorlist } = config;

    const itemGap = value !== undefined ? 60 : 20;
    const label =
        value !== undefined
            ? {
                  normal: {
                      show: true,
                      position: 'center',
                      textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold',
                      },
                  },
              }
            : {
                  normal: {
                      show: false,
                      position: 'center',
                      textStyle: {
                          fontSize: 12,
                          fontWeight: 'bold',
                      },
                      formatter: '{b}\n{c}%',
                  },
              };
    const itemStyle =
        value !== undefined
            ? {
                  normal: {
                      label: {
                          formatter(params) {
                              return params.value;
                          },
                      },
                  },
              }
            : null;

    const option = {
        title: {
            text,
            subtext,
            x: 'center',
            y: '65',
            itemGap,
            textStyle: {
                color: '#666',
                fontSize: 12,
                fontWeight: 'normal',
            },
            subtextStyle,
        },
        series: [
            {
                type: 'pie',
                radius: ['80%', '70%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                itemStyle,
                label,
                data: [
                    {
                        value: value || 1,
                        name: text,
                    },
                ],
            },
        ],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 1,
                color: colorlist[0],
            },
            {
                offset: 0,
                color: colorlist[1],
            },
        ]),
    };

    return <ReactEcharts option={option} notMerge lazyUpdate style={style} />;
}

RingScore.propTypes = {
    style: PropTypes.object,
    config: PropTypes.object,
};

RingScore.defaultProps = {
    style: {},
    config: {},
};

export default RingScore;
