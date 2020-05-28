/**
 * 基础柱形
 * */
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import { getToolTip, getGrid, getXAxis, getYAxis, getLegend } from '_utils';

function Bar(props) {
    const { config, style } = props;
    const { tooltip, grid, xAxis, yAxis, series, legend } = config;

    const option = {
        tooltip: getToolTip(tooltip),
        grid: getGrid(grid),
        xAxis: getXAxis(xAxis),
        yAxis: getYAxis(yAxis),
        legend: legend ? getLegend(legend) : null,
        series,
    };

    return <ReactEcharts option={option} notMerge lazyUpdate style={style} />;
}

Bar.propTypes = {
    style: PropTypes.object,
    config: PropTypes.object,
};

Bar.defaultProps = {
    style: {},
    config: {},
};

export default Bar;
