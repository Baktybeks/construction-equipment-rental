import React from 'react'
import TheFuture from '@/components/theFuture/TheFuture'
import TheYears from '@/components/theYears/TheYears'
import TheFeatured from '@/components/theFeatured/TheFeatured'
import TheRequest from '@/components/theRequest/TheRequest'
import CircleIcon from '@/components/icons/CircleIcon'
import TheComments from '@/components/TheComments/TheComments'
import styles from './styles/Home/Home.module.scss'

const Home = () => {
	return (
		<>
			<section className={styles.wrapperFuture}>
				<TheFuture />
			</section>
			<section className={styles.wrapperYears}>
				<ul className={styles.listInfo}>
					<li className={styles.textList}><CircleIcon />Quality Control System, 100% Satisfaction Guarantee</li>
					<li className={styles.textList}><CircleIcon />Highly Proffesional Staff, Accurate Testing Processes</li>
					<li className={styles.textList}><CircleIcon />Unrivalled Workmanship, Proffesional and Qualified</li>
				</ul>
				<TheYears />
			</section>
			<section className={styles.wrapperFeatured}>
				<TheFeatured />
			</section>
			<section className={styles.wrapperComments}>
				<TheComments />
			</section>
			<section className={styles.wrapperRequest}>
				<div className={styles.componentRequest}>
					<TheRequest />
				</div>
			</section>
		</>
	)
}

export default Home