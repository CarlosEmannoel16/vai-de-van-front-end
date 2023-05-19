import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { userService } from 'services/driver';
import Loader from 'ui-component/Loader';

export default function RoutesPrivate({ children, adm }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    userService
        .getById(window.localStorage.getItem('idLogin'))
        .then((data) => {
            if (adm) {
                if (data.data.data.type === 'ADM') {
                    setLoading(false);
                } else {
                    navigate('/');
                }
            } else {
                setLoading(false);
            }
        })
        .catch(() => {
            navigate('/login/adm');
        });

    return <>{!loading ? children : <Loader />}</>;
}
