import React from 'react'
import Link from 'next/link'
import CircleArrowIcons from '@/components/theFuture/icons/CircleArrowIcons'
import styles from './TheFuture.module.scss'

const TheFuture = () => {
	return (
		<>
			<h1 className={styles.nameHeader}>Мы делаем все для <span className={styles.text}>комфорта</span> в Вашем строительстве</h1>
			<p className={styles.textFuture}>
				У нас лучшие услуги по архитектурному проектированию, строительству и эксплуатации зданий.
			</p>
			<Link href={'#'} className={styles.btnServices}><span className={styles.textLink}>Наши услуги</span>
				<CircleArrowIcons /></Link>
		</>
	)
}

export default TheFuture
