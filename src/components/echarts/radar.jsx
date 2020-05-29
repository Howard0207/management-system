/**
 * 基础柱形
 * */
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import { getToolTip, getGrid, getLegend } from '_utils';

function Radar(props) {
    const { config, style } = props;
    const { tooltip, grid, series, legend, radar } = config;

    const option = {
        tooltip: getToolTip(tooltip),
        grid: getGrid(grid),
        radar,
        legend: legend ? getLegend(legend) : null,
        series,
    };

    return <ReactEcharts option={option} notMerge lazyUpdate style={style} />;
}

Radar.propTypes = {
    style: PropTypes.object,
    config: PropTypes.object,
};

Radar.defaultProps = {
    style: {},
    config: {},
};

export default Radar;
