import React from 'react'
import styles from './TheYears.module.scss'

const TheYears = () => {
	return (
		<>
			<ul className={styles.numbers}>
				<li>
					<span className={styles.textRed}>15+</span>
					<span className={styles.textNum}>лет опыта</span>
				</li>
				<li>
					<span className={styles.textRed}>999+</span>
					<span className={styles.textNum}> проектов выполнено</span>
				</li>
			</ul>
			<div className={styles.yearsInfo}>
				<div>
					<h2 className={styles.nameYears}><span className={styles.yearsRed}>15 лет</span><br /> опыта!</h2>
					<p className={styles.textOne}>
						У нас есть команда опытных профессионалов, которые работают в отрасли более 25 лет. Наши подрядчики обладают обширными знаниями и навыками, которые они приобрели на протяжении многих лет, что делает их экспертами в своей области.
					</p>
					<p className={styles.textTwo}>
						Благодаря 15-летнему опыту наши подрядчики глубоко понимают отраслевые стандарты и правила. Мы гарантируем, что все наши проекты соответствуют последним нормам безопасности и строительных норм и правил, а конечный продукт соответствует ожиданиям наших клиентов или превосходит их.
					</p>
				</div>
				<div className={styles.blockImage}>
				</div>
			</div>
		</>
	)
}

export default TheYears
