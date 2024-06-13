import React, { useEffect, useRef, useState } from 'react';
import styles from './Equipment.module.scss';
import classNames from 'classnames';

interface Equipment {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    CategoryId: number;
}

interface Category {
    id: string;
    category: string;
    image: string;
}

interface EquipmentProps {
    categories: Category[];
}

const initialStateEquipment: Equipment = {
    id: '',
    title: '',
    image: '',
    description: '',
    price: 0,
    CategoryId: 0,
};

const Equipment: React.FC<EquipmentProps> = ({ categories }) => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [newEquipment, setNewEquipment] = useState<Equipment>(initialStateEquipment);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchEquipment = async () => {
            const response = await fetch('http://localhost:5000/api/equipment/');
            if (!response.ok) {
                throw new Error('Unable to fetch equipment!');
            }
            const jsonData = await response.json();
            setEquipment(jsonData.rows);
        };
        fetchEquipment();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'image' && e.target instanceof HTMLInputElement && e.target.files) {
            setNewEquipment(prevState => ({
                ...prevState,
                [name]: e.target.files[0],
            }));
        } else if (name === 'CategoryId') {
            setNewEquipment(prevState => ({
                ...prevState,
                [name]: Number(value),
            }));
        } else {
            setNewEquipment(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleDelete = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/equipment/${index}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setEquipment(prevEquipment => prevEquipment.filter(eq => eq.id !== index));
            } else {
                console.error('Ошибка при удалении оборудования:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', newEquipment.title);
            formData.append('description', newEquipment.description);
            formData.append('price', newEquipment.price.toString());
            formData.append('CategoryId', newEquipment.CategoryId.toString());
            formData.append('image', newEquipment.image as Blob);

            const response = await fetch('http://localhost:5000/api/equipment/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/equipment/');
                if (!res.ok) {
                    throw new Error('Unable to fetch equipment!');
                }
                const jsonData = await res.json();
                setEquipment(jsonData.rows);
                setNewEquipment(initialStateEquipment);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                console.error('Ошибка при добавлении нового оборудования:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <div className='container'>
            <div className={styles.category}>
                <form className={classNames(styles.formAdmin, styles.form)} onSubmit={handleSubmit}>
                    <h2 className={styles.nameAdmin}>Добавить новое оборудование</h2>
                    <div className={styles.inputForm}>
                        <label>Название:</label>
                        <input
                            className={styles.input}
                            placeholder='Название'
                            type="text"
                            name="title"
                            value={newEquipment.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputForm}>
                        <label>Описание:</label>
                        <input
                            className={styles.input}
                            placeholder='Описание'
                            type="text"
                            name="description"
                            value={newEquipment.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputForm}>
                        <label>Цена:</label>
                        <input
                            className={styles.input}
                            placeholder='Цена'
                            type="number"
                            name="price"
                            value={newEquipment.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputForm}>
                        <label>Категория:</label>
                        <select
                            className={styles.input}
                            name="CategoryId"
                            value={newEquipment.CategoryId}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Выберите категорию</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.category}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inputForm}>
                        <label>Картинка:</label>
                        <div className={styles.blockImages}>
                            <input
                                className={styles.imagesInput}
                                type="file"
                                name="image"
                                accept='/image/*, .png, .jpg, .web'
                                onChange={handleChange}
                                ref={fileInputRef}
                            />
                        </div>
                    </div>
                    <button className={styles.summit} type="submit">Отправить</button>
                </form>
                <div className={styles.equipment_list}>
                    <h2 className={styles.nameAdmin}>Оборудование</h2>
                    <div className={styles.box}>
                        {equipment.map((eq) => (
                            <div key={eq.id} className={styles.item}>
                                <div>
                                    <span className={styles.idgendr}>{eq.id} </span>{eq.title}
                                </div>
                                <button className={styles.btn} onClick={() => handleDelete(eq.id)}>удалить</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Equipment;
