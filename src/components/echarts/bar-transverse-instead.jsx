/**
 * 柱形 横向翻转对比
 * */
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import { getToolTip, getGrid, getXAxis, getYAxis } from '_utils';

function BarTransverseInstead(props) {
    const { config, style } = props;
    const { formatter, xAxisData, series } = config;

    const option = {
        tooltip: getToolTip({ formatter }),
        grid: getGrid(),
        xAxis: getYAxis(),
        yAxis: getXAxis({ data: xAxisData, axisTick: { show: false } }),
        series,
    };

    return <ReactEcharts option={option} notMerge lazyUpdate style={style} />;
}

BarTransverseInstead.propTypes = {
    style: PropTypes.object,
    config: PropTypes.object,
};

BarTransverseInstead.defaultProps = {
    style: {},
    config: {},
};

export default BarTransverseInstead;
