import React from "react";
import classes from './Logo.module.scss';

const Logo = () => {
    return (
        <div className={classes.logo}>
            <div className={classes.imgBox}/>
            <p>INTERCAR</p>
        </div>

    );
};

export default Logo;
