import axios from '_service';
import { withRouter, Link } from 'react-router-dom';
import { Button, Modal, Form, Input } from 'antd';
import '_less/gallery';
import img1 from '_statics/imgs/1.jpg';

class Gallary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryList: [],
            visible: false,
        };
        this.galleryForm = React.createRef();
    }

    componentDidMount() {
        this.fetchGallery();
    }

    fetchGallery = async () => {
        const res = await axios.get('/gallery/list');
        if (res.code === 200) {
            this.setState({ galleryList: res.data });
        }
    };

    createGallery = async () => {
        const form = this.galleryForm.current;
        const res = await axios.put('/gallery/create', { gallery: form.getFieldValue('gallery') });
        if (res.code === 200) {
            const { galleryList } = this.state;
            galleryList.push(res.data);
            form.setFieldsValue({ gallery: '' });
            this.setState(galleryList);
            this.hideModal();
        }
    };

    showModal = () => this.setState({ visible: true });

    hideModal = () => this.setState({ visible: false });

    render() {
        const { galleryList, visible } = this.state;
        return (
            <div className="gallery">
                <header>
                    <span>Gallary</span>
                    <Button type="primary" onClick={this.showModal}>
                        新建Gallery
                    </Button>
                </header>
                <ul className="gallery-list">
                    {galleryList.map((item) => {
                        return (
                            <li key={item.id} className="gallery-item">
                                <Link to={`/picture/gallery/detail/${item.id}`}>
                                    <div className="gallery-bg" style={{ backgroundImage: `url(${img1})` }}></div>
                                    <div className="gallery-mask"></div>
                                </Link>
                                <div className="gallery-info">
                                    {item.gallery} ({item['pictures.count']})
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <Modal
                    title="Modal"
                    visible={visible}
                    onOk={this.createGallery}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                    centered
                >
                    <Form name="basic" ref={this.galleryForm}>
                        <Form.Item name="gallery" label="Gallery名称" rules={[{ required: true }]}>
                            <Input placeholder="请输入Gallery名称" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

Gallary.propTypes = {};
export default withRouter(Gallary);
