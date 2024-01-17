import './Button.css';
import { memo } from 'react';

function Button({ children, onClick }) {
	console.log('Button');
	
	return (
		<button onClick={onClick} className='button accent'>{children}</button>
	);
}
  
export default memo(Button);
//даже если применить memo, Button будет ререндериться тк в props передана ф-я (onClick) 
// которая при сравнении не будет строго равна, так как memo сравнивает функции,
// а функции - это объекты и они не будут равны. Доп:компонент это функция (то есть обьект) если что
