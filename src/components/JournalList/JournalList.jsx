import styles from './JournalList.module.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext, useMemo, useRef } from 'react';
import { UserContext } from '../../context/user.context';
import classNames from 'classnames';


function JournalList({ items, setItem }) {
	const sliderRef = useRef(null);
	const { userId } = useContext(UserContext);
	
	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	const filtredItems = useMemo(() => items
		.filter(el => el.userId === userId)
		.sort(sortItems), [items, userId]); 

	console.log(filtredItems.length == 0);
	

	if (items.length === 0) {
		return <p>Записей нет</p>;
	}
	

	const prev = () => sliderRef.current.scrollLeft -= 250;
	const next = () => sliderRef.current.scrollLeft += 250;
	

	return <>
		<div className={styles['slider']}>
			<div className={classNames(styles['prev'], 
			{[styles['no-navigation']]: filtredItems.length < 2})} onClick={prev}></div>
			<div className={styles['slider-block']} ref={sliderRef}>
				{filtredItems
					.map(el => (
						<CardButton key={el.id} onClick={() => setItem(el)}>
							<JournalItem
								title={el.title}
								date={el.date}
								text={el.text}
							/>
						</CardButton>
					))}
			</div>
			<div className={classNames(styles['next'], 
			{[styles['no-navigation']]: filtredItems.length < 2})} onClick={next}></div>
		</div>
	</>;
	
}
  
export default JournalList;