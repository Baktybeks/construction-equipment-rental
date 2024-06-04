import React from 'react'
import styles from './TheYears.module.scss'

const TheYears = () => {
	return (
		<>
			<ul className={styles.numbers}>
				<li>
					<span className={styles.textRed}>25+</span>
					<span className={styles.textNum}>Years of Experience</span>
				</li>
				<li>
					<span className={styles.textRed}>378+</span>
					<span className={styles.textNum}>Project Complete</span>
				</li>
				<li>
					<span className={styles.textRed}>69+</span>
					<span className={styles.textNum}>Winning Global Award</span>
				</li>
			</ul>
			<div className={styles.yearsInfo}>
				<div>
					<h2 className={styles.nameYears}><span className={styles.yearsRed}>25 years</span><br /> of experience!</h2>
					<p className={styles.textOne}>
						We have a team of experienced professionals who have been in the industry for over 25 years. Our contractors
						have a wealth of knowledge and skills that they have acquired over the years, making them experts in their
						field.
					</p>
					<p className={styles.textTwo}>
						With 25 years of experience, our contractors have a deep understanding of industry standards and
						regulations.
						We ensure that all our projects comply with the latest safety and building codes, and that the final product
						meets or exceeds our clients expectations.
					</p>
				</div>
				<div className={styles.blockImage}>
				</div>
			</div>
		</>
	)
}

export default TheYears