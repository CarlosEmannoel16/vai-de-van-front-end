import { IconRoute } from '@tabler/icons';
const icons = { IconRoute };

const childrenAdm = [
    {
        id: 'list-routes',
        title: 'Rotas',
        type: 'item',
        url: '/list-routes',
        icon: icons.IconRoute,
        breadcrumbs: false
    }
];
const childrenDriver = [
    {
        id: 'documentation',
        title: 'Listar',
        type: 'item',
        url: '/list-routes',
        icon: icons.IconRoute,
        breadcrumbs: false
    }
];

const routesAdm = {
    id: 'sample-docs-roadmap',
    title: '',
    type: 'group',
    children: [...childrenAdm]
};

const routesDriver = {
    id: 'sample-docs-roadmap',
    title: '',
    type: 'group',
    children: [...childrenDriver]
};

export { routesDriver, routesAdm };
