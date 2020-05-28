import { useHistory } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from '_service';
import { regexAccount } from '_consts';
import '_less/login';

const Login = () => {
    const history = useHistory();
    const onFinish = (values) => {
        const { username, password } = values;
        axios.post('/account/login', { username, password: sha256(password) }).then((res) => {
            if (res.code === 200) {
                localStorage.setItem('management-token', res.token);
                history.push('/picture/upload');
            }
        });
        // console.log('Success:', values);
    };

    return (
        <div className="login">
            <div className="login__form">
                <div className="login__form-title">LOGIN</div>
                <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名!' },
                            { pattern: regexAccount, message: '用户名错误' },
                        ]}
                        validateFirst
                    >
                        <Input prefix={<i className="iconfont icon-username"></i>} placeholder="邮箱/手机号" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]} validateFirst>
                        <Input
                            prefix={<i className="iconfont icon-password"></i>}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item className="login__remember-forgot">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        {/* <a href="">register now!</a> */}
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
