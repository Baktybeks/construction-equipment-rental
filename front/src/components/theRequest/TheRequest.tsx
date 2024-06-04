'use client'

import React, {useState} from 'react'
import styles from './TheRequest.module.scss'
import {useSession} from "next-auth/react";

interface Direction {
	name: string;
	email: string;
	phone: string;
	description: string;
	EquipmentId: string;
	processed: boolean;
}

const TheRequest = () => {
	const [newAplication, setNewAplication] = useState<Direction>({
		name: '',
		email: '',
		phone: '',
		description: '',
		EquipmentId: '',
		processed: false,
	});


	const session = useSession();

	const handleChange = (e: any) => {
		const {name, value} = e.target;
		setNewAplication(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('name', newAplication.name);
			formData.append('email', newAplication.email);
			formData.append('phone', newAplication.phone);
			formData.append('description', newAplication.description);
			formData.append('EquipmentId', newAplication.EquipmentId);
			formData.append('processed', newAplication.processed.toString());

			const response = await fetch('http://localhost:5000/api/application/', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				if (!res.ok) {
					throw new Error('Unable to fetch directions!');
				}

				console.log('добавлен объект');
			} else {
				console.error('Ошибка при добавлении нового направления:', response.statusText);
			}
		} catch (error) {
			console.error('Ошибка при выполнении запроса:', error);
		}
	};

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
						<input className={styles.inputForm} value={newAplication.name} onChange={handleChange} name='name' type='text' placeholder='Name' />
						<input className={styles.inputForm} value={newAplication.email} onChange={handleChange} name='email' type='email' placeholder='Email' />
						<input className={styles.inputForm} value={newAplication.phone} onChange={handleChange} name='phone' type='number' placeholder='Phone' />
						<select className={styles.inputForm} id='service' onChange={handleChange}  value={newAplication.description} name='description'>
							<option className={styles.valueService} value="Банки"></option>
							<option className={styles.valueService} value="Мбанк">Мбанк</option>
							<option className={styles.valueService} value="Элкарт">Элкарт</option>
							<option className={styles.valueService} value="Viza">Viza</option>
						</select>
						<textarea className={styles.textareaForm} onChange={handleChange} placeholder='Additional Details!' />

						{session.data ? <button className={styles.submit} type='button'>Submit Request</button> :
						<div className={styles.textForm}>You must register to submit an application.</div>}
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