import { IconUserSearch, IconUserPlus } from '@tabler/icons';
const icons = { IconUserSearch, IconUserPlus };
const travel = {
    id: 'sample-docs-roadmap',
    type: 'group',
    title: '',
    children: [
        {
            id: 'travel',
            title: ' Viagens',
            type: 'item',
            url: '/travels',
            icon: icons.IconUserSearch,
            breadcrumbs: false
        }
    ]
};

export default travel;
