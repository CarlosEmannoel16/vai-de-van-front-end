import dashboard from './dashboard';
import pages from './pages';
import { routesAdm, routesDriver } from './routers';
import drivers from './drivers';

const getMenuItemsAdm = () => {
    return {
        items: [dashboard, pages, routesAdm, drivers]
    };
};
const getMenuItemsDriver = () => {
    return {
        items: [dashboard, pages, routesDriver]
    };
};

export { getMenuItemsAdm, getMenuItemsDriver };
