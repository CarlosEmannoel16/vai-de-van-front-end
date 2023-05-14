import { IconUserSearch, IconUserPlus } from '@tabler/icons';
const icons = { IconUserSearch, IconUserPlus };
const drivers = {
    id: 'sample-docs-roadmap',
    type: 'group',
    title: 'Motoristas',
    children: [
        {
            id: 'sample-page',
            title: 'Novo',
            type: 'item',
            url: '/add-driver',
            icon: icons.IconUserPlus,
            breadcrumbs: false
        },
        {
            id: 'drivers',
            title: 'Listar',
            type: 'item',
            url: '/drivers',
            icon: icons.IconUserSearch,
            breadcrumbs: false
        }
    ]
};

export default drivers;
