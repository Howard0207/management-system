import { withRouter } from 'react-router-dom';
import { number, format } from 'echarts';
import ReactEcharts from 'echarts-for-react';

class CalendarChart extends React.Component {
    constructor(props) {
        super(props);
        const curYear = new Date().getFullYear();
        this.state = {
            curYear,
        };
    }

    getVirtulData = (year) => {
        let { curYear } = this.state;
        curYear = year || curYear;
        const date = +number.parseDate(`${curYear}-01-01`);
        const end = +number.parseDate(`${+curYear + 1}-01-01`);
        const dayTime = 3600 * 24 * 1000;
        const data = [];
        for (let time = date; time < end; time += dayTime) {
            data.push([format.formatTime('yyyy-MM-dd', time), Math.floor(Math.random() * 10000)]);
        }
        return data;
    };

    getOption = () => {
        const { curYear } = this.state;
        const data = this.getVirtulData();
        const option = {
            title: {
                top: 30,
                left: 'center',
                text: `${curYear}年某人每天的步数`,
            },
            tooltip: {},
            visualMap: {
                min: 0,
                max: 10000,
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                top: 65,
                textStyle: {
                    color: '#000',
                },
            },
            calendar: {
                top: 120,
                left: 60,
                right: 30,
                cellSize: ['auto', 20],
                range: `${curYear}`,
                itemStyle: {
                    borderWidth: 0.5,
                },
                dayLabel: {
                    show: true,
                    nameMap: 'cn',
                },
                monthLabel: {
                    nameMap: 'cn',
                },
                yearLabel: { show: false },
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data,
            },
        };
        return option;
    };

    componentDidMount() {}

    render() {
        return <ReactEcharts option={this.getOption()} notMerge lazyUpdate style={{ height: '300px' }} />;
    }
}
CalendarChart.propTypes = {};
export default withRouter(CalendarChart);
