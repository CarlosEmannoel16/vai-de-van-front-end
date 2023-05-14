import { IconReport } from '@tabler/icons';
const pages = {
    id: 'pages',
    title: '',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Relatórios',
            type: 'collapse',
            icon: IconReport,

            children: [
                {
                    id: 'login',
                    title: 'Rotas',
                    type: 'item',
                    url: '/'
                },
                {
                    id: 'login',
                    title: 'Motorista',
                    type: 'item',
                    url: '/'
                }
            ]
        }
    ]
};

export default pages;
