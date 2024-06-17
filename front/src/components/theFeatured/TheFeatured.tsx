'use client'

import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Link from 'next/link'
import ArrowCircleRight from '@/components/theFeatured/dateTower/icons/ArrowCircleRight'

import 'slick-carousel/slick/slick.css'
import './TheSlider.scss'
import styles from './TheFeatured.module.scss'

const TheFeatured = () => {
    const settings = {
        infinite: true,
        focusOnSelect: true,
        slidesToShow: 3,
        slidesToScroll: 1,
    }

    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        const fetchCategories = async() => {
            const response = await fetch('http://localhost:5000/api/category/');
            if (!response.ok) {
                throw new Error('Unable to fetch categories!');
            }
            const jsonData = await response.json();
            setCategories(jsonData.rows);
        };
        fetchCategories();
    }, []);


    return (
        <div className={ styles.blockSlider }>
            <h2 className={ styles.nameSliders }>Категории</h2>
            <div>
                <div className={ styles.sliderContainer }>
                    <Slider { ...settings }>
                        { categories.map((elem, index) =>
                            <div key={ index }>
                                <img src={ `http://localhost:5000/${ elem.image }` } alt="image"  className={ styles.imgesTower }/>
                                    <h4 className={ styles.textTower }>
                                        <span className={ styles.nameTower }>{ elem.category }</span>
                                    </h4>
                            </div>
                            ) }
                    </Slider>
                </div>
                <div className={ styles.allProgect }>
                    <Link href={ '/category' } className={ styles.textLink } style={{color: 'white'}}>Все категории<ArrowCircleRight/></Link>
                </div>
            </div>
        </div>
)
}

export default TheFeatured
