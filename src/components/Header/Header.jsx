import SelectUser from '../SelectUser/SelectUser';
import UserPhoto from '../UserPhoto/UserPhoto';
import styles from './Header.module.css';

function Header() {
	return (
		<>
			<img className={styles.logo} src='/logo.svg' alt="Personal Journal Logotype" />
			<div className={styles['current-user']}>
				<UserPhoto/>
				<SelectUser/>
			</div>
			
		</>
		
	);
}

export default Header;