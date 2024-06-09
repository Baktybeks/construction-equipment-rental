'use client'

import Navigation from './navigation/Navigation'
import Link from 'next/link'
import Logo from '@/components/logo/Logo'
import {signOut, useSession} from "next-auth/react";

import styles from './TheHeader.module.scss'
import React from 'react';

export const navItems = [
	{ label: 'Главная', href: '/' },
	// { label: 'About US', href: '/about' },
	// { label: 'Service', href: '/blog' },
	// { label: 'Project', href: '/project' }
]


const TheHeader = () => {
	const session = useSession()

	return (
		<header className={styles.wrapperHeader}>
			<div className={styles.menu}>
				<Link href='/'>
					<div className={styles.logo}><Logo /></div>
				</Link>

				<nav className={styles.navText}>
					<Navigation navLinks={navItems} />
				</nav>
			</div>
			<div className={styles.linck}>
				{
					session?.data ?
						<Link className={styles.textLink} href='#'
							  onClick={() => signOut({ callbackUrl: '/' })}>Выйти</Link>
						:
						<>
							<Link className={styles.textLink} href='/signin'>Войти</Link>
						</>
				}
			</div>
			<Link href="tel:+996706774686" className={styles.btnUs}>
				Связаться с нами
			</Link>
		</header>
	)
}

export { TheHeader }
