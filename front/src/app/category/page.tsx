'use client'

import React, { useEffect, useState } from 'react';
import styles from './category.module.scss';
import Link from 'next/link';

interface Equipment {
    id: number;
    title: string;
    image: string;
    CategoryId: string;
}

interface Category {
    id: number;
    category: string;
}

const PageAdmin = () => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // State для выбранной категории
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/category');
                if (!response.ok) {
                    throw new Error('Unable to fetch categories!');
                }
                const jsonData = await response.json();
                setCategories(jsonData.rows);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        // Загрузка оборудования с учетом выбранной категории
        const fetchEquipment = async () => {
            let url = 'http://localhost:5000/api/equipment/';
            if (selectedCategory) {
                url += `?category=${selectedCategory}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Unable to fetch equipment!');
            }
            const jsonData = await response.json();
            setEquipment(jsonData.rows);
        };

        fetchEquipment();
    }, [selectedCategory]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value === '' ? null : e.target.value);
    };

    const filteredEquipment = selectedCategory
        ? equipment.filter((item) => item.CategoryId == selectedCategory)
        : equipment;

    return (
        <div className={styles.category_list}>
            <h2 className={styles.nameAdmin}>Категории</h2>
            <div className={styles.filter}>
                <label htmlFor="categoryFilter" className={styles.filterLabel}>Фильтр по категории:</label>
                <select
                    id="categoryFilter"
                    className={styles.filterSelect}
                    value={selectedCategory || ''}
                    onChange={handleCategoryChange}
                >
                    <option value="">Все категории</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.category}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.box}>
                {filteredEquipment.map((elem) => (
                    <div key={elem.id} className={styles.item}>
                        <div className={styles.img}>
                            <img src={`http://localhost:5000/${elem.image}`} alt="image" />
                        </div>
                        <p className={styles.title}>{elem.title}</p>
                        <Link href={`/application?equipmentId=${elem.id}`} className={styles.btn}>
                            оставить заявку
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageAdmin;
