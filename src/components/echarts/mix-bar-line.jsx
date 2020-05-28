import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import { getToolTip, getGrid, getXAxis, getYAxis } from '_utils';

function MixBarLine(props) {
    const { config, style } = props;
    const { unit, series } = config;
    const options = {
        grid: getGrid(),
        tooltip: getToolTip({ formatter: unit }),
        xAxis: getXAxis({
            type: 'time',
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
            },
        }),
        yAxis: getYAxis({ boundaryGap: [0, '100%'] }),
        series,
    };

    return <ReactEcharts option={options} notMerge lazyUpdate style={style} />;
}
MixBarLine.propTypes = {
    style: PropTypes.object,
    config: PropTypes.object,
};

MixBarLine.defaultProps = {
    style: {},
    config: {},
};

export default MixBarLine;
