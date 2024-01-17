import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext, useMemo, useRef } from 'react';
import { UserContext } from '../../context/user.context';


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

	

	if (items.length === 0) {
		return <p>Записей нет</p>;
	}
	

	const prev = () => sliderRef.current.scrollLeft -= 250;
	const next = () => sliderRef.current.scrollLeft += 250;
	

	return <>
	<div className='slider'>
		<div className='prev' onClick={prev}></div>
		<div className='slider-block' ref={sliderRef}>
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
		<div className='next' onClick={next}></div>
	</div>
	</>;
	
}
  
export default JournalList;