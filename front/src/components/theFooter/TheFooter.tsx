import Logo from '@/components/icons/Logo'
import LinkedinIcon from '@/components/theFooter/icons/LinkedinIcon'
import MediumIcon from '@/components/theFooter/icons/MediumIcon'
import InstagramIcon from '@/components/theFooter/icons/InstagramIcon'
import TwitterIcon from '@/components/theFooter/icons/TwitterIcon'
import FacebookIcons from '@/components/theFooter/icons/FacebookIcons'
import ArrowIcons from '@/components/theFooter/icons/ArrowIcons'
import { navItems } from '@/components/theHeader/TheHeader'
import Navigation from '@/components/theHeader/navigation/Navigation'
import styles from './TheFooter.module.scss'

const TheFooter = () => {

	return (
		<footer className={styles.footer}>
			<div className={styles.Logo}><Logo /></div>
			<div className={styles.componentFooter}>
				<div className={styles.headerInput}>
					<h2 className={styles.nameFooter}>About Us</h2>
					<div className={styles.inputEmail}>
						<div className={styles.textInput}>Subscribe To Our News latter :</div>
						<input type='email' className={styles.inputText} placeholder='Enter your email addres' />
						<ArrowIcons />
					</div>
				</div>
				<div className={styles.footerBlock}>
					<div className={styles.footerInfo}>
						<p className={styles.text}>
							We have the confidence to provide the best service for you, with the support of Professional and Certified
							HR
							that we currently have and the high-quality materials we use and structured work techniques, we will be
							able
							to
							realize timely completion of work.
						</p>
						<ul className={styles.footerImage}>
							<li>
								<LinkedinIcon />
							</li>
							<li>
								<MediumIcon />
							</li>
							<li>
								<InstagramIcon />
							</li>
							<li>
								<TwitterIcon />
							</li>
							<li>
								<FacebookIcons />
							</li>
						</ul>
					</div>
					<div className={styles.footerLink}>
						<div className={styles.nameLink}>Link</div>
						<Navigation navLinks={navItems} />
					</div>
				</div>
			</div>
		</footer>
	)
}

export { TheFooter }
