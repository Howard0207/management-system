import { withRouter, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Layout, Menu, Dropdown, Button } from 'antd';
import SiderMenu from '_components/menu';
import PropTypes from 'prop-types';
import defaultLogo from '../../../statics/imgs/logo.png';
import '_less/main';

const { Header, Content, Sider, Footer } = Layout;
const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);
// eslint-disable-next-line react/prefer-stateless-function
class Main extends React.Component {
    toAllFactory = () => {
        const { history } = this.props;
        history.push('/dashboard/analysis');
    };

    render() {
        const { route, location } = this.props;
        const { pathname } = location;
        return pathname === '/dashboard' ? (
            <Redirect to="/dashboard/analysis" />
        ) : (
            <Layout className="main">
                <Header className="header">
                    <div className="header-left">
                        <img src={defaultLogo} alt="logo" className="header-left-logo" />
                    </div>
                    <div className="header-right">
                        <div className="header-linkall" onClick={this.toAllFactory}>
                            全部工厂
                        </div>
                        <Dropdown overlay={menu} trigger={['click']} className="header-account">
                            <Button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                <i className="iconfont icon-login_user"></i>
                            </Button>
                        </Dropdown>
                    </div>
                </Header>
                <Layout className="site-layout-background">
                    <Sider className="main-sider-bg" width={200} style={{ padding: '24px 0 0' }}>
                        <SiderMenu />
                    </Sider>
                    <Content style={{ padding: '24px 24px 0', minHeight: 280 }}>
                        <div className="page-container">{renderRoutes(route.routes)}</div>
                        <Footer style={{ textAlign: 'center' }}>copyright @ 2019 清科优能</Footer>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
Main.propTypes = {
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default withRouter(Main);
