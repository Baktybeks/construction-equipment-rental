'use client';

import styles from './TheRequest.module.scss';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Equipment from '@/components/equipment/Equipment';
import InputMask from 'react-input-mask';


interface Aplication {
    name: string;
    email: string;
    phone: string;
    description: string;
    EquipmentIds: string[];
}

const initialAplication = {
    name: '',
    email: '',
    phone: '',
    description: '',
    EquipmentIds: [],
}

const TheRequest = () => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [newAplication, setNewAplication] = useState<Aplication>(initialAplication);
    console.log(newAplication)
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/equipment/');
                if (!response.ok) {
                    throw new Error('Unable to fetch equipment!');
                }
                const jsonData = await response.json();
                setEquipment(jsonData.rows);
            } catch (error) {
                console.error('Ошибка при загрузке оборудования:', error);
            }
        };
        fetchEquipment();
    }, []);

    const session = useSession();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        // @ts-ignore
        const { name, value, type,checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                const numericValue = parseInt(value, 10); // Преобразуем строку в число
                // @ts-ignore
                if (!newAplication.EquipmentIds.includes(numericValue)) {
                    // @ts-ignore
                    setNewAplication(prevState => ({
                        ...prevState,
                        EquipmentIds: [...prevState.EquipmentIds, numericValue],
                    }));
                }
            } else {
                const numericValue = parseInt(value, 10); // Преобразуем строку в число

                setNewAplication(prevState => ({
                    ...prevState,
                    // @ts-ignore
                    EquipmentIds: prevState.EquipmentIds.filter(id => id !== numericValue), // Удаляем оборудование из массива
                }));
            }
        } else {
            setNewAplication(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const requestData = {
                name: newAplication.name,
                email: newAplication.email,
                phone: newAplication.phone,
                description: newAplication.description,
                processed: false,
                approved: false,
                EquipmentIds: newAplication.EquipmentIds.map(id => parseInt(id)) // Преобразуем строки в числа
            };

            const response = await fetch('http://localhost:5000/api/application/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/equipment/');
                if (!res.ok) {
                    throw new Error('Unable to fetch equipment!');
                }
                const jsonData = await res.json();
                setEquipment(jsonData.rows);
                setNewAplication(initialAplication);
            } else {
                console.error('Ошибка при добавлении нового оборудования:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <>
            <h2 className={styles.nameRequest}>Строительство - всегда будет актуальным</h2>
            <div className={styles.blockInfoForm}>
                <div className={styles.blockForm}>
                    <h3 className={styles.nameForm}>Ваши запросы</h3>
                    <p className={styles.textForm}>
                        Полный контроль над продукцией позволяет нам предлагать нашим клиентам лучшее качество цен и
                        услуг. Мы очень гордимся всем, что делаем
                    </p>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                            className={styles.inputForm}
                            value={newAplication.name}
                            onChange={handleChange}
                            name="name"
                            type="text"
                            placeholder="Ваше имя"
                        />
                        <input
                            className={styles.inputForm}
                            value={newAplication.email}
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                        <InputMask
                            mask="999-999-99-99-99"
                            className={styles.inputForm}
                            value={newAplication.phone}
                            onChange={handleChange}
                            name="phone"
                            type="text" // Изменено с type="number" на type="text"
                            placeholder="996-000-00-00-00"
                        />
                        <div style={{display: 'flex', flexDirection: 'column', gap: 20, width: "100%"}}>
                            <div style={{color: 'white', fontSize: 20}}>Выберите оборудование</div>
                            <div style={{height: 200, overflowY: 'scroll'}}>
                                {equipment.map(elem => (
                                    <div key={elem.id} >
                                        <input
                                            type="checkbox"
                                            id={elem.id}
                                            name="EquipmentIds"
                                            value={elem.id}
                                            checked={newAplication.EquipmentIds.includes(elem.id)}
                                            onChange={handleChange}
                                        />
                                        <label style={{color: 'white', fontSize: 20}} htmlFor={elem.id}>{elem.title}</label>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <textarea
                            className={styles.textareaForm}
                            onChange={handleChange}
                            placeholder="дополнительно (коммент)!"
                            name="description"
                            value={newAplication.description}
                        />

                        {session.data ? (
                            <button className={styles.submit} type="submit">
                                отправить запрос
                            </button>
                        ) : (
                            <div className={styles.textForm}>
                                Для подачи заявки необходимо авторизоваться
                            </div>
                        )}
                    </form>
                </div>
                <div className={styles.blockInfo}>
                    <h3 className={styles.nameInfo}>Информация о нас</h3>
                    <ul className={styles.listContact}>
                        <li>
                            <h4 className={styles.nameList}>Наш адрес: </h4>
                            <p className={styles.infoText}> ул. Анкара 1/2, Бишкек 720064</p>
                        </li>
                        <li>
                            <h4 className={styles.nameList}>Наши контакты: </h4>
                            <p className={styles.infoText}>Email: emir.2001.centr@gmail.com</p>
                            <p className={styles.infoText}>Телефон: (+996)706-774-686</p>
                        </li>
                        <li>
                            <h4 className={styles.nameList}>Мы открыты:</h4>
                            <p className={styles.infoText}>Будние дни: 09:00-19:00</p>
                            <p className={styles.infoText}>В Выходные дни: 10:00-16:00</p>
                        </li>
                    </ul>
                    <p className={styles.textContact}>
                        У Вас есть вопросы? можете с нами связаться! Позвонить(и кнопка должна перебрасывать на звонок
                        или показывал номер)
                    </p>
                    <a href="tel:+996706774686">
                        <button className={styles.btnContacts}>Связаться с нами</button>
                    </a>
                </div>
            </div>
        </>
    );
};

export default TheRequest;
