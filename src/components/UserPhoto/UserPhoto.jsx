import { useContext } from 'react';
import styles from './UserPhoto.module.css';
import { UserContext } from '../../context/user.context';

function UserPhoto() {
	const photos = ['/photo-2.png', '/photo-1.png'];
	const {userId} = useContext(UserContext);
	
	return (
		<div className={styles['user-photo-box']}>
			<img className={styles['user-photo']} src={ photos[userId - 1] } alt="User Photo" />
		</div>
	);
		
	
}

export default UserPhoto;