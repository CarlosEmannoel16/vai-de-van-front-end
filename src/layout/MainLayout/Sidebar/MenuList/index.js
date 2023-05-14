import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import { getMenuItemsAdm, getMenuItemsDriver } from 'menu-items';
import { getUserIdLocal } from 'helpers/localStorage';
import { userService } from 'services/driver';
import Loader from 'ui-component/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

const MenuList = () => {
    const [navItems, setNavItems] = useState();

    useEffect(() => {
        userService.getById(getUserIdLocal()).then((result) => {
            console.log(result.data.data.type);
            if (result.data.data.type === 'ADM') {
                const navItems = getMenuItemsAdm().items.map((item) => {
                    switch (item.type) {
                        case 'group':
                            return <NavGroup key={item.id} item={item} />;
                        default:
                            return (
                                <Typography key={item.id} variant="h6" color="error" align="center">
                                    Menu Items Error
                                </Typography>
                            );
                    }
                });
                setNavItems(navItems);
            } else {
                const navItems = getMenuItemsDriver().items.map((item) => {
                    switch (item.type) {
                        case 'group':
                            return <NavGroup key={item.id} item={item} />;
                        default:
                            return (
                                <Typography key={item.id} variant="h6" color="error" align="center">
                                    Menu Items Error
                                </Typography>
                            );
                    }
                });
                setNavItems(navItems);
            }
        });
    }, []);

    return <>{navItems || <Loader />}</>;
};

export default MenuList;
