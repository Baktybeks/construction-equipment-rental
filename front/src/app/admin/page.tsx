'use client'

import React, {useEffect, useState} from 'react';
import styles from '../styles/admin/Admin.module.scss'

interface Direction {
    id: string;
    title: string;
    price: string;
    CategoryId: string;
    image: string;
    description: string;
}


const PageAdmin = () => {
    const [product, setProduct] = useState<Direction[]>([]);
    const [gender, setGender] = useState<any>([]);
    const [newProduct, setNewProduct] = useState<Direction>({
        id: '',
        title: '',
        price: '',
        CategoryId: '0',
        image: '',
        description: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/equipment/');
            if (!response.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const jsonData = await response.json();
            setProduct(jsonData.rows);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/category/');
            if (!response.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const jsonData = await response.json();
            setGender(jsonData.rows);
        };

        fetchData();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'cover_image') {
            setNewProduct(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setNewProduct(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleDelete = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/equipment/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setProduct((book: any) => book.filter((app: any) => app.id !== index));
                console.log('Объект удален')
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', newProduct.title);
            formData.append('price', newProduct.price);
            formData.append('image', newProduct.image.toString());
            formData.append('CategoryId', newProduct.CategoryId);
            formData.append('description', newProduct.description);

            const response = await fetch('http://localhost:5000/api/equipment/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/equipment/');
                if (!res.ok) {
                    throw new Error('Unable to fetch directions!');
                }
                const jsonData = await res.json();
                setProduct(jsonData.rows);

                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <div className={styles.wrapperAdmin}>
            <div className={styles.addProduct}>
                <div>
                    <h2 className={styles.nameAdmin}>Добавить новый товар</h2>
                    <form className={styles.formAdmin} onSubmit={handleSubmit}>
                <div className={styles.inputForm}>
                    <label>Название:</label>
                    <input className={styles.input} placeholder='Название' type="text" name="title"
                           value={newProduct.title} onChange={handleChange}/>
                </div>
                <div className={styles.inputForm}>
                    <label>Цена:</label>
                    <input className={styles.input} placeholder='Цена' type="number" name="price"
                           value={newProduct.price} onChange={handleChange}/>
                </div>
                <div className={styles.inputForm}>
                    <label>Картинка:</label>
                    <div className={styles.blockImages}>
                        <input className={styles.imagesInput} type="file" name="image"
                               accept='/image/*, .png, .jpg, .web'
                               onChange={handleChange}/>
                    </div>
                </div>
                        <div className={styles.inputForm}>
                            <label>Информация:</label>
                            <textarea maxLength={400} className={styles.inputText} placeholder='Текст'
                                      name="description"
                                      value={newProduct.description} onChange={handleChange}/>
                        </div>

                <button className={styles.summit} type="submit">Отправить</button>
            </form>
                </div>
                <div className={styles.genders}>
                    <h2 className={styles.nameAdmin}>Таблица номеров Категорий</h2>
                    {gender.map((elem: any) => (
                        <div key={elem.id} className={styles.textGendr}><span className={styles.idgendr}>{elem.id}</span>{elem.genre}</div>
                    ))}
                </div>
            </div>

            <h2 className={styles.nameList}>Добавленные товары</h2>
            <ul className={styles.blockList}>
                {product.map((elem) => (
                    <li key={elem.id} className={styles.infoList}>
                        <div>
                            <img src={`http://localhost:5000/${elem.image}`} alt='tower'
                                 className={styles.imgesBooks}/>
                            <div className={styles.textBooks}>
                                <div className={styles.renovationBook}>{elem.title}</div>
                                <div className={styles.prise}>{elem.price} сом</div>
                            </div>
                        </div>
                    <button className={styles.delete} onClick={() => handleDelete(elem.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PageAdmin;
