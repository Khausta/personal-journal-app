
import { memo } from 'react';
import styles from './Button.module.css';

function Button({ children, onClick }) {
	
	return (
		<button onClick={onClick} className={`${styles['button']} ${styles['accent']}`}>{children}</button>
	);
}
  
export default memo(Button);
//даже если применить memo, Button будет ререндериться тк в props передана ф-я (onClick) 
// которая при сравнении не будет строго равна, так как memo сравнивает функции,
// а функции - это объекты и они не будут равны. Доп:компонент это функция (то есть обьект) если что
