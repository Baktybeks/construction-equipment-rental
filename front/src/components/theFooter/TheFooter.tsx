import styles from './TheFooter.module.scss';
import Logo from '@/components/logo/Logo';
import InstagramIcon from '@/components/theFooter/icons/InstagramIcon';
import ArrowIcons from '@/components/theFooter/icons/ArrowIcons';


const TheFooter = () => {

    return (
        <footer className={ styles.footer }>
            <div className={ styles.Logo }><Logo/></div>
            <div className={ styles.componentFooter }>
                <div className={ styles.headerInput }>
                    <h2 className={ styles.nameFooter }>О нас</h2>
                    <div className={ styles.inputEmail }>
                        <div className={ styles.textInput }>подпишитесь чтобы смотреть за нашими новостями:</div>
                        <input type='email' className={ styles.inputText }
                               placeholder='Введите ваш адрес электронной почты'/>
                        <ArrowIcons/>
                    </div>
                </div>
                <div className={ styles.footerBlock }>
                    <div className={ styles.footerInfo }>
                        <p className={ styles.text }>
                            Мы уверены, что предоставим вам лучший сервис, благодаря поддержке профессиональных и
                            сертифицированных специалистов по персоналу, которые у нас есть в настоящее время, а также
                            высококачественным техникам, которые мы используем, мы сможем обеспечить своевременное
                            завершение работы
                        </p>
                        <ul className={ styles.footerImage }>
                            <li>
                                <a target="_blank"
                                   href='https://www.instagram.com/sagynbaev.11?igsh=MWU1ZXNtYWZ3aGZkdg=='>
                                    <InstagramIcon/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { TheFooter };
