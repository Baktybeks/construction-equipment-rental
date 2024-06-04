import React from 'react'
import styles from './TheRequest.module.scss'

const TheRequest = () => {
	return (
		<>
			<h2 className={styles.nameRequest}>Leading Way In Building & Civil Construction</h2>
			<div className={styles.blockInfoForm}>
				<div className={styles.blockForm}>
					<h3 className={styles.nameForm}>Request A Quote</h3>
					<p className={styles.textForm}>
						Complete control over products allow us to our customers the best quality
						prices and services. We take great pride in everything that we do in Jhontraktor
					</p>
					<form className={styles.form}>
						<input className={styles.inputForm} type='text' placeholder='Name' />
						<input className={styles.inputForm} type='email' placeholder='Email' />
						<input className={styles.inputForm} type='number' placeholder='Phone' />
						<select className={styles.inputForm} id='service' name='service'>
							<option className={styles.valueService} value='#'>Select Your Service</option>
							<option className={styles.valueService} value='service1'>Service1</option>
							<option className={styles.valueService} value='service2'>Service2</option>
							<option className={styles.valueService} value='service3'>Service3</option>
						</select>
						<textarea className={styles.textareaForm} placeholder='Additional Details!' />
						<button className={styles.submit} type='button'>Submit Request</button>
					</form>
				</div>
				<div className={styles.blockInfo}>
					<h3 className={styles.nameInfo}>Contact Info</h3>
					<ul className={styles.listContact}>
						<li>
							<h4 className={styles.nameList}>Our Location</h4>
							<p className={styles.infoText}>18 Office Park Building 21th Floor Unit C. Jl. TB Simatupang Kav. 18,
								Jakarta Selatan ,12520</p>
						</li>
						<li>
							<h4 className={styles.nameList}>Quick Contact</h4>
							<p className={styles.infoText}>Email : contact@jhontraktor.com</p>
							<p className={styles.infoText}>Call Us : (+62) 877-2469-7246</p>
						</li>
						<li>
							<h4 className={styles.nameList}>Opening Hours</h4>
							<p className={styles.infoText}>Monday - Friday</p>
							<p className={styles.infoText}>09:00 AM - 06:00 PM</p>
						</li>
					</ul>
					<p className={styles.textContact}>Do You Have Any Question, Just Contact Us To Get Help!</p>
					<button className={styles.btnContacts}>Contact Us</button>
				</div>
			</div>
		</>
	)
}

export default TheRequest