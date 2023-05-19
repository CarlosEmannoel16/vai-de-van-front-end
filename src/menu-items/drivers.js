import { IconUserSearch, IconUserPlus } from '@tabler/icons';
const icons = { IconUserSearch, IconUserPlus };
const drivers = {
    id: 'sample-docs-roadmap',
    type: 'group',
    caption: '',
    title: '',
    children: [
        {
            id: 'drivers',
            title: 'Motoristas',
            type: 'item',
            url: '/drivers',
            icon: icons.IconUserSearch,
            breadcrumbs: false
        }
    ]
};

export default drivers;
