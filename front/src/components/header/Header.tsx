import Navigaton from '@/components/Navigation/Navigaton';


const navItems = [
    { label: 'Главная', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
];

const Header = () => {
    return (
        <header>
            <Navigaton navLinks={ navItems }/>
        </header>
    );
};

export default Header;
