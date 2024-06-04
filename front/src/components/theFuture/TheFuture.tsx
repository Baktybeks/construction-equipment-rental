import React from 'react'
import Link from 'next/link'
import CircleArrowIcons from '@/components/theFuture/icons/CircleArrowIcons'
import styles from './TheFuture.module.scss'

const TheFuture = () => {
	return (
		<>
			<h1 className={styles.nameHeader}>We Prepare For The <span className={styles.text}>Future</span></h1>
			<p className={styles.textFuture}>
				We provide the best architectural design, contruction, and
				building maintance services for you.
			</p>
			<Link href={'#'} className={styles.btnServices}><span className={styles.textLink}>Our Services</span>
				<CircleArrowIcons /></Link>
		</>
	)
}

export default TheFuture