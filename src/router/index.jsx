import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '_less/index.less';
import routes from './router-config';

function RouterConfig() {
    return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;
}

export default hot(RouterConfig);
