import { getUserIdLocal } from 'helpers/localStorage';
import { userService } from 'services/driver';
import Loader from 'ui-component/Loader';

export const ComponentAdmPrivate = ({ children }) => {
    userService.getById(getUserIdLocal()).then((data) => {
        if (data.data.type === 'ADM') return children;
        return <Loader />;
    });
};
