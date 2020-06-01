import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { Button } from 'antd';
import RadarChart from './components/radar';
import Map from './components/map';
import CalendarChart from './components/calendar';
import PieGraph from './components/pie-graph';
import '_less/analysis';

class Analysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div className="analysis">
                <RadarChart />
                <div>
                    <Map />
                </div>
                <CalendarChart />
                <PieGraph />
            </div>
        );
    }
}
Analysis.propTypes = {
    // history: PropTypes.object.isRequired,
    // location: PropTypes.object.isRequired,
    // match: PropTypes.object.isRequired,
};

export default withRouter(Analysis);
