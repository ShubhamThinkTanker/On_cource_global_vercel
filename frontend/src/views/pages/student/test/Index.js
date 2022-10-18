import React, { useEffect, useState } from 'react';
import MainTestHeader from './MainTestHeader';
import MainTest from './MainTest';
import MainTestFooter from './MainTestFooter';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllQuestionsBySubjectRequest, resetExamSlice } from '../../../../redux/examSlice';
import { GetAllInstrunctionsByStudentRequest } from '../../../../redux/instructionsSlice';

function Test({ isRowVisible }) {
	const { flaggedQuestion } = useSelector((state) => state.exam);
	const dispatch = useDispatch();
	const [queryData, setQueryData] = useState({
		question_number: '',
		subject_name: '',
	});
	const [queryString, setQueryString] = useState(
		`question_number=${queryData.question_number}&subject_name=${queryData.subject_name}`
	);
	const [fontSize, setFontSize] = useState(14);

	const fontInc = () => {
		if (fontSize < 28) {
			setFontSize((fontSize) => fontSize + 4);
		}
	};
	const fontDec = () => {
		if (fontSize > 10) {
			setFontSize((fontSize) => fontSize - 4);
		}
	};
	const fontReset = () => {
		setFontSize(14);
	};

	const handleQueryChange = (data) => {
		let queryStr = Object.keys(data)
			.map((key) => {
				return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
			})
			.join('&');
		setQueryString(queryStr);
	};

	useEffect(() => {
		handleQueryChange(queryData);
	}, [queryData]);

	// eslint-disable-next-line no-unused-vars
	const handleChangeQueryData = ({ question_number, subject_name }) => {
		setQueryData({ question_number, subject_name });
	};

	useEffect(() => {
		dispatch(GetAllInstrunctionsByStudentRequest());
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetAllQuestionsBySubjectRequest(queryString));
	}, [dispatch, queryString, flaggedQuestion]);

	useEffect(() => {
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			dispatch(resetExamSlice());
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	const handleBeforeUnload = (e) => {
		e.preventDefault();
		const message = 'Are you sure you want to leave? All provided data will be lost.';
		e.returnValue = message;
		return message;
	};
	return (
		<div className="main-test-sec">
			<MainTestHeader fontInc={fontInc} fontDec={fontDec} fontReset={fontReset} />
			<MainTest fontSize={fontSize} />
			<MainTestFooter />
		</div>
	);
}
export default Test;
