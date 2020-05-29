import Loadable from 'react-loadable';
import Loading from '_components/loading';
import { Redirect } from 'react-router';
// const Loading = () => <Spin size="large" tip="Loading..." />;
// import Main from '../pages/main';
const Login = Loadable({
    loader: () => import(/* webpackPrefetch: true */ '../pages/login'),
    loading: Loading('loadable-loading__app'),
});
const Main = Loadable({
    loader: () => import(/* webpackPrefetch: true */ '../pages/main'),
    loading: Loading('loadable-loading__app'),
});

const Analysis = Loadable({
    loader: () => import(/* webpackPrefetch: true */ '../pages/analysis'),
    loading: Loading('loadable-loading_page'),
});

const Gallery = Loadable({
    loader: () => import(/* webpackPrefetch: true */ '../pages/gallery'),
    loading: Loading('loadable-loading__page'),
});

const GalleryDetail = Loadable({
    loader: () => import(/* webpackPrefetch: true */ '../pages/gallery/detail'),
    loading: Loading('loadable-loading_page'),
});
const Upload = Loadable({
    loader: () => import(/* webpackPrefetch: true */ '../pages/picture-upload'),
    loading: Loading('loadable-loading__page'),
});
// import NotFound from '../pages/404';
const NotFound = Loadable({
    loader: () => import(/* webpackPrefetch: true */ '../pages/404'),
    loading: Loading('loadable-loading__page'),
});

const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/analysis" />,
    },
    {
        path: '/login',
        exact: true,
        component: Login,
    },
    {
        path: '/dashboard',
        component: Main,
        routes: [
            {
                path: '/dashboard/analysis',
                exact: true,
                component: Analysis,
            },
            {
                path: '/dashboard/monitor',
                exact: true,
                component: NotFound,
            },
            {
                path: '/dashboard/workspace',
                exact: true,
                component: Loading('loadable-loading__page'),
            },
            {
                path: '*',
                component: NotFound,
            },
        ],
    },
    {
        path: '/picture',
        component: Main,
        routes: [
            {
                path: '/picture/gallery',
                exact: true,
                component: Gallery,
            },
            {
                path: '/picture/gallery/detail/:galleryId',
                exact: true,
                component: GalleryDetail,
            },
            {
                path: '/picture/upload',
                exact: true,
                component: Upload,
            },
            {
                path: '*',
                component: NotFound,
            },
        ],
    },
    {
        path: '/user',
        component: Main,
        routes: [
            {
                path: '/user/register-user',
                exact: true,
                component: NotFound,
            },
        ],
    },
    {
        path: '*',
        component: NotFound,
    },
];

export default routes;
