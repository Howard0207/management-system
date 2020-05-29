import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { Button } from 'antd';
import RadarChart from './components/radar';
import Map from './components/map';
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
