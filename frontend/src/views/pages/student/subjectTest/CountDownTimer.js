// import { useCounterTimer } from '../../../../utility/hooks/useCounterTimer';
import { useCounterTimer } from '../../../../utility/hooks/useCounterTimer';

const CountdownTimer = ({ targetDate }) => {
	const [days, hours, minutes, seconds] = useCounterTimer(targetDate);

	if (days + hours + minutes + seconds <= 0) {
		return '00:00';
	} else {
		return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
	}
};

export default CountdownTimer;
