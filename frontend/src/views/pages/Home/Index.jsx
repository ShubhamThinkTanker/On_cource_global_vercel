import React from 'react';
import { getUserData } from '../../../utility/Utils';
import { useHistory } from 'react-router-dom';

const Index = () => {
	const history = useHistory();
	getUserData().role === 'admin'
		? history.push('/admin/dashboard')
		: history.push('/student/dashboard');
	return <></>;
};

export default Index;
