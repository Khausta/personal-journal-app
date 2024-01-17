import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import classNames from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';


function JournalForm({ onSubmit, data, onDelete}) {

	const [ formState, dispatchForm ] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;


	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'CLEAR_FORM' });
			dispatchForm({ type: 'SET_VALUE', payload: { userId }});
		}
		dispatchForm({ type: 'SET_VALUE', payload: { ...data }});
	}, [data]);

	useEffect(() => {
		let timerId;

		if (!isValid.title || !isValid.date || !isValid.text) {
			focusError(isValid);
			timerId = setTimeout(() => {
				console.log('Очистка состояния');
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}

		return () => {  //эта функуция вызовтся при unmount компонента или при следующем вызове эффекта 
			clearTimeout(timerId);  //очистка состояния
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			console.log('Очистка формы');
			dispatchForm({ type: 'CLEAR_FORM' });
			dispatchForm({ type: 'SET_VALUE', payload: { userId }});
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });	
	};
	

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId }}); //можно просто userId один раз прописать тк имена совпадают
	}, [userId]);

	const changeValues = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value}});
		console.log(formState);
	};

	const deleteJournalForm = () => {
		onDelete(data.id);
		dispatchForm({ type: 'CLEAR_FORM' });
		dispatchForm({ type: 'SET_VALUE', payload: { userId }});
	};

	return (
		
		<form className={styles['journal-form']}  onSubmit={addJournalItem}> 
			<div className={styles['form-title']}>
				<Input ref={titleRef} onChange={changeValues} isValid={isValid.title} value={values.title} type='text' name="title" appearance='title' /> 
				{data?.id && <button className={styles['delete-button']} onClick={deleteJournalForm} type="button">
					<img src="/archive.svg" alt="delete icon" />
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="calendar icon" />
					<span>Дата</span>
				</label>
				<Input ref={dateRef} onChange={changeValues} isValid={isValid.date} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} type='date' name="date" id='date'  /> 
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="folder icon" />
					<span>Метки</span>
				</label>
				<Input onChange={changeValues} value={values.tag} type='text' name="tag" id='tag'  /> 
			</div>
			
			<textarea ref={textRef} onChange={changeValues} value={values.text} name="text" id="" cols="30" rows="10" className={classNames(styles['input'], {
				[styles['invalid']]: !isValid.text
			})}  ></textarea>
			<Button>Сохранить</Button>
		</form>

			
	);
}

export default JournalForm;