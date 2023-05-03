// assets
import { IconRoute } from '@tabler/icons';

// constant
const icons = { IconRoute };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    title: 'Rotas/Subrotas',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Criar',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconRoute,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Listar',
            type: 'item',
            url: '/',
            icon: icons.IconRoute,
            external: true,
            target: true
        }
    ]
};

export default other;
