// assets
import { IconUserSearch, IconUserPlus } from '@tabler/icons';

// constant
const icons = { IconUserSearch, IconUserPlus };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

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
            id: 'documentation',
            title: 'Buscar',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/berry/',
            icon: icons.IconUserSearch,
            external: true,
            target: true
        }
    ]
};

export default drivers;
