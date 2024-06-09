'use client'
import React, { useEffect, useState } from 'react';
import Equipment from '@/components/equipment/Equipment';
import styles from './category.module.scss'
import Link from 'next/link';

const PageAdmin = () => {
    const [ equipment, setEquipment ] = useState<Equipment[]>([]);

    useEffect(() => {
        const fetchEquipment = async() => {
            const response = await fetch('http://localhost:5000/api/equipment/');
            if (!response.ok) {
                throw new Error('Unable to fetch equipment!');
            }
            const jsonData = await response.json();
            setEquipment(jsonData.rows);
        };
        fetchEquipment();
    }, []);


    return (
        <div className={ styles.category_list }>
            <h2 className={ styles.nameAdmin }>Категории</h2>
            <div className={ styles.box }>
                { equipment.map((elem) => (
                    <div key={ elem.id } className={ styles.item }>
                        <div className={ styles.img }>
                            <img src={ `http://localhost:5000/${ elem.image }` } alt="image"/>
                        </div>
                        <p className={ styles.title }>{ elem.title }</p>
                        <Link href="/application" className={ styles.btn }>
                            оставить заявку
                        </Link>
                    </div>
                )) }
            </div>
        </div>
    );
};

export default PageAdmin;
