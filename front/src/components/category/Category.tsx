import React, { useState, useRef } from 'react';
import styles from './Category.module.scss';
import classNames from 'classnames';

interface Category {
    id: string;
    category: string;
    image: string;
}

interface CategoryProps {
    categories: Category[];
    addCategory: (newCategory: Category) => void;
    deleteCategory: (id: string) => void;
}

const initialStateCategory: Category = {
    id: '',
    category: '',
    image: '',
}

const Category: React.FC<CategoryProps> = ({ categories, addCategory, deleteCategory }) => {
    const [newCategory, setNewCategory] = useState<Category>(initialStateCategory);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'image' && e.target instanceof HTMLInputElement && e.target.files) {
            setNewCategory(prevState => ({
                ...prevState,
                [name]: e.target.files[0],
            }));
        } else {
            setNewCategory(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addCategory(newCategory);
        setNewCategory(initialStateCategory);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className='container'>
            <div className={styles.category}>
                <form className={classNames(styles.formAdmin, styles.form)} onSubmit={handleSubmit}>
                    <h2 className={styles.nameAdmin}>Добавить новую категорию</h2>
                    <div className={styles.inputForm}>
                        <label>Название:</label>
                        <input
                            className={styles.input}
                            placeholder='Категория'
                            type="text"
                            name="category"
                            value={newCategory.category}
                            onChange={handleChange}
                        />
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
                <div className={styles.category_list}>
                    <h2 className={styles.nameAdmin}>Категории</h2>
                    <div className={styles.box}>
                        {categories.map((elem) => (
                            <div key={elem.id} className={styles.item}>
                                <div>
                                    <span className={styles.idgendr}>{elem.id} </span>{elem.category}
                                </div>
                                <button className={styles.btn} onClick={() => deleteCategory(elem.id)}>удалить</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
