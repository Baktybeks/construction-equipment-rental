import styles from '@/app/styles/admin/Admin.module.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

interface Category {
    id:string;
    category:string;
    image:string;
}

const Category = () => {
    const [ category, setCategory ] = useState<Category[]>([]);
    const [ newCategory, setNewCategory ] = useState<Category>({
        id: '',
        category: '',
        image: '',
    });
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        console.log(name, value)
        if (name === 'image') {
            setNewCategory(prevState => ({
                ...prevState,
                [ name ]: e.target.files[ 0 ]
            }));
        } else {
            setNewCategory(prevState => ({
                ...prevState,
                [ name ]: value
            }));
        }
    };

    const handleDelete = async(index:string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/category/${ index }`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setCategory((book:any) => book.filter((app:any) => app.id !== index));
                console.log('Объект удален')
            } else {
                console.error('Ошибка при удалении направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('category', newCategory.category);
            formData.append('image', newCategory.image);

            const response = await fetch('http://localhost:5000/api/category/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await fetch('http://localhost:5000/api/category/');
                if (!res.ok) {
                    throw new Error('Unable to fetch directions!');
                }
                const jsonData = await res.json();
                setCategory(jsonData.rows);
                console.log('добавлен объект');
            } else {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };


    return <div className='container'>
        <h2 className={ styles.nameAdmin }>Добавить новую категорию</h2>
        <div>
            <form className={ classNames(styles.formAdmin, styles.form) } onSubmit={ handleSubmit }>
                <div className={ styles.inputForm }>
                    <label>Название:</label>
                    <input className={ styles.input } placeholder='Категория' type="text" name="category"
                           value={ newCategory.category } onChange={ handleChange }/>
                </div>
                <div className={ styles.inputForm }>
                    <label>Картинка:</label>
                    <div className={ styles.blockImages }>
                        <input className={ styles.imagesInput } type="file" name="image"
                               accept='/image/*, .png, .jpg, .web'
                               onChange={ handleChange }/>
                    </div>
                </div>
                <button className={ styles.summit } type="submit">Отправить</button>
            </form>
            <div className={styles.category_list}>
                { category.map((elem:any) => (
                    <div key={ elem.id } className={ styles.textGendr }><span
                        className={ styles.idgendr }>{ elem.id }</span>{ elem.category }</div>
                )) }
            </div>
        </div>

    </div>;
};

export default Category;
