'use client'

import React from 'react'
import { dateComment } from '@/components/TheComments/dateComment/DateComment'
import Slider from "react-slick";
import './TheSliderComments.scss'
import styles from './TheComments.module.scss'

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={ className }
            style={ { ...style, display: 'block', } }
            onClick={ onClick }
        >
            Следующий
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={ className }
            style={ { ...style, display: 'block', } }
            onClick={ onClick }
        >
            Предыдущий
        </div>
    );
};

const TheComments = () => {
    const settings = {
        className: 'center',
        initialSlide: 2,
        slidesToShow: 1,
        centerPadding: '90px',
        draggable: false,
        speed: 600,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    }

    return (
        <div className='slider-comments'>
            <Slider { ...settings }>
                { dateComment.map((elem, index) => (
                    <div key={ index }>
                        <h4 className={ styles.nameSlider }>
                            Отзывы
                        </h4>
                        <p className={ styles.textSlider }>
                            { elem.comment }
                        </p>
                        <p className={ styles.nameUser }>{ elem.name }</p>
                        <span> </span>
                        <p className={ styles.nameUser }>{ elem.county }</p>
                    </div>
                )) }
            </Slider>
        </div>
    )
}

export default TheComments
