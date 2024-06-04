'use client'

import React from 'react'
import Slider from 'react-slick'
import { dateTower } from '@/components/theFeatured/dateTower/DateTower'
import Image from 'next/image'
import Link from 'next/link'
import ArrowCircleRight from '@/components/theFeatured/dateTower/icons/ArrowCircleRight'

import 'slick-carousel/slick/slick.css'
import './TheSlider.scss'
import styles from './TheFeatured.module.scss'

const TheFeatured = () => {
	const settings = {
		focusOnSelect: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1
	}

	return (
		<>
			<div className={styles.progress}>
				<ul className={styles.infoProgress}>
					<li className={styles.textProgress}>
						Evaluation And Signing <br /> Of The Contract
						<span className={styles.step}>Step 1</span>
						<div className={styles.circles}>
							<div className={styles.littleCircles}></div>
						</div>
					</li>
					<li className={styles.textProgress}>
						Preparation Of The <br /> Work Plan
						<span className={styles.step}>Step 2</span>
						<div className={styles.circles}>
							<div className={styles.littleCircles}></div>
						</div>
					</li>
					<li className={styles.textProgress}>
						Implementation Of <br /> Quality Works
						<span className={styles.step}>Step 3</span>
						<div className={styles.circles}>
							<div className={styles.littleCircles}></div>
						</div>
					</li>
					<li className={styles.textProgress}>
						Delivering The Project <br /> To The Customer
						<span className={styles.step}>Step 4</span>
						<div className={styles.circles}>
							<div className={styles.littleCircles}></div>
						</div>
					</li>
				</ul>
				<div className={styles.indicatorProgress}></div>
			</div>
			<div className={styles.blockSlider}>
				<h2 className={styles.nameSliders}>Featured Project</h2>
				<div>
					<div className={styles.sliderContainer}>
						<Slider {...settings}>
							{dateTower.map((elem, index) =>
								<div key={index}>
									<Image src={elem.img} alt='tower' className={styles.imgesTower} />
									<h4 className={styles.textTower}>
										<span className={styles.nameTower}>{elem.text.name}</span>
										<span className={styles.renovationTower}>{elem.text.renovation}</span>
									</h4>
								</div>
							)}
						</Slider>
					</div>
					<div className={styles.allProgect}>
						<Link href={'#'} className={styles.textLink}>Explore All Projects <ArrowCircleRight /></Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default TheFeatured
