'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

import classNames from 'classnames'
import styles from './Navigation.module.scss'

type NavLink = {
	label: string;
	href: string;
}

type Props = {
	navLinks: NavLink[];
}

const Navigation = ({ navLinks }: Props) => {
	const [isActive, setActive] = useState<boolean>()
	const pathname = usePathname()
	const session = useSession()

	return (
		<>
			{navLinks.map((link) => {
				// setActive(pathname === link.href)

				return (
					<Link key={link.label} href={link.href}
								className={classNames(styles.textLink, { [styles.active]: isActive })}>
						{link.label}
					</Link>
				)
			})}
			{
				session?.data && (
					<Link className={classNames(styles.textLink, { [styles.active]: isActive })}
								href='/profile'>Profile</Link>
				)
			}
			{
				session?.data ?
					<Link className={classNames(styles.textLink, { [styles.active]: isActive })} href='#'
								onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Link>
					:
					// <Link href='/api/auth/signin'>Sign In</Link>
					<Link className={classNames(styles.textLink, { [styles.active]: isActive })} href='/signin'>Sign
						In</Link>
			}

		</>
	)
}

export default Navigation