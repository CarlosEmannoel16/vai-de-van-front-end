import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AddDrivers = Loadable(lazy(() => import('views/driver/addDriver')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/add-driver',
            element: <AddDrivers />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },

        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
