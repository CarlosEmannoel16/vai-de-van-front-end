import dashboard from './dashboard';
import pages from './pages';
import { routesAdm, routesDriver } from './routers';
import drivers from './drivers';
import travel from './travel';

const getMenuItemsAdm = () => {
    return {
        items: [dashboard, pages, routesAdm, drivers, travel]
    };
};
const getMenuItemsDriver = () => {
    return {
        items: [dashboard, pages, routesDriver]
    };
};

export { getMenuItemsAdm, getMenuItemsDriver };
