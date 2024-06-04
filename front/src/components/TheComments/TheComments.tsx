'use client'

import React from 'react'
import Image from 'next/image'
import { dateComment } from '@/components/TheComments/dateComment/DateComment'
import Slider from "react-slick";
import './TheSliderComments.scss'
import styles from './TheComments.module.scss'

const TheComments = () => {
	const settings = {
		className: 'center',
		initialSlide: 2,
		slidesToShow: 1,
		centerPadding: '90px',
		draggable: false,
		speed: 600
	}

	return (
		<div className='slider-comments'>
			<Slider {...settings}>
				{dateComment.map((elem, index) => (
					<div key={index}>
						<h4 className={styles.nameSlider}>
							What Our Client Says
						</h4>
						<p className={styles.textSlider}>
							{elem.comment}
						</p>
						<span className={styles.nameUser}>
						{elem.name}
					</span>
						<span className={styles.nameContru}>{elem.county}</span>
						<div className={styles.imagesMen}><span className={styles.image}><Image src={elem.avatar} alt='men' /></span>
						</div>
					</div>
				))}
			</Slider>
		</div>
	)
}

export default TheComments