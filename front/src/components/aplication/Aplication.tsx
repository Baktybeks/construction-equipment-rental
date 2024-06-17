import React, { useState, useEffect } from 'react';
import styles from './Aplication.module.scss';
import { log } from 'util';

interface Application {
    id: string;
    name: string;
    phone: string;
    description: string;
    processed: boolean;
    approved: boolean;
    EquipmentId: Number;
    createdAt: string;
    updatedAt: string;
    Equipments: [];
}

const Aplication: React.FC = () => {
    const [application, setApplication] = useState<Application[]>([]);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/application/');
                if (!response.ok) {
                    throw new Error('Unable to fetch application!');
                }
                const jsonData = await response.json();
                setApplication(jsonData);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchEquipment();
    }, []); // Пустой массив зависимостей, чтобы вызвать useEffect только один раз при загрузке

    const handleDelete = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/application/${index}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setApplication(prevApplications => prevApplications.filter(app => app.id !== index));
            } else {
                console.error('Ошибка при удалении оборудования:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleCheckboxChange = async (index: string, type: 'processed' | 'approved') => {
        try {
            const updatedApplications = application.map((app) => {
                if (app.id === index) {
                    return { ...app, [type]: !app[type] };
                }
                return app;
            });

            setApplication(updatedApplications);

            const updatedApp = updatedApplications.find((app) => app.id === index);
            if (!updatedApp) {
                console.error('Ошибка: обновленное приложение не найдено');
                return;
            }

            const formData = new FormData();
            formData.append('processed', updatedApp.processed.toString());
            formData.append('approved', updatedApp.approved.toString());

            const response = await fetch(`http://localhost:5000/api/application/${index}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                const updatedData = await response.json();
                setApplication((prevApplications) =>
                    prevApplications.map((app) =>
                        app.id === index ? { ...app, updatedAt: updatedData.updatedAt } : app
                    )
                );
            } else {
                console.error('Ошибка при обновлении заявки:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
            }

            const year = String(date.getFullYear()).slice(-2);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
        } catch (error) {
            console.error('Ошибка при форматировании даты:', error);
            return 'Invalid date';
        }
    };
    return (
        <div className={styles.category}>
            <div className={styles.category_list}>
                <h2 className={styles.nameAdmin}>Заявки</h2>
                <div className={styles.box}>
                    {application.map((elem) => (
                        <div key={elem.id} className={styles.item}>
                            <div className={styles.info}>
                                <p>Имя: {elem.name}</p>
                                <p>Телефон: {elem.phone}</p>
                                {
                                    !!elem.Equipments.length && <div style={{border: "1px solid white", borderRadius: 10, padding: 5}}> Оборудования:
                                        {
                                            elem.Equipments.map(item =>
                                                // @ts-ignore
                                                <p>{ item.title }</p>
                                            )
                                        }
                                    </div>
                                }
                                <p>Дата добавления: {formatDate(elem.createdAt)}</p>
                            </div>
                            <div className={styles.btns}>
                                <label className={styles.textCheckbox} htmlFor='checkbox'>Отработано</label>
                                <input
                                    id='processed'
                                    type='checkbox'
                                    name='processed'
                                    checked={elem.processed}
                                    onChange={() => handleCheckboxChange(elem.id, 'processed')}
                                    className={styles.checkbox}
                                />
                                <label className={styles.textCheckbox} htmlFor='approved'>Одобрено</label>
                                <input
                                    id='approved'
                                    type='checkbox'
                                    name='approved'
                                    checked={elem.approved}
                                    onChange={() => handleCheckboxChange(elem.id, 'approved')}
                                    className={styles.checkbox}
                                />
                                <button className={styles.btn} onClick={() => handleDelete(elem.id)}>
                                    удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Aplication;
