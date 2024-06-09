import React, { useState, useEffect } from 'react';
import styles from './Aplication.module.scss';
import classNames from 'classnames';
import Equipment from '@/components/equipment/Equipment';
import { log } from 'util';


interface Application {
    id:string;
    name:string;
    phone:string;
    description:string;
    processed:boolean;
    EquipmentId:Number;
    createdAt:string;
    updatedAt:string;
    Equipment:[]
}

const Aplication = () => {
    const [ application, setApplication ] = useState<Application[]>([]);
    useEffect(() => {
        const fetchEquipment = async() => {
            const response = await fetch('http://localhost:5000/api/application/');
            if (!response.ok) {
                throw new Error('Unable to fetch application!');
            }
            const jsonData = await response.json();
            setApplication(jsonData);
        };
        fetchEquipment();
    }, []);

    const handleDelete = async(index:string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/application/${ index }`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setApplication(prevEquipment => prevEquipment.filter(eq => eq.id !== index));
                console.log('Объект удален');
            } else {
                console.error('Ошибка при удалении оборудования:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleCheckboxChange = async (index: string) => {
        try {
            const updatedApplications = application.map((app: any) => {
                if (app.id === index) {
                    return { ...app, processed: !app.processed };
                }
                return app;
            });
            setApplication(updatedApplications);

            const formData = new FormData();
            formData.append('processed', (!application.find((app: any) => app.id === index).processed).toString());

            const response = await fetch(`http://localhost:5000/api/application/${index}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                console.error('Ошибка при добавлении нового направления:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <div className={ styles.category }>
            <div className={ styles.category_list }>
                <h2 className={ styles.nameAdmin }>Заявки</h2>
                <div className={ styles.box }>
                    { application.map((elem) => (
                        <div key={ elem.id } className={ styles.item }>
                            <div className={styles.info}>
                                <span className={ styles.idgendr }>{ elem.id } </span>{ elem.name }
                                <p>{ elem.name }</p>
                                <p>{ elem.phone }</p>
                                <p>{ elem.Equipment.title }</p>
                            </div>
                            <div className={styles.btns}>
                                <input type='checkbox' name='processed' checked={elem.processed}
                                       onChange={() => handleCheckboxChange(elem.id)}
                                       className={styles.checkbox}/>
                                <button className={ styles.btn } onClick={ () => handleDelete(elem.id) }>удалить</button>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
};

export default Aplication;
