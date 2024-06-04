'use client'

import React, {useEffect, useState} from 'react';
import styles from '../styles/admin/Admin.module.scss'

interface Direction {
    id: string;
    title: string;
    author: string;
    publication_year: string;
    bestseller: boolean;
    isNew: boolean;
    price: string;
    GenreId: string;
    discount: boolean;
    cover_image: string;
    description: string;
}


const PageAdmin = () => {
    const [books, setBooks] = useState<Direction[]>([]);
    const [gender, setGender] = useState<any>([]);
    const [newBooks, setNewBooks] = useState<Direction>({
        id: '',
        title: '',
        author: '',
        publication_year: '',
        bestseller: false,
        isNew: false,
        price: '',
        GenreId: '',
        discount: false,
        cover_image: '',
        description: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/book/');
            if (!response.ok) {
                throw new Error('Unable to fetch posts!');
            }
            const jsonData = await response.json();
            setBooks(jsonData.rows);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/genre/');
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
            setNewBooks(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setNewBooks(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleDelete = async (index: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/book/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setBooks((book: any) => book.filter((app: any) => app.id !== index));
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
            formData.append('id', newBooks.id);
            formData.append('title', newBooks.title);
            formData.append('author', newBooks.author);
            formData.append('publication_year', newBooks.publication_year);
            formData.append('bestseller', newBooks.bestseller.toString());
            formData.append('isNew', newBooks.isNew.toString());
            formData.append('price', newBooks.price);
            formData.append('GenreId', newBooks.GenreId);
            formData.append('discount', newBooks.discount.toString());
            formData.append('cover_image', newBooks.cover_image);
            formData.append('description', newBooks.description);

            const response = await fetch('http://localhost:5000/api/book/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/book/');
                if (!res.ok) {
                    throw new Error('Unable to fetch directions!');
                }
                const jsonData = await res.json();
                setBooks(jsonData.rows);

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
            <div className={styles.addBooks}>
                <div>
                    <h2 className={styles.nameAdmin}>Добавить новую книгу</h2>
                    <form className={styles.formAdmin} onSubmit={handleSubmit}>
                <div className={styles.inputForm}>
                    <label>Название:</label>
                    <input className={styles.input} placeholder='Название' type="text" name="title"
                           value={newBooks.title} onChange={handleChange}/>
                </div>
                <div className={styles.inputForm}>
                    <label>Автор:</label>
                    <input className={styles.input} placeholder='Автор' type="text" name="author"
                           value={newBooks.author} onChange={handleChange}/>
                </div>
                <div className={styles.inputForm}>
                    <label>Год:</label>
                    <input className={styles.input} placeholder='Год' type="number" name="publication_year"
                           value={newBooks.publication_year} onChange={handleChange}/>
                </div>
                <div className={styles.inputForm}>
                    <label>Цена:</label>
                    <input className={styles.input} placeholder='Цена' type="number" name="price"
                           value={newBooks.price} onChange={handleChange}/>
                </div>
                        <div className={styles.inputForm}>
                            <label>Жанр:</label>
                            <input className={styles.input} placeholder='Жанр' type="number" name="GenreId"
                                   value={newBooks.GenreId} onChange={handleChange}/>
                        </div>
                        <div className={styles.checboxBlock}>
                            <p className={styles.textInput}>
                                Бестселлер
                            </p>
                            <input type='checkbox' name='bestseller' value={'true'}
                                   onChange={handleChange}
                                   className={styles.checkbox}/>
                        </div>
                        <div className={styles.checboxBlock}>
                            <p className={styles.textInput}>
                                Новая книга
                            </p>
                            <input type='checkbox' name='isNew' value={'true'}
                                   onChange={handleChange}
                                   className={styles.checkbox}/>
                        </div>
                        <div className={styles.checboxBlock}>
                            <p className={styles.textInput}>
                                Скидка
                            </p>
                            <input type='checkbox' name='discount' value={'true'}
                                   onChange={handleChange}
                                   className={styles.checkbox}/>
                </div>
                <div className={styles.inputForm}>
                    <label>Картинка:</label>
                    <div className={styles.blockImages}>
                        <input className={styles.imagesInput} type="file" name="cover_image"
                               accept='/image/*, .png, .jpg, .web'
                               onChange={handleChange}/>
                    </div>
                </div>
                        <div className={styles.inputForm}>
                            <label>Информация:</label>
                            <textarea maxLength={400} className={styles.inputText} placeholder='Текст'
                                      name="description"
                                      value={newBooks.description} onChange={handleChange}/>
                        </div>

                <button className={styles.summit} type="submit">Отправить</button>
            </form>
                </div>
                <div className={styles.genders}>
                    <h2 className={styles.nameAdmin}>Таблица номеров жанров</h2>
                    {gender.map((elem: any) => (
                        <div key={elem.id} className={styles.textGendr}><span className={styles.idgendr}>{elem.id}</span>{elem.genre}</div>
                    ))}
                </div>
            </div>

            <h2 className={styles.nameBooksList}>Добавленные Книги</h2>
            <ul className={styles.blockList}>
                {books.map((elem) => (
                    <li key={elem.id} className={styles.infoList}>
                        <div>
                            <img src={`http://localhost:5000/${elem.cover_image}`} alt='tower'
                                 className={styles.imgesBooks}/>
                            <div className={styles.textBooks}>
                                <div className={styles.nameBook}>{elem.author}</div>
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
