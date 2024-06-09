'use client'
import {useRouter} from 'next/navigation'
import {signIn, useSession} from 'next-auth/react'
import {FormEventHandler, useEffect} from 'react'
import styles from './SighInForm.module.scss'

const SighInForm = () => {
	const router = useRouter();
	const {data: session, status} = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			if (session?.user?.name === 'admin') {
				router.push('/admin');
			} else {
				router.push('/');
			}
		}
	}, [session, status, router]);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const res = await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirect: false
		});

		if (res && !res.error) {
		} else if (res?.error) {
			console.error('Ошибка авторизации:', res.error);
		} else {
			console.error('Неизвестная ошибка авторизации');
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.loginForm}>
			<div className={styles.inputForm}>
				<label className={styles.labelText} htmlFor='email'>Логин</label>
				<input className={styles.inputText}
					   type='email' name='email' id='email' placeholder={'you@company.com'} required
				/>
			</div>
			<div className={styles.inputForm}>
				<label className={styles.labelText} htmlFor='password'>Пароль</label>
				<input className={styles.inputText}
					   type='password' name='password' id='password' placeholder={'**************'} required
				/>
			</div>
			<div className={styles.checkboxForm}>
				<input
					type='checkbox' name='checkbox' id='checkbox' required
				/>
				<label className={styles.textCheckbox} htmlFor='checkbox'>Запомнить меня</label>
			</div>
			<button className={styles.btn} type='submit'>Войти</button>
		</form>
	)
}

export default SighInForm;
