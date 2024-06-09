'use client'
import React, { useEffect, useState } from 'react';
import styles from '../styles/admin/Admin.module.scss'
import Category from '@/components/category/Category';
import Equipment from '@/components/equipment/Equipment';

const PageAdmin = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:5000/api/category/');
            if (!response.ok) {
                throw new Error('Unable to fetch categories!');
            }
            const jsonData = await response.json();
            setCategories(jsonData.rows);
        };
        fetchCategories();
    }, []);

    const addCategory = async (newCategory) => {
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
                    throw new Error('Unable to fetch categories!');
                }
                const jsonData = await res.json();
                setCategories(jsonData.rows);
            } else {
                console.error('Ошибка при добавлении новой категории:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/category/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
            } else {
                console.error('Ошибка при удалении категории:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <div className={ styles.wrapperAdmin }>
            <Category categories={categories} addCategory={addCategory} deleteCategory={deleteCategory} />
            <Equipment categories={categories} />
        </div>
    );
};

export default PageAdmin;
