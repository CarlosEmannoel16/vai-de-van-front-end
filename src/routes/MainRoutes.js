import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import RoutesPrivate from './PrivateRoutes';
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AddDrivers = Loadable(lazy(async () => import('views/driver/addDriver')));
const ListDrivers = Loadable(lazy(() => import('views/driver/listDrivers')));
const ListRoutes = Loadable(lazy(() => import('views/routes/ListRoutes')));
const AddRoutes = Loadable(lazy(() => import('views/routes/addRoutes')));
const AddTravel = Loadable(lazy(() => import('views/travel/addTravel')));
const ListTravel = Loadable(lazy(() => import('views/travel/ListTravek')));

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
            path: '*',
            element: (
                <RoutesPrivate>
                    <DashboardDefault />
                </RoutesPrivate>
            )
        },
        {
            path: '/add-driver',
            element: (
                <RoutesPrivate adm={true}>
                    <AddDrivers />
                </RoutesPrivate>
            )
        },
        {
            path: '/add-driver/:idUser',
            element: (
                <RoutesPrivate adm={true}>
                    <AddDrivers />
                </RoutesPrivate>
            )
        },

        {
            path: '/drivers',
            element: (
                <RoutesPrivate adm={true}>
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
                    <ListRoutes />
                </RoutesPrivate>
            )
        },
        {
            path: '/create-routes',
            element: (
                <RoutesPrivate adm={true}>
                    <AddRoutes />
                </RoutesPrivate>
            )
        },
        {
            path: '/travels',
            element: (
                <RoutesPrivate>
                    <ListTravel />
                </RoutesPrivate>
            )
        },
        {
            path: '/add-travel',
            element: (
                <RoutesPrivate adm={true}>
                    <AddTravel />
                </RoutesPrivate>
            )
        }
    ]
};

export default MainRoutes;
