'use client'

import Navigation from './navigation/Navigation'
import Link from 'next/link'
import Logo from '../icons/Logo'
import {signOut, useSession} from "next-auth/react";

import styles from './TheHeader.module.scss'

export const navItems = [
	{ label: 'Home', href: '/' },
	// { label: 'About US', href: '/about' },
	// { label: 'Service', href: '/blog' },
	// { label: 'Project', href: '/project' }
]


const TheHeader = () => {
	const session = useSession()

	return (
		<header className={styles.wrapperHeader}>
			<div className={styles.menu}>
				<div className={styles.logo}><Logo /></div>
				<nav className={styles.navText}>
					<Navigation navLinks={navItems} />
				</nav>
			</div>
			<div className={styles.linck}>
				{
					session?.data ?
						<Link className={styles.textLink} href='#'
							  onClick={() => signOut({ callbackUrl: '/' })}>Logout</Link>
						:
						<>
							<Link className={styles.textLink} href='/signin'>Login</Link>
						</>
				}
			</div>
			<Link href='#' className={styles.btnUs}>
				Contact Us
			</Link>
		</header>
	)
}

export { TheHeader }
