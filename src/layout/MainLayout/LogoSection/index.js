import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

import config from 'config';
import { MENU_OPEN } from 'store/actions';
import Logo from '../../../assets/images/logo-horizontal.png';

const LogoSection = () => {
    const defaultId = useSelector((state) => state.customization.defaultId);
    const dispatch = useDispatch();
    return (
        <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
            <img src={Logo} alt="logo" width="150px" />
        </ButtonBase>
    );
};

export default LogoSection;
