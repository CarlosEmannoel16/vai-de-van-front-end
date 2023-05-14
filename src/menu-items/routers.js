import { IconRoute } from '@tabler/icons';
const icons = { IconRoute };

const childrenAdm = [
    {
        id: 'documentation',
        title: 'Listar',
        type: 'item',
        url: '/list-routes',
        icon: icons.IconRoute,
        breadcrumbs: false
    },
    {
        id: 'sample-page',
        title: 'Criar',
        type: 'item',
        url: '/create-routes',
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
    title: 'Rotas/Subrotas',
    type: 'group',
    children: [...childrenAdm]
};

const routesDriver = {
    id: 'sample-docs-roadmap',
    title: 'Rotas/Subrotas',
    type: 'group',
    children: [...childrenDriver]
};

export { routesDriver, routesAdm };
