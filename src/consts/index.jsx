export const MenuList = [
    {
        label: 'Dashboard',
        link: '/dashboard',
        icon: 'icon-radio_checked',
        className: 'menu__icon menu__icon--overview',
        child: [
            {
                label: 'Analysis',
                link: '/dashboard/analysis',
                child: [],
            },
            {
                label: 'Monitor',
                link: '/dashboard/monitor',
                child: [],
            },
            {
                label: 'WorkSpace',
                link: '/dashboard/workSpace',
                child: [],
            },
        ],
    },
    {
        label: '图床',
        link: '/picture',
        icon: 'icon-chengchejilu',
        className: 'menu__icon menu__icon--statistics',
        child: [
            {
                label: 'Gallery',
                link: '/picture/gallery',
                child: [],
            },
            {
                label: 'Upload',
                link: '/picture/upload',
                child: [],
            },
        ],
    },
    {
        label: 'User',
        link: '/user',
        icon: 'icon-chengchedaka',
        className: 'menu__icon menu__icon--optimize',
        child: [
            {
                label: 'Register User',
                link: '/user/register-user',
                child: [],
            },
        ],
    },
];
export const regexAccount = /^([a-zA-Z0-9]+@.+?\.[a-z]{2,4})|(1\d{10})$/g;
export const regexEmail = /^[a-zA-Z0-9]+@.+?\.[a-z]{2,4}$/g;
export const regexMobile = /^1\d{10}$/g;
