import { styled } from '@mui/material/styles';
import Background from '../../../assets/images/fundo-login2.jpg';

const AuthWrapper1 = styled('div')(({ theme }) => ({
    minHeight: '100vh',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover'
}));

export default AuthWrapper1;
