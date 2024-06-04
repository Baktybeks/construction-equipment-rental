import Navigation from './navigation/Navigation'
import Link from 'next/link'
import Logo from '../icons/Logo'

import styles from './TheHeader.module.scss'

export const navItems = [
	{ label: 'Home', href: '/' },
	{ label: 'About US', href: '/about' },
	{ label: 'Service', href: '/blog' },
	{ label: 'Project', href: '/project' }
]


const TheHeader = () => {
	return (
		<header className={styles.wrapperHeader}>
			<div className={styles.menu}>
				<div className={styles.logo}><Logo /></div>
				<nav className={styles.navText}>
					<Navigation navLinks={navItems} />
				</nav>
			</div>
			<Link href='#' className={styles.btnUs}>
				Contact Us
			</Link>
		</header>
	)
}

export { TheHeader }
