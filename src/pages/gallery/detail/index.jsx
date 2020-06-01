import axios from '_service';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import '_less/gallery/detail';
import { Breadcrumb, Button, Modal, Form, Input, Progress } from 'antd';

const { TextArea } = Input;
class GallaryDetail extends React.Component {
    constructor(props) {
        super(props);
        const { match } = props;
        const { params } = match;
        const { galleryId } = params;
        this.state = {
            galleryId,
            visible: false,
            leftData: [],
            centerData: [],
            rightData: [],
            imgList: [{ id: Date.now(), path: '', desc: '' }],
        };
        this.galleryForm = React.createRef();
        this.leftCol = React.createRef();
        this.centerCol = React.createRef();
        this.right = React.createRef();
        this.container = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('scroll', this.ajaxPull);
        this.fetchGalleryPictures();
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.ajaxPull);
    }

    showModal = () => this.setState({ visible: true });

    hideModal = () => this.setState({ visible: false });

    fetchGalleryPictures = async () => {
        const { galleryId, leftData, centerData, rightData } = this.state;
        const res = await axios.get('/pictures/list', {
            params: {
                galleryId,
            },
        });
        const { childNodes } = this.container.current;
        let left = childNodes[0].offsetHeight;
        let center = childNodes[1].offsetHeight;
        let right = childNodes[2].offsetHeight;
        if (res.code === 200) {
            await res.data.forEach((item) => {
                const img = new Image();
                img.onload = () => {
                    const a = this.getMin(left, center, right);
                    const height = (300 / img.width) * img.height;
                    switch (a) {
                        case 0:
                            left += height;
                            leftData.push(item);
                            break;
                        case 1:
                            center += height;
                            centerData.push(item);
                            break;
                        case 2:
                            right += height;
                            rightData.push(item);
                            break;
                        default:
                            break;
                    }
                    this.setState({ leftData, centerData, rightData });
                };
                img.src = item.path;
            });
        }
    };

    getMin = (...arr) => {
        let min = arr[0];
        let res = 0;
        arr.forEach((item, index) => {
            res = item < min ? index : res;
            min = item < min ? item : min;
        });
        return res;
    };

    // 获取高度最低的一个
    getMinContain = () => {
        const { childNodes } = this.container.current;
        let minData = childNodes[0];
        // eslint-disable-next-line no-unused-expressions
        childNodes &&
            childNodes.forEach((item) => {
                if (item.offsetHeight < minData.offsetHeight) {
                    minData = item;
                }
            });
        return minData;
    };

    // 滚动事件
    ajaxPull() {
        const height = window.innerHeight;
        const scroll = document.body.scrollTop;
        const domHeight = document.body.scrollHeight;
        if (scroll + height > domHeight - 132 && this.ajax) {
            this.fetchGalleryPictures();
        }
    }

    mapListToHtml = (data) => {
        const arr = ['fadeIn', 'rotateIn', 'zoomIn'];
        const animate = parseInt(Math.random() * 3, 10);
        return data.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={item.id + index}>
                <img
                    style={{ WebkitAnimation: `${arr[animate]} 0.8s ease-in-out 1 0s alternate forwards` }}
                    src={item.path}
                    alt=""
                />
            </li>
        ));
    };

    add = () => {
        const { imgList } = this.state;
        const listItem = { id: Date.now(), desc: '', path: '' };
        imgList.push(listItem);
        this.setState({ imgList });
    };

    onFinish = (values) => {
        console.log(values);
    };

    /**
     * 上传文件方法入口
     */
    upload = async (index, e) => {
        const docs = e.target.files[0];
        await this.getFiles(docs);
        const { chunkReqList, imgList } = this.state;
        imgList[index].file = this.getObjectURL(docs);
        imgList[index].progress = 0;
        this.setState({ imgList });
        await this.uploadChunks(chunkReqList, docs.size);
        const mergeResult = await this.mergeChunks();
        if (mergeResult.code === 200) {
            imgList[index].path = mergeResult.path;
            imgList[index].progress = 100;
            imgList[index].uploadRes = true;
            this.setState({ imgList });
        }
    };

    /**
     * 获取文件分片后的list
     */
    getFiles = (docs) => {
        const token = +new Date(); // 时间戳
        const { name } = docs;
        let chunkCount = 0;
        const chunks = this.createFileChunks(docs);
        chunkCount = chunks.length;
        let chunkReqList = [];
        if (chunkCount > 4) {
            chunkReqList = this.getChunkReqList(chunks);
        } else {
            chunkReqList = [chunks];
        }
        this.setState({ chunkReqList, token, name, chunkCount });
    };

    /**
     * 上传文件
     */
    uploadChunks = async (requestList, size) => {
        const { token, imgList } = this.state;
        let load = 0;
        for (let i = 0; i < requestList.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            await Promise.all(
                // eslint-disable-next-line no-loop-func
                requestList[i].map((item, index) => {
                    const formData = new FormData();
                    formData.append('token', token);
                    formData.append('file', item.file);
                    formData.append('index', i * 4 + index);
                    return axios.post('/upload/gallerys', formData, {
                        timeout: 200000,
                        onUploadProgress: (progressEvent) => {
                            load += progressEvent.loaded;
                            imgList[i].progress = Math.round((load / size) * 100);
                            setTimeout(() => {
                                this.setState({ imgList });
                            });
                        },
                    });
                })
            );
        }
        return Promise.resolve();
    };

    /**
     * 合并分片文件
     */
    mergeChunks = async () => {
        const { token, name, chunkCount } = this.state;
        const formD = new FormData();
        formD.append('type', 'merge');
        formD.append('token', token);
        formD.append('chunkCount', chunkCount);
        formD.append('filename', name);
        return axios.post('/upload/gallerys', formD);
    };

    /**
     * 文件分片
     */
    createFileChunks = (docs) => {
        let start = 0;
        const splitSize = 1024 * 1024;
        const chunks = [];
        while (start < docs.size) {
            chunks.push({ file: docs.slice(start, start + splitSize) });
            start += splitSize;
        }
        return chunks;
    };

    /**
     * 获取文件上传请求list
     */
    getChunkReqList = (chunks) => {
        if (chunks.length > 4) {
            const newChunk = chunks.splice(0, 4);
            return [newChunk].concat(this.getChunkReqList(chunks));
        }
        return [chunks];
    };

    /**
     * 通过文件获取图片base64编码
     * @param {type: file} file
     * @return {type: string(base64)} base64
     */
    getObjectURL(file) {
        let url = null;
        if (window.createObjectURL !== undefined) {
            // basic
            url = window.createObjectURL(file);
        } else if (window.URL !== undefined) {
            // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) {
            // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    render() {
        const { leftData, centerData, rightData, visible, imgList } = this.state;
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
                        <div>
                            <p></p>
                            <p></p>
                        </div>
                        <div>
                            <Button
                                type="primary"
                                icon={<i className="iconfont icon-add"></i>}
                                onClick={this.showModal}
                            >
                                上传图片
                            </Button>
                        </div>
                    </div>
                </header>
                <section className="waterfall">
                    <div ref={this.container} className="waterfall-container">
                        <ul ref={this.leftCol} className="waterfall-col">
                            {!!leftData && this.mapListToHtml(leftData)}
                        </ul>
                        <ul ref={this.centerCol} className="waterfall-col waterfall-center">
                            {!!centerData && this.mapListToHtml(centerData)}
                        </ul>
                        <ul ref={this.rightCol} className="waterfall-col">
                            {!!rightData && this.mapListToHtml(rightData)}
                        </ul>
                    </div>
                </section>
                <Modal
                    title="Modal"
                    visible={visible}
                    onOk={this.createGallery}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                    centered
                    className="gallery-detail-modal"
                >
                    <Form name="basic" ref={this.galleryForm} onFinish={this.onFinish}>
                        {imgList.map((item, index) => {
                            return (
                                <Form.Item key={item.id} className="upload-item">
                                    {item.file !== undefined ? (
                                        <div
                                            className="upload-img"
                                            style={{
                                                backgroundImage: `url(${item.file})`,
                                            }}
                                        >
                                            <Progress
                                                type="circle"
                                                width={80}
                                                className={
                                                    item.uploadRes
                                                        ? 'upload-progress upload-progress-finish'
                                                        : 'upload-progress'
                                                }
                                                percent={item.progress}
                                            />
                                        </div>
                                    ) : (
                                        <label className="upload-btn">
                                            <input type="file" name="file" onChange={this.upload.bind(this, index)} />
                                            <i className="iconfont icon-add"></i>
                                        </label>
                                    )}
                                    <TextArea autoSize={{ minRows: 4, maxRows: 4 }} maxLength={60} />
                                </Form.Item>
                            );
                        })}
                        <Button type="primary" onClick={this.add}>
                            添加
                        </Button>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

GallaryDetail.propTypes = {
    match: PropTypes.object.isRequired,
};
export default withRouter(GallaryDetail);
