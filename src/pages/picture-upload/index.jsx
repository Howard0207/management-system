import axios from '_service';
import { withRouter } from 'react-router';
import { Button, Progress } from 'antd';
import '_less/picture-upload';

class PictureUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chunkReqList: [], name: '', token: '', chunkCount: 0, imageUrl: '' };
        this.uploadOperator = React.createRef();
    }

    upload = async () => {
        await this.getFiles();
        const { chunkReqList } = this.state;
        const result = await this.uploadChunks(chunkReqList);
        const mergeResult = await this.mergeChunks();
        if (mergeResult.code === 200) {
            this.setState({ imageUrl: mergeResult.data.url });
        }
    };

    getFiles = () => {
        const docs = this.uploadOperator.current.files[0];
        // const filename = docs.name;
        // const extMatch = /(?!\.)(\w+)$/i.exec(filename);
        // const ext = extMatch[0];
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

    uploadChunks = async (requestList) => {
        const { token } = this.state;
        for (let i = 0; i < requestList.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            await Promise.all(
                requestList[i].map((item, index) => {
                    const formData = new FormData();
                    formData.append('token', token);
                    formData.append('file', item.file);
                    formData.append('index', i * 4 + index);
                    return axios.post('/upload/docs', formData);
                })
            );
        }
        return Promise.resolve();
    };

    mergeChunks = async () => {
        const { token, name, chunkCount } = this.state;
        const formD = new FormData();
        formD.append('type', 'merge');
        formD.append('token', token);
        formD.append('chunkCount', chunkCount);
        formD.append('filename', name);
        return axios.post('/upload/docs', formD);
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

    render() {
        const { imageUrl } = this.state;
        return (
            <div className="upload">
                <label htmlFor="file" className="upload-btn">
                    <input type="file" name="file" id="file" ref={this.uploadOperator} onChange={this.upload} />
                    <i className="iconfont icon-add"></i>
                </label>
                <img src={imageUrl} alt="" />
                <Button type="primary">上传文件</Button>
                <Progress type="circle" percent={100} />
            </div>
        );
    }
}

PictureUpload.propTypes = {};
export default withRouter(PictureUpload);
