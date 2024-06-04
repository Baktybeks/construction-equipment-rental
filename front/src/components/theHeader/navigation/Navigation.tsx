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
	const session = useSession()

	return (
		<>
			{navLinks.map((link) => {

				return (
					<Link key={link.label} href={link.href}
								className={classNames(styles.textLink, { [styles.active]: isActive })}>
						{link.label}
					</Link>
				)
			})}
			{
				session.data && (
					session.data?.user?.name === 'admin' ? (
						<>
							<Link className={styles.textLink}
								  href='/admin'>Профиль</Link>
							<Link className={styles.textLink}
								  href='/applications'>Заявки</Link>
						</>
					) : <Link className={styles.textLink}
							  href='/profile'>Профиль</Link>
				)
			}
		</>
	)
}

export default Navigation