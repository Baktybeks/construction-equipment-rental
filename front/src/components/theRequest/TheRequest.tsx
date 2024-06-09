'use client';

import styles from './TheRequest.module.scss';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';


interface Direction {
    name: string;
    email: string;
    phone: string;
    description: string;
    EquipmentId: string;
    processed: boolean;
}

const TheRequest = () => {
    const [ newAplication, setNewAplication ] = useState<Direction>({
        name: '',
        email: '',
        phone: '',
        description: '',
        EquipmentId: '',
        processed: false,
    });


    const session = useSession();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewAplication(prevState => ({
            ...prevState,
            [ name ]: value,
        }));
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
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
                if (!response.ok) {
                    throw new Error('Unable to fetch directions!');
                }

                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch(error) {
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
                        Полный контроль над продукцией позволяет нам предлагать нашим клиентам лучшее качество цен и услуг. Мы очень гордимся всем, что делаем
                    </p>
                    <form className={styles.form}>
                        <input className={styles.inputForm} value={newAplication.name} onChange={handleChange}
                               name="name" type="text" placeholder="Ваше имя"
                        />
                        <input className={styles.inputForm} value={newAplication.email} onChange={handleChange}
                               name="email" type="email" placeholder="Email"
                        />
                        <input className={styles.inputForm} value={newAplication.phone} onChange={handleChange}
                               name="phone" type="number" placeholder="номер для связи"
                        />
                        <select className={styles.inputForm} id="service" onChange={handleChange}
                                value={newAplication.description} name="description"
                        >
                            <option className={styles.valueService} value="Элсом">Элсом</option>
                            <option className={styles.valueService} value="Viza">Viza</option>
                        </select>
                        <textarea className={styles.textareaForm} onChange={handleChange}
                                  placeholder="дополнительно (коммент)!"
                        />

                        {session.data ? <button className={styles.submit} type="button">отправить запрос</button> :
                            <div className={styles.textForm}>Для подачи заявки необходимо авторизоваться</div>}
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
                    <p className={styles.textContact}>У Вас есть вопросы? можете с нами связаться!
                        Позвонить(и кнопка должна перебрасывать   на звонок или показывал  номер)</p>
                    <a href="tel:+996706774686"> <button className={styles.btnContacts}>
                        Связаться с нами
                    </button>
                    </a>
                </div>
            </div>
        </>
    );
};

export default TheRequest;
