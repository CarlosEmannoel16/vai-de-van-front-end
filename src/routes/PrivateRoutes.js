import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { userService } from 'services/driver';
import Loader from 'ui-component/Loader';

export default function RoutesPrivate({ children }) {
    const [test, setTest] = useState(false);
    const navigate = useNavigate();

    userService
        .getById(window.localStorage.getItem('idLogin'))
        .then((data) => {
            console.log(data.data);
            setTest(true);
            return children;
        })
        .catch(() => {
            navigate('/login/adm');
        });

    return test ? children : <Loader />;
}
