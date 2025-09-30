import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PagesLayout from 'layout/Pages';
import SimpleLayout from 'layout/Simple';

import c, { SimpleLayoutType } from 'config';

// pages routing
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));

// render - sample page
//const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const NewPost = Loadable(lazy(() => import('pages/posts/new-post')));
const PostDetail = Loadable(lazy(() => import('pages/posts/detail-post')));

const Home = Loadable(lazy(() => import('pages/home')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	children: [
		{
			path: '/',
			element: <DashboardLayout />,
			children: [
				{
					path: 'nuevo-post',
					element: <NewPost />
				},
				{
					path: 'detalle-post/:id',
					element: <PostDetail />
				},
				{
					path: 'home',
					element: <Home />
				}
			]
		}]
};

export default MainRoutes;
