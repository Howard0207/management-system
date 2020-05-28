import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MenuList } from '_consts';
import { Menu } from 'antd';
import '_less/components/menu';

const { SubMenu } = Menu;

class SiderMenu extends React.Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        const { path } = match;
        const rootSubmenuKeys = this.getRootSubmenuKeys(MenuList);
        this.state = {
            openKeys: [path],
            rootSubmenuKeys,
        };
    }

    /**
     * 返回folder list方法
     * @param {Type: Array, desc: menu菜单数据 } list
     * @return {Type: Array, desc: 存在二级菜单的link一维数组 }
     */
    getRootSubmenuKeys = (list) => {
        const rootSubmenuKeyList = [];
        list.forEach((item) => {
            if (item.child.length > 0) {
                rootSubmenuKeyList.push(item.link);
            }
        });
        return rootSubmenuKeyList;
    };

    onOpenChange = (openKeyList) => {
        const { openKeys, rootSubmenuKeys } = this.state;
        const latestOpenKey = openKeyList.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys: openKeyList });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    getNav = (menus) => {
        return menus.map((menuItem) => {
            return menuItem.child.length > 0 ? (
                <SubMenu
                    key={menuItem.link}
                    title={
                        <span>
                            <i className={menuItem.className}></i>
                            <span className="menu__label">{menuItem.label}</span>
                        </span>
                    }
                >
                    {this.getNav(menuItem.child)}
                </SubMenu>
            ) : (
                <Menu.Item key={menuItem.link}>
                    <Link to={menuItem.link}>
                        {menuItem.className && <i className={menuItem.className}></i>}
                        <span className="menu__label">{menuItem.label}</span>
                    </Link>
                </Menu.Item>
            );
        });
    };

    render() {
        const { openKeys } = this.state;
        const { location, match } = this.props;
        const { pathname } = location;
        const { path } = match;
        return (
            <div className="menu">
                <Menu
                    selectedKeys={[pathname]}
                    defaultOpenKeys={[path]}
                    openKeys={openKeys}
                    onOpenChange={this.onOpenChange}
                    mode="inline"
                >
                    {this.getNav(MenuList)}
                </Menu>
            </div>
        );
    }
}

SiderMenu.propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

export default withRouter(SiderMenu);
