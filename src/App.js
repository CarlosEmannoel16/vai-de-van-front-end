import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Routes from 'routes';
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';
import React, { useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:4000');

const App = () => {
    const customization = useSelector((state) => state.customization);
    useEffect(() => {
        socket.emit('chat-message', 'teste2');
    }, []);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
