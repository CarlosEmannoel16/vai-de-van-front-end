import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import RoutesPrivate from './PrivateRoutes';
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AddDrivers = Loadable(lazy(async () => import('views/driver/addDriver')));
const ListDrivers = Loadable(lazy(() => import('views/driver/listDrivers')));
const ListRoutes = Loadable(lazy(() => import('views/routes/ListRoutes')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: (
                <RoutesPrivate>
                    <DashboardDefault />
                </RoutesPrivate>
            )
        },
        {
            path: '/add-driver',
            element: (
                <RoutesPrivate>
                    <AddDrivers />
                </RoutesPrivate>
            )
        },
        {
            path: '/add-driver/:idUser',
            element: (
                <RoutesPrivate>
                    <AddDrivers />
                </RoutesPrivate>
            )
        },

        {
            path: '/drivers',
            element: (
                <RoutesPrivate>
                    <ListDrivers />
                </RoutesPrivate>
            )
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: (
                        <RoutesPrivate>
                            <DashboardDefault />
                        </RoutesPrivate>
                    )
                }
            ]
        },

        {
            path: '/list-routes',
            element: (
                <RoutesPrivate>
                    {' '}
                    <ListRoutes />
                </RoutesPrivate>
            )
        }
    ]
};

export default MainRoutes;
