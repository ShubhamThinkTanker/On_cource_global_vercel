import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../student/components/Header';
import Footer from '../../student/components/Footer';
import Result from './Result';

const ResultExam = () => {
	const { isLoading } = useSelector((state) => state.exam);

	if (isLoading) {
		return <h1>Result Loading...</h1>;
	}
	return (
		<>
			<Header />
			<Result />
			<Footer />
		</>
	);
};

export default ResultExam;
