import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

export default function MakeRoutes() {
    return useRoutes([MainRoutes, AuthenticationRoutes]);
}
