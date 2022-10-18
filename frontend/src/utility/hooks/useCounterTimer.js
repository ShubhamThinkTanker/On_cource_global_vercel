// import React, { useState, useRef, useEffect } from 'react';

// const useCounterTimer = (setMin = 0) => {
// 	const Ref = useRef(null);
// 	const [timer, setTimer] = useState('00:00');
// 	const getTimeRemaining = (e) => {
// 		const total = Date.parse(e) - Date.parse(new Date());
// 		const seconds = Math.floor((total / 1000) % 60);
// 		const minutes = Math.floor((total / 1000 / 60) % 60);
// 		const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
// 		return {
// 			total,
// 			hours,
// 			minutes,
// 			seconds,
// 		};
// 	};
// 	const startTimer = (e) => {
// 		let { total, hours, minutes, seconds } = getTimeRemaining(e);
// 		if (total >= 0) {
// 			setTimer(
// 				(minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds)
// 			);
// 		}
// 	};
// 	const clearTimer = (e) => {
// 		if (Ref.current) clearInterval(Ref.current);
// 		const id = setInterval(() => {
// 			startTimer(e);
// 		}, 1000);
// 		Ref.current = id;
// 	};
// 	const getDeadTime = () => {
// 		let deadline = new Date();
// 		// deadline.setSeconds(deadline.getSeconds() + 60 * 60);
// 		deadline.setMinutes(deadline.getMinutes() + setMin);
// 		return deadline;
// 	};
// 	useEffect(() => {
// 		clearTimer(getDeadTime());
// 	}, []);
// 	// const onClickReset = () => {
// 	// 	clearTimer(getDeadTime());
// 	// };
// 	return { timer };
// };
// export default useCounterTimer;

import { useEffect, useState } from 'react';

const useCounterTimer = (targetDate) => {
	const countDownDate = new Date(targetDate).getTime();

	const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setCountDown(countDownDate - new Date().getTime());
		}, 1000);

		return () => clearInterval(interval);
	}, [countDownDate]);

	return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
	// calculate time left
	const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
	const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

	return [days, hours, minutes, seconds];
};

export { useCounterTimer };
