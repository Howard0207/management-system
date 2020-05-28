import axios from '_service';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import '_less/gallery/detail';
import { Breadcrumb } from 'antd';

class GallaryDetail extends React.Component {
    constructor(props) {
        super(props);
        const { match } = props;
        const { params } = match;
        const { galleryId } = params;
        this.state = {
            galleryId,
        };
        this.galleryForm = React.createRef();
    }

    componentDidMount() {
        this.fetchGalleryPictures();
    }

    fetchGalleryPictures = async () => {
        const { galleryId } = this.state;
        const res = await axios.get('/pictures/list', {
            params: {
                galleryId,
            },
        });
        if (res.code === 200) {
            console.log(res.data);
            // this.setState({ galleryList: res.data });
        }
    };

    render() {
        return (
            <div className="gallery-detail">
                <header>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/picture/gallery">Gallery</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Gallery Detail</Breadcrumb.Item>
                    </Breadcrumb>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                </header>
                <section></section>
            </div>
        );
    }
}

GallaryDetail.propTypes = {
    match: PropTypes.object.isRequired,
};
export default withRouter(GallaryDetail);
